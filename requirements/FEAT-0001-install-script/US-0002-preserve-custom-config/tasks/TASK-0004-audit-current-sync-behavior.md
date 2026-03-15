# Task: Audit current install sync behavior for deletions

- ID: TASK-0004
- Status: plan

## Description
Review the existing install.sh expectations and any documented behavior to identify where deletions or cleanups might occur, then capture required adjustments to preserve all user-created items.

## Scope
- Locate any stated or implied deletion/cleanup steps in install.sh requirements or related documentation.
- Identify impacted paths (agents/, skills/, commands/ under ~/.config/opencode).
- Document the precise behavior change: no deletion of items not present in the repo.

## Acceptance Criteria
- A concise summary lists any existing delete/cleanup assumptions and the updated non-deletion rule.
- Impacted paths are enumerated for follow-on design work.
