# Task: Define preserve-and-update copy rules

- ID: TASK-0005
- Status: plan

## Description
Specify the install.sh copy/update rules that ensure repository-defined items are refreshed while all other user items remain untouched.

## Scope
- Define file-level behavior for updates (overwrite repo-matching items).
- Define directory-level behavior (merge without delete).
- Clarify treatment of items removed from repo: leave untouched in ~/.config/opencode.
- Capture POSIX sh constraints for the intended approach (e.g., no rsync).

## Acceptance Criteria
- Rules explicitly state that non-repo items remain and repo items are updated.
- Treatment of repo-removed items is explicit: preserved.
- Guidance is precise enough for implementation without ambiguity.
