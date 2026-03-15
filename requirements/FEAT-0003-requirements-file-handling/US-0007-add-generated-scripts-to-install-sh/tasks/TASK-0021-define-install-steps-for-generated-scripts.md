# Task: Define install steps for tools directory

- ID: TASK-0021
- Status: done

## Description
Specify the required install.sh behavior to include the tools/ directory during installation and re-installation, aligned with the user story acceptance criteria.

## Scope
- Define where in the install sequence tools/ should be installed.
- Specify copy/sync behavior (e.g., create directory, overwrite rules) and idempotency expectations.
- Identify any outputs or logging needed to confirm inclusion during install.

## Acceptance Criteria
- The install steps for tools/ are explicitly described and sequenced.
- Idempotent behavior for repeated installs is defined.
- The steps align with the story acceptance criteria.

## Defined Install Steps
1. After prepare_config_root and before the summary section, add a sync_dir invocation for tools/.
   - Source: "$repo_root/tools".
   - Destination: "$dest_root/tools".
   - Label: "tools" for logging consistency.
2. The sync_dir helper should be reused (no new logic) so behavior matches agents/skills/commands/tools.
   - This ensures directory creation when absent.
   - Each item is copied or updated when content differs; identical items are skipped.

## Idempotency Expectations
- Re-running install.sh should keep the tools/ directory synchronized without manual intervention.
- The existing diff/cmp logic in sync_dir must treat identical files as skipped; updated files are recopied.
- If the source directory does not exist, log a skip message and continue without failing (current sync_dir behavior).

## Logging/Verification
- Use the existing "Syncing <label>" info log to indicate tools/ are processed.
- The summary should include created/updated/skipped counts for tools/ (new counters aligned with other sections).

## Open Questions
- None.
