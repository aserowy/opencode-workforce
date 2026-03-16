# opencode-workforce

## Motivation

Agentic code generation is powerful but opaque. This repo makes the workflow transparent by encoding every phase into explicit, reviewable artifacts. The result is an auditable trail of decisions (requirements, plan, and implementation) that is easy to review, hand off, and validate.

## Phases

The workflow is intentionally phase-driven:

- Requirements: capture features and user stories as structured artifacts.
- Planning: expand a selected story into implementor tasks and quality gates.
- Implementation: execute tasks, update statuses, and deliver code changes.

Statuses flow through: `plan` -> `execution` -> `done`. Phase transitions are gated by explicit approvals to keep the workflow deterministic and reviewable.

## Workflow (Generated Artifacts)

Every phase produces artifacts under `requirements/`:

- Requirements: `feature.md` and `story.md` for each feature and user story.
- Planning: `tasks/TASK-*.md` plus a `tasks/quality-gate.md` per story.
- Implementation: status updates in the same artifacts, plus code changes.

These files are the source of truth. Tooling reads them to identify open work, track status, and ensure work stays scoped. The artifacts are designed for transparency: each step can be reviewed without reconstructing context from chat logs.

## Structure

- `agents/`: orchestrator and subagent definitions (requestor, planner, implementor).
- `skills/`: templates and validation rules for user stories and tasks.
- `tools/`: helper tools for listing and locating requirement artifacts.
- `requirements/`: generated artifacts for features, stories, and tasks.
- `tests/`: automated tests for repo tooling.

## Quickstart

1. Clone the repo.
2. Run `install.sh`.
3. Start the `orchestrator` agent to drive the workflow.
