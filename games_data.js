const ODDS_DATA = {
  "fetched_at": "2026-10-08T19:39:18.313502+00:00",
  "date": "2026-10-08",
  "games": [
    {
      "id": "b57e790481f2b8e5eaf9e0f3eab816bc",
      "home": "Chicago White Sox",
      "away": "Cleveland Guardians",
      "time": "8:00 PM ET",
      "commence": "2026-10-09T00:00:00Z",
      "starters": {
        "away": {
          "name": "Parker Messick",
          "id": 800048,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Hagen Smith",
          "id": 696146,
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
          "l5ERA": 3.2,
          "l5KPct": 29.1,
          "l5BB9": 2.13,
          "l5AvgIP": 5.0,
          "l3ERA": 2.25,
          "l3KPct": 19.4,
          "l3BB9": 2.25,
          "l3AvgIP": 4.0,
          "name": "Parker Messick",
          "pid": 800048
        },
        "home": {
          "era": 1.29,
          "whip": 0.96,
          "k9": 13.18,
          "bb9": 5.14,
          "h9": 3.54,
          "ip": 28.0,
          "avgIP": 28.0,
          "gs": 1,
          "kPct": 37.3,
          "_source": "mlb_stats_api",
          "l5ERA": 1.59,
          "l5KPct": 39.1,
          "l5BB9": 3.18,
          "l5AvgIP": 17.0,
          "l3ERA": 2.08,
          "l3KPct": 36.8,
          "l3BB9": 8.31,
          "l3AvgIP": 4.1,
          "name": "Hagen Smith",
          "pid": 696146
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
          "bbPct": 9.4,
          "bullpenERA_L14": 4.37
        },
        "home": {
          "name": "Chicago White Sox",
          "_source": "mlb_stats_api",
          "rPerG": 4.79,
          "avg": ".236",
          "ops": ".726",
          "kPct": 24.1,
          "bbPct": 9.5,
          "bullpenERA_L14": 3.0
        }
      },
      "lines": {
        "ml": "Chicago White Sox -105 / Cleveland Guardians -115",
        "spread": "Chicago White Sox +1.5 (-185)",
        "total": "O/U 7.0 (Over -117 / Under -102)",
        "raw": {
          "homeML": -105,
          "awayML": -115,
          "homeSpread": 1.5,
          "homeSpreadOdds": -185,
          "awaySpread": -1.5,
          "awaySpreadOdds": 152,
          "total": 7.0,
          "overOdds": -117,
          "underOdds": -102
        }
      },
      "props": {
        "Hagen Smith": {
          "pitcher_earned_runs": {
            "point": 0.5,
            "over": 162,
            "under": -217,
            "overStr": "+162",
            "underStr": "-217"
          },
          "pitcher_hits_allowed": {
            "point": 1.5,
            "over": 125,
            "under": -167,
            "overStr": "+125",
            "underStr": "-167"
          },
          "pitcher_outs": {
            "point": 5.5,
            "over": -133,
            "under": 100,
            "overStr": "-133",
            "underStr": "+100"
          },
          "pitcher_strikeouts": {
            "point": 1.5,
            "over": -174,
            "under": 136,
            "overStr": "-174",
            "underStr": "+136"
          },
          "pitcher_walks": {
            "point": 0.5,
            "over": -147,
            "under": 111,
            "overStr": "-147",
            "underStr": "+111"
          }
        },
        "Parker Messick": {
          "pitcher_earned_runs": {
            "point": 1.5,
            "over": -120,
            "under": -110,
            "overStr": "-120",
            "underStr": "-110"
          },
          "pitcher_hits_allowed": {
            "point": 3.5,
            "over": -156,
            "under": 117,
            "overStr": "-156",
            "underStr": "+117"
          },
          "pitcher_outs": {
            "point": 14.5,
            "over": -212,
            "under": 158,
            "overStr": "-212",
            "underStr": "+158"
          },
          "pitcher_strikeouts": {
            "point": 5.5,
            "over": -150,
            "under": 118,
            "overStr": "-150",
            "underStr": "+118"
          },
          "pitcher_walks": {
            "point": 1.5,
            "over": -138,
            "under": 104,
            "overStr": "-138",
            "underStr": "+104"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
