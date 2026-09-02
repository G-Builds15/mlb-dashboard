#!/usr/bin/env python3
"""
fetch_data.py
=============
Called by GitHub Actions to fetch all raw data.
Writes JSON files to the directory specified by --outdir argument.

Usage:
  python3 fetch_data.py --outdir /home/runner/work/mlb-dashboard/mlb-dashboard

Steps:
  1. MLB Stats API — starters + team IDs
  2. The Odds API  — game lines
  3. The Odds API  — pitcher props per event
  4. MLB Stats API — pitcher season + split stats
  5. MLB Stats API — team offense + bullpen stats
"""

import argparse
import json
import os
import subprocess
import sys
import time
from datetime import datetime, timedelta, timezone

# All date comparisons use Eastern Time (ET = UTC-4 during MLB season)
# Avoids midnight UTC boundary cutting off late-night games
ET_OFFSET = timezone(timedelta(hours=-4))

def et_today():
    return datetime.now(ET_OFFSET).strftime("%Y-%m-%d")

def curl(url, label=""):
    """Run a curl request and return parsed JSON, or None on failure."""
    r = subprocess.run(
        ["curl", "-sf", "--max-time", "15", url],
        capture_output=True, text=True
    )
    if r.returncode != 0 or not r.stdout.strip():
        if label:
            print(f"  ✗ {label} — curl failed (code {r.returncode})")
        return None
    try:
        return json.loads(r.stdout)
    except json.JSONDecodeError as e:
        if label:
            print(f"  ✗ {label} — JSON parse failed: {e}")
        return None

def save(data, outdir, filename):
    path = os.path.join(outdir, filename)
    with open(path, "w") as f:
        json.dump(data, f)
    print(f"  ✓ {filename} ({os.path.getsize(path):,} bytes)")
    return path

def fetch_starters(outdir, date_str):
    print(f"\n[1] MLB starters — {date_str}")
    url  = (f"https://statsapi.mlb.com/api/v1/schedule"
            f"?sportId=1&date={date_str}"
            f"&hydrate=probablePitcher(note),team,linescore&language=en")
    data = curl(url, "MLB schedule")
    if not data:
        print("  WARNING: No starters data returned")
        save({}, outdir, "starters_raw.json")
        return

    games = [g for dt in data.get("dates",[]) for g in dt.get("games",[])]
    print(f"  {len(games)} games found")
    for g in games:
        ap = g["teams"]["away"].get("probablePitcher") or {}
        hp = g["teams"]["home"].get("probablePitcher") or {}
        ok = "✓" if (ap.get("id") and hp.get("id")) else "~"
        print(f"  [{ok}] {g['teams']['away']['team']['name']} @ "
              f"{g['teams']['home']['team']['name']}: "
              f"{ap.get('fullName','TBD')} (ID:{ap.get('id','?')}) vs "
              f"{hp.get('fullName','TBD')} (ID:{hp.get('id','?')})")

    save(data, outdir, "starters_raw.json")

def fetch_odds(outdir, api_key, today_et):
    print(f"\n[2] Game odds — The Odds API")
    url  = (f"https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/"
            f"?apiKey={api_key}&regions=us&markets=h2h,spreads,totals"
            f"&oddsFormat=american&dateFormat=iso")
    data = curl(url, "odds")
    if not data:
        print("  WARNING: No odds returned — check ODDS_API_KEY secret")
        save([], outdir, "odds_raw.json")
        return

    # Convert each game's UTC commence time to ET before comparing
    def is_today_et(commence_utc):
        try:
            dt_utc = datetime.fromisoformat(commence_utc.replace("Z","+00:00"))
            dt_et  = dt_utc.astimezone(ET_OFFSET)
            return dt_et.strftime("%Y-%m-%d") == today_et
        except:
            return False

    today_games = [g for g in data if is_today_et(g.get("commence_time",""))]
    print(f"  {len(today_games)}/{len(data)} games are today")
    for g in today_games:
        print(f"    {g['away_team']} @ {g['home_team']} — {g['commence_time'][:16]}")
    save(data, outdir, "odds_raw.json")

def fetch_props(outdir, api_key, today_et):
    print(f"\n[3] Pitcher props — The Odds API")
    url    = (f"https://api.the-odds-api.com/v4/sports/baseball_mlb/events"
              f"?apiKey={api_key}&dateFormat=iso")
    events = curl(url, "events list")
    if not events:
        save({}, outdir, "props_raw.json")
        return

    def _is_today(ts):
        try:
            dt = datetime.fromisoformat(ts.replace("Z","+00:00")).astimezone(ET_OFFSET)
            return dt.strftime("%Y-%m-%d") == today_et
        except:
            return False
    today_e = [e for e in events if _is_today(e.get("commence_time",""))]
    markets  = ("pitcher_strikeouts,pitcher_earned_runs,pitcher_walks,"
                "pitcher_outs,pitcher_hits_allowed")
    all_props = {}

    for ev in today_e:
        eid  = ev["id"]
        away = ev["away_team"]
        home = ev["home_team"]
        url2 = (f"https://api.the-odds-api.com/v4/sports/baseball_mlb"
                f"/events/{eid}/odds"
                f"?apiKey={api_key}&regions=us&markets={markets}"
                f"&oddsFormat=american")
        data = curl(url2)
        if data:
            all_props[eid] = {"away":away,"home":home,"data":data}
            bm = len(data.get("bookmakers",[]))
            print(f"  ✓ {away} @ {home} ({bm} bookmakers)")
        else:
            print(f"  ~ {away} @ {home} — no props")
        time.sleep(0.3)

    save(all_props, outdir, "props_raw.json")

def fetch_pitcher_stats(outdir, season):
    print(f"\n[4] Pitcher stats — MLB Stats API")
    starters_path = os.path.join(outdir, "starters_raw.json")
    with open(starters_path) as f:
        starters_data = json.load(f)

    games = [g for dt in starters_data.get("dates",[])
               for g in dt.get("games",[])]

    pids = {}
    for g in games:
        for side in ["away","home"]:
            prob = g["teams"][side].get("probablePitcher") or {}
            pid  = prob.get("id")
            name = prob.get("fullName","")
            if pid and name and name != "TBD":
                pids[str(pid)] = name

    print(f"  {len(pids)} pitchers to fetch")
    stats_out = {}
    today = datetime.now()
    end   = today.strftime("%Y-%m-%d")

    for pid, name in pids.items():
        # Season stats
        s_data = {}
        url_s  = (f"https://statsapi.mlb.com/api/v1/people/{pid}/stats"
                  f"?stats=season&group=pitching&season={season}")
        d = curl(url_s)
        if d:
            stats_list = d.get("stats",[])
            splits = stats_list[0].get("splits",[]) if stats_list else []
            if splits:
                s  = splits[0]["stat"]
                ip = float(s.get("inningsPitched",0) or 0)
                gs = int(s.get("gamesStarted",1) or 1)
                k  = int(s.get("strikeOuts",0) or 0)
                bf = int(s.get("battersFaced",0) or 0)
                s_data = {
                    "era":     float(s.get("era",4.20) or 4.20),
                    "whip":    float(s.get("whip",1.30) or 1.30),
                    "k9":      float(s.get("strikeoutsPer9Inn",8.0) or 8.0),
                    "bb9":     float(s.get("walksPer9Inn",3.0) or 3.0),
                    "h9":      float(s.get("hitsPer9Inn",9.0) or 9.0),
                    "ip":      ip,
                    "avgIP":   round(ip/max(gs,1),1),
                    "gs":      gs,
                    "kPct":    round(k/max(bf,1)*100,1) if bf > 20 else None,
                    "_source": "mlb_stats_api",
                }

        # Recent splits
        splits_out = {}
        for label, days in [("l5",35),("l3",21)]:
            start = (today - timedelta(days=days)).strftime("%Y-%m-%d")
            url_r = (f"https://statsapi.mlb.com/api/v1/people/{pid}/stats"
                     f"?stats=byDateRange&group=pitching"
                     f"&startDate={start}&endDate={end}&season={season}")
            d2 = curl(url_r)
            if d2:
                sl2 = d2.get("stats",[])
                sp = sl2[0].get("splits",[]) if sl2 else []
                if sp:
                    st = sp[0]["stat"]
                    k2 = int(st.get("strikeOuts",0) or 0)
                    bf2= int(st.get("battersFaced",0) or 0)
                    splits_out[f"{label}ERA"]  = float(st.get("era",0) or 0) or None
                    splits_out[f"{label}KPct"] = round(k2/max(bf2,1)*100,1) if bf2>10 else None
                    splits_out[f"{label}BB9"]  = float(st.get("walksPer9Inn",0) or 0) or None

        stats_out[pid] = {"name":name,"season":s_data,"splits":splits_out}
        ok = "✓" if s_data else "✗"
        print(f"  {ok} {name}: ERA {s_data.get('era','?')} "
              f"K/9 {s_data.get('k9','?')} BB/9 {s_data.get('bb9','?')}")
        time.sleep(0.2)

    save(stats_out, outdir, "pitcher_stats_raw.json")

def fetch_team_stats(outdir, season):
    print(f"\n[5] Team stats — MLB Stats API")
    starters_path = os.path.join(outdir, "starters_raw.json")
    with open(starters_path) as f:
        starters_data = json.load(f)

    games = [g for dt in starters_data.get("dates",[])
               for g in dt.get("games",[])]

    team_ids = {}
    for g in games:
        for side in ["away","home"]:
            tid  = g["teams"][side]["team"].get("id")
            name = g["teams"][side]["team"].get("name","")
            if tid: team_ids[str(tid)] = name

    print(f"  {len(team_ids)} teams to fetch")
    today    = datetime.now()
    end      = today.strftime("%Y-%m-%d")
    start_l5 = (today - timedelta(days=8)).strftime("%Y-%m-%d")
    start_bp = (today - timedelta(days=14)).strftime("%Y-%m-%d")
    out_data = {}

    for tid, name in team_ids.items():
        stats = {"name":name,"_source":"mlb_stats_api"}

        d = curl(f"https://statsapi.mlb.com/api/v1/teams/{tid}/stats"
                 f"?stats=season&group=hitting&season={season}")
        if d:
            sp = d.get("stats",[{}])[0].get("splits",[])
            if sp:
                s  = sp[0]["stat"]
                gp = int(s.get("gamesPlayed",1) or 1)
                ru = int(s.get("runs",0) or 0)
                pa = int(s.get("plateAppearances",1) or 1)
                stats.update({
                    "rPerG":  round(ru/max(gp,1),2),
                    "avg":    s.get("avg",".250"),
                    "ops":    s.get("ops",".720"),
                    "kPct":   round(int(s.get("strikeOuts",0) or 0)/max(pa,1)*100,1),
                    "bbPct":  round(int(s.get("baseOnBalls",0) or 0)/max(pa,1)*100,1),
                })

        d2 = curl(f"https://statsapi.mlb.com/api/v1/teams/{tid}/stats"
                  f"?stats=byDateRange&group=hitting"
                  f"&startDate={start_l5}&endDate={end}&season={season}")
        if d2:
            sp = d2.get("stats",[{}])[0].get("splits",[])
            if sp:
                s2 = sp[0]["stat"]
                gp = int(s2.get("gamesPlayed",0) or 0)
                ru = int(s2.get("runs",0) or 0)
                if gp >= 3:
                    stats["rPerG_L5"] = round(ru/gp,2)

        d3 = curl(f"https://statsapi.mlb.com/api/v1/teams/{tid}/stats"
                  f"?stats=byDateRange&group=pitching"
                  f"&startDate={start_bp}&endDate={end}&season={season}")
        if d3:
            sp = d3.get("stats",[{}])[0].get("splits",[])
            if sp:
                era = sp[0]["stat"].get("era")
                if era: stats["bullpenERA_L14"] = float(era)

        out_data[tid] = stats
        print(f"  ✓ {name}: R/G {stats.get('rPerG','?')} "
              f"L5 {stats.get('rPerG_L5','?')} "
              f"BP {stats.get('bullpenERA_L14','?')}")
        time.sleep(0.2)

    save(out_data, outdir, "team_stats_raw.json")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--outdir", required=True,
                        help="Directory to write JSON files")
    args = parser.parse_args()

    outdir = args.outdir
    os.makedirs(outdir, exist_ok=True)
    print(f"Output directory: {outdir}")
    print(f"Files will be written to: {outdir}")

    api_key   = os.environ.get("ODDS_API_KEY","")
    today_et  = et_today()
    date_str  = today_et
    season    = datetime.now(ET_OFFSET).year

    print(f"\n{'='*55}")
    print(f"MLB Data Fetcher — {date_str}")
    print(f"{'='*55}")

    fetch_starters(outdir, date_str)
    fetch_odds(outdir, api_key, today_et)
    fetch_props(outdir, api_key, today_et)
    fetch_pitcher_stats(outdir, season)
    fetch_team_stats(outdir, season)

    print(f"\n{'='*55}")
    print("All data fetched. Files written:")
    for fname in ["starters_raw.json","odds_raw.json","props_raw.json",
                  "pitcher_stats_raw.json","team_stats_raw.json"]:
        path = os.path.join(outdir, fname)
        if os.path.exists(path):
            print(f"  ✓ {fname} ({os.path.getsize(path):,} bytes)")
        else:
            print(f"  ✗ {fname} — MISSING")
    print(f"{'='*55}")
    print("Next: python3 odds_fetcher.py --outdir", outdir)

if __name__ == "__main__":
    main()
