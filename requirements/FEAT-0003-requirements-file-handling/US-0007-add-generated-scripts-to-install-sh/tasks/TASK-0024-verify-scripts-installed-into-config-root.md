# Task: Verify scripts are installed into ~/.config/opencode

- ID: TASK-0024
- Status: done

## Description
Validate that the updated install.sh places scripts/ under ~/.config/opencode and behaves idempotently on repeated runs.

## Scope
- Run or describe verification of a fresh install outcome for scripts/ in ~/.config/opencode/scripts.
- Confirm repeated installs do not require manual intervention and do not relocate scripts elsewhere.

## Acceptance Criteria
- Verification confirms scripts/ exist under ~/.config/opencode/scripts after install.
- Re-running install.sh shows scripts/ sync behavior consistent with other directories (created/updated/skipped as appropriate).

## Dependencies
- TASK-0023
