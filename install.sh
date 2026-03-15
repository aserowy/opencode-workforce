#!/bin/sh
# install.sh
#
# POSIX installer for opencode configuration.
# Synchronizes agents/, skills/, and commands/ from this repository into
# ~/.config/opencode (or $XDG_CONFIG_HOME/opencode).
#
# Behavior:
# - Creates the destination directory if missing.
# - Updates repo-defined items by copying into existing directories.
# - Preserves custom items that are not defined in this repository.
# - Does not remove destination directories when the source is absent.
# - Idempotent: repeated runs produce the same end state.
# - No sudo usage.

set -eu

repo_root=$(cd "$(dirname "$0")" && pwd)

config_root=${XDG_CONFIG_HOME:-"$HOME/.config"}
dest_root="$config_root/opencode"

sync_dir() {
  src="$1"
  name="$2"
  dest="$dest_root/$name"

  if [ -d "$src" ]; then
    mkdir -p "$dest_root"
    if [ -e "$dest" ] && [ ! -d "$dest" ]; then
      rm -f "$dest"
    fi
    mkdir -p "$dest"
    cp -R "$src/." "$dest/"
  fi
}

sync_dir "$repo_root/agents" "agents"
sync_dir "$repo_root/skills" "skills"
sync_dir "$repo_root/commands" "commands"

printf '%s\n' "opencode config installed to $dest_root"
