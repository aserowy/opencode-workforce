---
name: writing-implementor-tasks
description: Writes and validates tasks for the implementor. Use when drafting or reviewing tasks for the implementation phase.
---

# Writing Tasks

## Use When

- Drafting an implementation plan
- Reviewing or refining existing tasks
- Ensuring stories meet the quality gate

## Context

- Write tasks as a Software Architect and a Senior Software Developer.
- Write tasks for a Junior Software Developer who needs clear guidance.

## Required Template

Use this exact structure:

```md
# Task: <Short Title>

## Metadata

- ID: TASK-####
- Status: plan
- Userstory: US-####

## Motivation

\<A brief explanation of why this task is important and what problem it solves.\>

## Relevant Acceptance Criteria

\<acceptance criteria\>

## Requirements

\<A clear list of what must be implemented. Be specific and unambiguous.\>

- \<requirement a\>
- \<requirement b\>
- ...

## Exclusions

\<A clear list of what must NOT be implemented or changed. This prevents drift, scope creep, and miscommunication.\>

- Do NOT \<exclusion a\>
- Do NOT \<exclusion b\>
- ...

## Context

\<References to relevant files (@file references), URLs, project documentation, styleguide rules, and any other information needed to implement the prompt correctly.\>

- @\<path/to/file\> - \<context description\>
- @\<path/to/file\> - \<context description\>
- ...

## Implementation Plan

\<A step-by-step guide on how to accomplish the goal. Must include concrete code examples or patterns where applicable.\>

### Step 1: \<description\>

\<precise instructions how to implement the requirements with coding examples\>

### Step ###: \<description\>

\<precise instructions how to implement the requirements with coding examples\>

## Examples

\<Concrete usage examples, expected inputs/outputs, or code snippets that illustrate the desired result.\>
```

## Validation Workflow

### Purpose

Ensure tasks for a user story do not conflict or overlap in a way that creates ambiguity or duplicated effort.

### Conflict Checks

1. Overlapping scope: two tasks claim the same change area or outcome.
2. Dependency inversion: a task requires an output that is only produced by a later task.
3. Circular dependency: tasks depend on each other with no clear start.
4. Contradictory outcomes: tasks prescribe mutually exclusive behaviors.

### Resolution Rules

1. Split ambiguous tasks into clearer, smaller tasks.
2. Reorder tasks to make dependencies explicit.
3. Merge tasks that are inseparable without losing clarity.
4. If conflict remains, split and reorder tasks.
5. If circular dependencies exists, merge affected tasks.

## Examples

### Good

```md
# Task: Differ Statusline On Unfocused Windows

## Metadata

- ID: TASK-0003-Statusline_On_Unfocused_Windows
- Status: plan
- Userstory: US-0001-Statusline_For_Windows

## Motivation

When multiple windows are visible, showing the full statusline for all of them creates visual clutter. Differentiating focused vs unfocused statuslines helps the user quickly identify which window is active and reduces noise. This matches the vim/neovim convention where the active window's statusline is highlighted and the inactive ones are dimmed/simplified.

## Relevant Acceptance Criteria

- Statusline is shown on focused and unfocused windows
- Statusline differs on focused and unfocused windows
- Unfocused windows show minimal information in statusline
- Focused windows show all information like shown before the change

## Requirements

- The unfocused statusline functions are intentionally separate from the focused ones (not parameterized) to keep each rendering path simple and easy to modify independently.
- When there is no split, the single window is always "focused" so `is_focused` is always `true` — the full statusline is shown, identical to today's behavior.
- The focused window's statusline shows the full content: path, permissions, changes, and cursor position (for `Directory`); "Tasks" label and position (for `Tasks`). This is the existing behavior.
- Unfocused windows show a simplified statusline:
  - `Directory`: only the path (gray text on black background).
  - `Tasks`: only the "Tasks" label (gray text on black background).
- The focused statusline uses the existing `Color::Black` background.
- The unfocused statusline uses a dimmer background (e.g., `Color::DarkGray` or `Color::Rgb(30, 30, 30)`) to visually distinguish it from the focused one.
- When there is only one window (no splits), it always renders the full (focused) statusline — no visual difference from today.
- The `is_focused` boolean is passed from `render_window` into the statusline rendering call.

## Exclusions

- Do NOT change layout computation — that was done in Prompt 2.
- Do NOT change the `Window` enum or model types.
- Do NOT change any keybindings or commands.

## Context

- @yeet-frontend/src/view/statusline.rs — `view()`, `filetree_status()`, `tasks_status()`: the rendering functions. A new `is_focused` parameter will control which variant to render.
- @yeet-frontend/src/view/buffer.rs — `render_window()`: passes the focused buffer ID down through the tree. This is where `is_focused` is determined and passed to the statusline call.
- @yeet-frontend/src/model/mod.rs — `Window::focused_viewport()`: used to determine the focused buffer ID.
- @AGENTS.md — build/test/lint commands.

## Implementation Plan

### Step 1: Add `is_focused` parameter to `statusline::view`

Change the signature of `statusline::view()` to accept a boolean:

\<code example in rust using ```rust fences\>

### Step 2: Add unfocused statusline rendering functions

Add `filetree_status_unfocused` — renders only the path:

\<code example in rust using ```rust fences\>

Add `tasks_status_unfocused` — renders only the "Tasks" label:

\<code example in rust using ```rust fences\>

### Step 3: Pass `is_focused` from `render_window`

In `yeet-frontend/src/view/buffer.rs`, the `render_window` function already has `focused_buffer_id`. Use it to determine if the current leaf is focused:

For `Window::Directory`:

\<code example in rust using ```rust fences\>

For `Window::Tasks`:

\<code example in rust using ```rust fences\>

### Step 4: Choose unfocused background color

Use `Color::DarkGray` as the background for unfocused statuslines. This provides a visible but subtle distinction from the focused `Color::Black` background. The unfocused text uses `Color::Gray` to further dim it.

Alternative: Use `Color::Rgb(40, 40, 40)` for a more subtle distinction. Choose based on visual testing.

### Step 5: Run `cargo fmt`, `cargo clippy --all-targets --all-features`, `cargo test`

## Examples

### Focused Directory statusline (unchanged from today)

| /home/user   rwxr-xr-x   +2 ~1         3/10  |  (black bg, gray text)

### Unfocused Directory statusline (simplified)

| /home/user                                     |  (dark gray bg, dim text)

### Focused Tasks statusline (unchanged from today)

| Tasks                                    2/2   |  (black bg, gray text)

### Unfocused Tasks statusline (simplified)

| Tasks                                          |  (dark gray bg, dim text)

### Full split layout with focus on Directory

+-----------------------------------------------+
|  parent  |   current    |      preview         |  (Directory content)
+-----------------------------------------------+
| /home/user   rwxr-xr-x   +2 ~1         3/10  |  <- FOCUSED (black bg, full info)
+-----------------------------------------------+
|  1    rg foo                                   |  (Tasks content)
+-----------------------------------------------+
| Tasks                                          |  <- UNFOCUSED (dark gray bg, label only)
+-----------------------------------------------+
| :command                                       |
+-----------------------------------------------+

### Full split layout with focus on Tasks

+-----------------------------------------------+
|  parent  |   current    |      preview         |  (Directory content)
+-----------------------------------------------+
| /home/user                                     |  <- UNFOCUSED (dark gray bg, path only)
+-----------------------------------------------+
|  1    rg foo                                   |  (Tasks content)
+-----------------------------------------------+
| Tasks                                    2/2   |  <- FOCUSED (black bg, full info)
+-----------------------------------------------+
| :command                                       |
+-----------------------------------------------+
```
