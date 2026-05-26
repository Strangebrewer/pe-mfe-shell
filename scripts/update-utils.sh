#!/bin/bash

PACKAGE="@bka-stuff/pe-mfe-utils"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."

MFES=(
  "$ROOT"
  "$ROOT/../pe-mfe-dashboard"
  "$ROOT/../pe-mfe-job-search"
  "$ROOT/../pe-mfe-budget"
  "$ROOT/../pe-mfe-home-maintenance"
  "$ROOT/../pe-mfe-project-mgr"
  "$ROOT/../pe-mfe-recipes"
)

for dir in "${MFES[@]}"; do
  name=$(basename "$dir")
  echo ">>> Updating $PACKAGE in $name..."
  (cd "$dir" && pnpm update "$PACKAGE") || echo "  FAILED: $name"
  echo ""
done

echo "Done."
