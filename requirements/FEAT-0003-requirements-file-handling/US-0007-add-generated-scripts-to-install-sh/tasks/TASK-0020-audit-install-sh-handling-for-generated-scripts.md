# Task: Audit install.sh handling for generated scripts directory

- ID: TASK-0020
- Status: plan

## Description
Review install.sh and related install flow to identify current handling (or lack) of the generated scripts/ directory, including any copy/sync steps, directory creation, or exclusions that affect installation.

## Scope
- Inspect install.sh logic for syncing or copying scripts/ and any ignore rules.
- Identify where generated scripts/ should be inserted in the install flow.
- Capture relevant assumptions or constraints from existing install behavior.

## Acceptance Criteria
- Current install.sh handling for scripts/ is documented in this task output.
- Any gaps or missing steps for generated scripts/ are noted with referenced install sections.
