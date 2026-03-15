# Feature: Install Script for Opencode Config
- ID: FEAT-0001
- Status: plan

## Description
Provide a POSIX `install.sh` script that configures `~/.config/opencode` by creating or updating agents, skills, and commands from this repository.

## Scope
- Create or update `~/.config/opencode` to reflect this repo’s agents/skills/commands.
- Use POSIX `sh` compatibility.
- Script is idempotent (safe to run multiple times).
- No `sudo` usage.

## Out of Scope
- Implementing the actual script contents (beyond requirements artifacts).
- Supporting non-POSIX shells or platform-specific installers.

## Assumptions
- The repository contains the authoritative agents/skills/commands to be installed.
- User has write access to `~/.config/opencode`.

## Acceptance Criteria
- Given a repository with agents/skills/commands
  - When a user runs `install.sh` with POSIX `sh`
  - Then `~/.config/opencode` is created if missing and updated to match the repository
- Given `install.sh` has been run before
  - When the user runs it again
  - Then the script completes without error and leaves the config in the same desired state
- Given the user lacks elevated privileges
  - When `install.sh` runs
  - Then it completes without using `sudo`
