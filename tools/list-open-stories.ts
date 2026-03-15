#!/usr/bin/env -S deno run --allow-read

const decoder = new TextDecoder();

async function listFiles(root: string): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of Deno.readDir(root)) {
    const path = `${root}/${entry.name}`;
    if (entry.isDirectory) {
      files.push(...await listFiles(path));
    } else if (entry.isFile && entry.name === "story.md") {
      files.push(path);
    }
  }
  return files;
}

function toRelative(root: string, path: string): string {
  return path.startsWith(root) ? path.slice(root.length + 1) : path;
}

async function isOpen(path: string): Promise<boolean> {
  const content = decoder.decode(await Deno.readFile(path));
  return content.includes("- Status: plan") || content.includes("- Status: execution");
}

const rootDir = Deno.cwd();
const requirementsDir = `${rootDir}/requirements`;

const files = await listFiles(requirementsDir);
const openFiles: string[] = [];

for (const file of files) {
  if (await isOpen(file)) {
    openFiles.push(toRelative(rootDir, file));
  }
}

openFiles.sort();
console.log(openFiles.join("\n"));
