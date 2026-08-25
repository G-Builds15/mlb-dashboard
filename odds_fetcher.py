#!/usr/bin/env python3
"""
MLB Odds Fetcher — The Odds API
================================
Pulls today's MLB game lines and pitcher props, writes games_data.js
for the dashboard to consume.

Usage:
    python3 odds_fetcher.py

Run once in the morning and once ~1 hour before first pitch.
Output: games_data.js (same directory as this script)

Requires: requests  (pip install requests)
"""

import json
import sys
import os
from datetime import datetime, timezone
import requests

# ─────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────

API_KEY   = os.environ.get("ODDS_API_KEY", "d960b58d853f37465f40f99637f67c1c")
BASE_URL  = "https://api.the-odds-api.com/v4"
SPORT     = "baseball_mlb"
REGIONS   = "us"
ODDS_FMT  = "american"
DATE_FMT  = "iso"

# Sportsbooks to pull from (in priority order for display)
BOOKS = ["fanduel", "draftkings", "betmgm", "caesars"]

# Player prop markets to pull per pitcher
PITCHER_PROP_MARKETS = [
    "pitcher_strikeouts",
    "pitcher_earned_runs",
    "pitcher_walks",
    "pitcher_outs",
    "pitcher_hits_allowed",
]

OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "games_data.js")

# ─────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────

def get(url, params):
    """GET with error handling and quota reporting."""
    resp = requests.get(url, params=params, timeout=15)
    remaining = resp.headers.get("x-requests-remaining", "?")
    used = resp.headers.get("x-requests-used", "?")
    print(f"  [{resp.status_code}] {url.split('/')[-1]} | quota: {used} used, {remaining} remaining")
    if resp.status_code == 401:
        print("  ✗ Invalid API key — check API_KEY in odds_fetcher.py")
        sys.exit(1)
    if resp.status_code == 429:
        print("  ✗ Rate limit hit — try again in a minute")
        sys.exit(1)
    resp.raise_for_status()
    return resp.json()


def best_price(outcomes, name, book_priority=BOOKS):
    """
    Find the best available price for an outcome across books.
    Returns (price, book) for the best odds on the given side.
    For over: highest (least negative / most positive) odds.
    For under: same logic.
    """
    candidates = []
    for book in book_priority:
        for o in outcomes:
            if o.get("name", "").lower() == name.lower():
                # outcomes from event odds are per-bookmaker
                candidates.append(o.get("price", None))
                break
    # Filter None
    candidates = [c for c in candidates if c is not None]
    if not candidates:
        return None
    # Best odds: highest number (least negative or most positive)
    return max(candidates)


def american_to_str(price):
    if price is None:
        return "N/A"
    return f"+{price}" if price > 0 else str(price)


def fmt_spread(point, price):
    if point is None:
        return "N/A"
    sign = "+" if point > 0 else ""
    return f"{sign}{point} ({american_to_str(price)})"

# ─────────────────────────────────────────────────────────
# STEP 1 — FETCH TODAY'S GAMES + GAME LINES
# ─────────────────────────────────────────────────────────

def fetch_game_lines():
    """Pull h2h, spreads, totals for all MLB games today."""
    print("\n[1/3] Fetching game lines...")
    data = get(f"{BASE_URL}/sports/{SPORT}/odds/", {
        "apiKey": API_KEY,
        "regions": REGIONS,
        "markets": "h2h,spreads,totals",
        "oddsFormat": ODDS_FMT,
        "dateFormat": DATE_FMT,
    })

    games = {}
    for event in data:
        game_id  = event["id"]
        home     = event["home_team"]
        away     = event["away_team"]
        commence = event["commence_time"]

        # Parse start time to local ET display
        dt_utc = datetime.fromisoformat(commence.replace("Z", "+00:00"))
        dt_et  = dt_utc.astimezone(tz=None)  # local tz
        time_str = dt_et.strftime("%-I:%M %p ET")

        lines = {
            "ml":       {"home": None, "away": None, "book": None},
            "spread":   {"home": None, "away": None, "homePoint": None, "awayPoint": None},
            "total":    {"over": None, "under": None, "point": None},
            "movement": [],
        }

        for bookmaker in event.get("bookmakers", []):
            bk = bookmaker["key"]
            if bk not in BOOKS:
                continue
            for market in bookmaker.get("markets", []):
                key = market["key"]
                outcomes = market["outcomes"]

                if key == "h2h":
                    for o in outcomes:
                        if o["name"] == home and lines["ml"]["home"] is None:
                            lines["ml"]["home"] = o["price"]
                            lines["ml"]["book"] = bk
                        elif o["name"] == away and lines["ml"]["away"] is None:
                            lines["ml"]["away"] = o["price"]

                elif key == "spreads":
                    for o in outcomes:
                        if o["name"] == home and lines["spread"]["home"] is None:
                            lines["spread"]["home"] = o["price"]
                            lines["spread"]["homePoint"] = o.get("point")
                        elif o["name"] == away and lines["spread"]["away"] is None:
                            lines["spread"]["away"] = o["price"]
                            lines["spread"]["awayPoint"] = o.get("point")

                elif key == "totals":
                    for o in outcomes:
                        if o["name"] == "Over" and lines["total"]["over"] is None:
                            lines["total"]["over"] = o["price"]
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
        }

    print(f"  Found {len(games)} games")
    return games


# ─────────────────────────────────────────────────────────
# STEP 2 — FETCH EVENT IDs FOR PLAYER PROPS
# ─────────────────────────────────────────────────────────

def fetch_events():
    """Get event IDs needed for player prop calls."""
    print("\n[2/3] Fetching event list for props...")
    data = get(f"{BASE_URL}/sports/{SPORT}/events/", {
        "apiKey": API_KEY,
        "dateFormat": DATE_FMT,
    })
    return {e["id"]: e for e in data}


# ─────────────────────────────────────────────────────────
# STEP 3 — FETCH PLAYER PROPS PER GAME
# ─────────────────────────────────────────────────────────

def fetch_props_for_game(event_id):
    """
    Pull all pitcher prop markets for a single game.
    Returns dict: { market_key: { player_name: {over, under, point} } }
    """
    markets_str = ",".join(PITCHER_PROP_MARKETS)
    try:
        data = get(f"{BASE_URL}/sports/{SPORT}/events/{event_id}/odds/", {
            "apiKey":     API_KEY,
            "regions":    REGIONS,
            "markets":    markets_str,
            "oddsFormat": ODDS_FMT,
            "dateFormat": DATE_FMT,
        })
    except Exception as e:
        print(f"    Props fetch failed for {event_id}: {e}")
        return {}

    props = {}
    for bookmaker in data.get("bookmakers", []):
        bk = bookmaker["key"]
        if bk not in BOOKS:
            continue
        for market in bookmaker.get("markets", []):
            mkey = market["key"]
            if mkey not in props:
                props[mkey] = {}
            for outcome in market["outcomes"]:
                player = outcome.get("description", outcome.get("name", ""))
                direction = outcome["name"].lower()  # 'over' or 'under'
                price = outcome["price"]
                point = outcome.get("point")
                if player not in props[mkey]:
                    props[mkey][player] = {"point": point, "over": None, "under": None, "books": {}}
                props[mkey][player][direction] = price
                props[mkey][player]["books"][bk] = {"price": price, "direction": direction}

    return props


# ─────────────────────────────────────────────────────────
# STEP 4 — BUILD OUTPUT STRUCTURE
# ─────────────────────────────────────────────────────────

def build_output(games, props_by_game):
    """Assemble the final data structure for games_data.js."""
    now = datetime.now(timezone.utc).isoformat()
    output = {
        "fetched_at": now,
        "date":       datetime.now().strftime("%Y-%m-%d"),
        "games":      []
    }

    for game_id, game in games.items():
        ln = game["lines"]
        props = props_by_game.get(game_id, {})

        # Format line summary for overview card
        home_ml = american_to_str(ln["ml"]["home"])
        away_ml = american_to_str(ln["ml"]["away"])
        home_rl = fmt_spread(ln["spread"]["homePoint"], ln["spread"]["home"])
        away_rl = fmt_spread(ln["spread"]["awayPoint"], ln["spread"]["away"])
        total_pt = ln["total"]["point"]
        total_ov = american_to_str(ln["total"]["over"])
        total_un = american_to_str(ln["total"]["under"])

        game_out = {
            "id":       game_id,
            "home":     game["home"],
            "away":     game["away"],
            "time":     game["time"],
            "commence": game["commence"],
            "lines": {
                "ml":     f"{game['home']} {home_ml} / {game['away']} {away_ml}",
                "spread": f"{game['home']} {home_rl} / {game['away']} {away_rl}",
                "total":  f"O/U {total_pt} (Over {total_ov} / Under {total_un})",
                "raw": {
                    "homeML":    ln["ml"]["home"],
                    "awayML":    ln["ml"]["away"],
                    "homeSpread": ln["spread"]["homePoint"],
                    "homeSpreadOdds": ln["spread"]["home"],
                    "awaySpread": ln["spread"]["awayPoint"],
                    "awaySpreadOdds": ln["spread"]["away"],
                    "total":     total_pt,
                    "overOdds":  ln["total"]["over"],
                    "underOdds": ln["total"]["under"],
                }
            },
            "props": {}
        }

        # Format props by player
        for market_key, players in props.items():
            for player_name, pdata in players.items():
                if player_name not in game_out["props"]:
                    game_out["props"][player_name] = {}
                game_out["props"][player_name][market_key] = {
                    "point": pdata["point"],
                    "over":  pdata["over"],
                    "under": pdata["under"],
                    "overStr":  american_to_str(pdata["over"]),
                    "underStr": american_to_str(pdata["under"]),
                }

        output["games"].append(game_out)

    # Sort by commence time
    output["games"].sort(key=lambda g: g["commence"])
    return output


# ─────────────────────────────────────────────────────────
# STEP 5 — WRITE games_data.js
# ─────────────────────────────────────────────────────────

def write_output(data):
    """Write JS file that the dashboard loads via <script src>."""
    js = f"""// AUTO-GENERATED by odds_fetcher.py
// Fetched: {data['fetched_at']}
// Date: {data['date']}
// Do not edit manually — re-run odds_fetcher.py to update

const ODDS_DATA = {json.dumps(data, indent=2)};

// Helper: get line for a specific game by home+away team names
function getGameOdds(homeTeam, awayTeam) {{
  return ODDS_DATA.games.find(g =>
    g.home.includes(homeTeam) || g.away.includes(awayTeam)
  ) || null;
}}

// Helper: get prop line for a specific player and market
// market: 'pitcher_strikeouts' | 'pitcher_earned_runs' | 'pitcher_walks' | 'pitcher_outs' | 'pitcher_hits_allowed'
function getPropLine(gameId, playerName, market) {{
  const game = ODDS_DATA.games.find(g => g.id === gameId);
  if (!game) return null;
  // fuzzy match on last name
  const lastName = playerName.split(' ').pop().toLowerCase();
  const playerKey = Object.keys(game.props).find(k =>
    k.toLowerCase().includes(lastName)
  );
  if (!playerKey) return null;
  return game.props[playerKey][market] || null;
}}
"""
    with open(OUTPUT_FILE, "w") as f:
        f.write(js)
    print(f"\n  ✓ Written: {OUTPUT_FILE}")
    print(f"    {len(data['games'])} games, props for {sum(len(g['props']) for g in data['games'])} players")


# ─────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────

def write_starters_to_slate(starters):
    """
    Inject confirmed starters into slate_data.js.
    Updates the `starters:` field in each game object.
    """
    slate_path = os.path.join(os.path.dirname(__file__), "slate_data.js")
    if not os.path.exists(slate_path):
        print(f"  ⚑ slate_data.js not found at {slate_path} — skipping starter injection")
        return

    with open(slate_path) as f:
        slate = f.read()

    injected = 0
    for _, s in starters.items():
        away = s["away"]
        home = s["home"]
        if not away["confirmed"] and not home["confirmed"]:
            continue

        away_str = f"{away['name']} ({away['hand']}HP)" if away["confirmed"] else "TBD"
        home_str = f"{home['name']} ({home['hand']}HP)" if home["confirmed"] else "TBD"
        starter_line = f"{away_str} vs {home_str}"

        # Find and replace the starters field for this matchup
        # Match pattern: starters:"...", with the away/home team names nearby
        away_abbr = s["away_team"].split()[-1][:3].upper()
        home_abbr = s["home_team"].split()[-1][:3].upper()

        import re
        # Find game block containing both team names then update starters field
        pattern = rf'(away:"{re.escape(s["away_team"])}".*?starters:")([^"]*?)(")'
        replacement = r'\g<1>' + re.escape(starter_line) + r'\g<3>'
        new_slate, count = re.subn(pattern, replacement, slate, flags=re.DOTALL)
        if count:
            slate = new_slate
            injected += 1
            print(f"  ✓ Injected: {starter_line}")

    with open(slate_path, "w") as f:
        f.write(slate)
    print(f"  Updated {injected} game(s) in slate_data.js")


def main():
    print("=" * 55)
    print("MLB Odds Fetcher + Starters — The Odds API + MLB Stats API")
    print(f"  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 55)

    # Step 0: confirmed starters from MLB Stats API (primary source)
    today = datetime.now().strftime("%Y-%m-%d")
    starters = fetch_probable_starters(today)
    write_starters_summary(starters)

    # Step 1: game lines
    games = fetch_game_lines()
    if not games:
        print("No games found for today. Exiting.")
        sys.exit(0)

    # Merge starters into games
    games = merge_starters_into_games(games, starters)

    # Step 2: event list (for props endpoint)
    events = fetch_events()

    # Step 3: props per game
    print("\n[3/3] Fetching player props per game...")
    props_by_game = {}
    for game_id in games:
        if game_id in events:
            print(f"  {games[game_id]['away']} @ {games[game_id]['home']}")
            props_by_game[game_id] = fetch_props_for_game(game_id)
        else:
            props_by_game[game_id] = {}

    # Step 4: build output
    data = build_output(games, props_by_game)

    # Step 5: write games_data.js (odds + props)
    write_output(data)

    # Step 6: inject starters into slate_data.js
    print("\n[+] Injecting confirmed starters into slate_data.js...")
    write_starters_to_slate(starters)

    print("\n" + "=" * 55)
    print("Done.")
    print("  games_data.js  — live lines + props (auto-injected into dashboard)")
    print("  slate_data.js  — starters updated from MLB Stats API")
    print("Tip: run again ~1 hour before first pitch for final lines.")
    print("=" * 55)


if __name__ == "__main__":
    main()


# ─────────────────────────────────────────────────────────
# STEP 0 — FETCH PROBABLE STARTERS FROM MLB STATS API
# Primary source: statsapi.mlb.com (official MLB data)
# No auth required. Updates in real time.
# ─────────────────────────────────────────────────────────

def fetch_probable_starters(date_str=None):
    """
    Pull today's confirmed probable pitchers from the official MLB Stats API.
    
    @param date_str  Date in YYYY-MM-DD format. Defaults to today.
    @returns dict mapping "Away @ Home" → { away: {...}, home: {...} }
    """
    if date_str is None:
        date_str = datetime.now().strftime('%Y-%m-%d')
    
    url = "https://statsapi.mlb.com/api/v1/schedule"
    params = {
        "sportId":   1,
        "date":      date_str,
        "hydrate":   "probablesPitcher(note),team,linescore",
        "language":  "en",
    }
    
    print(f"\n[0/3] Fetching probable starters from MLB Stats API ({date_str})...")
    
    try:
        resp = requests.get(url, params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        print(f"  ✗ MLB Stats API failed: {e}")
        return {}
    
    starters = {}
    total_games = 0
    confirmed = 0
    
    for date_entry in data.get("dates", []):
        for game in date_entry.get("games", []):
            total_games += 1
            
            away_team = game["teams"]["away"]["team"]["name"]
            home_team = game["teams"]["home"]["team"]["name"]
            game_key  = f"{away_team} @ {home_team}"
            game_pk   = game["gamePk"]
            
            away_prob = game["teams"]["away"].get("probablePitcher")
            home_prob = game["teams"]["home"].get("probablePitcher")
            
            def extract_pitcher(prob):
                if not prob:
                    return {"name": "TBD", "id": None, "hand": "?", "confirmed": False}
                return {
                    "name":      prob.get("fullName", "TBD"),
                    "id":        prob.get("id"),
                    "hand":      prob.get("pitchHand", {}).get("code", "?"),
                    "confirmed": bool(prob.get("fullName")),
                }
            
            away_starter = extract_pitcher(away_prob)
            home_starter = extract_pitcher(home_prob)
            
            if away_starter["confirmed"] or home_starter["confirmed"]:
                confirmed += 1
            
            starters[game_pk] = {
                "gamePk":    game_pk,
                "away_team": away_team,
                "home_team": home_team,
                "game_key":  game_key,
                "away":      away_starter,
                "home":      home_starter,
                "status":    game.get("status", {}).get("detailedState", "Unknown"),
                "time":      game.get("gameDate", ""),
            }
            
            away_name = away_starter["name"]
            home_name = home_starter["name"]
            status_note = "✓" if (away_starter["confirmed"] and home_starter["confirmed"]) else "⚑ TBD"
            print(f"  {status_note}  {away_team} @ {home_team}: {away_name} vs {home_name}")
    
    print(f"  {total_games} games · {confirmed} with at least one confirmed starter")
    return starters


def merge_starters_into_games(games, starters):
    """
    Merge confirmed starter data into game objects from fetch_game_lines().
    Matches by team name.
    """
    for game_pk, starter_data in starters.items():
        for game_id, game in games.items():
            if (game["home"] in starter_data["home_team"] or 
                starter_data["home_team"] in game["home"]) and \
               (game["away"] in starter_data["away_team"] or 
                starter_data["away_team"] in game["away"]):
                game["starters"] = {
                    "away": starter_data["away"],
                    "home": starter_data["home"],
                    "source": "MLB Stats API (statsapi.mlb.com)",
                }
                break
    return games


def write_starters_summary(starters):
    """Print a clean confirmed starters summary."""
    print("\n" + "=" * 55)
    print("CONFIRMED STARTERS — MLB Stats API")
    print("=" * 55)
    for _, s in sorted(starters.items(), key=lambda x: x[1]["time"]):
        a = s["away"]
        h = s["home"]
        a_str = f"{a['name']} ({a['hand']}HP)" if a["confirmed"] else "TBD"
        h_str = f"{h['name']} ({h['hand']}HP)" if h["confirmed"] else "TBD"
        print(f"  {s['away_team']:<22} @ {s['home_team']:<22}")
        print(f"    {a_str:<28} vs {h_str}")
    print()
