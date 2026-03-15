# Task: Define clarification gate for ambiguous input

- ID: TASK-0010
- Status: done

## Description
Specify the clarification gating rules that determine when the system must pause and ask questions before any phase progression or action.

## Scope
- Define what qualifies as ambiguous or incomplete input for this workflow.
- Describe the clarification question format and required user response signals.
- Specify that no phase progression or action occurs until clarification is resolved.
- Capture example scenarios that trigger the gate.

## Acceptance Criteria
- Ambiguity/incompleteness criteria are explicitly documented.
- Clarification prompt rules are defined with examples.
- The gate explicitly blocks phase progression and actions until clarified.

## Implementation Notes
- Ambiguity includes missing desired outcome, missing required parameters, conflicting instructions, or unclear scope/phase.
- Clarification questions must be asked with the question tool and block routing, tool usage, and artifact changes until resolved.
- Clarification responses must resolve missing details and confirm the intended outcome.
- Example triggers:
  - "Update the workflow" (missing scope and target file).
  - "Proceed to implementation" when requirements tasks are not completed.
  - Conflicting steps like "skip approval but ask for approval".
