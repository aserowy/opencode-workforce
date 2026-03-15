# Task: Prevent duplicate approval prompts

- ID: TASK-0013
- Status: done

## Description
Define the rule that prevents requesting approval more than once for the same phase transition after the user has already approved it.

## Scope
- Specify how the system records an approval for a specific transition.
- Define the condition that suppresses repeat approval requests.
- Include examples of correct behavior across consecutive steps.

## Acceptance Criteria
- Approval state recording is clearly defined.
- Repeat approval requests for the same transition are explicitly disallowed.
- Examples demonstrate the non-duplication behavior.

## Implementation Notes
- Record approvals keyed by transition (from_phase -> to_phase).
- Suppress approval prompts when an approval exists and has not been rejected.
- Only re-ask if the user rejected the prior approval or changes invalidate it.
- Example:
  - Approved Requirements -> Implementation, then start Implementation without re-asking.
