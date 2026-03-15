# Task: Map major install steps to progress messages

- ID: TASK-0007
- Status: plan

## Description
Identify each major action performed by install.sh and define the short, readable progress message that should be printed for that step, aligned with POSIX sh output constraints.

## Scope
- Enumerate major install actions (e.g., create base config, sync agents, sync skills, sync commands, finalize).
- Define one concise progress message per major action.
- Specify consistent prefix or labeling convention for progress messages.
- Note any ordering dependencies between messages.

## Acceptance Criteria
- Every major install action has a defined progress message.
- Message phrasing is short, human-readable, and usable in plain text.
- A consistent prefix/format is specified for all progress lines.
