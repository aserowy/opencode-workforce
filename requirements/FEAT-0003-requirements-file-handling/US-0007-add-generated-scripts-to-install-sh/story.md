# User Story: Install scripts directory
- ID: US-0007
- Status: execution
- Feature: FEAT-0003
- As a: workflow/agent maintainer
- I want: scripts/ to be included by install.sh
- So that: required scripts are available after installation without manual steps
- Acceptance criteria:
  - Given install.sh is run in a fresh environment
    - When installation completes successfully
    - Then the scripts/ directory is installed and available for use
    - And scripts/ are installed into ~/.config/opencode/
  - Given install.sh is run multiple times
    - When it re-installs the project
    - Then including scripts/ does not require manual intervention

- Current gap:
  - Scripts are not installed into ~/.config/opencode/ today.
