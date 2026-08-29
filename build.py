#!/usr/bin/env python3
"""
build.py
========
Step 3 of the automated pipeline.

Reads slate_data.js (from slate_builder.py) and injects it into
mlb_dashboard.html, replacing the slate section while keeping
the dashboard engine intact.

The dashboard HTML contains two markers:
  // SLATE DATA — update daily   (start of slate)
  // DASHBOARD ENGINE            (start of engine — preserved)

Writes: mlb_dashboard.html
Run:    python3 build.py
"""

import argparse
import os
import re
import subprocess
import sys

_parser = argparse.ArgumentParser(add_help=False)
_parser.add_argument("--outdir", default=None)
_args, _ = _parser.parse_known_args()
OUTPUT_DIR = (_args.outdir or
              os.environ.get("GITHUB_WORKSPACE") or
              os.path.dirname(os.path.abspath(__file__)))
SLATE_FILE = os.path.join(OUTPUT_DIR, "slate_data.js")
DASHBOARD  = os.path.join(OUTPUT_DIR, "mlb_dashboard.html")

SLATE_MARKER  = "// SLATE DATA — update daily"
ENGINE_MARKER = "// DASHBOARD ENGINE"


def main():
    print("=" * 55)
    print("MLB Dashboard Builder")
    print(f"  Output dir: {OUTPUT_DIR}")
    print("=" * 55)

    # Validate inputs exist
    for path in [SLATE_FILE, DASHBOARD]:
        if not os.path.exists(path):
            print(f"ERROR: Required file not found: {path}")
            sys.exit(1)

    with open(SLATE_FILE) as f:
        slate = f.read()

    with open(DASHBOARD) as f:
        html = f.read()

    # Locate markers — both must exist for clean splice
    slate_start  = html.find(SLATE_MARKER)
    engine_start = html.find(ENGINE_MARKER)

    if engine_start < 0:
        # ENGINE marker missing — try to find it from known function name
        engine_start = html.find("function computeGameLean")
        if engine_start < 0:
            engine_start = html.find("function renderOverview")
        if engine_start >= 0:
            # Walk back to start of line
            engine_start = html.rfind("\n", 0, engine_start) + 1
            print(f"  Engine marker missing — located engine at position {engine_start}")
        else:
            print("ERROR: Cannot locate dashboard engine in mlb_dashboard.html")
            sys.exit(1)

    if slate_start < 0 or slate_start >= engine_start:
        # Slate marker missing or misplaced — insert before engine
        print(f"  Slate marker missing — inserting slate before engine")
        # Find the opening <script> tag before the engine
        script_before = html.rfind("<script>", 0, engine_start)
        if script_before < 0:
            print("ERROR: Cannot locate <script> block to insert slate")
            sys.exit(1)
        insert_at = script_before + len("<script>") + 1
        new_html = (html[:insert_at] +
                    "\n" + SLATE_MARKER + "\n" +
                    slate + "\n\n" + ENGINE_MARKER + "\n" +
                    html[engine_start:])
    else:
        # Both markers found — clean splice
        new_html = html[:slate_start] + slate + "\n\n" + html[engine_start:]

    # JavaScript syntax check
    scripts = [(len(m.group(1)), m.group(1))
               for m in re.finditer(r'<script>(.*?)</script>',
                                    new_html, re.DOTALL)]
    if not scripts:
        print("ERROR: No script blocks found in output")
        sys.exit(1)

    _, main_js = max(scripts)
    with open("/tmp/build_check.js","w") as f:
        f.write(main_js)

    result = subprocess.run(
        ["node","--check","/tmp/build_check.js"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"ERROR: JavaScript syntax check failed:")
        print(result.stderr[:400])
        sys.exit(1)

    # Count games for confirmation
    game_keys = re.findall(r'^\s+"([a-z]+-[a-z]+)": \{',
                            new_html, re.MULTILINE)

    # Count best bets
    bets = re.findall(r'\{game:"[A-Z@]+"', new_html)

    with open(DASHBOARD,"w") as f:
        f.write(new_html)

    size_kb = len(new_html) // 1024
    print(f"\n✓ {DASHBOARD}")
    print(f"  {len(game_keys)} games · {len(bets)} best bets · "
          f"{size_kb} KB · syntax clean")
    print(f"\nDashboard updated. GitHub Pages will serve the new version")
    print(f"after the git push step in the workflow.")


if __name__ == "__main__":
    main()
