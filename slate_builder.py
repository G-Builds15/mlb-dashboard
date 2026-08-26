#!/usr/bin/env python3
"""
slate_builder.py
================
Reads games_data.js (written by odds_fetcher.py) and generates
a complete slate_data.js with:
  - const games  — game objects with overview, pitcher, batter tabs
  - const bestBets — graded picks sorted by grade

Run after odds_fetcher.py:
    python3 odds_fetcher.py && python3 slate_builder.py

Or via GitHub Actions — see update_odds.yml
"""

import json
import math
import os
import re
import sys
from datetime import datetime

# ─────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────

OUTPUT_DIR      = os.path.dirname(os.path.abspath(__file__))
GAMES_DATA_FILE = os.path.join(OUTPUT_DIR, "games_data.js")
SLATE_FILE      = os.path.join(OUTPUT_DIR, "slate_data.js")

MLB_AVG_ERA = 4.20
SAMPLE_MIN_B_PLUS = 25   # min PA for B+ grade
SAMPLE_MIN_B      = 15   # min PA for B grade

PARK_FACTORS = {
    "Comerica Park":          0.96,
    "Petco Park":             0.92,
    "Oracle Park":            0.88,
    "T-Mobile Park":          0.95,
    "Coors Field":            1.35,
    "loanDepot park":         1.12,
    "Truist Park":            1.08,
    "Fenway Park":            1.08,
    "Yankee Stadium":         1.05,
    "Nationals Park":         1.02,
    "Sutter Health Park":     1.00,
    "Busch Stadium":          0.98,
    "Chase Field":            1.02,
    "Rogers Centre":          1.00,
    "Citi Field":             0.97,
    "Rate Field":             1.00,
    "Angel Stadium":          0.97,
    "Globe Life Field":       1.01,
    "American Family Field":  1.00,
    "Wrigley Field":          1.04,
    "Dodger Stadium":         1.00,
    "PNC Park":               0.96,
    "Great American Ball Park": 1.06,
    "Citizens Bank Park":     1.05,
    "Kauffman Stadium":       1.00,
    "Guaranteed Rate Field":  1.01,
    "Target Field":           0.98,
    "Minute Maid Park":       1.01,
}

GRADE_ORDER = {"A+":0,"A":1,"A-":2,"B+":3,"B":4,"B-":5,"C+":6,"C":7,"C-":8}

# ─────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────

def get_park_factor(venue):
    for key, val in PARK_FACTORS.items():
        if key.lower() in (venue or "").lower():
            return val
    return 1.00


def fmt_odds(n):
    if n is None:
        return "TBD"
    return f"+{n}" if n > 0 else str(n)


def ml_to_implied(ml):
    if ml is None:
        return 0.5
    if ml > 0:
        return 100 / (ml + 100)
    return abs(ml) / (abs(ml) + 100)


def win_prob_from_run_diff(run_diff):
    return 1 / (1 + math.exp(-0.37 * run_diff))


def project_runs(l5_rpg, pitcher_era, pitcher_avg_ip, bullpen_era, park):
    starter_runs = (pitcher_era / 9) * pitcher_avg_ip
    bullpen_inns = max(0, 9 - pitcher_avg_ip)
    bullpen_runs = (bullpen_era / 9) * bullpen_inns
    raw          = starter_runs + bullpen_runs
    park_adj     = raw * park
    blended      = (park_adj * 0.60) + (l5_rpg * park * 0.40)
    return round(blended, 2)


def era_to_grade(blended_era):
    if blended_era <= 2.80: return "A-"
    if blended_era <= 3.30: return "B+"
    if blended_era <= 3.90: return "B"
    if blended_era <= 4.50: return "B-"
    return "C+"


def pitcher_recency_blend(season_era, l5_era, l3_era):
    l5  = l5_era  if l5_era  is not None else season_era
    l3  = l3_era  if l3_era  is not None else season_era
    return round(season_era * 0.50 + l5 * 0.30 + l3 * 0.20, 2)


def xwoba_to_grade(xwoba, pa):
    if pa < SAMPLE_MIN_B:
        return None  # insufficient sample
    if xwoba <= 0.220: return "A-" if pa >= SAMPLE_MIN_B_PLUS else "B+"
    if xwoba <= 0.270: return "B+" if pa >= SAMPLE_MIN_B_PLUS else "B"
    if xwoba <= 0.320: return "B"
    if xwoba <= 0.360: return "B-"
    return None  # hittable — used for batter props not pitcher props


def bb9_modifier(avg_ip, bb9):
    """Reduce projected avgIP for high walk rates."""
    if bb9 <= 3.0:
        return avg_ip, None
    steps      = (bb9 - 3.0) / 0.5
    reduction  = round(steps * 0.2, 1)
    adjusted   = round(max(3.0, avg_ip - reduction), 1)
    flag = f"BB/9: {bb9:.1f} — IP reduced {avg_ip}→{adjusted}" if reduction > 0 else None
    return adjusted, flag


def score_to_grade(score, max_score):
    pct = score / max_score if max_score > 0 else 0
    if pct >= 0.85: return "A-"
    if pct >= 0.65: return "B+"
    if pct >= 0.45: return "B"
    if pct >= 0.28: return "B-"
    return "C+"


# ─────────────────────────────────────────────────────────
# LOAD games_data.js
# ─────────────────────────────────────────────────────────

def load_games_data():
    if not os.path.exists(GAMES_DATA_FILE):
        print(f"ERROR: {GAMES_DATA_FILE} not found. Run odds_fetcher.py first.")
        sys.exit(1)

    with open(GAMES_DATA_FILE) as f:
        raw = f.read()

    # Extract the JSON object from the JS file
    match = re.search(r'const ODDS_DATA = ({.*?});\n', raw, re.DOTALL)
    if not match:
        print("ERROR: Could not parse ODDS_DATA from games_data.js")
        sys.exit(1)

    try:
        data = json.loads(match.group(1))
    except json.JSONDecodeError as e:
        print(f"ERROR: JSON parse failed: {e}")
        sys.exit(1)

    print(f"Loaded {len(data['games'])} games from games_data.js")
    print(f"Fetched: {data.get('fetched_at', 'unknown')}")
    return data


# ─────────────────────────────────────────────────────────
# GRADE PITCHER PROPS
# ─────────────────────────────────────────────────────────

def grade_pitcher_props(game, pitcher_side, park):
    """
    Grade K, ER, BB, and outs props for a pitcher.
    Returns list of card dicts.
    """
    cards   = []
    stats   = game.get("pitcher_stats", {}).get(pitcher_side, {})
    starter = game.get("starters", {}).get(pitcher_side, {})
    props   = game.get("props", {})

    if not stats or not starter.get("name"):
        return cards

    name      = starter["name"]
    hand      = starter.get("hand", "?")
    era       = stats.get("era", 4.20)
    l5_era    = stats.get("l5ERA") or era
    l3_era    = stats.get("l3ERA") or era
    k9        = stats.get("k9", 8.0)
    bb9       = stats.get("bb9", 3.0)
    avg_ip    = stats.get("avgIP", 5.5)
    xwoba     = starter.get("xwOBA_vs_opp")
    xwoba_pa  = starter.get("xwOBA_pa", 0)

    blended_era           = pitcher_recency_blend(era, l5_era, l3_era)
    adj_ip, bb9_flag      = bb9_modifier(avg_ip, bb9)
    trend = "HOT" if (era - blended_era) > 0.50 else \
            "COLD" if (blended_era - era) > 0.50 else "NEUTRAL"

    # Opposing team info
    opp_side = "home" if pitcher_side == "away" else "away"
    opp_name = game.get("home" if opp_side == "home" else "away", "")

    # ── Strikeout prop ────────────────────────────────────
    # Find prop line from ODDS_DATA
    player_key = next(
        (k for k in props if name.split()[-1].lower() in k.lower()), None)
    k_data = props.get(player_key, {}).get("pitcher_strikeouts") if player_key else None

    k_grade = None
    if xwoba is not None and xwoba_pa >= SAMPLE_MIN_B:
        k_grade = xwoba_to_grade(xwoba, xwoba_pa)
    else:
        # Fall back to ERA-based grade
        blended_grade = era_to_grade(blended_era)
        k_grade = blended_grade

    if k_grade and k_data:
        k_line = k_data.get("point")
        k_over = k_data.get("overStr", "TBD")
        proj_k = round(k9 / 9 * adj_ip, 1)

        # Adjust grade for line vs projection
        if k_line and proj_k:
            gap = proj_k - k_line
            if gap < -0.5 and k_grade in ("A-","B+"): k_grade = "B"
            elif gap > 0.5 and k_grade == "B": k_grade = "B+"

        chips = [
            f"{name} K/9: {k9} · {adj_ip} avg IP · proj {proj_k} Ks",
            f"Blended ERA: {blended_era} ({trend})" +
            (f" · {bb9_flag}" if bb9_flag else ""),
            f"xwOBA vs {opp_name}: {xwoba:.3f} ({xwoba_pa} PA)" if xwoba else
            f"ERA {era} · L5: {l5_era} · L3: {l3_era}",
        ]
        cards.append({
            "lbl":   f"{name.split()[-1]} — Strikeouts",
            "pick":  f"Over {k_line} Ks" if k_line else "Over Ks",
            "odds":  k_over,
            "grade": k_grade,
            "chips": [c for c in chips if c],
            "pitcherRecency": {
                "seasonERA": era, "l5ERA": l5_era, "l3ERA": l3_era,
                "avgIP": avg_ip, "bb9": bb9
            },
        })

    # ── Earned runs prop ──────────────────────────────────
    er_data = props.get(player_key, {}).get("pitcher_earned_runs") if player_key else None
    er_grade = era_to_grade(blended_era)

    if er_data:
        er_line = er_data.get("point")
        er_under = er_data.get("underStr", "TBD")
        # Under ER: lower blended ERA → better grade
        chips_er = [
            f"Blended ERA: {blended_era} ({trend}) · {adj_ip} avg IP",
            f"xwOBA vs {opp_name}: {xwoba:.3f} ({xwoba_pa} PA)" if xwoba else
            f"Season ERA: {era} · L5: {l5_era} · L3: {l3_era}",
            f"Park factor: {park}" +
            (f" · ⚠ {bb9_flag}" if bb9_flag else ""),
        ]
        cards.append({
            "lbl":   f"{name.split()[-1]} — Earned Runs",
            "pick":  f"Under {er_line} ER" if er_line else "Under ER",
            "odds":  er_under,
            "grade": er_grade,
            "chips": [c for c in chips_er if c],
            "pitcherRecency": {
                "seasonERA": era, "l5ERA": l5_era, "l3ERA": l3_era,
                "avgIP": avg_ip, "bb9": bb9
            },
        })

    return cards


# ─────────────────────────────────────────────────────────
# GRADE GAME LEANS (run line, moneyline, total)
# ─────────────────────────────────────────────────────────

def compute_game_lean(game, park):
    """
    Compute run line, moneyline, and total leans.
    Returns dict of grades and bullets for bestBets.
    """
    raw = game.get("lines", {}).get("raw", {})
    home_ml   = raw.get("homeML")
    away_ml   = raw.get("awayML")
    posted_total = raw.get("total")

    away_stats = game.get("pitcher_stats", {}).get("away", {})
    home_stats = game.get("pitcher_stats", {}).get("home", {})

    away_era   = away_stats.get("era", 4.20)
    home_era   = home_stats.get("era", 4.20)
    away_ip    = away_stats.get("avgIP", 5.5)
    home_ip    = home_stats.get("avgIP", 5.5)

    # Default team offense — will be enriched when team stats API added
    away_l5    = 4.2
    home_l5    = 4.2
    away_bp    = 4.20
    home_bp    = 4.20

    # ── Run projections ───────────────────────────────────
    away_runs = project_runs(away_l5, home_era, home_ip, home_bp, park)
    home_runs = project_runs(home_l5, away_era, away_ip, away_bp, park)
    proj_total = round(away_runs + home_runs, 2)
    run_diff   = away_runs - home_runs

    # ── Moneyline ─────────────────────────────────────────
    away_win_p = win_prob_from_run_diff(run_diff)
    home_win_p = 1 - away_win_p

    ml_result = None
    if away_ml is not None and home_ml is not None:
        imp_away = ml_to_implied(away_ml)
        imp_home = ml_to_implied(home_ml)
        gap_away = away_win_p - imp_away
        gap_home = home_win_p - imp_home

        ml_side   = "away" if gap_away >= gap_home else "home"
        ml_win_p  = away_win_p if ml_side == "away" else home_win_p
        ml_gap    = gap_away   if ml_side == "away" else gap_home
        ml_ml     = away_ml    if ml_side == "away" else home_ml
        ml_imp    = imp_away   if ml_side == "away" else imp_home
        ml_team   = game["away"] if ml_side == "away" else game["home"]

        if   ml_gap > 0.10: ml_grade = "A-"
        elif ml_gap > 0.06: ml_grade = "B+"
        elif ml_gap > 0.03: ml_grade = "B"
        elif ml_gap > 0.01: ml_grade = "B-"
        elif abs(ml_gap) <= 0.01: ml_grade = "C"
        else:                     ml_grade = "C+"

        parlay = ml_win_p > 0.58 and ml_grade in ("C", "C+")

        ml_result = {
            "team":      ml_team,
            "grade":     ml_grade,
            "odds":      fmt_odds(ml_ml),
            "winProb":   round(ml_win_p * 100, 1),
            "valueGap":  round(ml_gap * 100, 1),
            "parlay":    parlay,
        }

    # ── Run line ──────────────────────────────────────────
    rl_side  = "away" if run_diff > 0 else "home"
    rl_team  = game["away"] if rl_side == "away" else game["home"]
    rl_odds  = fmt_odds(away_ml if rl_side == "away" else home_ml) \
               if (away_ml and home_ml) else "TBD"

    era_diff = abs(away_era - home_era)
    if   era_diff > 1.50: rl_grade = "B+"
    elif era_diff > 0.80: rl_grade = "B"
    elif era_diff > 0.40: rl_grade = "B-"
    else:                  rl_grade = "C+"

    rl_result = {
        "team":  rl_team,
        "grade": rl_grade,
        "odds":  rl_odds,
    }

    # ── Total ─────────────────────────────────────────────
    tot_result = {"side": "TBD", "grade": "TBD", "line": "TBD"}
    if posted_total:
        gap = posted_total - proj_total
        if   gap >  2.0: tot_grade = "A-"; tot_side = "Under"
        elif gap >  1.0: tot_grade = "B+"; tot_side = "Under"
        elif gap >  0.3: tot_grade = "B";  tot_side = "Under"
        elif gap < -2.0: tot_grade = "A-"; tot_side = "Over"
        elif gap < -1.0: tot_grade = "B+"; tot_side = "Over"
        elif gap < -0.3: tot_grade = "B";  tot_side = "Over"
        else:            tot_grade = "C";  tot_side = "Even"
        tot_result = {
            "side":  tot_side,
            "grade": tot_grade,
            "line":  f"{tot_side} {posted_total}",
            "odds":  fmt_odds(raw.get("overOdds") if tot_side == "Over"
                              else raw.get("underOdds")),
        }

    return ml_result, rl_result, tot_result


# ─────────────────────────────────────────────────────────
# BUILD GAME OBJECT (games const entry)
# ─────────────────────────────────────────────────────────

def build_game_object(game):
    """Build a single game entry for slate_data.js const games."""
    home     = game["home"]
    away     = game["away"]
    raw      = game.get("lines", {}).get("raw", {})
    starters = game.get("starters", {})
    park     = get_park_factor(game.get("time", ""))  # time field used as proxy

    # Abbrevs
    def abbr(name):
        parts = name.split()
        return parts[-1][:3].upper() if parts else "???"

    away_abbr = abbr(away)
    home_abbr = abbr(home)

    # Pitcher info
    away_p = starters.get("away", {})
    home_p = starters.get("home", {})
    away_stats = game.get("pitcher_stats", {}).get("away", {})
    home_stats = game.get("pitcher_stats", {}).get("home", {})

    def starter_obj(p, stats):
        return {
            "name":  p.get("name", "TBA"),
            "hand":  p.get("hand", "?") + "HP",
            "era":   str(stats.get("era", "TBD")),
            "whip":  str(stats.get("whip", "TBD")),
            "k9":    str(stats.get("k9", "TBD")),
            "bb9":   str(stats.get("bb9", "TBD")),
            "era_L3": str(stats.get("l3ERA") or stats.get("era", "TBD")),
            "avgIP": str(stats.get("avgIP", "5.5")),
        }

    # Lines
    ml_str  = game.get("lines", {}).get("ml", "TBD")
    sp_str  = game.get("lines", {}).get("spread", "TBD")
    tot_str = game.get("lines", {}).get("total", "TBD")

    return f'''  "{away_abbr.lower()}-{home_abbr.lower()}": {{
    away:"{away}", home:"{home}",
    time:"{game.get('time','TBD')}", venue:"TBD",
    awayRec:"TBD", homeRec:"TBD",
    wx:"⛅ Pull weather data",
    starters:"{away_p.get('name','TBA')} ({away_p.get('hand','?')}HP) vs {home_p.get('name','TBA')} ({home_p.get('hand','?')}HP)",
    overview:{{
      lines:{{ ml:"{ml_str}", spread:"{sp_str}", total:"{tot_str}", movement:"Live via Odds API" }},
      away:{{ teamName:"{away}", abbr:"{away_abbr}",
        offStats:{{ avg:"TBD", ops:"TBD", kPct:"TBD", rPerG:"TBD", rPerG_L10:"TBD", rPerG_L5:"TBD" }},
        defStats:{{ era:"TBD", bullpenERA_L14:"TBD", whip:"TBD" }},
        starter:{json.dumps(starter_obj(away_p, away_stats))},
        injuries:[] }},
      home:{{ teamName:"{home}", abbr:"{home_abbr}",
        offStats:{{ avg:"TBD", ops:"TBD", kPct:"TBD", rPerG:"TBD", rPerG_L10:"TBD", rPerG_L5:"TBD" }},
        defStats:{{ era:"TBD", bullpenERA_L14:"TBD", whip:"TBD" }},
        starter:{json.dumps(starter_obj(home_p, home_stats))},
        injuries:[] }}
    }},
    tabs:{{
      overview:{{intro:"",cards:[]}},
      pitcher:{{intro:"Live prop lines from Odds API",cards:[]}},
      batter:{{intro:"HRR props — confirm lineup before betting",cards:[]}}
    }}
  }}'''


# ─────────────────────────────────────────────────────────
# BUILD BEST BETS
# ─────────────────────────────────────────────────────────

def build_best_bets(all_leans, pitcher_cards_by_game):
    """
    Collect all picks grading B- or above and sort by grade.
    Also flag parlay pieces.
    """
    picks = []

    for game_key, (game, ml, rl, tot) in all_leans.items():
        away_short = game["away"].split()[-1]
        home_short = game["home"].split()[-1]
        game_tag   = f"{away_short[:3].upper()}@{home_short[:3].upper()}"

        # ML lean
        if ml and GRADE_ORDER.get(ml["grade"], 9) <= GRADE_ORDER["B-"]:
            picks.append({
                "game":   game_tag,
                "pick":   f"{ml['team'].split()[-1]} ML",
                "odds":   ml["odds"],
                "grade":  ml["grade"],
                "parlay": ml.get("parlay", False),
            })
        # Also flag parlay pieces even if C grade
        elif ml and ml.get("parlay"):
            picks.append({
                "game":   game_tag,
                "pick":   f"{ml['team'].split()[-1]} ML",
                "odds":   ml["odds"],
                "grade":  ml["grade"],
                "parlay": True,
            })

        # Run line lean
        if rl and GRADE_ORDER.get(rl["grade"], 9) <= GRADE_ORDER["B-"]:
            picks.append({
                "game":  game_tag,
                "pick":  f"{rl['team'].split()[-1]} -1.5",
                "odds":  rl["odds"],
                "grade": rl["grade"],
            })

        # Total lean
        if tot and tot.get("side") not in ("TBD","Even") and \
           GRADE_ORDER.get(tot["grade"], 9) <= GRADE_ORDER["B-"]:
            picks.append({
                "game":  game_tag,
                "pick":  tot["line"],
                "odds":  tot.get("odds", "TBD"),
                "grade": tot["grade"],
            })

        # Pitcher prop cards
        for card in pitcher_cards_by_game.get(game_key, []):
            if GRADE_ORDER.get(card["grade"], 9) <= GRADE_ORDER["B-"]:
                picks.append({
                    "game":  game_tag,
                    "pick":  card["pick"],
                    "odds":  card["odds"],
                    "grade": card["grade"],
                })

    # Sort by grade
    picks.sort(key=lambda p: GRADE_ORDER.get(p["grade"], 9))
    return picks


# ─────────────────────────────────────────────────────────
# WRITE slate_data.js
# ─────────────────────────────────────────────────────────

def write_slate(game_objects, best_bets):
    today = datetime.now().strftime("%b %d, %Y")

    games_js = ",\n\n".join(game_objects)
    bets_js  = ",\n  ".join(
        f'{{game:"{b["game"]}", pick:"{b["pick"]}", odds:"{b["odds"]}", '
        f'grade:"{b["grade"]}"'
        + (', parlay:true' if b.get("parlay") else '') +
        f'}}'
        for b in best_bets
    )

    output = f"""// slate_data.js — {today}
// AUTO-GENERATED by slate_builder.py
// Manual additions: venue, wx, offStats, injuries, batter props, xwOBA_vs_opp

const games = {{

{games_js}

}};

const bestBets = [
  {bets_js}
];
"""
    with open(SLATE_FILE, "w") as f:
        f.write(output)
    print(f"\n✓ Written: {SLATE_FILE}")
    print(f"  {len(game_objects)} games · {len(best_bets)} best bets")


# ─────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────

def main():
    print("=" * 55)
    print("MLB Slate Builder")
    print(f"  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 55)

    data  = load_games_data()
    games = data["games"]

    if not games:
        print("No games in games_data.js. Run odds_fetcher.py first.")
        sys.exit(0)

    game_objects       = []
    all_leans          = {}
    pitcher_cards_all  = {}

    for game in games:
        park     = get_park_factor(game.get("time", ""))
        game_key = f"{game['away']}-{game['home']}"

        # Build game JS object
        game_objects.append(build_game_object(game))

        # Grade pitcher props
        away_cards = grade_pitcher_props(game, "away", park)
        home_cards = grade_pitcher_props(game, "home", park)
        pitcher_cards_all[game_key] = away_cards + home_cards

        # Compute leans
        ml, rl, tot = compute_game_lean(game, park)
        all_leans[game_key] = (game, ml, rl, tot)

        # Print summary
        ml_str  = f"{ml['team'].split()[-1]} ML {ml['grade']}" if ml else "ML TBD"
        rl_str  = f"{rl['team'].split()[-1]} -1.5 {rl['grade']}" if rl else "RL TBD"
        tot_str = f"{tot['line']} {tot['grade']}" if tot.get("line") != "TBD" else "Total TBD"
        print(f"  {game['away'][:3].upper()}@{game['home'][:3].upper()} "
              f"| {ml_str} | {rl_str} | {tot_str}")

    # Build best bets
    best_bets = build_best_bets(all_leans, pitcher_cards_all)

    print(f"\nBest bets ({len(best_bets)}):")
    for b in best_bets[:10]:
        parlay_tag = " ⚡" if b.get("parlay") else ""
        print(f"  {b['grade']:<4} {b['game']:<10} {b['pick']}{parlay_tag}")

    write_slate(game_objects, best_bets)

    print("\n" + "=" * 55)
    print("Done. Next steps:")
    print("  1. Add venue, wx, offStats, injuries to each game")
    print("  2. Add xwOBA_vs_opp to starter objects (from Savant)")
    print("  3. Add HRR batter prop cards")
    print("  4. Run build.py to combine → mlb_dashboard.html")
    print("=" * 55)


if __name__ == "__main__":
    main()
