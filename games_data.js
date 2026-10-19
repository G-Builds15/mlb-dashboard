const ODDS_DATA = {
  "fetched_at": "2026-10-19T19:38:13.366717+00:00",
  "date": "2026-10-19",
  "games": [
    {
      "id": "be50f6c59c20efa430eec6f146a0fcb1",
      "home": "Tampa Bay Rays",
      "away": "Cleveland Guardians",
      "time": "8:10 PM ET",
      "commence": "2026-10-20T00:10:00Z",
      "starters": {
        "away": {
          "name": "Shawn Armstrong",
          "id": 542888,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Freddy Peralta",
          "id": 642547,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "away": {
          "era": 4.58,
          "whip": 1.39,
          "k9": 8.66,
          "bb9": 4.84,
          "h9": 7.64,
          "ip": 35.1,
          "avgIP": 35.1,
          "gs": 1,
          "kPct": 22.1,
          "_source": "mlb_stats_api",
          "l5ERA": null,
          "l5KPct": null,
          "l5BB9": null,
          "l5AvgIP": 2.1,
          "name": "Shawn Armstrong",
          "pid": 542888
        },
        "home": {
          "era": 4.42,
          "whip": 1.33,
          "k9": 8.31,
          "bb9": 3.36,
          "h9": 8.57,
          "ip": 169.0,
          "avgIP": 5.3,
          "gs": 32,
          "kPct": 21.4,
          "_source": "mlb_stats_api",
          "l5ERA": 0.82,
          "l5KPct": 22.2,
          "l5BB9": 4.09,
          "l5AvgIP": 5.5,
          "name": "Freddy Peralta",
          "pid": 642547
        }
      },
      "team_stats": {
        "away": {
          "name": "Cleveland Guardians",
          "_source": "mlb_stats_api",
          "rPerG": 4.19,
          "avg": ".239",
          "ops": ".696",
          "kPct": 20.8,
          "bbPct": 9.4
        },
        "home": {
          "name": "Tampa Bay Rays",
          "_source": "mlb_stats_api",
          "rPerG": 4.54,
          "avg": ".258",
          "ops": ".728",
          "kPct": 18.8,
          "bbPct": 8.4
        }
      },
      "lines": {
        "ml": "Tampa Bay Rays -156 / Cleveland Guardians +132",
        "spread": "Tampa Bay Rays -1.5 (+146)",
        "total": "O/U 6.5 (Over -128 / Under +104)",
        "raw": {
          "homeML": -156,
          "awayML": 132,
          "homeSpread": -1.5,
          "homeSpreadOdds": 146,
          "awaySpread": 1.5,
          "awaySpreadOdds": -178,
          "total": 6.5,
          "overOdds": -128,
          "underOdds": 104
        }
      },
      "props": {
        "Freddy Peralta": {
          "pitcher_outs": {
            "point": 13.5,
            "over": -166,
            "under": 120,
            "overStr": "-166",
            "underStr": "+120"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": 130,
            "under": -166,
            "overStr": "+130",
            "underStr": "-166"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
