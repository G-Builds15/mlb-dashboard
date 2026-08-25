#!/usr/bin/env python3
"""
MLB Odds Fetcher
=================
Pulls today's confirmed starters (MLB Stats API) and live lines +
player props (The Odds API), then writes:
  - games_data.js   (odds + props)
  - slate_data.js   (starter names updated in place)

Usage:
    python3 odds_fetcher.py
"""

import json
import os
import re
import sys
from datetime import datetime, timezone

import requests

# ─────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────

API_KEY  = os.environ.get("ODDS_API_KEY", "d960b58d853f37465f40f99637f67c1c")
BASE_URL = "https://api.the-odds-api.com/v4"
SPORT    = "baseball_mlb"
REGIONS  = "us"
ODDS_FMT = "american"
DATE_FMT = "iso"

BOOKS = ["fanduel", "draftkings", "betmgm", "caesars"]

PITCHER_PROP_MARKETS = [
    "pitcher_strikeouts",
    "pitcher_earned_runs",
    "pitcher_walks",
    "pitcher_outs",
    "pitcher_hits_allowed",
]

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
ODDS_FILE  = os.path.join(OUTPUT_DIR, "games_data.js")
SLATE_FILE = os.path.join(OUTPUT_DIR, "slate_data.js")

# ─────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────

def odds_get(url, params):
    resp = requests.get(url, params=params, timeout=15)
    remaining = resp.headers.get("x-requests-remaining", "?")
    used      = resp.headers.get("x-requests-used", "?")
    print(f"  [{resp.status_code}] {url.split('/')[-1].split('?')[0]} "
          f"| quota: {used} used, {remaining} remaining")
    if resp.status_code == 401:
        print("  ERROR: Invalid API key")
        sys.exit(1)
    if resp.status_code == 429:
        print("  ERROR: Rate limit hit")
        sys.exit(1)
    resp.raise_for_status()
    return resp.json()


def fmt(n):
    if n is None:
        return "N/A"
    return f"+{n}" if n > 0 else str(n)


def fmt_spread(point, price):
    if point is None:
        return "N/A"
    sign = "+" if point > 0 else ""
    return f"{sign}{point} ({fmt(price)})"


# ─────────────────────────────────────────────────────────
# STEP 0 — MLB STATS API: CONFIRMED STARTERS
# ─────────────────────────────────────────────────────────

def fetch_probable_starters(date_str=None):
    if date_str is None:
        date_str = datetime.now().strftime("%Y-%m-%d")

    url = "https://statsapi.mlb.com/api/v1/schedule"
    params = {
        "sportId":  1,
        "date":     date_str,
        "hydrate":  "probablesPitcher(note),team,linescore",
        "language": "en",
    }

    print(f"\n[0/3] Fetching probable starters — MLB Stats API ({date_str})...")

    try:
        resp = requests.get(url, params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        print(f"  WARNING: MLB Stats API failed: {e}")
        return {}

    starters    = {}
    total       = 0
    confirmed   = 0

    for date_entry in data.get("dates", []):
        for game in date_entry.get("games", []):
            total += 1
            away_team = game["teams"]["away"]["team"]["name"]
            home_team = game["teams"]["home"]["team"]["name"]
            game_pk   = game["gamePk"]

            def extract(prob):
                if not prob:
                    return {"name": "TBD", "id": None, "hand": "?", "confirmed": False}
                return {
                    "name":      prob.get("fullName", "TBD"),
                    "id":        prob.get("id"),
                    "hand":      prob.get("pitchHand", {}).get("code", "?"),
                    "confirmed": bool(prob.get("fullName")),
                }

            away_s = extract(game["teams"]["away"].get("probablePitcher"))
            home_s = extract(game["teams"]["home"].get("probablePitcher"))

            if away_s["confirmed"] or home_s["confirmed"]:
                confirmed += 1

            starters[game_pk] = {
                "gamePk":    game_pk,
                "away_team": away_team,
                "home_team": home_team,
                "away":      away_s,
                "home":      home_s,
                "status":    game.get("status", {}).get("detailedState", "Unknown"),
                "time":      game.get("gameDate", ""),
            }

            ok = "OK" if (away_s["confirmed"] and home_s["confirmed"]) else "--"
            print(f"  [{ok}] {away_team} @ {home_team}: "
                  f"{away_s['name']} vs {home_s['name']}")

    print(f"  {total} games, {confirmed} with confirmed starters")
    return starters


def write_starters_summary(starters):
    print("\n" + "=" * 55)
    print("CONFIRMED STARTERS")
    print("=" * 55)
    for _, s in sorted(starters.items(), key=lambda x: x[1]["time"]):
        a     = s["away"]
        h     = s["home"]
        a_str = f"{a['name']} ({a['hand']}HP)" if a["confirmed"] else "TBD"
        h_str = f"{h['name']} ({h['hand']}HP)" if h["confirmed"] else "TBD"
        print(f"  {s['away_team']:<25} @ {s['home_team']}")
        print(f"    {a_str:<32} vs {h_str}")
    print()


# ─────────────────────────────────────────────────────────
# STEP 1 — ODDS API: GAME LINES
# ─────────────────────────────────────────────────────────

def fetch_game_lines():
    print("\n[1/3] Fetching game lines — The Odds API...")
    data = odds_get(f"{BASE_URL}/sports/{SPORT}/odds/", {
        "apiKey":     API_KEY,
        "regions":    REGIONS,
        "markets":    "h2h,spreads,totals",
        "oddsFormat": ODDS_FMT,
        "dateFormat": DATE_FMT,
    })

    games = {}
    for event in data:
        game_id  = event["id"]
        home     = event["home_team"]
        away     = event["away_team"]
        commence = event["commence_time"]

        dt_utc   = datetime.fromisoformat(commence.replace("Z", "+00:00"))
        dt_et    = dt_utc.astimezone(tz=None)
        time_str = dt_et.strftime("%-I:%M %p ET")

        lines = {
            "ml":     {"home": None, "away": None},
            "spread": {"home": None, "away": None,
                       "homePoint": None, "awayPoint": None},
            "total":  {"over": None, "under": None, "point": None},
        }

        for bk in event.get("bookmakers", []):
            if bk["key"] not in BOOKS:
                continue
            for market in bk.get("markets", []):
                key = market["key"]
                outcomes = market["outcomes"]
                if key == "h2h":
                    for o in outcomes:
                        if o["name"] == home and lines["ml"]["home"] is None:
                            lines["ml"]["home"] = o["price"]
                        elif o["name"] == away and lines["ml"]["away"] is None:
                            lines["ml"]["away"] = o["price"]
                elif key == "spreads":
                    for o in outcomes:
                        if o["name"] == home and lines["spread"]["home"] is None:
                            lines["spread"]["home"]      = o["price"]
                            lines["spread"]["homePoint"] = o.get("point")
                        elif o["name"] == away and lines["spread"]["away"] is None:
                            lines["spread"]["away"]      = o["price"]
                            lines["spread"]["awayPoint"] = o.get("point")
                elif key == "totals":
                    for o in outcomes:
                        if o["name"] == "Over" and lines["total"]["over"] is None:
                            lines["total"]["over"]  = o["price"]
                            lines["total"]["point"] = o.get("point")
                        elif o["name"] == "Under" and lines["total"]["under"] is None:
                            lines["total"]["under"] = o["price"]

        games[game_id] = {
            "id":       game_id,
            "home":     home,
            "away":     away,
            "time":     time_str,
            "commence": commence,
            "lines":    lines,
            "starters": {
                "away": {"name": "TBD"},
                "home": {"name": "TBD"},
                "source": "pending",
            },
        }

    print(f"  Found {len(games)} games")
    return games


# ─────────────────────────────────────────────────────────
# STEP 2 — ODDS API: EVENT LIST
# ─────────────────────────────────────────────────────────

def fetch_events():
    print("\n[2/3] Fetching event list...")
    data = odds_get(f"{BASE_URL}/sports/{SPORT}/events/", {
        "apiKey":     API_KEY,
        "dateFormat": DATE_FMT,
    })
    return {e["id"]: e for e in data}


# ─────────────────────────────────────────────────────────
# STEP 3 — ODDS API: PLAYER PROPS
# ─────────────────────────────────────────────────────────

def fetch_props_for_game(event_id):
    try:
        data = odds_get(
            f"{BASE_URL}/sports/{SPORT}/events/{event_id}/odds/", {
                "apiKey":     API_KEY,
                "regions":    REGIONS,
                "markets":    ",".join(PITCHER_PROP_MARKETS),
                "oddsFormat": ODDS_FMT,
                "dateFormat": DATE_FMT,
            })
    except Exception as e:
        print(f"    Props failed: {e}")
        return {}

    props = {}
    for bk in data.get("bookmakers", []):
        if bk["key"] not in BOOKS:
            continue
        for market in bk.get("markets", []):
            mkey = market["key"]
            if mkey not in props:
                props[mkey] = {}
            for outcome in market["outcomes"]:
                player    = outcome.get("description", outcome.get("name", ""))
                direction = outcome["name"].lower()
                price     = outcome["price"]
                point     = outcome.get("point")
                if player not in props[mkey]:
                    props[mkey][player] = {
                        "point": point, "over": None, "under": None
                    }
                props[mkey][player][direction] = price

    return props


# ─────────────────────────────────────────────────────────
# MERGE STARTERS INTO GAMES
# ─────────────────────────────────────────────────────────

def merge_starters_into_games(games, starters):
    for _, s in starters.items():
        for game_id, game in games.items():
            if ((game["home"] in s["home_team"] or s["home_team"] in game["home"]) and
                    (game["away"] in s["away_team"] or s["away_team"] in game["away"])):
                game["starters"] = {
                    "away":   s["away"],
                    "home":   s["home"],
                    "source": "MLB Stats API (statsapi.mlb.com)",
                }
                break
    return games


# ─────────────────────────────────────────────────────────
# BUILD OUTPUT
# ─────────────────────────────────────────────────────────

def build_output(games, props_by_game):
    now    = datetime.now(timezone.utc).isoformat()
    output = {
        "fetched_at": now,
        "date":       datetime.now().strftime("%Y-%m-%d"),
        "games":      [],
    }

    for game_id, game in games.items():
        ln    = game["lines"]
        props = props_by_game.get(game_id, {})

        r = {
            "homeML":         ln["ml"]["home"],
            "awayML":         ln["ml"]["away"],
            "homeSpread":     ln["spread"]["homePoint"],
            "homeSpreadOdds": ln["spread"]["home"],
            "awaySpread":     ln["spread"]["awayPoint"],
            "awaySpreadOdds": ln["spread"]["away"],
            "total":          ln["total"]["point"],
            "overOdds":       ln["total"]["over"],
            "underOdds":      ln["total"]["under"],
        }

        game_out = {
            "id":       game_id,
            "home":     game["home"],
            "away":     game["away"],
            "time":     game["time"],
            "commence": game["commence"],
            "starters": game.get("starters", {}),
            "lines": {
                "ml":  (f"{game['home']} {fmt(r['homeML'])} / "
                        f"{game['away']} {fmt(r['awayML'])}"),
                "spread": (f"{game['home']} "
                           f"{fmt_spread(r['homeSpread'], r['homeSpreadOdds'])}"),
                "total": (f"O/U {r['total']} "
                          f"(Over {fmt(r['overOdds'])} / Under {fmt(r['underOdds'])})"),
                "raw": r,
            },
            "props": {},
        }

        for market_key, players in props.items():
            for player_name, pdata in players.items():
                if player_name not in game_out["props"]:
                    game_out["props"][player_name] = {}
                game_out["props"][player_name][market_key] = {
                    "point":    pdata["point"],
                    "over":     pdata["over"],
                    "under":    pdata["under"],
                    "overStr":  fmt(pdata["over"]),
                    "underStr": fmt(pdata["under"]),
                }

        output["games"].append(game_out)

    output["games"].sort(key=lambda g: g["commence"])
    return output


# ─────────────────────────────────────────────────────────
# WRITE games_data.js
# ─────────────────────────────────────────────────────────

def write_odds_file(data):
    js = (
        "// AUTO-GENERATED by odds_fetcher.py — do not edit manually\n"
        f"// Fetched: {data['fetched_at']}\n"
        f"// Date:    {data['date']}\n\n"
        f"const ODDS_DATA = {json.dumps(data, indent=2)};\n\n"
        "function getGameOdds(homeTeam, awayTeam) {\n"
        "  return ODDS_DATA.games.find(g =>\n"
        "    g.home.includes(homeTeam) || g.away.includes(awayTeam)\n"
        "  ) || null;\n"
        "}\n\n"
        "function getPropLine(gameId, playerName, market) {\n"
        "  const game = ODDS_DATA.games.find(g => g.id === gameId);\n"
        "  if (!game) return null;\n"
        "  const lastName = playerName.split(' ').pop().toLowerCase();\n"
        "  const playerKey = Object.keys(game.props || {}).find(k =>\n"
        "    k.toLowerCase().includes(lastName)\n"
        "  );\n"
        "  if (!playerKey) return null;\n"
        "  return game.props[playerKey][market] || null;\n"
        "}\n"
    )
    with open(ODDS_FILE, "w") as f:
        f.write(js)
    print(f"\n  Written: {ODDS_FILE}")
    print(f"  {len(data['games'])} games, "
          f"props for {sum(len(g['props']) for g in data['games'])} players")


# ─────────────────────────────────────────────────────────
# INJECT STARTERS INTO slate_data.js
# ─────────────────────────────────────────────────────────

def inject_starters_into_slate(starters):
    if not os.path.exists(SLATE_FILE):
        print(f"  WARNING: {SLATE_FILE} not found — skipping")
        return

    with open(SLATE_FILE) as f:
        slate = f.read()

    injected = 0
    for _, s in starters.items():
        away = s["away"]
        home = s["home"]
        if not away["confirmed"] and not home["confirmed"]:
            continue

        a_str = (f"{away['name']} ({away['hand']}HP)"
                 if away["confirmed"] else "TBD")
        h_str = (f"{home['name']} ({home['hand']}HP)"
                 if home["confirmed"] else "TBD")
        starter_line = f"{a_str} vs {h_str}"

        pattern   = (r'(away:"' + re.escape(s["away_team"]) +
                     r'".*?starters:")([^"]*?)(")')
        new_slate = re.sub(
            pattern,
            lambda m: m.group(1) + starter_line + m.group(3),
            slate,
            flags=re.DOTALL,
        )
        if new_slate != slate:
            slate     = new_slate
            injected += 1
            print(f"  OK: {s['away_team']} @ {s['home_team']}: {starter_line}")

    with open(SLATE_FILE, "w") as f:
        f.write(slate)
    print(f"  {injected} game(s) updated in slate_data.js")


# ─────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────

def main():
    print("=" * 55)
    print("MLB Odds Fetcher + Starters")
    print(f"  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 55)

    # 0. Confirmed starters — MLB Stats API
    today    = datetime.now().strftime("%Y-%m-%d")
    starters = fetch_probable_starters(today)
    write_starters_summary(starters)

    # 1. Game lines — The Odds API
    games = fetch_game_lines()
    if not games:
        print("No games found. Exiting.")
        sys.exit(0)

    games = merge_starters_into_games(games, starters)

    # 2. Event list
    events = fetch_events()

    # 3. Player props
    print("\n[3/3] Fetching player props per game...")
    props_by_game = {}
    for game_id in games:
        if game_id in events:
            g = games[game_id]
            print(f"  {g['away']} @ {g['home']}")
            props_by_game[game_id] = fetch_props_for_game(game_id)
        else:
            props_by_game[game_id] = {}

    # 4. Write games_data.js
    data = build_output(games, props_by_game)
    write_odds_file(data)

    # 5. Inject starters into slate_data.js
    print("\n[+] Injecting starters into slate_data.js...")
    inject_starters_into_slate(starters)

    print("\n" + "=" * 55)
    print("Done.")
    print(f"  games_data.js — {len(data['games'])} games")
    print(f"  slate_data.js — starters updated")
    print("Tip: run again ~1 hour before first pitch.")
    print("=" * 55)


if __name__ == "__main__":
    main()
