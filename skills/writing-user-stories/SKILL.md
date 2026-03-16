---
name: writing-user-stories
description: Writes and validates user stories using the INVEST method. Use when drafting or reviewing user stories for clarity, testability, and scope.
---

# Writing User Stories (INVEST)

## Use When

- Drafting new user stories
- Reviewing or refining existing user stories
- Ensuring stories meet INVEST and have testable acceptance criteria

## Required Template

Use this exact structure:

```md
# User Story: <Short Title>

## Metadata

- ID: US-####
- Status: plan
- Feature: FEAT-####
- As a: <role>

## Capability

I want: <capability>

## Benefit

So that: <benefit>

## Acceptance Criteria

- Given <context>
- When <action>
- Then <outcome>
```

## INVEST Checklist

Validate each user story against all criteria below. If any fail, revise and re-check.

- Independent: Can be delivered without relying on other unfinished stories.
- Negotiable: States intent, not an over-specified solution.
- Valuable: Provides clear value to a user or stakeholder.
- Estimable: Small enough and clear enough to estimate.
- Small: Fits within the team's preferred task size and scope.
- Testable: Has concrete acceptance criteria that can be verified.

## Validation Workflow

1. Draft the story using the required template.
2. Check each INVEST criterion and note any failures.
3. Revise the story until all INVEST checks pass.
4. Confirm acceptance criteria are concrete and testable.
5. Finalize the story.

## Examples

### Good

```md
# User Story: Filter User Stories By Status

## Metadata

- ID: US-0002
- Status: plan
- Feature: FEAT-0001
- As a: requirements engineer

## Capability

I want: to filter user stories by status

## Benefit

So that: I can quickly find items ready for planning

## Acceptance Criteria

- Given multiple user stories with different statuses
- When I filter by status "plan"
- Then only user stories with status "plan" are shown
```

### Bad

```md
# User Story: Improve Workflow

## Metadata

- ID: US-0003
- Status: plan
- Feature: FEAT-0001
- As a: user

## Capability

I want: better workflows

## Benefit

So that: things are easier

## Acceptance Criteria

- Given a workflow
- When I use it
- Then it is better
```
