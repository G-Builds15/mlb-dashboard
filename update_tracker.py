#!/usr/bin/env python3
"""
update_tracker.py
=================
Appends today's picks from slate_data.js into tracker.json.
Run after slate_builder.py as part of the GitHub Actions workflow.

Input:  slate_data.js (written by slate_builder.py)
Output: tracker.json  (appended — never overwrites prior days)

tracker.json structure:
{
  "2026-09-01": {
    "generated_at": "2026-09-01T14:51:00Z",
    "game_count": 15,
    "picks": [
      {
        "game": "JAY@GUA",
        "pick": "Under 2.5 ER",
        "odds": "TBD",
        "grade": "A-",
        "parlay": false,
        "src": "era",
        "result": null,
        "hit": null
      },
      ...
    ],
    "summary": {
      "total": 38,
      "by_grade": {"A-": 9, "B+": 15, "B": 14},
      "parlay_count": 0
    }
  }
}
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime, timezone

_parser = argparse.ArgumentParser(add_help=False)
_parser.add_argument("--outdir", default=None)
_args, _ = _parser.parse_known_args()
OUTPUT_DIR   = (_args.outdir or
                os.environ.get("GITHUB_WORKSPACE") or
                os.path.dirname(os.path.abspath(__file__)))
SLATE_FILE   = os.path.join(OUTPUT_DIR, "slate_data.js")
TRACKER_FILE = os.path.join(OUTPUT_DIR, "tracker.json")

def parse_slate():
    if not os.path.exists(SLATE_FILE):
        print(f"ERROR: {SLATE_FILE} not found")
        sys.exit(1)

    with open(SLATE_FILE) as f:
        raw = f.read()

    # Extract bestBets array
    match = re.search(r'const bestBets = \[(.*?)\];', raw, re.DOTALL)
    if not match:
        print("ERROR: Could not parse bestBets from slate_data.js")
        sys.exit(1)

    bets_raw = match.group(1).strip()
    if not bets_raw:
        return []

    # Parse each bet object — handle JS object syntax
    picks = []
    # Match individual bet objects
    bet_objects = re.findall(r'\{[^}]+\}', bets_raw)
    for obj in bet_objects:
        pick = {}
        for key in ['game','pick','odds','grade','src']:
            m = re.search(rf'{key}:"([^"]*)"', obj)
            if m:
                pick[key] = m.group(1)
        pick['parlay'] = 'parlay:true' in obj
        pick['result'] = None  # filled in during grading
        pick['hit']    = None  # filled in during grading
        if 'game' in pick and 'pick' in pick:
            picks.append(pick)

    return picks

def parse_game_count():
    with open(SLATE_FILE) as f:
        raw = f.read()
    games = re.findall(r'^\s+"[a-z]+-[a-z]+":\s*\{', raw, re.MULTILINE)
    return len(games)

def load_tracker():
    if not os.path.exists(TRACKER_FILE):
        return {}
    with open(TRACKER_FILE) as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            print("WARNING: tracker.json malformed — starting fresh")
            return {}

def main():
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    now   = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    print(f"update_tracker.py — {today}")

    picks      = parse_slate()
    game_count = parse_game_count()
    tracker    = load_tracker()

    if today in tracker:
        existing = len(tracker[today].get("picks", []))
        new      = len(picks)
        if existing == new:
            print(f"  {today} already in tracker ({existing} picks) — skipping")
            return
        else:
            print(f"  {today} exists with {existing} picks, updating to {new}")

    # Build summary
    by_grade = {}
    for p in picks:
        g = p.get("grade","?")
        by_grade[g] = by_grade.get(g, 0) + 1

    tracker[today] = {
        "generated_at": now,
        "game_count":   game_count,
        "picks":        picks,
        "summary": {
            "total":        len(picks),
            "by_grade":     by_grade,
            "parlay_count": sum(1 for p in picks if p.get("parlay")),
        }
    }

    # Keep tracker sorted newest-first
    sorted_tracker = dict(
        sorted(tracker.items(), key=lambda x: x[0], reverse=True)
    )

    with open(TRACKER_FILE, "w") as f:
        json.dump(sorted_tracker, f, indent=2)

    print(f"  ✓ {today} added: {len(picks)} picks across {game_count} games")
    print(f"  Grades: {by_grade}")
    print(f"  tracker.json: {len(sorted_tracker)} days tracked")

if __name__ == "__main__":
    main()
