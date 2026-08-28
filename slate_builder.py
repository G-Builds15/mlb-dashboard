#!/usr/bin/env python3
"""
slate_builder.py
================
Step 2 of the automated pipeline.

Reads games_data.js (written by odds_fetcher.py).
All pitcher stats come from the MLB Stats API via odds_fetcher.py.
No manual stat entry. No estimation.

Produces:
  - Pitcher K, ER, and walk prop grades
  - Moneyline, run line, and total game leans
  - Parlay piece flags
  - Quality-filtered best bets list

Writes: slate_data.js
Run:    python3 slate_builder.py
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

MLB_AVG_ERA  = 4.20
PA_FULL      = 40     # full Savant confidence
PA_SOLID     = 25     # solid confidence
PA_LIMITED   = 15     # bullpen pivot below this
COLD_FLOOR   = 30.0   # K% floor — no cold cap above this
BULLPEN_MULT = 1.10   # bullpen day ERA multiplier
STRIP_MIN_CONFIDENCE = 5  # minimum confidence score for strip inclusion
HRR_MAX_GRADE_WITHOUT_LINEUP = "B"

GRADE_ORDER = {"A+":0,"A":1,"A-":2,"B+":3,"B":4,"B-":5,"C+":6,"C":7,"C-":8}
GRADE_STEPS = ["A-","B+","B","B-","C+","C"]

PARK_FACTORS = {
    "Comerica Park":           0.96,
    "Petco Park":              0.92,
    "Oracle Park":             0.88,
    "T-Mobile Park":           0.95,
    "Coors Field":             1.35,
    "loanDepot park":          1.12,
    "Truist Park":             1.08,
    "Fenway Park":             1.08,
    "Yankee Stadium":          1.05,
    "Nationals Park":          1.02,
    "Sutter Health Park":      1.00,
    "Busch Stadium":           0.98,
    "Chase Field":             1.02,
    "Rogers Centre":           1.00,
    "Citi Field":              0.97,
    "Rate Field":              1.00,
    "Angel Stadium":           0.97,
    "Globe Life Field":        1.01,
    "American Family Field":   1.00,
    "Wrigley Field":           1.04,
    "Dodger Stadium":          1.00,
    "PNC Park":                0.96,
    "Great American Ball Park":1.06,
    "Citizens Bank Park":      1.05,
    "Kauffman Stadium":        1.00,
    "Target Field":            0.98,
    "Minute Maid Park":        1.01,
    "Guaranteed Rate Field":   1.01,
}

# ─────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────

def get_park_factor(venue):
    for key, val in PARK_FACTORS.items():
        if key.lower() in (venue or "").lower():
            return val
    return 1.00

def fmt_odds(n):
    if n is None: return "TBD"
    return f"+{n}" if n > 0 else str(n)

def ml_to_implied(ml):
    if ml is None: return 0.50
    if ml > 0: return 100 / (ml + 100)
    return abs(ml) / (abs(ml) + 100)

def win_prob_from_run_diff(diff):
    return 1 / (1 + math.exp(-0.37 * diff))

def project_runs(l5_rpg, pitcher_era, pitcher_avg_ip,
                 bullpen_era, park, pitcher_bb9=3.0):
    """
    Project runs scored by the batting team.
    BB/9 walk multiplier applied — high walk rates cluster baserunners.
    """
    sr  = (pitcher_era / 9) * pitcher_avg_ip
    br  = (bullpen_era / 9) * max(0, 9 - pitcher_avg_ip)
    raw = sr + br

    wm  = (1.10 if pitcher_bb9 >= 4.5 else
           1.06 if pitcher_bb9 >= 4.0 else
           1.03 if pitcher_bb9 >= 3.5 else
           0.96 if pitcher_bb9 <= 1.8 else
           0.98 if pitcher_bb9 <= 2.2 else 1.00)

    blended = (raw * park * wm * 0.60) + (l5_rpg * park * 0.40)
    return round(blended, 2)

def pitcher_recency_blend(season_era, l5_era, l3_era):
    l5 = l5_era if l5_era is not None else season_era
    l3 = l3_era if l3_era is not None else season_era
    return round(season_era*0.50 + l5*0.30 + l3*0.20, 2)

def era_to_grade(blended_era):
    if blended_era <= 2.80: return "A-"
    if blended_era <= 3.30: return "B+"
    if blended_era <= 3.90: return "B"
    if blended_era <= 4.50: return "B-"
    return "C+"

def bb9_modifier(avg_ip, bb9):
    if bb9 <= 3.0: return avg_ip, None
    steps    = (bb9 - 3.0) / 0.5
    adj      = round(max(3.0, avg_ip - steps * 0.2), 1)
    flag     = f"BB/9 {bb9:.1f} — IP adj {avg_ip}→{adj}" if adj < avg_ip else None
    return adj, flag

def confidence_score(grade, away_pa, home_pa, away_conf,
                     home_conf, data_source, lean_alignment=1):
    score = 0
    min_pa = min(p for p in [away_pa, home_pa] if p > 0) \
             if any(p > 0 for p in [away_pa, home_pa]) else 0
    if   min_pa >= PA_FULL:    score += 3
    elif min_pa >= PA_SOLID:   score += 2
    elif min_pa >= PA_LIMITED: score += 1
    score += 2 if (away_conf and home_conf) else 1
    score += {"A-":3,"B+":2,"B":1,"B-":0}.get(grade,0)
    score += lean_alignment
    score += {"savant":2,"era":1,"bullpen_pivot":1,"unknown":0}.get(data_source,0)
    return score

# ─────────────────────────────────────────────────────────
# LOAD games_data.js
# ─────────────────────────────────────────────────────────

def load_games_data():
    if not os.path.exists(GAMES_DATA_FILE):
        print(f"ERROR: {GAMES_DATA_FILE} not found. Run odds_fetcher.py first.")
        sys.exit(1)

    with open(GAMES_DATA_FILE) as f:
        raw = f.read()

    match = re.search(r'const ODDS_DATA = ({.*?});\n', raw, re.DOTALL)
    if not match:
        print("ERROR: Could not parse ODDS_DATA from games_data.js")
        sys.exit(1)

    try:
        data = json.loads(match.group(1))
    except json.JSONDecodeError as e:
        print(f"ERROR: JSON parse failed: {e}")
        sys.exit(1)

    print(f"Loaded {len(data['games'])} games — fetched {data.get('fetched_at','?')[:19]} UTC")
    return data

# ─────────────────────────────────────────────────────────
# GRADE PITCHER K PROPS
# ─────────────────────────────────────────────────────────

def grade_k_prop(stats, prop_line, pa, opp_name):
    """
    Adjusted K model: 30% career / 30% season / 25% L5 / 15% L3
    BB/9 discount: every 0.5 BB/9 above 3.0 reduces blended K% by 1.5pp
    COLD cap when L3 drops 4+ pp below career (floor: blended >= 30%)
    Sample caps applied below PA thresholds.
    """
    season_k = stats.get("kPct") or (stats.get("k9",8.0)/27*100)
    l5_k     = stats.get("l5KPct") or season_k
    l3_k     = stats.get("l3KPct") or season_k
    career_k = stats.get("careerKPct") or season_k
    bb9      = stats.get("bb9", 3.0)
    avg_ip   = stats.get("avgIP", 5.5)

    blended = (career_k*0.30 + season_k*0.30 + l5_k*0.25 + l3_k*0.15)

    # BB/9 discount
    if bb9 > 3.0:
        blended = max(0, blended - ((bb9-3.0)/0.5)*1.5)

    # Trend
    trend_gap = l3_k - career_k
    trend     = "HOT" if trend_gap > 4 else "COLD" if trend_gap < -4 else "NEUTRAL"

    # Projected Ks
    adj_ip, _  = bb9_modifier(avg_ip, bb9)
    proj_ks    = round(blended/100 * adj_ip * 4.3, 1)
    gap        = proj_ks - prop_line

    # Grade
    if   blended >= 33 and gap > 0.5: grade = "A-"
    elif blended >= 27 and gap > 0.3: grade = "B+"
    elif blended >= 21 and gap > 0.0: grade = "B"
    elif gap > -0.3:                   grade = "B-"
    else:                              grade = "C+"

    # COLD cap with floor exemption
    if trend == "COLD" and blended < COLD_FLOOR:
        idx   = GRADE_STEPS.index(grade)
        grade = GRADE_STEPS[min(idx+1, len(GRADE_STEPS)-1)]

    # Sample caps
    if pa < PA_LIMITED:
        idx   = GRADE_STEPS.index(grade)
        grade = GRADE_STEPS[min(idx+2, len(GRADE_STEPS)-1)]
    elif pa < PA_SOLID:
        idx   = GRADE_STEPS.index(grade)
        grade = GRADE_STEPS[min(idx+1, len(GRADE_STEPS)-1)]

    return grade, blended, proj_ks, trend

# ─────────────────────────────────────────────────────────
# GRADE WALK PROPS
# ─────────────────────────────────────────────────────────

def walk_prop_grade(bb9, avg_ip, l3_bb9=None,
                   prop_line=1.5, direction="over"):
    l3      = l3_bb9 if l3_bb9 is not None else bb9
    adj_bb9 = bb9*0.60 + l3*0.40
    proj    = round((adj_bb9/9)*avg_ip, 1)
    gap     = proj - prop_line
    trend   = l3 - bb9
    note    = ("⚠ Getting wilder" if trend >= 1.0
               else "↗ Improving command" if trend <= -1.0 else None)

    if direction == "over":
        if   adj_bb9 >= 4.5 and gap > 1.0: grade = "A-"
        elif adj_bb9 >= 4.0 and gap > 0.5: grade = "B+"
        elif adj_bb9 >= 3.5 and gap > 0.2: grade = "B"
        elif adj_bb9 >= 3.0 and gap > 0.0: grade = "B-"
        else:                               grade = "C+"
        if trend >= 1.0 and grade in ("B","B-"):
            grade = GRADE_STEPS[max(0,GRADE_STEPS.index(grade)-1)]
    else:
        gu = prop_line - proj
        if   adj_bb9 <= 1.8 and gu > 0.6: grade = "A-"
        elif adj_bb9 <= 2.2 and gu > 0.4: grade = "B+"
        elif adj_bb9 <= 2.8 and gu > 0.2: grade = "B"
        elif gu > 0.0:                     grade = "B-"
        else:                              grade = "C+"
        if trend <= -1.0 and grade in ("B","B-"):
            grade = GRADE_STEPS[max(0,GRADE_STEPS.index(grade)-1)]

    return grade, proj, adj_bb9, note

# ─────────────────────────────────────────────────────────
# GRADE PITCHER PROPS
# ─────────────────────────────────────────────────────────

def grade_pitcher_props(game, pitcher_side, park):
    """
    Grade K, ER, and walk props.
    REQUIRES pitcher_stats populated by odds_fetcher.py from MLB Stats API.
    Will not grade on missing or default stats.
    """
    cards   = []
    stats   = game.get("pitcher_stats",{}).get(pitcher_side,{})
    starter = game.get("starters",{}).get(pitcher_side,{})
    props   = game.get("props",{})

    # Hard gate — no stats = no grades
    if not stats:
        name = starter.get("name","Unknown")
        print(f"  ⚠ SKIP {name} — no API stats (run odds_fetcher.py)")
        return cards

    if not starter.get("name") or starter.get("name") in ("TBA",""):
        return cards

    # Verify not defaults (API stats always have 'gs' field or _source marker)
    # Exception: starters with 0 PA vs opponent are still valid starters
    if not stats.get("gs") and not stats.get("_source") and not stats.get("era"):
        name = starter.get("name","Unknown")
        print(f"  ⚠ SKIP {name} — stats appear to be defaults, not API data")
        return cards

    # Note: low xwOBA PA (< PA_SOLID) does NOT skip the pitcher —
    # the sample cap is applied inside k_grade via the pa argument.
    # A confirmed starter with 0 PA vs opponent still grades on ERA/BB9.

    name     = starter["name"]
    era      = stats.get("era", 4.20)
    l5_era   = stats.get("l5ERA") or era
    l3_era   = stats.get("l3ERA") or era
    bb9      = stats.get("bb9", 3.0)
    avg_ip   = stats.get("avgIP", 5.5)
    l3_bb9   = stats.get("l3BB9") or bb9

    blended_era     = pitcher_recency_blend(era, l5_era, l3_era)
    adj_ip, bb9_flg = bb9_modifier(avg_ip, bb9)

    opp_side = "home" if pitcher_side == "away" else "away"
    opp_name = game.get("home" if opp_side=="home" else "away","")

    # Find this pitcher's props
    player_key = next(
        (k for k in props
         if name.split()[-1].lower() in k.lower()),
        None,
    )

    # ── K prop ──────────────────────────────────────────
    k_data = props.get(player_key,{}).get("pitcher_strikeouts") if player_key else None
    pa     = starter.get("xwOBA_pa",0) or 0

    if k_data:
        k_line = k_data.get("point")
        if k_line is not None:
            k_grade, kblend, kproj, ktrend = grade_k_prop(
                stats, k_line, pa, opp_name)

            if k_grade not in ("C+","C","B-"):
                cards.append({
                    "lbl":   f"{name.split()[-1]} — Strikeouts",
                    "pick":  f"Over {k_line} Ks",
                    "odds":  k_data.get("overStr","TBD"),
                    "grade": k_grade,
                    "chips": [
                        f"Blended K%: {kblend:.1f}% · proj {kproj} Ks vs {k_line} line",
                        f"ERA {era} · BB/9 {bb9} · avgIP {avg_ip} · trend {ktrend}",
                        f"L5 ERA: {l5_era} · L3 ERA: {l3_era}",
                    ],
                    "src": "MLB Stats API",
                    "pitcherRecency": {
                        "seasonERA": era, "l5ERA": l5_era, "l3ERA": l3_era,
                        "avgIP": avg_ip, "bb9": bb9,
                    },
                })

    # ── ER prop ─────────────────────────────────────────
    er_data = props.get(player_key,{}).get("pitcher_earned_runs") if player_key else None
    er_grade = era_to_grade(blended_era)

    if er_data and er_grade not in ("C+","C"):
        er_line  = er_data.get("point")
        er_under = er_data.get("underStr","TBD")
        if er_line is not None:
            cards.append({
                "lbl":   f"{name.split()[-1]} — Earned Runs",
                "pick":  f"Under {er_line} ER",
                "odds":  er_under,
                "grade": er_grade,
                "chips": [
                    f"Blended ERA: {blended_era} · {adj_ip} avg IP",
                    f"Season {era} · L5 {l5_era} · L3 {l3_era}",
                    bb9_flg or f"BB/9 {bb9} · park factor {park}",
                ],
                "src": "MLB Stats API",
                "pitcherRecency": {
                    "seasonERA": era, "l5ERA": l5_era, "l3ERA": l3_era,
                    "avgIP": avg_ip, "bb9": bb9,
                },
            })

    # ── Walk prop ────────────────────────────────────────
    # Gates:
    #   1. Minimum sample: pitcher needs >= 5 GS or >= 20 IP
    #      BB/9 from small samples is too noisy to grade
    #   2. Live line required: do not grade vs assumed 1.5
    #      Walk lines vary widely — 1.5, 2.5, or no line at all
    #      High-walk pitchers are priced at poor odds by the market
    bb_data = props.get(player_key,{}).get("pitcher_walks") if player_key else None

    pitcher_gs = stats.get("gs", 0) or 0
    pitcher_ip = stats.get("ip", 0) or 0
    walk_sample_ok = pitcher_gs >= 5 and pitcher_ip >= 20

    if bb_data and walk_sample_ok and (bb9 >= 3.5 or bb9 <= 2.5):
        bb_line = bb_data.get("point")
        bb_over = bb_data.get("over")    # actual odds
        bb_under = bb_data.get("under")

        # Require live line AND reasonable odds (not worse than -200)
        # If market prices Over at -200 or worse, value is gone regardless of projection
        if dirn_val := ("over" if bb9 >= 3.5 else "under"):
            live_odds = bb_over if dirn_val == "over" else bb_under
            odds_ok = live_odds is None or live_odds > -200

        if bb_line is not None and odds_ok:
            dirn = dirn_val
            bb_odds = (bb_data.get("overStr","TBD") if dirn=="over"
                       else bb_data.get("underStr","TBD"))
            wg, wproj, wadj, wnote = walk_prop_grade(
                bb9, adj_ip, l3_bb9, bb_line, dirn)

            if wg not in ("C+","C","B-"):
                cards.append({
                    "lbl":   f"{name.split()[-1]} — Walks",
                    "pick":  f"{'Over' if dirn=='over' else 'Under'} {bb_line} BB",
                    "odds":  bb_odds,
                    "grade": wg,
                    "chips": [
                        f"BB/9: {bb9:.1f} · adj {wadj:.1f} · proj {wproj} walks vs {bb_line} line",
                        wnote or f"L3 BB/9: {l3_bb9:.1f}",
                        f"Blended ERA {blended_era} · {pitcher_gs} GS · {pitcher_ip} IP",
                    ],
                    "src": "MLB Stats API",
                    "pitcherRecency": {
                        "seasonERA": era, "l5ERA": l5_era, "l3ERA": l3_era,
                        "avgIP": avg_ip, "bb9": bb9,
                    },
                })
    elif not walk_sample_ok and (bb9 >= 3.5 or bb9 <= 2.5):
        print(f"  ~ Walk prop skipped: {name} — insufficient sample "
              f"({pitcher_gs} GS, {pitcher_ip:.0f} IP — need 5 GS / 20 IP)")

    return cards

# ─────────────────────────────────────────────────────────
# COMPUTE GAME LEAN
# ─────────────────────────────────────────────────────────

def compute_game_lean(game, park):
    """
    Compute ML, RL, and total leans from API-sourced stats.
    Applies bullpen pivot when starter lacks sufficient data.
    Applies fix 2 (sample cap) and fix 3 (proj diff threshold).
    """
    raw     = game.get("lines",{}).get("raw",{})
    home_ml = raw.get("homeML")
    away_ml = raw.get("awayML")
    posted  = raw.get("total")

    away_stats   = game.get("pitcher_stats",{}).get("away",{})
    home_stats   = game.get("pitcher_stats",{}).get("home",{})
    away_starter = game.get("starters",{}).get("away",{})
    home_starter = game.get("starters",{}).get("home",{})

    away_pa = away_starter.get("xwOBA_pa",0) or 0
    home_pa = home_starter.get("xwOBA_pa",0) or 0

    away_confirmed = bool(away_stats.get("_source")) or away_stats.get("gs",0) > 0
    home_confirmed = bool(home_stats.get("_source")) or home_stats.get("gs",0) > 0

    # Team stats from MLB Stats API (via odds_fetcher.py)
    away_ts = game.get("team_stats",{}).get("away",{})
    home_ts = game.get("team_stats",{}).get("home",{})

    has_team_stats = (bool(away_ts.get("_source")) and
                      bool(home_ts.get("_source")))

    away_l5 = away_ts.get("rPerG_L5")  or away_ts.get("rPerG") or 4.2
    home_l5 = home_ts.get("rPerG_L5")  or home_ts.get("rPerG") or 4.2
    away_bp = away_ts.get("bullpenERA_L14") or 4.20
    home_bp = home_ts.get("bullpenERA_L14") or 4.20

    away_l5 = float(away_l5)
    home_l5 = float(home_l5)
    away_bp = float(away_bp)
    home_bp = float(home_bp)

    # ── ERA and IP source determination ─────────────────
    # Bullpen pivot ONLY for genuine bullpen days:
    #   - No confirmed starter (TBA, <3 GS this season)
    # Low Savant matchup sample (< PA_SOLID) only gates:
    #   - xwOBA adjustment in ML model
    #   - K prop grade (sample cap applied separately)
    # It does NOT change the ERA used in run projections.
    # Confirmed starters always use their season ERA.

    def is_bullpen_day(stats, starter):
        """True only when no confirmed MLB starter is available."""
        if not stats:
            return True
        if starter.get("name","TBA") in ("TBA","","Unknown"):
            return True
        if stats.get("gs", 0) < 3 and not stats.get("_source"):
            return True
        return False

    away_bullpen_day = is_bullpen_day(away_stats, away_starter)
    home_bullpen_day = is_bullpen_day(home_stats, home_starter)

    if away_bullpen_day:
        away_era = away_bp * BULLPEN_MULT
        away_ip  = 5.0
        away_bb9 = 3.5
        away_src = "bullpen_pivot"
    else:
        away_era = away_stats.get("era", 4.20)
        away_ip  = away_stats.get("avgIP", 5.5)
        away_bb9 = away_stats.get("bb9", 3.0)
        # Source reflects xwOBA data quality, not starter confirmation
        away_src = "savant" if away_pa >= PA_SOLID else "era"

    if home_bullpen_day:
        home_era = home_bp * BULLPEN_MULT
        home_ip  = 5.0
        home_bb9 = 3.5
        home_src = "bullpen_pivot"
    else:
        home_era = home_stats.get("era", 4.20)
        home_ip  = home_stats.get("avgIP", 5.5)
        home_bb9 = home_stats.get("bb9", 3.0)
        home_src = "savant" if home_pa >= PA_SOLID else "era"

    data_src = ("bullpen_pivot"
                if (away_bullpen_day or home_bullpen_day)
                else ("savant" if min(away_pa,home_pa) >= PA_SOLID else "era"))

    # Run projections
    away_runs = project_runs(away_l5, home_era, home_ip, home_bp, park, home_bb9)
    home_runs = project_runs(home_l5, away_era, away_ip, away_bp, park, away_bb9)
    proj_tot  = round(away_runs + home_runs, 2)
    run_diff  = away_runs - home_runs

    # Win probability
    away_wp = win_prob_from_run_diff(run_diff)
    home_wp = 1 - away_wp

    # ── Moneyline — market-anchored model ───────────────
    # START from market implied probability.
    # Only adjust when we have verified evidence the market missed:
    #   1. xwOBA differential (real Savant data, 25+ PA each)
    #   2. Real team L5 R/G differential (when team stats available)
    #   3. Injury to confirmed starter or key batter
    # Each adjustment bounded at ±6%. Total cap ±12%.
    # If insufficient data — parlay flag only, no standalone grade.
    ml_result = None
    if away_ml is not None and home_ml is not None:
        imp_aw = ml_to_implied(away_ml)
        imp_hw = ml_to_implied(home_ml)

        # Base: market implied probability
        adj_away_wp = imp_aw
        adj_home_wp = imp_hw

        adjustments = []

        # Adjustment 1 — xwOBA pitching differential
        xwa = away_starter.get("xwOBA_vs_opp")
        xwh = home_starter.get("xwOBA_vs_opp")
        if (xwa is not None and xwh is not None and
                away_pa >= PA_SOLID and home_pa >= PA_SOLID):
            xw_diff = float(xwh) - float(xwa)  # positive = away pitcher better
            # Each 0.050 xwOBA gap = 3% win probability shift, cap at 6%
            xw_adj = min(0.06, max(-0.06, xw_diff * 0.60))
            adj_away_wp += xw_adj
            adj_home_wp -= xw_adj
            adjustments.append(f"xwOBA diff {xw_diff:+.3f} → {xw_adj:+.1%} adj")

        # Adjustment 2 — real L5 R/G differential (team stats required)
        if has_team_stats:
            rpg_diff = away_l5 - home_l5  # positive = away offense better
            # Each 1.0 R/G gap = 2% shift, cap at 4%
            rpg_adj = min(0.04, max(-0.04, rpg_diff * 0.02))
            adj_away_wp += rpg_adj
            adj_home_wp -= rpg_adj
            if abs(rpg_diff) > 0.5:
                adjustments.append(f"L5 R/G diff {rpg_diff:+.1f} → {rpg_adj:+.1%} adj")

        # Adjustment 3 — starter injury/scratch
        away_injured = any(i.get("status") == "OUT" and
                          away_confirmed is False
                          for i in game.get("overview",{}).get(
                              "away",{}).get("injuries",[]))
        home_injured = any(i.get("status") == "OUT" and
                          home_confirmed is False
                          for i in game.get("overview",{}).get(
                              "home",{}).get("injuries",[]))
        if away_injured:
            adj_away_wp -= 0.04
            adj_home_wp += 0.04
            adjustments.append("Away starter injury → -4% adj")
        if home_injured:
            adj_home_wp -= 0.04
            adj_away_wp += 0.04
            adjustments.append("Home starter injury → -4% adj")

        # Normalize
        total = adj_away_wp + adj_home_wp
        adj_away_wp /= total
        adj_home_wp /= total

        # Only grade ML if we have meaningful adjustments from real data
        has_real_adjustments = (
            (xwa is not None and xwh is not None and
             away_pa >= PA_SOLID and home_pa >= PA_SOLID) or
            has_team_stats
        )

        # Value gap vs market
        gap_aw = adj_away_wp - imp_aw
        gap_hw = adj_home_wp - imp_hw
        ml_sd  = "away" if gap_aw >= gap_hw else "home"
        ml_wp  = adj_away_wp if ml_sd=="away" else adj_home_wp
        ml_gap = gap_aw if ml_sd=="away" else gap_hw
        ml_ml  = away_ml if ml_sd=="away" else home_ml
        ml_tm  = game["away"] if ml_sd=="away" else game["home"]

        # Grade — only when real data available
        if has_real_adjustments:
            if   ml_gap > 0.07: ml_g = "B+"
            elif ml_gap > 0.04: ml_g = "B"
            elif ml_gap > 0.02: ml_g = "B-"
            else:               ml_g = "C"
        else:
            # No real data — parlay flag only, no standalone grade
            ml_g = "C"

        # Parlay: high win probability regardless of value gap
        # Use projection-based win prob for parlay (matchup dominance signal)
        proj_wp = away_wp if ml_sd=="away" else home_wp
        parlay  = proj_wp > 0.58 and ml_g in ("C","C+")

        ml_result = {
            "team":       ml_tm, "side": ml_sd, "grade": ml_g,
            "odds":       fmt_odds(ml_ml),
            "winProb":    round(ml_wp*100,1),
            "projWinProb":round(proj_wp*100,1),
            "valueGap":   round(ml_gap*100,1),
            "parlay":     parlay,
            "adjustments":adjustments,
            "hasRealData":has_real_adjustments,
            "awayWinP":   adj_away_wp,
            "homeWinP":   adj_home_wp,
        }

    # ── Run line ─────────────────────────────────────────
    proj_diff = abs(run_diff)
    era_diff  = abs(away_era - home_era)
    rl_side   = "away" if run_diff > 0 else "home"
    rl_team   = game["away"] if rl_side=="away" else game["home"]

    if   era_diff > 1.50: rl_g = "B+"
    elif era_diff > 0.80: rl_g = "B"
    elif era_diff > 0.40: rl_g = "B-"
    else:                  rl_g = "C+"

    # Fix 3 — proj diff cap
    if   proj_diff >= 1.50: diff_cap = "B+"
    elif proj_diff >= 1.00: diff_cap = "B"
    elif proj_diff >= 0.60: diff_cap = "B-"
    else:                    diff_cap = "C+"
    if GRADE_STEPS.index(diff_cap) > GRADE_STEPS.index(rl_g):
        rl_g = diff_cap

    # Fix 2 — sample cap
    low_samp = (0 < away_pa < 25) or (0 < home_pa < 25)
    if low_samp and rl_g in ("A-","B+","B"):
        rl_g = "B-"

    rl_odds = fmt_odds(away_ml if rl_side=="away" else home_ml)
    rl_result = {
        "team": rl_team, "grade": rl_g, "odds": rl_odds,
        "proj_diff": round(proj_diff,2), "low_sample": low_samp,
        "data_source": data_src,
    }

    # ── Total ────────────────────────────────────────────
    tot_result = {"side":"TBD","grade":"TBD","proj":proj_tot,"line":"TBD"}
    if posted:
        gap = posted - proj_tot
        if   gap >  2.0: tg="A-"; ts="Under"
        elif gap >  1.0: tg="B+"; ts="Under"
        elif gap >  0.3: tg="B";  ts="Under"
        elif gap < -2.0: tg="A-"; ts="Over"
        elif gap < -1.0: tg="B+"; ts="Over"
        elif gap < -0.3: tg="B";  ts="Over"
        else:            tg="C";  ts="Even"
        if park >= 1.20 and ts=="Under" and tg=="A-":
            tg = "B+"  # Coors cap
        tot_result = {
            "side": ts, "grade": tg, "proj": proj_tot,
            "line": f"{ts} {posted}",
            "odds": fmt_odds(raw.get("overOdds") if ts=="Over"
                             else raw.get("underOdds")),
            "gap": round(gap,1),
        }

    return ml_result, rl_result, tot_result, data_src

# ─────────────────────────────────────────────────────────
# BUILD GAME OBJECT FOR slate_data.js
# ─────────────────────────────────────────────────────────

def build_game_object(game):
    home     = game["home"]
    away     = game["away"]
    starters = game.get("starters",{})
    away_p   = starters.get("away",{})
    home_p   = starters.get("home",{})
    aws      = game.get("pitcher_stats",{}).get("away",{})
    hws      = game.get("pitcher_stats",{}).get("home",{})

    def abbr(name):
        parts = name.split()
        return parts[-1][:3].upper() if parts else "???"

    away_abbr = abbr(away)
    home_abbr = abbr(home)

    def starter_obj(p, stats):
        return {
            "name":   p.get("name","TBA"),
            "hand":   p.get("hand","?") + "HP",
            "era":    str(stats.get("era","TBD")),
            "whip":   str(stats.get("whip","TBD")),
            "k9":     str(stats.get("k9","TBD")),
            "bb9":    str(stats.get("bb9","TBD")),
            "era_L3": str(stats.get("l3ERA") or stats.get("era","TBD")),
            "avgIP":  str(stats.get("avgIP","5.5")),
        }

    raw    = game.get("lines",{}).get("raw",{})
    ml_str = game.get("lines",{}).get("ml","TBD")
    sp_str = game.get("lines",{}).get("spread","TBD")
    tt_str = game.get("lines",{}).get("total","TBD")

    key = f"{away_abbr.lower()}-{home_abbr.lower()}"
    return key, f'''  "{key}": {{
    away:"{away}", home:"{home}",
    time:"{game.get('time','TBD')}", venue:"TBD",
    awayRec:"TBD", homeRec:"TBD",
    wx:"⛅ Weather TBD",
    starters:"{away_p.get('name','TBA')} ({away_p.get('hand','?')}HP) vs {home_p.get('name','TBA')} ({home_p.get('hand','?')}HP)",
    overview:{{
      lines:{{ ml:"{ml_str}", spread:"{sp_str}", total:"{tt_str}", movement:"" }},
      away:{{ teamName:"{away}", abbr:"{away_abbr}",
        offStats:{{ avg:"TBD", ops:"TBD", kPct:"TBD", rPerG:"TBD", rPerG_L10:"TBD", rPerG_L5:"TBD" }},
        defStats:{{ era:"TBD", bullpenERA_L14:"TBD", whip:"TBD" }},
        starter:{json.dumps(starter_obj(away_p, aws))},
        injuries:[] }},
      home:{{ teamName:"{home}", abbr:"{home_abbr}",
        offStats:{{ avg:"TBD", ops:"TBD", kPct:"TBD", rPerG:"TBD", rPerG_L10:"TBD", rPerG_L5:"TBD" }},
        defStats:{{ era:"TBD", bullpenERA_L14:"TBD", whip:"TBD" }},
        starter:{json.dumps(starter_obj(home_p, hws))},
        injuries:[] }}
    }},
    tabs:{{
      overview:{{intro:"",cards:[]}},
      pitcher:{{intro:"Props auto-graded from MLB Stats API",cards:[]}},
      batter:{{intro:"HRR props — lineup position pending",cards:[]}}
    }}
  }}'''

# ─────────────────────────────────────────────────────────
# BUILD BEST BETS
# ─────────────────────────────────────────────────────────

def build_best_bets(all_leans, pitcher_cards):
    picks = []

    for game_key, (game, ml, rl, tot, src) in all_leans.items():
        away_s = game.get("starters",{}).get("away",{})
        home_s = game.get("starters",{}).get("home",{})
        away_pa = away_s.get("xwOBA_pa",0) or 0
        home_pa = home_s.get("xwOBA_pa",0) or 0
        away_cf = bool(game.get("pitcher_stats",{}).get("away",{}).get("_source"))
        home_cf = bool(game.get("pitcher_stats",{}).get("home",{}).get("_source"))

        aw  = game["away"].split()[-1][:3].upper()
        hw  = game["home"].split()[-1][:3].upper()
        tag = f"{aw}@{hw}"

        # ML
        if ml:
            conf = confidence_score(ml["grade"], away_pa, home_pa,
                                    away_cf, home_cf, src)
            if ml.get("parlay") or (GRADE_ORDER.get(ml["grade"],9) <= GRADE_ORDER["B-"]
                                    and conf >= STRIP_MIN_CONFIDENCE):
                picks.append({
                    "game":   tag,
                    "pick":   f"{ml['team'].split()[-1]} ML",
                    "odds":   ml["odds"],
                    "grade":  ml["grade"],
                    "parlay": ml.get("parlay",False),
                    "src":    src,
                })

        # RL
        if rl and GRADE_ORDER.get(rl["grade"],9) <= GRADE_ORDER["B-"]:
            conf = confidence_score(rl["grade"], away_pa, home_pa,
                                    away_cf, home_cf, src)
            if conf >= STRIP_MIN_CONFIDENCE:
                picks.append({
                    "game":  tag,
                    "pick":  f"{rl['team'].split()[-1]} -1.5",
                    "odds":  rl["odds"],
                    "grade": rl["grade"],
                    "src":   src,
                })

        # Total
        if (tot and tot.get("side") not in ("TBD","Even")
                and GRADE_ORDER.get(tot.get("grade","C"),9) <= GRADE_ORDER["B-"]):
            conf = confidence_score(tot["grade"], away_pa, home_pa,
                                    away_cf, home_cf, src)
            if conf >= STRIP_MIN_CONFIDENCE:
                picks.append({
                    "game":  tag,
                    "pick":  tot["line"],
                    "odds":  tot.get("odds","TBD"),
                    "grade": tot["grade"],
                    "src":   src,
                })

        # Pitcher props
        for card in pitcher_cards.get(game_key,[]):
            if GRADE_ORDER.get(card["grade"],9) <= GRADE_ORDER["B-"]:
                picks.append({
                    "game":  tag,
                    "pick":  card["pick"],
                    "odds":  card["odds"],
                    "grade": card["grade"],
                    "src":   card.get("src","era"),
                })

    picks.sort(key=lambda p: GRADE_ORDER.get(p.get("grade","C"),9))
    return picks

# ─────────────────────────────────────────────────────────
# WRITE slate_data.js
# ─────────────────────────────────────────────────────────

def write_slate(game_objects, pitcher_cards_by_game, best_bets):
    today = datetime.now().strftime("%b %d, %Y")

    # Inject pitcher prop cards into game objects
    for key, cards in pitcher_cards_by_game.items():
        for i, go in enumerate(game_objects):
            if f'"{key}"' in go[:30]:
                if cards:
                    cards_js = json.dumps(cards, ensure_ascii=False)
                    game_objects[i] = go.replace(
                        'pitcher:{intro:"Props auto-graded from MLB Stats API",cards:[]}',
                        f'pitcher:{{intro:"Props auto-graded from MLB Stats API · {today}",cards:{cards_js}}}'
                    )
                break

    games_js = ",\n\n".join(game_objects)

    bets_js = ",\n  ".join(
        f'{{game:"{b["game"]}", pick:"{b["pick"]}", '
        f'odds:"{b["odds"]}", grade:"{b["grade"]}"'
        + (', parlay:true' if b.get("parlay") else '')
        + (f', src:"{b["src"]}"' if b.get("src") else '')
        + '}'
        for b in best_bets
    )

    output = f"""// slate_data.js — {today}
// AUTO-GENERATED by slate_builder.py
// Stats source: MLB Stats API (odds_fetcher.py)
// Manual fields: venue, wx, offStats, injuries, xwOBA_vs_opp, batter props

const games = {{

{games_js}

}};

const bestBets = [
  {bets_js}
];
"""
    with open(SLATE_FILE,"w") as f:
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

    # Validate API stats presence
    missing = [g for g in games
               if not g.get("pitcher_stats") or
               not g["pitcher_stats"].get("away") or
               not g["pitcher_stats"].get("home")]
    if missing:
        print(f"\n⚠ {len(missing)} games missing API stats:")
        for g in missing:
            print(f"  {g['away']} @ {g['home']}")
        print("  Run odds_fetcher.py to populate pitcher_stats.\n")

    game_objects      = []
    all_leans         = {}
    pitcher_cards_all = {}

    for game in games:
        # Park factor from venue (TBD until venue lookup added)
        park     = 1.00
        key, obj = build_game_object(game)
        game_objects.append(obj)

        # Grade pitcher props (API data required)
        away_cards = grade_pitcher_props(game, "away", park)
        home_cards = grade_pitcher_props(game, "home", park)
        pitcher_cards_all[key] = away_cards + home_cards

        # Compute game leans
        ml, rl, tot, src = compute_game_lean(game, park)
        all_leans[key]   = (game, ml, rl, tot, src)

        # Log summary
        ml_s  = f"{ml['team'].split()[-1]} ML {ml['grade']}" if ml else "ML TBD"
        rl_s  = f"{rl['team'].split()[-1]} -1.5 {rl['grade']}" if rl else "RL TBD"
        tot_s = f"{tot['line']} {tot['grade']}" if tot.get("line") != "TBD" else "Total TBD"
        prop_count = len(pitcher_cards_all[key])
        print(f"  {game['away'][:3].upper()}@{game['home'][:3].upper()} "
              f"| {ml_s} | {rl_s} | {tot_s} | {prop_count} props [{src}]")

    best_bets = build_best_bets(all_leans, pitcher_cards_all)

    print(f"\nBest bets ({len(best_bets)}):")
    for b in best_bets[:15]:
        ptag = " ⚡" if b.get("parlay") else ""
        stag = f" [{b.get('src','?')[:3]}]" if b.get("src") else ""
        print(f"  {b['grade']:<4} {b['game']:<10} {b['pick']}{ptag}{stag}")

    write_slate(game_objects, pitcher_cards_all, best_bets)

    print("\n" + "=" * 55)
    print("Done. Next: python3 build.py")
    print("Remaining manual fields per game:")
    print("  venue, wx, offStats, bullpenERA_L14, injuries, xwOBA_vs_opp")
    print("=" * 55)

if __name__ == "__main__":
    main()
