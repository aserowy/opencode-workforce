# Task: Specify copy/synchronization behavior

- ID: TASK-0002
- Status: plan

## Description
Define how install.sh synchronizes repository content to ~/.config/opencode, including handling of updates, removals, and idempotency verification.

## Scope
- Specify expected copy/sync semantics (e.g., mirror repository state).
- Clarify handling of files removed from the repo (if applicable).
- Define success criteria for idempotent re-runs.
- Note any file permissions or executable bit expectations.

## Acceptance Criteria
- Synchronization rules are explicit and do not conflict with Task 0001 requirements.
- Idempotency is described with observable outcomes.
- Any removal or preservation rules are documented.
