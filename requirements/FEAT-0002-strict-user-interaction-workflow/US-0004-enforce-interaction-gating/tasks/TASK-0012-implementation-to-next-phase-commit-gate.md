# Task: Define Implementation-to-next-phase commit gate

- ID: TASK-0012
- Status: done

## Description
Define the required commit sequencing and approval gate when transitioning from Implementation to the next phase.

## Scope
- Specify that an Implementation commit must be generated before requesting approval to proceed.
- Define the sequence of steps (commit creation, approval request, transition).
- Document any metadata or confirmation language tied to this gate.

## Acceptance Criteria
- The sequence explicitly places the Implementation commit before the approval request.
- The approval request language is specified for this transition.
- The transition rules are documented without ambiguity.

## Implementation Notes
- Sequence:
  1. Complete Implementation artifacts.
  2. Create Implementation commit.
  3. Ask approval: "should i proceed with step [next step name]".
  4. Transition only after explicit approval.
- Approval must be requested once per transition; repeat only on rejection or invalidation.
