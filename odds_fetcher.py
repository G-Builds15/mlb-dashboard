#!/usr/bin/env python3
"""
odds_fetcher.py
===============
Assembles games_data.js from raw JSON files fetched by the workflow.

Input files (written by curl steps in update_odds.yml):
  starters_raw.json     — MLB Stats API schedule + probablePitcher
  odds_raw.json         — The Odds API h2h/spreads/totals
  props_raw.json        — The Odds API pitcher props per game
  pitcher_stats_raw.json — MLB Stats API season + split stats per pitcher
  team_stats_raw.json   — MLB Stats API team offense + bullpen per team

Output:
  games_data.js         — combined data object consumed by slate_builder.py

No API calls made here. All network calls happen in update_odds.yml.
Run: python3 odds_fetcher.py
"""

import json
import os
import sys
from datetime import datetime, timezone

OUTPUT_DIR = os.environ.get("GITHUB_WORKSPACE") or os.path.dirname(os.path.abspath(__file__))

# ─────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────

def load(filename):
    path = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(path):
        print(f"  WARNING: {filename} not found — skipping")
        return None
    with open(path) as f:
        return json.load(f)

def fmt(n):
    if n is None: return "N/A"
    return f"+{n}" if n > 0 else str(n)

def fmt_spread(point, odds):
    if point is None: return "N/A"
    sign = "+" if point > 0 else ""
    return f"{sign}{point} ({fmt(odds)})"

def team_match(a, b):
    """Robust team name matching across different API name formats."""
    a = a.lower().strip()
    b = b.lower().strip()
    if a == b or a in b or b in a: return True
    # Last word: "Yankees" matches "New York Yankees"
    if a.split()[-1] == b.split()[-1]: return True
    # Two-word suffix: "Red Sox" matches "Boston Red Sox"
    if len(a.split()) >= 2 and " ".join(a.split()[-2:]) in b: return True
    if len(b.split()) >= 2 and " ".join(b.split()[-2:]) in a: return True
    return False

# ─────────────────────────────────────────────────────────
# PARSE STARTERS
# ─────────────────────────────────────────────────────────

def parse_starters(data):
    """
    Extract confirmed starters + team IDs from MLB Stats API schedule response.
    Returns dict keyed by gamePk.
    """
    if not data:
        return {}

    starters = {}
    today    = datetime.now().strftime("%Y-%m-%d")

    for date_entry in data.get("dates", []):
        if date_entry.get("date") != today:
            continue
        for game in date_entry.get("games", []):
            game_pk   = game["gamePk"]
            away_team = game["teams"]["away"]["team"]["name"]
            home_team = game["teams"]["home"]["team"]["name"]
            away_id   = game["teams"]["away"]["team"].get("id")
            home_id   = game["teams"]["home"]["team"].get("id")

            def extract(prob):
                if not prob:
                    return {"name":"TBD","id":None,"hand":"?","confirmed":False}
                return {
                    "name":      prob.get("fullName","TBD"),
                    "id":        prob.get("id"),
                    "hand":      prob.get("pitchHand",{}).get("code","?"),
                    "confirmed": bool(prob.get("fullName")),
                }

            away_p = extract(game["teams"]["away"].get("probablePitcher"))
            home_p = extract(game["teams"]["home"].get("probablePitcher"))

            starters[game_pk] = {
                "gamePk":       game_pk,
                "away_team":    away_team,
                "home_team":    home_team,
                "away_team_id": away_id,
                "home_team_id": home_id,
                "away":         away_p,
                "home":         home_p,
            }

            ok = "✓" if (away_p["confirmed"] and home_p["confirmed"]) else "~"
            print(f"  [{ok}] {away_team} @ {home_team}: "
                  f"{away_p['name']} (ID:{away_p['id'] or '?'}) vs "
                  f"{home_p['name']} (ID:{home_p['id'] or '?'})")

    print(f"  {len(starters)} games parsed")
    return starters

# ─────────────────────────────────────────────────────────
# PARSE ODDS
# ─────────────────────────────────────────────────────────

def parse_odds(data):
    """
    Parse The Odds API response into game objects with lines.
    Returns dict keyed by event ID.
    """
    if not data:
        return {}

    today_utc = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    games = {}

    for event in data:
        if not event.get("commence_time","").startswith(today_utc):
            continue

        game_id = event["id"]
        home    = event["home_team"]
        away    = event["away_team"]

        # Parse ET time
        from datetime import datetime as dt
        try:
            utc = dt.fromisoformat(event["commence_time"].replace("Z","+00:00"))
            import time as t_mod
            offset = -4  # ET (adjust for DST automatically in prod)
            local  = utc.replace(tzinfo=None)
            # Simple ET conversion
            et_hr  = (utc.hour - 4) % 24
            ampm   = "AM" if et_hr < 12 else "PM"
            hr12   = et_hr if et_hr <= 12 else et_hr - 12
            hr12   = 12 if hr12 == 0 else hr12
            time_str = f"{hr12}:{utc.minute:02d} {ampm} ET"
        except:
            time_str = "TBD"

        lines = {
            "ml":     {"home":None,"away":None},
            "spread": {"home":None,"away":None,
                       "homePoint":None,"awayPoint":None},
            "total":  {"point":None,"over":None,"under":None},
        }

        for bm in event.get("bookmakers",[]):
            for mkt in bm.get("markets",[]):
                key  = mkt["key"]
                outs = mkt.get("outcomes",[])
                if key == "h2h":
                    for o in outs:
                        if o["name"] == home:  lines["ml"]["home"]  = o["price"]
                        if o["name"] == away:  lines["ml"]["away"]  = o["price"]
                elif key == "spreads":
                    for o in outs:
                        if o["name"] == home:
                            lines["spread"]["home"]      = o["price"]
                            lines["spread"]["homePoint"] = o["point"]
                        if o["name"] == away:
                            lines["spread"]["away"]      = o["price"]
                            lines["spread"]["awayPoint"] = o["point"]
                elif key == "totals":
                    for o in outs:
                        if o["name"] == "Over":
                            lines["total"]["over"]  = o["price"]
                            lines["total"]["point"] = o["point"]
                        if o["name"] == "Under":
                            lines["total"]["under"] = o["price"]
            break  # first bookmaker only

        games[game_id] = {
            "id":       game_id,
            "home":     home,
            "away":     away,
            "time":     time_str,
            "commence": event["commence_time"],
            "lines":    lines,
        }

    print(f"  {len(games)} games with odds")
    return games

# ─────────────────────────────────────────────────────────
# PARSE PROPS
# ─────────────────────────────────────────────────────────

def parse_props(data):
    """
    Parse pitcher props from props_raw.json into player → market → odds.
    Returns dict keyed by event ID.
    """
    if not data:
        return {}

    props_by_game = {}

    for event_id, event_data in data.items():
        raw   = event_data.get("data",{})
        props = {}

        for bm in raw.get("bookmakers",[]):
            for mkt in bm.get("markets",[]):
                market_key = mkt["key"]
                for o in mkt.get("outcomes",[]):
                    player = o.get("description","")
                    name   = o.get("name","")
                    price  = o.get("price")
                    point  = o.get("point")
                    if not player: continue
                    props.setdefault(player,{}).setdefault(market_key,{
                        "point":None,"over":None,"under":None,
                        "overStr":"TBD","underStr":"TBD"
                    })
                    if name == "Over":
                        props[player][market_key]["over"]     = price
                        props[player][market_key]["point"]    = point
                        props[player][market_key]["overStr"]  = fmt(price)
                    if name == "Under":
                        props[player][market_key]["under"]    = price
                        props[player][market_key]["point"]    = point
                        props[player][market_key]["underStr"] = fmt(price)
            break  # first bookmaker

        props_by_game[event_id] = props

    return props_by_game

# ─────────────────────────────────────────────────────────
# MERGE ALL DATA
# ─────────────────────────────────────────────────────────

def merge_all(odds_games, starters, pitcher_stats, team_stats, props):
    """
    Combine odds, starters, pitcher stats, team stats, and props
    into a single enriched game object per game.
    """
    merged = {}

    for game_id, game in odds_games.items():
        # Match to MLB starters entry
        matched_starter = None
        for _, s in starters.items():
            if (team_match(game["home"], s["home_team"]) and
                    team_match(game["away"], s["away_team"])):
                matched_starter = s
                break

        # Attach starters
        if matched_starter:
            game["starters"]    = {
                "away": matched_starter["away"],
                "home": matched_starter["home"],
            }
            away_team_id = matched_starter.get("away_team_id")
            home_team_id = matched_starter.get("home_team_id")
        else:
            game["starters"] = {
                "away": {"name":"TBD","id":None,"hand":"?","confirmed":False},
                "home": {"name":"TBD","id":None,"hand":"?","confirmed":False},
            }
            away_team_id = None
            home_team_id = None

        # Attach pitcher stats
        game["pitcher_stats"] = {}
        for side, pid_key in [("away","away"),("home","home")]:
            pid = game["starters"][side].get("id")
            ps = pitcher_stats.get(str(pid)) or pitcher_stats.get(pid)
            if ps:
                game["pitcher_stats"][side] = {
                    **ps.get("season",{}),
                    **{k:v for k,v in ps.get("splits",{}).items()},
                    "name":    ps.get("name",""),
                    "pid":     pid,
                    "_source": "mlb_stats_api",  # marks as verified API data
                }

        # Attach team stats
        game["team_stats"] = {}
        for side, tid in [("away",away_team_id),("home",home_team_id)]:
            if tid and str(tid) in team_stats:
                game["team_stats"][side] = team_stats[str(tid)]
            elif tid and tid in team_stats:
                game["team_stats"][side] = team_stats[tid]

        # Attach props
        game["props"] = props.get(game_id,{})

        # Format lines for display
        r = game["lines"]
        game["lines_display"] = {
            "ml":     (f"{game['home']} {fmt(r['ml']['home'])} / "
                       f"{game['away']} {fmt(r['ml']['away'])}"),
            "spread": (f"{game['home']} "
                       f"{fmt_spread(r['spread']['homePoint'],r['spread']['home'])}"),
            "total":  (f"O/U {r['total']['point']} "
                       f"(Over {fmt(r['total']['over'])} / "
                       f"Under {fmt(r['total']['under'])})"),
            "raw": {
                "homeML":         r["ml"]["home"],
                "awayML":         r["ml"]["away"],
                "homeSpread":     r["spread"]["homePoint"],
                "homeSpreadOdds": r["spread"]["home"],
                "awaySpread":     r["spread"]["awayPoint"],
                "awaySpreadOdds": r["spread"]["away"],
                "total":          r["total"]["point"],
                "overOdds":       r["total"]["over"],
                "underOdds":      r["total"]["under"],
            }
        }

        merged[game_id] = game

    return merged

# ─────────────────────────────────────────────────────────
# WRITE games_data.js
# ─────────────────────────────────────────────────────────

def write_games_data(games):
    now  = datetime.now(timezone.utc).isoformat()
    data = {
        "fetched_at": now,
        "date":       datetime.now().strftime("%Y-%m-%d"),
        "games":      [],
    }

    for game_id, game in games.items():
        r = game["lines_display"]["raw"]
        data["games"].append({
            "id":            game_id,
            "home":          game["home"],
            "away":          game["away"],
            "time":          game["time"],
            "commence":      game["commence"],
            "starters":      game["starters"],
            "pitcher_stats": game["pitcher_stats"],
            "team_stats":    game["team_stats"],
            "lines": {
                "ml":      game["lines_display"]["ml"],
                "spread":  game["lines_display"]["spread"],
                "total":   game["lines_display"]["total"],
                "raw":     r,
            },
            "props":         game["props"],
        })

    data["games"].sort(key=lambda g: g["commence"])

    path = os.path.join(OUTPUT_DIR, "games_data.js")
    js   = json.dumps(data, indent=2, default=str)
    with open(path,"w") as f:
        f.write(f"const ODDS_DATA = {js};\n\n")
        f.write("if (typeof module !== 'undefined') "
                "module.exports = { ODDS_DATA };\n")

    return data

# ─────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--outdir", default=None)
    args, _ = parser.parse_known_args()

    global OUTPUT_DIR
    if args.outdir:
        OUTPUT_DIR = args.outdir
    elif os.environ.get("GITHUB_WORKSPACE"):
        OUTPUT_DIR = os.environ["GITHUB_WORKSPACE"]

    print("=" * 55)
    print("MLB Odds Fetcher — File Assembler")
    print(f"  Output dir: {OUTPUT_DIR}")
    print(f"  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 55)

    # Load all raw files
    print("\nLoading raw data files...")
    starters_raw    = load("starters_raw.json")
    odds_raw        = load("odds_raw.json")
    props_raw       = load("props_raw.json")
    pitcher_stats_r = load("pitcher_stats_raw.json")
    team_stats_r    = load("team_stats_raw.json")

    if not odds_raw:
        print("ERROR: odds_raw.json missing. Run workflow first.")
        sys.exit(1)

    # Parse each source
    print("\nParsing starters...")
    starters = parse_starters(starters_raw or {})

    print("\nParsing odds...")
    odds_games = parse_odds(odds_raw)
    if not odds_games:
        print("No games found for today.")
        sys.exit(0)

    print("\nParsing props...")
    props = parse_props(props_raw or {})

    # Merge everything
    print("\nMerging all data sources...")
    games = merge_all(
        odds_games,
        starters,
        pitcher_stats_r or {},
        team_stats_r or {},
        props,
    )

    # Validate pitcher stats populated
    missing = [g for g in games.values()
               if not g.get("pitcher_stats") or
               not g["pitcher_stats"].get("away") or
               not g["pitcher_stats"].get("home")]
    if missing:
        print(f"\n⚠ {len(missing)} games missing pitcher stats:")
        for g in missing:
            print(f"  {g['away']} @ {g['home']}")
    else:
        print(f"\n✓ Pitcher stats confirmed for all {len(games)} games")

    # Write output
    data = write_games_data(games)

    print(f"\n✓ games_data.js written")
    print(f"  {len(data['games'])} games")
    print(f"  fetched_at: {data['fetched_at'][:19]} UTC")

    # Summary
    print("\nGame summary:")
    for g in data["games"]:
        aw_era = g["pitcher_stats"].get("away",{}).get("era","?")
        hw_era = g["pitcher_stats"].get("home",{}).get("era","?")
        aw_nm  = g["starters"].get("away",{}).get("name","TBD")
        hw_nm  = g["starters"].get("home",{}).get("name","TBD")
        ts_ok  = "✓" if g.get("team_stats",{}).get("away") else "~"
        print(f"  {ts_ok} {g['away'][:3].upper()}@{g['home'][:3].upper()} "
              f"{g['time']}: {aw_nm} ERA {aw_era} vs {hw_nm} ERA {hw_era}")

    print("\n" + "=" * 55)
    print("Done. Next: python3 slate_builder.py")
    print("=" * 55)

if __name__ == "__main__":
    main()
