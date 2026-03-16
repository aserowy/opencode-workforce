import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { mock, test } from "bun:test";

mock.module("@opencode-ai/plugin", () => {
  const schema = {
    string: () => ({
      describe() {
        return this;
      },
      optional() {
        return this;
      },
    }),
    array: () => ({
      describe() {
        return this;
      },
      optional() {
        return this;
      },
    }),
  };

  return {
    tool: Object.assign((definition: unknown) => definition, { schema }),
    toolSchema: schema,
    schema,
  };
});

const tools = await import("../tools/requirements");
const { find, list_open_features, list_open_stories, list_open_tasks } = tools;

type ToolContext = {
  worktree: string;
};

async function makeFile(filePath: string, content: string): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content);
}

async function setupFixture(): Promise<{ root: string; context: ToolContext } > {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "requirements-tools-"));
  const requirementsDir = path.join(root, "requirements");

  await makeFile(
    path.join(requirementsDir, "alpha", "feature.md"),
    "- Status: plan\n",
  );
  await makeFile(
    path.join(requirementsDir, "beta", "story.md"),
    "- Status: execution\n",
  );
  await makeFile(
    path.join(requirementsDir, "beta", "tasks", "TASK-123.md"),
    "- Status: done\n",
  );
  await makeFile(
    path.join(requirementsDir, "gamma", "tasks", "TASK-456.md"),
    "- Status: execution\n",
  );
  await makeFile(
    path.join(requirementsDir, "delta", "tasks", "notes.md"),
    "- Status: plan\n",
  );
  await makeFile(
    path.join(requirementsDir, "epsilon", "story.md"),
    "- Status: done\n",
  );

  return { root, context: { worktree: root } };
}

test("requirements_find matches terms and sorts", async () => {
  const { root, context } = await setupFixture();
  const output = await find.execute(
    { terms: ["beta"] },
    context,
  );

  const expected = [
    "requirements/beta/story.md",
    "requirements/beta/tasks/TASK-123.md",
  ].join("\n");

  assert.equal(output, expected);
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_open_features returns open features", async () => {
  const { root, context } = await setupFixture();
  const output = await list_open_features.execute({}, context);
  assert.equal(output, "requirements/alpha/feature.md");
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_open_stories returns open stories", async () => {
  const { root, context } = await setupFixture();
  const output = await list_open_stories.execute({}, context);
  assert.equal(output, "requirements/beta/story.md");
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_open_tasks returns open tasks", async () => {
  const { root, context } = await setupFixture();
  const output = await list_open_tasks.execute({}, context);
  assert.equal(output, "requirements/gamma/tasks/TASK-456.md");
  await fs.rm(root, { recursive: true, force: true });
});
