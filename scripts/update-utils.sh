#!/bin/bash

PACKAGE="@bka-stuff/pe-mfe-utils"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."

for dir in "$ROOT" "$ROOT/../pe-mfe-"*/; do
  [[ "$(basename "$dir")" == "pe-mfe-utils" ]] && continue
  [[ ! -f "$dir/package.json" ]] && continue
  name=$(basename "$dir")
  echo ">>> Updating $PACKAGE in $name..."
  (cd "$dir" && pnpm update "$PACKAGE") || echo "  FAILED: $name"
  echo ""
done

echo "Done."
