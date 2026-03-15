# Task: Document requirements ID generation rules

- ID: TASK-0014
- Status: done

## Description
Document the rules for generating sequential IDs for FEAT, US, and TASK artifacts, including how to determine the next available ID per artifact type.

## ID Format
- Feature IDs use the format `FEAT-####` (four digits, zero-padded).
- User story IDs use the format `US-####` (four digits, zero-padded).
- Task IDs use the format `TASK-####` (four digits, zero-padded).

## Next ID Selection Rules
- IDs are sequential **per artifact type** (FEAT, US, TASK) and do not share a global counter.
- Determine the next ID by finding the highest existing ID of that type in the `requirements/` tree and incrementing by one.
- Existing IDs are sourced from directory and file names (e.g., `requirements/FEAT-0003-...`, `US-0005-...`, `TASK-0014-...`).
- Always reserve the next number for the artifact type being created, even if other types have higher numbers.

## Slug Rules
- Slugs are lowercase, hyphen-separated, short descriptions of the artifact.
- Feature directories use `requirements/FEAT-####-<feature-slug>/feature.md`.
- Story directories use `requirements/FEAT-####-<feature-slug>/US-####-<story-slug>/story.md`.
- Task files use `requirements/FEAT-####-<feature-slug>/US-####-<story-slug>/tasks/TASK-####-<task-slug>.md`.
- Slugs should be stable and descriptive; do not reuse existing slugs with a different ID.

## Examples
- New feature: highest existing feature is `FEAT-0003`, so the next is `FEAT-0004`.
- New story: highest existing story is `US-0005`, so the next is `US-0006`.
- New task: highest existing task is `TASK-0016`, so the next is `TASK-0017`.

## Scope
- Specify the numbering scheme format for FEAT-####, US-####, and TASK-#### IDs.
- Define how to identify the highest existing ID for each artifact type.
- Clarify how slugs are derived for directories and files alongside IDs.
- Provide examples of selecting the next sequential ID.

## Acceptance Criteria
- The ID format for each artifact type is explicitly described.
- Rules explain how to find the next sequential ID per type.
- Examples show a correct ID choice for FEAT, US, and TASK artifacts.
