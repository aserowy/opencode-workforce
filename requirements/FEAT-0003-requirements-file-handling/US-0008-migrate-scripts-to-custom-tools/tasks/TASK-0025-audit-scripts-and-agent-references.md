# Task: Audit scripts usage and agent references

- ID: TASK-0025
- Status: plan

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
