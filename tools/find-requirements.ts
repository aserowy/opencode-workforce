#!/usr/bin/env -S deno run --allow-read

const encoder = new TextEncoder();

async function listFiles(root: string): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of Deno.readDir(root)) {
    const path = `${root}/${entry.name}`;
    if (entry.isDirectory) {
      files.push(...await listFiles(path));
    } else if (
      entry.isFile &&
      (entry.name === "feature.md" || entry.name === "story.md" || (entry.name.startsWith("TASK-") && entry.name.endsWith(".md") && path.includes("/tasks/")))
    ) {
      files.push(path);
    }
  }
  return files;
}

function toRelative(root: string, path: string): string {
  return path.startsWith(root) ? path.slice(root.length + 1) : path;
}

const rootDir = Deno.cwd();
const requirementsDir = `${rootDir}/requirements`;
const terms = Deno.args.map((term) => term.toLowerCase());

const files = await listFiles(requirementsDir);
const matches: string[] = [];

for (const file of files) {
  const relative = toRelative(rootDir, file);
  const lower = relative.toLowerCase();
  const match = terms.length === 0 || terms.every((term) => lower.includes(term));
  if (match) {
    matches.push(relative);
  }
}

matches.sort();
await Deno.stdout.write(encoder.encode(matches.join("\n")));
