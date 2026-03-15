# User Story: Preserve Custom Opencode Config
- ID: US-0002
- Status: done
- Feature: FEAT-0001
- As a: repository user
- I want: install.sh to preserve existing opencode config items that are not defined in this repository
- So that: my custom agents, skills, and commands are not removed when I run the installer
- Acceptance criteria:
  - Given I have custom agents, skills, or commands in ~/.config/opencode that are not present in this repository
  - When I run install.sh using POSIX sh
  - Then those custom items remain in ~/.config/opencode after the script completes
  - Given the repository provides updates to agents, skills, or commands that do exist in ~/.config/opencode
  - When I run install.sh
  - Then those matching items are updated to the repository versions without removing unrelated custom items
  - Given items were previously installed from this repository
  - When those items are removed from the repository and install.sh runs again
  - Then the existing items remain in ~/.config/opencode (no deletions)

## Scope
- Preserve any existing ~/.config/opencode agents, skills, or commands that are not defined in this repository.
- Update only the items that are defined in this repository.
- Do not delete items that were removed from the repository.
