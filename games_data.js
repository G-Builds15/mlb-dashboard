const ODDS_DATA = {
  "fetched_at": "2026-10-18T22:40:43.233528+00:00",
  "date": "2026-10-18",
  "games": [
    {
      "id": "f4ca2d8a09898a94722dde0633e0a7e1",
      "home": "Cleveland Guardians",
      "away": "Tampa Bay Rays",
      "time": "5:08 PM ET",
      "commence": "2026-10-18T21:08:16Z",
      "starters": {
        "away": {
          "name": "Drew Rasmussen",
          "id": 656876,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Parker Messick",
          "id": 800048,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "away": {
          "era": 2.67,
          "whip": 0.91,
          "k9": 9.1,
          "bb9": 1.67,
          "h9": 6.54,
          "ip": 172.0,
          "avgIP": 5.7,
          "gs": 30,
          "kPct": 26.0,
          "_source": "mlb_stats_api",
          "l5ERA": 0.77,
          "l5KPct": 31.8,
          "l5BB9": 3.86,
          "l5AvgIP": 5.6,
          "name": "Drew Rasmussen",
          "pid": 656876
        },
        "home": {
          "era": 2.56,
          "whip": 1.06,
          "k9": 9.32,
          "bb9": 2.37,
          "h9": 7.2,
          "ip": 186.1,
          "avgIP": 5.8,
          "gs": 32,
          "kPct": 25.8,
          "_source": "mlb_stats_api",
          "l5ERA": 3.21,
          "l5KPct": 24.2,
          "l5BB9": 1.29,
          "l5AvgIP": 4.7,
          "l3ERA": 3.0,
          "l3KPct": 12.5,
          "l3BB9": 3.0,
          "l3AvgIP": 3.0,
          "name": "Parker Messick",
          "pid": 800048
        }
      },
      "team_stats": {
        "away": {
          "name": "Tampa Bay Rays",
          "_source": "mlb_stats_api",
          "rPerG": 4.54,
          "avg": ".258",
          "ops": ".728",
          "kPct": 18.8,
          "bbPct": 8.4
        },
        "home": {
          "name": "Cleveland Guardians",
          "_source": "mlb_stats_api",
          "rPerG": 4.19,
          "avg": ".239",
          "ops": ".696",
          "kPct": 20.8,
          "bbPct": 9.4
        }
      },
      "lines": {
        "ml": "Cleveland Guardians +650 / Tampa Bay Rays -1340",
        "spread": "Cleveland Guardians +3.5 (-160)",
        "total": "O/U 5.5 (Over -143 / Under +110)",
        "raw": {
          "homeML": 650,
          "awayML": -1340,
          "homeSpread": 3.5,
          "homeSpreadOdds": -160,
          "awaySpread": -3.5,
          "awaySpreadOdds": 123,
          "total": 5.5,
          "overOdds": -143,
          "underOdds": 110
        }
      },
      "props": {
        "Drew Rasmussen": {
          "pitcher_earned_runs": {
            "point": 0.5,
            "over": 135,
            "under": -185,
            "overStr": "+135",
            "underStr": "-185"
          },
          "pitcher_hits_allowed": {
            "point": 2.5,
            "over": -155,
            "under": 110,
            "overStr": "-155",
            "underStr": "+110"
          },
          "pitcher_outs": {
            "point": 18.5,
            "over": -120,
            "under": -115,
            "overStr": "-120",
            "underStr": "-115"
          },
          "pitcher_strikeouts": {
            "point": 7.5,
            "over": -170,
            "under": 125,
            "overStr": "-170",
            "underStr": "+125"
          },
          "pitcher_walks": {
            "point": 1.5,
            "over": 130,
            "under": -180,
            "overStr": "+130",
            "underStr": "-180"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
