# Task: Update install.sh to sync scripts into config root

- ID: TASK-0023
- Status: done

## Description
Implement the install.sh change to include the scripts/ directory in the installation flow so it is copied into the config root (~/.config/opencode).

## Scope
- Add a sync_dir invocation for scripts/ aligned with the defined install steps.
- Ensure scripts are copied to $dest_root/scripts (expected ~/.config/opencode/scripts).
- Include scripts in install output/logging and summary counts consistent with other synced directories.

## Acceptance Criteria
- install.sh installs scripts/ into $dest_root/scripts in a fresh install.
- Re-running install.sh keeps scripts/ synchronized without manual steps.
- Logging reflects scripts/ processing in the same format as other synced directories.

## Dependencies
- TASK-0021
