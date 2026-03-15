# Task: Define install.sh requirements and interface

- ID: TASK-0001
- Status: plan

## Description
Capture the functional requirements and interface details for install.sh, including inputs, outputs, and operational constraints.

## Scope
- Define required repository inputs (agents/, skills/, commands/ locations).
- Specify destination layout under ~/.config/opencode.
- Document required behavior: create missing dirs, update to match repo, idempotent runs, and no sudo usage.
- Identify any environment variables or flags that control script behavior.

## Acceptance Criteria
- Requirements cover source/destination paths, idempotency expectations, and no-sudo constraint.
- Interfaces (flags/env vars) are listed or explicitly marked as not needed.
- Output is sufficient to guide subsequent task design without ambiguity.
