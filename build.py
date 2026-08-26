#!/usr/bin/env python3
"""
build.py
========
Combines slate_data.js + dashboard engine into mlb_dashboard.html.
Run after slate_builder.py:
    python3 build.py

Output: mlb_dashboard.html (upload to GitHub Pages repo)
"""

import os
import re
import subprocess
import sys

OUTPUT_DIR     = os.path.dirname(os.path.abspath(__file__))
SLATE_FILE     = os.path.join(OUTPUT_DIR, "slate_data.js")
ENGINE_SOURCE  = os.path.join(OUTPUT_DIR, "mlb_best_bets_dashboard.html")
DASHBOARD_OUT  = os.path.join(OUTPUT_DIR, "mlb_dashboard.html")


def main():
    print("=" * 55)
    print("MLB Dashboard Builder")
    print("=" * 55)

    # Validate inputs
    for f in [SLATE_FILE, ENGINE_SOURCE]:
        if not os.path.exists(f):
            print(f"ERROR: {f} not found")
            sys.exit(1)

    with open(SLATE_FILE) as f:
        slate = f.read()
    with open(ENGINE_SOURCE) as f:
        engine_source = f.read()
    with open(DASHBOARD_OUT) as f:
        current = f.read()

    # Find slate section boundaries in current dashboard
    slate_start = current.find("// SLATE DATA — update daily")
    engine_start = current.find("// DASHBOARD ENGINE")

    if slate_start < 0 or engine_start < 0:
        print("ERROR: Slate/engine markers not found in mlb_dashboard.html")
        print("  Expected: '// SLATE DATA — update daily'")
        print("  Expected: '// DASHBOARD ENGINE'")
        sys.exit(1)

    # Replace slate section only
    new_content = (current[:slate_start] +
                   slate + "\n\n" +
                   current[engine_start:])

    # Syntax check
    scripts = [(len(m.group(1)), m.group(1)) for m in
               re.finditer(r'<script>(.*?)</script>', new_content, re.DOTALL)]
    if not scripts:
        print("ERROR: No script blocks found")
        sys.exit(1)

    _, js = max(scripts)
    with open('/tmp/build_check.js', 'w') as f:
        f.write(js)
    r = subprocess.run(['node', '--check', '/tmp/build_check.js'],
                       capture_output=True, text=True)
    if r.returncode != 0:
        print(f"ERROR: Syntax check failed:\n{r.stderr[:300]}")
        sys.exit(1)

    # Count games
    game_count = len(re.findall(
        r'^\s+"[a-z]+-[a-z]+": \{', new_content, re.MULTILINE))

    with open(DASHBOARD_OUT, 'w') as f:
        f.write(new_content)

    print(f"✓ {DASHBOARD_OUT}")
    print(f"  {game_count} games · {len(new_content):,} bytes · syntax clean")
    print(f"\nUpload mlb_dashboard.html to GitHub to update the live dashboard.")


if __name__ == "__main__":
    main()
