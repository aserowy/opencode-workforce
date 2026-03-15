# Task: Plan install.sh updates for custom tools

- ID: TASK-0027
- Status: done

## Description
Define how install.sh should install or configure the custom tools that replace the scripts, including any file placement, configuration, or sync steps.

## Scope
- Determine where custom tool definitions will live and how install.sh should deploy them.
- Specify any changes to install outputs/logging to reflect custom tool setup.
- Note migration steps for deprecating scripts/ handling (if applicable).

## Acceptance Criteria
- install.sh update requirements are clearly defined for custom tool support.
- The plan covers initial install and re-install idempotency expectations.
- Any dependencies on tool definitions or file locations are documented.

## Plan
- Add tools/ directory sync to install.sh using existing sync_dir helper.
- Track created/updated/skipped counts for tools in summary output.
- Keep install behavior idempotent (sync_dir diff/cmp logic unchanged).
- Deprecate scripts/ handling from install flow (remove scripts sync and summary).

## Dependencies
- tools/ directory exists in repo with custom tool scripts (list-open-*, find-requirements).
- Destination path: ~/.config/opencode/tools.
