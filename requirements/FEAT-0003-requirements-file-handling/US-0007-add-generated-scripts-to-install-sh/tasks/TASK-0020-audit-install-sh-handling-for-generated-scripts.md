# Task: Audit install.sh handling for scripts directory

- ID: TASK-0020
- Status: done

## Description
Review install.sh and related install flow to identify current handling (or lack) of the scripts/ directory, including any copy/sync steps, directory creation, or exclusions that affect installation.

## Scope
- Inspect install.sh logic for syncing or copying scripts/ and any ignore rules.
- Identify where scripts/ should be inserted in the install flow.
- Capture relevant assumptions or constraints from existing install behavior.

## Acceptance Criteria
- Current install.sh handling for scripts/ is documented in this task output.
- Any gaps or missing steps for scripts/ are noted with referenced install sections.

## Findings
- install.sh currently installs only three top-level directories: agents/, skills/, and commands/.
  - See install flow in install.sh: the sync calls are in the final install section (log_section "==> Installing opencode configuration" then sync_dir for agents, skills, commands).
- The sync_dir helper creates the destination subdirectory under $dest_root, and copies each item from the source directory into the destination, using diff/cmp to determine created/updated/skipped status.
- There is no existing handling for a scripts/ directory; no sync call or directory creation references scripts/.

## Gaps / Missing Steps
- No sync_dir call exists for scripts/; installation currently omits it entirely.
