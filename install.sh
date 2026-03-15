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

log_section() {
  printf '\n%s\n' "$1"
}

log_info() {
  printf '%s %s\n' "[INFO]" "$1"
}

inc() {
  eval "$1=\$(( $1 + 1 ))"
}

created_total=0
updated_total=0
skipped_total=0

base_created=0
base_updated=0
base_skipped=0

agents_created=0
agents_updated=0
agents_skipped=0

skills_created=0
skills_updated=0
skills_skipped=0

commands_created=0
commands_updated=0
commands_skipped=0

tools_created=0
tools_updated=0
tools_skipped=0

prepare_config_root() {
  log_info "Preparing configuration directory"
  if [ -e "$dest_root" ] && [ ! -d "$dest_root" ]; then
    rm -f "$dest_root"
    mkdir -p "$dest_root"
    base_updated=1
    inc updated_total
    return
  fi

  if [ -d "$dest_root" ]; then
    base_skipped=1
    inc skipped_total
    return
  fi

  mkdir -p "$dest_root"
  base_created=1
  inc created_total
}

sync_dir() {
  src="$1"
  name="$2"
  label="$3"
  created_var="$4"
  updated_var="$5"
  skipped_var="$6"
  dest="$dest_root/$name"

  log_info "Syncing $label"

  if [ ! -d "$src" ]; then
    log_info "No $label source found; skipping"
    return
  fi

  mkdir -p "$dest_root"
  if [ -e "$dest" ] && [ ! -d "$dest" ]; then
    rm -f "$dest"
  fi
  mkdir -p "$dest"

  for item in "$src"/*; do
    if [ ! -e "$item" ]; then
      continue
    fi

    base=$(basename "$item")
    dest_item="$dest/$base"
    status=""

    if [ ! -e "$dest_item" ]; then
      status="created"
    else
      if [ -d "$item" ]; then
        if [ -d "$dest_item" ] && diff -r "$item" "$dest_item" >/dev/null 2>&1; then
          status="skipped"
        else
          status="updated"
        fi
      else
        if [ -f "$dest_item" ] && cmp -s "$item" "$dest_item" >/dev/null 2>&1; then
          status="skipped"
        else
          status="updated"
        fi
      fi
    fi

    case "$status" in
      created)
        inc "$created_var"
        inc created_total
        ;;
      updated)
        inc "$updated_var"
        inc updated_total
        ;;
      skipped)
        inc "$skipped_var"
        inc skipped_total
        ;;
    esac

    if [ "$status" = "created" ] || [ "$status" = "updated" ]; then
      if [ -d "$item" ]; then
        if [ -e "$dest_item" ] && [ ! -d "$dest_item" ]; then
          rm -f "$dest_item"
        fi
        mkdir -p "$dest_item"
        cp -R "$item/." "$dest_item/"
      else
        if [ -e "$dest_item" ] && [ -d "$dest_item" ]; then
          rm -rf "$dest_item"
        fi
        cp "$item" "$dest_item"
      fi
    fi
  done
}

log_section "==> Installing opencode configuration"
prepare_config_root
sync_dir "$repo_root/agents" "agents" "agents" "agents_created" "agents_updated" "agents_skipped"
sync_dir "$repo_root/skills" "skills" "skills" "skills_created" "skills_updated" "skills_skipped"
sync_dir "$repo_root/commands" "commands" "commands" "commands_created" "commands_updated" "commands_skipped"
sync_dir "$repo_root/tools" "tools" "tools" "tools_created" "tools_updated" "tools_skipped"

log_section "==> Summary"
printf '%s\n' "  Base config: created $base_created, updated $base_updated, skipped $base_skipped"
printf '%s\n' "  Agents:     created $agents_created, updated $agents_updated, skipped $agents_skipped"
printf '%s\n' "  Skills:     created $skills_created, updated $skills_updated, skipped $skills_skipped"
printf '%s\n' "  Commands:   created $commands_created, updated $commands_updated, skipped $commands_skipped"
printf '%s\n' "  Tools:      created $tools_created, updated $tools_updated, skipped $tools_skipped"
printf '%s\n' "  Totals:     created $created_total, updated $updated_total, skipped $skipped_total"
printf '\n%s\n' "opencode config installed to $dest_root"
