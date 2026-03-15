# Task: Define validation steps for custom tool migration

- ID: TASK-0028
- Status: done

## Description
Specify validation steps to confirm custom tools replace the scripts in agent guidance and install flow, and that requirements discovery still works as intended.

## Scope
- Map story acceptance criteria to validation checks.
- Define checks for agent references pointing to custom tools.
- Define checks for install.sh configuring custom tools correctly.

## Acceptance Criteria
- Validation steps cover each acceptance criterion in the story.
- Checks are actionable without implementing the tools.
- Any open questions are explicitly listed.

## Validation Steps
1. Tools replacement present:
   - Verify tools/list-open-features.ts, tools/list-open-stories.ts, tools/list-open-tasks.ts, tools/find-requirements.ts exist.
   - Confirm tool behavior matches documented script behavior (status filtering, output format, lexicographic ordering).
2. Agent guidance updated:
   - Check agents/orchestrator.md, agents/implementor.md, agents/planner.md, agents/requestor.md reference tools/* instead of scripts/*.
3. Install flow updated:
   - Inspect install.sh to confirm tools/ is synced and scripts/ is no longer synced.
   - Confirm summary output includes tools counters.
4. Requirements discovery still works:
   - Run tools/list-open-features.ts, tools/list-open-stories.ts, tools/list-open-tasks.ts and confirm output lists plan/execution artifacts.
   - Run tools/find-requirements.ts with and without search terms and confirm expected paths are returned.

## Open Questions
- None.
