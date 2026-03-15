# Task: Define open-listing tools behavior

- ID: TASK-0015
- Status: done

## Description
Specify expected behavior and output for list-open-features, list-open-stories, and list-open-tasks tools under tools/.

## Tool Behavior
### Common Rules
- Tools are located under `tools/` and are executable custom tools.
- Each tool scans the `requirements/` directory.
- Artifacts are considered **open** when `- Status:` is `plan` or `execution` (case-sensitive).
- Output is newline-delimited paths, relative to repository root.
- Ordering is lexicographic (alphabetical) by output path.
- No arguments are required; the tools run with defaults.

### list-open-features
- Finds `requirements/**/feature.md` files.
- Includes only features whose `feature.md` contains `- Status: plan` or `- Status: execution`.
- Outputs the path to each matching `feature.md` file.

### list-open-stories
- Finds `requirements/**/story.md` files.
- Includes only stories whose `story.md` contains `- Status: plan` or `- Status: execution`.
- Outputs the path to each matching `story.md` file.

### list-open-tasks
- Finds `requirements/**/tasks/TASK-*.md` files.
- Includes only tasks whose file contains `- Status: plan` or `- Status: execution`.
- Outputs the path to each matching task file.

## Examples
Example (abbreviated) output for `tools/list-open-features.ts`:
```
requirements/FEAT-0003-requirements-file-handling/feature.md
```

Example (abbreviated) output for `tools/list-open-stories.ts`:
```
requirements/FEAT-0003-requirements-file-handling/US-0005-document-requirements-file-handling/story.md
```

Example (abbreviated) output for `tools/list-open-tasks.ts`:
```
requirements/FEAT-0003-requirements-file-handling/US-0005-document-requirements-file-handling/tasks/TASK-0014-document-id-generation-rules.md
```

## Scope
- Define how each tool filters artifacts by status (plan or execution only).
- Document the expected output format and ordering for each tool.
- Note any required inputs, arguments, or environment assumptions.
- Provide examples of tool output using existing requirements paths.

## Acceptance Criteria
- Each list-open-* tool has documented filtering rules.
- Output format and ordering expectations are explicitly stated.
- Examples demonstrate that only plan/execution artifacts are included.
