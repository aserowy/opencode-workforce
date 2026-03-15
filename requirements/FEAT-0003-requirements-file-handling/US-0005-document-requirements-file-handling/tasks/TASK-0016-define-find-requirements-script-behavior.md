# Task: Define find-requirements tool behavior

- ID: TASK-0016
- Status: done

## Description
Document expected behavior and output for the find-requirements tool under tools/.

## Tool Behavior
### Inputs
- Optional arguments: one or more search terms.
- If no search terms are provided, the tool returns all requirements paths.

### Search Rules
- The tool searches within the `requirements/` directory.
- Paths are matched if they contain **all** provided search terms (case-insensitive) in the path string.
- Matching is applied to full relative paths (e.g., `requirements/FEAT-0003-.../US-0005-.../story.md`).

### Output
- Output is newline-delimited paths, relative to repository root.
- Ordering is lexicographic (alphabetical) by output path.
- Only requirement artifact files are returned: `feature.md`, `story.md`, and `tasks/TASK-*.md`.

## Examples
Find everything:
```
tools/find-requirements.ts
requirements/FEAT-0003-requirements-file-handling/feature.md
requirements/FEAT-0003-requirements-file-handling/US-0005-document-requirements-file-handling/story.md
requirements/FEAT-0003-requirements-file-handling/US-0005-document-requirements-file-handling/tasks/TASK-0014-document-id-generation-rules.md
```

Find paths matching "US-0005":
```
tools/find-requirements.ts US-0005
requirements/FEAT-0003-requirements-file-handling/US-0005-document-requirements-file-handling/story.md
requirements/FEAT-0003-requirements-file-handling/US-0005-document-requirements-file-handling/tasks/TASK-0014-document-id-generation-rules.md
```

## Scope
- Define supported inputs (if any), such as search terms or paths.
- Specify how the tool locates requirement artifacts under requirements/.
- Document output format, including path formatting and ordering rules.
- Provide examples of typical find-requirements usage and output.

## Acceptance Criteria
- Documented inputs and defaults for find-requirements.
- Output format and ordering rules are clear.
- Examples show correct paths returned for a search.
