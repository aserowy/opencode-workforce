import { tool } from "@opencode-ai/plugin";
import fs from "node:fs/promises";
import path from "node:path";

type ToolContext = {
  agent?: string;
  sessionID?: string;
  messageID?: string;
  directory?: string;
  worktree?: string;
};

type FilePredicate = (fullPath: string, entryName: string) => boolean;

export const find = tool({
  description: "List requirement files matching terms",
  args: {
    terms: tool.schema.array(tool.schema.string()).describe("Search terms").optional(),
  },
  async execute(args, context) {
    const worktree = getWorktree(context as ToolContext);
    const requirementsDir = path.join(worktree, "requirements");
    const terms = (args.terms ?? []).map((term) => term.toLowerCase());

    const files = await listFiles(requirementsDir, isRequirementFile);
    const matches: string[] = [];

    for (const file of files) {
      const relative = toRelative(worktree, file);
      const lower = relative.toLowerCase();
      const match = terms.length === 0 || terms.every((term) => lower.includes(term));
      if (match) {
        matches.push(relative);
      }
    }

    matches.sort();
    return matches.join("\n");
  },
});

export const list_open_features = tool({
  description: "List open features",
  args: {},
  async execute(_args, context) {
    const worktree = getWorktree(context as ToolContext);
    const requirementsDir = path.join(worktree, "requirements");
    return await listOpenFiles(requirementsDir, worktree, isFeatureFile);
  },
});

export const list_open_stories = tool({
  description: "List open user stories",
  args: {},
  async execute(_args, context) {
    const worktree = getWorktree(context as ToolContext);
    const requirementsDir = path.join(worktree, "requirements");
    return await listOpenFiles(requirementsDir, worktree, isStoryFile);
  },
});

export const list_open_tasks = tool({
  description: "List open tasks",
  args: {},
  async execute(_args, context) {
    const worktree = getWorktree(context as ToolContext);
    const requirementsDir = path.join(worktree, "requirements");
    return await listOpenFiles(requirementsDir, worktree, isTaskFile);
  },
});

export const list_story_tasks = tool({
  description: "List tasks for a user story",
  args: {
    feature_id: tool.schema.string().describe("Feature ID"),
    story_id: tool.schema.string().describe("User story ID"),
  },
  async execute(args, context) {
    const worktree = getWorktree(context as ToolContext);
    const requirementsDir = path.join(worktree, "requirements");
    const storyDir = await findStoryDir(requirementsDir, args.feature_id, args.story_id);
    if (!storyDir) {
      return "";
    }

    const tasksDir = path.join(storyDir, "tasks");
    const tasks = await listFiles(tasksDir, isTaskFile);
    const relativeTasks = tasks.map((task) => toRelative(worktree, task));
    relativeTasks.sort();
    return relativeTasks.join("\n");
  },
});

async function listFiles(root: string, predicate: FilePredicate): Promise<string[]> {
  let entries: fs.Dirent[];
  try {
    entries = await fs.readdir(root, { withFileTypes: true });
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err && err.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath, predicate));
      continue;
    }

    if (entry.isFile() && predicate(fullPath, entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function findStoryDir(
  requirementsDir: string,
  featureID: string,
  storyID: string,
): Promise<string | null> {
  const featureInput = parseIdentifier(featureID, "FEAT-");
  const storyInput = parseIdentifier(storyID, "US-");
  if (!featureInput || !storyInput) {
    return null;
  }

  let entries: fs.Dirent[];
  try {
    entries = await fs.readdir(requirementsDir, { withFileTypes: true });
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err && err.code === "ENOENT") {
      return null;
    }
    throw error;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const featureMatch = matchIdentifier(entry.name, "FEAT-", featureInput);
    if (!featureMatch) {
      continue;
    }

    const featureDir = path.join(requirementsDir, entry.name);
    const storyEntries = await fs.readdir(featureDir, { withFileTypes: true });
    for (const storyEntry of storyEntries) {
      if (!storyEntry.isDirectory()) {
        continue;
      }

      const storyMatch = matchIdentifier(storyEntry.name, "US-", storyInput);
      if (storyMatch) {
        return path.join(featureDir, storyEntry.name);
      }
    }
  }

  return null;
}

function parseIdentifier(value: string, prefix: string): number | null {
  const trimmed = value.trim();
  const normalized = trimmed.startsWith(prefix)
    ? trimmed.slice(prefix.length)
    : trimmed;
  const match = normalized.match(/^(\d+)(?:-(.+))?$/);
  if (!match) {
    return null;
  }

  const id = Number(match[1]);
  if (!Number.isFinite(id)) {
    return null;
  }

  return id;
}

function matchIdentifier(directoryName: string, prefix: string, idInput: number): boolean {
  if (!directoryName.startsWith(prefix)) {
    return false;
  }

  const normalized = directoryName.slice(prefix.length);
  const match = normalized.match(/^(\d+)-(.+)$/);
  if (!match) {
    return false;
  }

  const id = Number(match[1]);
  if (!Number.isFinite(id) || id !== idInput) {
    return false;
  }
  return true;
}

function getWorktree(context: ToolContext): string {
  return context.worktree ?? context.directory ?? process.cwd();
}

function toRelative(worktree: string, filePath: string): string {
  const relativePath = path.relative(worktree, filePath);
  return relativePath.split(path.sep).join("/");
}

async function isOpen(filePath: string): Promise<boolean> {
  const content = await fs.readFile(filePath, "utf8");
  return content.includes("- Status: plan") || content.includes("- Status: execution");
}

function isFeatureFile(fullPath: string, entryName: string): boolean {
  void fullPath;
  return entryName === "feature.md";
}

function isStoryFile(fullPath: string, entryName: string): boolean {
  void fullPath;
  return entryName === "story.md";
}

function isTaskFile(fullPath: string, entryName: string): boolean {
  return entryName.startsWith("TASK-") &&
    entryName.endsWith(".md") &&
    fullPath.includes(`${path.sep}tasks${path.sep}`);
}

function isRequirementFile(fullPath: string, entryName: string): boolean {
  return isFeatureFile(fullPath, entryName) ||
    isStoryFile(fullPath, entryName) ||
    isTaskFile(fullPath, entryName);
}

async function listOpenFiles(
  requirementsDir: string,
  worktree: string,
  predicate: FilePredicate,
): Promise<string> {
  const files = await listFiles(requirementsDir, predicate);
  const openFiles: string[] = [];

  for (const file of files) {
    if (await isOpen(file)) {
      openFiles.push(toRelative(worktree, file));
    }
  }

  openFiles.sort();
  return openFiles.join("\n");
}
