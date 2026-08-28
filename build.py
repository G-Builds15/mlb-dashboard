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

import os
import re
import subprocess
import sys

OUTPUT_DIR    = os.environ.get("GITHUB_WORKSPACE") or os.path.dirname(os.path.abspath(__file__))
SLATE_FILE    = os.path.join(OUTPUT_DIR, "slate_data.js")
DASHBOARD     = os.path.join(OUTPUT_DIR, "mlb_dashboard.html")

SLATE_MARKER  = "// SLATE DATA — update daily"
ENGINE_MARKER = "// DASHBOARD ENGINE"


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--outdir", default=None)
    args, _ = parser.parse_known_args()

    global OUTPUT_DIR, SLATE_FILE, DASHBOARD
    if args.outdir:
        OUTPUT_DIR = args.outdir
    elif os.environ.get("GITHUB_WORKSPACE"):
        OUTPUT_DIR = os.environ["GITHUB_WORKSPACE"]
    SLATE_FILE = os.path.join(OUTPUT_DIR, "slate_data.js")
    DASHBOARD  = os.path.join(OUTPUT_DIR, "mlb_dashboard.html")

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

    # Locate slate and engine sections
    slate_start  = html.find(SLATE_MARKER)
    engine_start = html.find(ENGINE_MARKER)

    if slate_start < 0:
        print(f"ERROR: Slate marker not found in mlb_dashboard.html")
        print(f"  Expected: '{SLATE_MARKER}'")
        sys.exit(1)

    if engine_start < 0:
        print(f"ERROR: Engine marker not found in mlb_dashboard.html")
        print(f"  Expected: '{ENGINE_MARKER}'")
        sys.exit(1)

    if engine_start <= slate_start:
        print("ERROR: Engine marker appears before slate marker — file corrupt")
        sys.exit(1)

    # Splice: pre-slate + new slate + engine-onwards
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
