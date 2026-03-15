# Task: Verify tools are installed into ~/.config/opencode

- ID: TASK-0024
- Status: done

## Description
Validate that the updated install.sh places tools/ under ~/.config/opencode and behaves idempotently on repeated runs.

## Scope
- Run or describe verification of a fresh install outcome for tools/ in ~/.config/opencode/tools.
- Confirm repeated installs do not require manual intervention and do not relocate tools elsewhere.

## Acceptance Criteria
- Verification confirms tools/ exist under ~/.config/opencode/tools after install.
- Re-running install.sh shows tools/ sync behavior consistent with other directories (created/updated/skipped as appropriate).

## Dependencies
- TASK-0023
