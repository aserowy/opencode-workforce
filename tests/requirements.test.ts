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
const { find, list_open_features, list_open_stories, list_open_tasks, list_story_tasks } = tools;

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

  await makeFile(
    path.join(
      requirementsDir,
      "FEAT-0002-checkout",
      "US-0003-payment-retry",
      "tasks",
      "TASK-0001-log-failures.md",
    ),
    "- Status: plan\n",
  );
  await makeFile(
    path.join(
      requirementsDir,
      "FEAT-0002-checkout",
      "US-0003-payment-retry",
      "tasks",
      "TASK-0002-notify-user.md",
    ),
    "- Status: done\n",
  );
  await makeFile(
    path.join(
      requirementsDir,
      "FEAT-0002-checkout",
      "US-0003-payment-retry",
      "tasks",
      "TASK-0003-queue-retry.md",
    ),
    "- Status: execution\n",
  );

  return { root, context: { worktree: root } };
}

async function setupEmptyFixture(): Promise<{ root: string; context: ToolContext } > {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "requirements-tools-empty-"));
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
  const expected = [
    "requirements/FEAT-0002-checkout/US-0003-payment-retry/tasks/TASK-0001-log-failures.md",
    "requirements/FEAT-0002-checkout/US-0003-payment-retry/tasks/TASK-0003-queue-retry.md",
    "requirements/gamma/tasks/TASK-456.md",
  ].join("\n");
  assert.equal(output, expected);
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_story_tasks lists tasks regardless of status", async () => {
  const { root, context } = await setupFixture();
  const output = await list_story_tasks.execute(
    { feature_id: "0002", story_id: "0003" },
    context,
  );

  const expected = [
    "requirements/FEAT-0002-checkout/US-0003-payment-retry/tasks/TASK-0001-log-failures.md",
    "requirements/FEAT-0002-checkout/US-0003-payment-retry/tasks/TASK-0002-notify-user.md",
    "requirements/FEAT-0002-checkout/US-0003-payment-retry/tasks/TASK-0003-queue-retry.md",
  ].join("\n");

  assert.equal(output, expected);
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_find returns all requirement files when no terms", async () => {
  const { root, context } = await setupFixture();
  const output = await find.execute({}, context);
  const expected = [
    "requirements/FEAT-0002-checkout/US-0003-payment-retry/tasks/TASK-0001-log-failures.md",
    "requirements/FEAT-0002-checkout/US-0003-payment-retry/tasks/TASK-0002-notify-user.md",
    "requirements/FEAT-0002-checkout/US-0003-payment-retry/tasks/TASK-0003-queue-retry.md",
    "requirements/alpha/feature.md",
    "requirements/beta/story.md",
    "requirements/beta/tasks/TASK-123.md",
    "requirements/epsilon/story.md",
    "requirements/gamma/tasks/TASK-456.md",
  ].join("\n");
  assert.equal(output, expected);
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_find returns empty when no matches", async () => {
  const { root, context } = await setupFixture();
  const output = await find.execute({ terms: ["nope"] }, context);
  assert.equal(output, "");
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_open_features returns empty when requirements missing", async () => {
  const { root, context } = await setupEmptyFixture();
  const output = await list_open_features.execute({}, context);
  assert.equal(output, "");
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_open_stories returns empty when requirements missing", async () => {
  const { root, context } = await setupEmptyFixture();
  const output = await list_open_stories.execute({}, context);
  assert.equal(output, "");
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_open_tasks returns empty when requirements missing", async () => {
  const { root, context } = await setupEmptyFixture();
  const output = await list_open_tasks.execute({}, context);
  assert.equal(output, "");
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_story_tasks returns empty when story missing", async () => {
  const { root, context } = await setupFixture();
  const output = await list_story_tasks.execute(
    { feature_id: "9999", story_id: "0001" },
    context,
  );
  assert.equal(output, "");
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_story_tasks returns empty when tasks directory missing", async () => {
  const { root, context } = await setupEmptyFixture();
  const requirementsDir = path.join(root, "requirements");
  await makeFile(
    path.join(
      requirementsDir,
      "FEAT-0009-metrics",
      "US-0001-overview",
      "story.md",
    ),
    "- Status: plan\n",
  );

  const output = await list_story_tasks.execute(
    { feature_id: "0009", story_id: "0001" },
    context,
  );
  assert.equal(output, "");
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_story_tasks ignores non-task files", async () => {
  const { root, context } = await setupEmptyFixture();
  const requirementsDir = path.join(root, "requirements");
  await makeFile(
    path.join(
      requirementsDir,
      "FEAT-0010-catalog",
      "US-0002-search",
      "tasks",
      "TASK-0005-update-index.md",
    ),
    "- Status: plan\n",
  );
  await makeFile(
    path.join(
      requirementsDir,
      "FEAT-0010-catalog",
      "US-0002-search",
      "tasks",
      "notes.md",
    ),
    "misc\n",
  );

  const output = await list_story_tasks.execute(
    { feature_id: "0010", story_id: "0002" },
    context,
  );
  assert.equal(
    output,
    "requirements/FEAT-0010-catalog/US-0002-search/tasks/TASK-0005-update-index.md",
  );
  await fs.rm(root, { recursive: true, force: true });
});

test("requirements_list_story_tasks accepts flexible feature and story ids", async () => {
  const { root, context } = await setupEmptyFixture();
  const requirementsDir = path.join(root, "requirements");
  await makeFile(
    path.join(
      requirementsDir,
      "FEAT-0010-catalog",
      "US-0002-search",
      "tasks",
      "TASK-0005-update-index.md",
    ),
    "- Status: plan\n",
  );

  const expected =
    "requirements/FEAT-0010-catalog/US-0002-search/tasks/TASK-0005-update-index.md";
  const featureIDs = [
    "FEAT-0010-catalog",
    "0010",
    "10",
    "0010-catalog",
  ];
  const storyIDs = [
    "US-0002-search",
    "0002",
    "2",
    "0002-catalog",
  ];

  for (const featureID of featureIDs) {
    for (const storyID of storyIDs) {
      const output = await list_story_tasks.execute(
        { feature_id: featureID, story_id: storyID },
        context,
      );
      assert.equal(output, expected);
    }
  }

  await fs.rm(root, { recursive: true, force: true });
});
