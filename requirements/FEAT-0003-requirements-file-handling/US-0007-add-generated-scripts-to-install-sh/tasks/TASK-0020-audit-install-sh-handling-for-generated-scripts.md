# Task: Audit install.sh handling for tools directory

- ID: TASK-0020
- Status: done

## Description
Review install.sh and related install flow to identify current handling (or lack) of the tools/ directory, including any copy/sync steps, directory creation, or exclusions that affect installation.

## Scope
- Inspect install.sh logic for syncing or copying tools/ and any ignore rules.
- Identify where tools/ should be inserted in the install flow.
- Capture relevant assumptions or constraints from existing install behavior.

## Acceptance Criteria
- Current install.sh handling for tools/ is documented in this task output.
- Any gaps or missing steps for tools/ are noted with referenced install sections.

## Findings
- install.sh currently installs the top-level directories: agents/, skills/, commands/, and tools/.
  - See install flow in install.sh: the sync calls are in the final install section (log_section "==> Installing opencode configuration" then sync_dir for agents, skills, commands, tools).
- The sync_dir helper creates the destination subdirectory under $dest_root, and copies each item from the source directory into the destination, using diff/cmp to determine created/updated/skipped status.
- The install flow includes tools/ via a sync_dir call; tools/ is present in the summary.

## Gaps / Missing Steps
- No gaps identified for tools/ handling.
