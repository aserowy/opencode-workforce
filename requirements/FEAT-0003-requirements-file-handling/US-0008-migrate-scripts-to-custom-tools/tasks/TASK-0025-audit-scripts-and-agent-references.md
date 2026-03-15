# Task: Audit scripts usage and agent references

- ID: TASK-0025
- Status: done

## Description
Inventory where the current requirements helper scripts are defined and referenced, including agents, docs, and install-related guidance, to scope the migration to custom tools.

## Scope
- Review scripts/ implementations for list-open-features, list-open-stories, list-open-tasks, and find-requirements.
- Identify every agent/guidance file that references the scripts (agents/, docs, commands, etc.).
- Capture any install.sh references to scripts/ or instructions about scripts.

## Acceptance Criteria
- A complete list of script files and their behaviors is captured.
- All references to the scripts across agents/guidance/install documentation are enumerated with file paths and sections.
- Any ambiguous or duplicate references are noted for resolution.

## Findings
- Script files: scripts/list-open-features, scripts/list-open-stories, scripts/list-open-tasks, scripts/find-requirements.
- Script behavior references: requirements/FEAT-0003-requirements-file-handling/feature.md (Scope/Acceptance Criteria), TASK-0015 (open listing behavior), TASK-0016 (find-requirements behavior).
- Agent references to scripts:
  - agents/orchestrator.md (Responsibilities section).
  - agents/implementor.md (Responsibilities section).
  - agents/planner.md (Responsibilities section).
  - agents/requestor.md (Responsibilities section).
- Install guidance: install.sh sync_dir currently includes scripts/ directory and summary line for Scripts.
- Legacy story references: US-0006 (story/tasks) and US-0005 (story/tasks) mention scripts; to be updated if migration requires docs alignment.
- Tool format: custom tools expected as TypeScript files under tools/.
