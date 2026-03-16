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
  description: "List open feature requirements",
  args: {},
  async execute(_args, context) {
    const worktree = getWorktree(context as ToolContext);
    const requirementsDir = path.join(worktree, "requirements");
    return await listOpenFiles(requirementsDir, worktree, isFeatureFile);
  },
});

export const list_open_stories = tool({
  description: "List open story requirements",
  args: {},
  async execute(_args, context) {
    const worktree = getWorktree(context as ToolContext);
    const requirementsDir = path.join(worktree, "requirements");
    return await listOpenFiles(requirementsDir, worktree, isStoryFile);
  },
});

export const list_open_tasks = tool({
  description: "List open task requirements",
  args: {},
  async execute(_args, context) {
    const worktree = getWorktree(context as ToolContext);
    const requirementsDir = path.join(worktree, "requirements");
    return await listOpenFiles(requirementsDir, worktree, isTaskFile);
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
