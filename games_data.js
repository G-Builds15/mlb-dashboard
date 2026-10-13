const ODDS_DATA = {
  "fetched_at": "2026-10-13T20:04:25.090326+00:00",
  "date": "2026-10-13",
  "games": [
    {
      "id": "38049724abb5fcb2b69405bbe4bb3d72",
      "home": "Tampa Bay Rays",
      "away": "Cleveland Guardians",
      "time": "8:00 PM ET",
      "commence": "2026-10-14T00:00:00Z",
      "starters": {
        "away": {
          "name": "Parker Messick",
          "id": 800048,
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
          "l5ERA": 2.79,
          "l5KPct": 23.8,
          "l5BB9": 1.86,
          "l5AvgIP": 4.8,
          "l3ERA": 2.25,
          "l3KPct": 19.4,
          "l3BB9": 2.25,
          "l3AvgIP": 4.0,
          "name": "Parker Messick",
          "pid": 800048
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
          "l5KPct": 18.4,
          "l5BB9": 3.68,
          "l5AvgIP": 5.5,
          "l3ERA": null,
          "l3KPct": 18.2,
          "l3BB9": 5.06,
          "l3AvgIP": 5.1,
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
        "ml": "Tampa Bay Rays -132 / Cleveland Guardians +112",
        "spread": "Tampa Bay Rays -1.5 (+176)",
        "total": "O/U 6.5 (Over -132 / Under +108)",
        "raw": {
          "homeML": -132,
          "awayML": 112,
          "homeSpread": -1.5,
          "homeSpreadOdds": 176,
          "awaySpread": 1.5,
          "awaySpreadOdds": -215,
          "total": 6.5,
          "overOdds": -132,
          "underOdds": 108
        }
      },
      "props": {
        "Freddy Peralta": {
          "pitcher_outs": {
            "point": 13.5,
            "over": -132,
            "under": -102,
            "overStr": "-132",
            "underStr": "-102"
          },
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": -130,
            "under": 102,
            "overStr": "-130",
            "underStr": "+102"
          }
        },
        "Parker Messick": {
          "pitcher_outs": {
            "point": 14.5,
            "over": -132,
            "under": 100,
            "overStr": "-132",
            "underStr": "+100"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": -120,
            "under": -106,
            "overStr": "-120",
            "underStr": "-106"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
