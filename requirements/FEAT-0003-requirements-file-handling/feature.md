# Feature: Requirements ID Rules and Requirements Scripts
- ID: FEAT-0003
- Status: done

## Description
Define requirements ID generation rules (sequential by artifact type) and specify lightweight shell scripts under scripts/ to list open requirements artifacts and find requirements files.

## Scope
- Document ID generation rules for FEAT, US, and TASK artifacts, including sequential numbering by type.
- Define how scripts/ list-open-features, list-open-stories, list-open-tasks, and find-requirements should behave and what they output.
- Capture expectations for script inputs (if any) and required outputs to support requirements discovery and status review.

## Out of Scope
- Implementing additional automation beyond the specified shell scripts.
- Changing existing requirements IDs, slugs, or directory structures.
- Editing non-requirements documentation unrelated to ID rules or scripts behavior.

## Assumptions
- Existing requirements artifacts remain the source of truth for current IDs and paths.
- Shell scripts will rely on the documented structure under requirements/.

## Acceptance Criteria
- Given a requirement to create a new FEAT, US, or TASK
  - When the ID rules are applied
  - Then the next sequential ID for that artifact type is used
- Given the requirements/ directory
  - When a reader reviews the documentation
  - Then they can describe the expected output for list-open-features, list-open-stories, list-open-tasks, and find-requirements
- Given requirements artifacts with statuses
  - When the scripts are run
  - Then they list only artifacts in plan or execution status for the respective artifact type
