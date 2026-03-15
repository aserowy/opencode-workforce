# Task: Define open-listing scripts behavior

- ID: TASK-0015
- Status: done

## Description
Specify expected behavior and output for list-open-features, list-open-stories, and list-open-tasks scripts under scripts/.

## Script Behavior
### Common Rules
- Scripts are located under `scripts/` and are executable shell scripts.
- Each script scans the `requirements/` directory.
- Artifacts are considered **open** when `- Status:` is `plan` or `execution` (case-sensitive).
- Output is newline-delimited paths, relative to repository root.
- Ordering is lexicographic (alphabetical) by output path.
- No arguments are required; the scripts run with defaults.

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
Example (abbreviated) output for `list-open-features`:
```
requirements/FEAT-0003-requirements-file-handling/feature.md
```

Example (abbreviated) output for `list-open-stories`:
```
requirements/FEAT-0003-requirements-file-handling/US-0005-document-requirements-file-handling/story.md
```

Example (abbreviated) output for `list-open-tasks`:
```
requirements/FEAT-0003-requirements-file-handling/US-0005-document-requirements-file-handling/tasks/TASK-0014-document-id-generation-rules.md
requirements/FEAT-0003-requirements-file-handling/US-0005-document-requirements-file-handling/tasks/TASK-0015-define-open-listing-scripts-behavior.md
requirements/FEAT-0003-requirements-file-handling/US-0005-document-requirements-file-handling/tasks/TASK-0016-define-find-requirements-script-behavior.md
```

## Scope
- Define how each script filters artifacts by status (plan or execution only).
- Document the expected output format and ordering for each script.
- Note any required inputs, arguments, or environment assumptions.
- Provide examples of script output using existing requirements paths.

## Acceptance Criteria
- Each list-open-* script has documented filtering rules.
- Output format and ordering expectations are explicitly stated.
- Examples demonstrate that only plan/execution artifacts are included.
