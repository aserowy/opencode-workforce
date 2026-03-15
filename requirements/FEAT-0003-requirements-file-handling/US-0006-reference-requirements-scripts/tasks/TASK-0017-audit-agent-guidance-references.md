# Task: Audit agent guidance for requirements discovery references

- ID: TASK-0017
- Status: done

## Description
Identify which agent guidance documents should reference the requirements discovery scripts (list-open-features, list-open-stories, list-open-tasks, find-requirements) and capture the specific updates needed per file.

## Scope
- Review agent guidance files (e.g., under `agents/` and any general guidance docs).
- Map each guidance file to the script references it should include.
- Note any missing or outdated discovery instructions.

## Acceptance Criteria
- A list of target guidance files is produced with the required script references per file.
- Any ambiguities about where to place guidance are documented for resolution.
- The audit output is sufficient to drive content updates without re-scoping.

## Audit Output
- agents/orchestrator.md
  - Add references to scripts/list-open-features, list-open-stories, list-open-tasks, and find-requirements in Responsibilities.
- agents/requestor.md
  - Add references to scripts/list-open-features, list-open-stories, list-open-tasks, and find-requirements in Responsibilities.
- agents/planner.md
  - Add references to scripts/list-open-features, list-open-stories, list-open-tasks, and find-requirements in Responsibilities.
- agents/implementor.md
  - Add references to scripts/list-open-features, list-open-stories, list-open-tasks, and find-requirements in Responsibilities.

No placement ambiguities found; Responsibilities sections are appropriate for discovery guidance.
