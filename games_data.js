const ODDS_DATA = {
  "fetched_at": "2026-10-17T16:49:51.080845+00:00",
  "date": "2026-10-17",
  "games": [
    {
      "id": "bf41baaebfa23a202d2f3a6811425ff9",
      "home": "Cleveland Guardians",
      "away": "Tampa Bay Rays",
      "time": "8:00 PM ET",
      "commence": "2026-10-18T00:00:00Z",
      "starters": {
        "away": {
          "name": "Nick Martinez",
          "id": 607259,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Shawn Armstrong",
          "id": 542888,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "away": {
          "era": 3.1,
          "whip": 1.09,
          "k9": 5.45,
          "bb9": 1.3,
          "h9": 8.55,
          "ip": 180.0,
          "avgIP": 5.8,
          "gs": 31,
          "kPct": 15.1,
          "_source": "mlb_stats_api",
          "l5ERA": 5.27,
          "l5KPct": 18.6,
          "l5BB9": 1.32,
          "l5AvgIP": 4.4,
          "l3ERA": 13.5,
          "l3KPct": 6.2,
          "l3BB9": 3.38,
          "l3AvgIP": 2.2,
          "name": "Nick Martinez",
          "pid": 607259
        },
        "home": {
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
          "l3ERA": null,
          "l3KPct": null,
          "l3BB9": null,
          "l3AvgIP": 1.0,
          "name": "Shawn Armstrong",
          "pid": 542888
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
        "ml": "Cleveland Guardians -102 / Tampa Bay Rays -116",
        "spread": "Cleveland Guardians +1.5 (-192)",
        "total": "O/U 6.5 (Over -112 / Under -108)",
        "raw": {
          "homeML": -102,
          "awayML": -116,
          "homeSpread": 1.5,
          "homeSpreadOdds": -192,
          "awaySpread": -1.5,
          "awaySpreadOdds": 158,
          "total": 6.5,
          "overOdds": -112,
          "underOdds": -108
        }
      },
      "props": {
        "Nick Martinez": {
          "pitcher_outs": {
            "point": 11.5,
            "over": -136,
            "under": 102,
            "overStr": "-136",
            "underStr": "+102"
          },
          "pitcher_strikeouts": {
            "point": 2.5,
            "over": 128,
            "under": -164,
            "overStr": "+128",
            "underStr": "-164"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
