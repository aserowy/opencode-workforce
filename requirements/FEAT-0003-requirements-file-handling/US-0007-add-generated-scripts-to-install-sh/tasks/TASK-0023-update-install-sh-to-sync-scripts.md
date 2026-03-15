# Task: Update install.sh to sync tools into config root

- ID: TASK-0023
- Status: done

## Description
Implement the install.sh change to include the tools/ directory in the installation flow so it is copied into the config root (~/.config/opencode).

## Scope
- Add a sync_dir invocation for tools/ aligned with the defined install steps.
- Ensure tools are copied to $dest_root/tools (expected ~/.config/opencode/tools).
- Include tools in install output/logging and summary counts consistent with other synced directories.

## Acceptance Criteria
- install.sh installs tools/ into $dest_root/tools in a fresh install.
- Re-running install.sh keeps tools/ synchronized without manual steps.
- Logging reflects tools/ processing in the same format as other synced directories.

## Dependencies
- TASK-0021
