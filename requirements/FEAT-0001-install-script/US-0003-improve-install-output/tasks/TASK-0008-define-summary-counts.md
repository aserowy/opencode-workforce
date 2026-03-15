# Task: Define summary counts and reporting rules

- ID: TASK-0008
- Status: done

## Description
Specify how install.sh should compute and report end-of-run summary counts for created, updated, and skipped items, including what qualifies for each category.

## Scope
- Define the item categories to count (agents, skills, commands, base config).
- Establish the rules for classifying actions as created, updated, or skipped.
- Determine whether counts are per-file, per-item directory, or per-category.
- Identify any edge cases (e.g., unchanged files, pre-existing directories).

## Acceptance Criteria
- Counting rules are explicit and unambiguous.
- Created/updated/skipped definitions cover all item categories in scope.
- Decisions are compatible with POSIX sh implementation constraints.
