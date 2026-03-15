# Planning Quality Gate: Conflict Prevention

## Purpose

Ensure tasks for a user story do not conflict or overlap in a way that creates ambiguity or duplicated effort.

## Conflict Checks

- Overlapping scope: two tasks claim the same change area or outcome.
- Dependency inversion: a task requires an output that is only produced by a later task.
- Circular dependency: tasks depend on each other with no clear start.
- Contradictory outcomes: tasks prescribe mutually exclusive behaviors.

## Resolution Rules

- Split ambiguous tasks into clearer, smaller tasks.
- Reorder tasks to make dependencies explicit.
- Merge tasks that are inseparable without losing clarity.
- If conflict remains, ask the user which task should be prioritized or revised.
