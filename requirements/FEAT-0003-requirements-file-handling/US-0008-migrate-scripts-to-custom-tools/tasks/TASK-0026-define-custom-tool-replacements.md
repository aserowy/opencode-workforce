# Task: Define custom tool replacements for requirements scripts

- ID: TASK-0026
- Status: done

## Description
Define the custom tool equivalents for list-open-features, list-open-stories, list-open-tasks, and find-requirements per opencode.ai custom tools guidance.

## Scope
- Review https://opencode.ai/docs/custom-tools for requirements and conventions.
- Specify tool names, descriptions, inputs, and expected outputs that replace each script.
- Map each existing script behavior to its custom tool counterpart.

## Acceptance Criteria
- Each script has a defined custom tool replacement with name, purpose, inputs, and outputs.
- The replacement definitions align with opencode.ai custom tool requirements.
- Any gaps or assumptions are captured for confirmation.

## Custom Tool Definitions
All tools are TypeScript-based custom tools located under tools/ and installed via install.sh to ~/.config/opencode/tools per opencode.ai custom tools guidance.

### tools/list-open-features.ts
- Purpose: list open feature artifacts under requirements/.
- Inputs: none.
- Output: newline-delimited relative paths to feature.md files with status plan or execution (lexicographic order).
- Maps from: scripts/list-open-features.

### tools/list-open-stories.ts
- Purpose: list open user story artifacts under requirements/.
- Inputs: none.
- Output: newline-delimited relative paths to story.md files with status plan or execution (lexicographic order).
- Maps from: scripts/list-open-stories.

### tools/list-open-tasks.ts
- Purpose: list open task artifacts under requirements/.
- Inputs: none.
- Output: newline-delimited relative paths to tasks/TASK-*.md files with status plan or execution (lexicographic order).
- Maps from: scripts/list-open-tasks.

### tools/find-requirements.ts
- Purpose: find requirement artifacts by path terms under requirements/.
- Inputs: optional search terms (one or more).
- Output: newline-delimited relative paths to matching feature.md, story.md, and tasks/TASK-*.md files; if no terms provided, return all requirement paths (lexicographic order).
- Matching: case-insensitive path contains all terms.
- Maps from: scripts/find-requirements.

## Notes / Assumptions
- Tool location: new tools/ directory in repo; installer syncs to ~/.config/opencode/tools.
- Tool behavior mirrors prior script behavior exactly; only invocation path changes from scripts/ to tools/.
