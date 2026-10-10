const ODDS_DATA = {
  "fetched_at": "2026-10-10T23:58:49.996498+00:00",
  "date": "2026-10-10",
  "games": [
    {
      "id": "62bf363a77455f7a8b48838e7792f60b",
      "home": "Cleveland Guardians",
      "away": "Chicago White Sox",
      "time": "8:01 PM ET",
      "commence": "2026-10-11T00:01:00Z",
      "starters": {
        "away": {
          "name": "Sean Burke",
          "id": 680732,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Gavin Williams",
          "id": 668909,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "away": {
          "era": 3.34,
          "whip": 1.2,
          "k9": 9.66,
          "bb9": 3.24,
          "h9": 7.52,
          "ip": 172.1,
          "avgIP": 6.4,
          "gs": 27,
          "kPct": 25.8,
          "_source": "mlb_stats_api",
          "l5ERA": 4.58,
          "l5KPct": 22.2,
          "l5BB9": 4.08,
          "l5AvgIP": 5.7,
          "l3ERA": 1.59,
          "l3KPct": 25.5,
          "l3BB9": 3.18,
          "l3AvgIP": 5.5,
          "name": "Sean Burke",
          "pid": 680732
        },
        "home": {
          "era": 3.76,
          "whip": 1.11,
          "k9": 12.11,
          "bb9": 2.98,
          "h9": 7.03,
          "ip": 184.1,
          "avgIP": 5.8,
          "gs": 32,
          "kPct": 33.2,
          "_source": "mlb_stats_api",
          "l5ERA": 3.38,
          "l5KPct": 34.8,
          "l5BB9": 4.64,
          "l5AvgIP": 5.3,
          "l3ERA": 3.48,
          "l3KPct": 31.7,
          "l3BB9": 4.35,
          "l3AvgIP": 5.0,
          "name": "Gavin Williams",
          "pid": 668909
        }
      },
      "team_stats": {
        "away": {
          "name": "Chicago White Sox",
          "_source": "mlb_stats_api",
          "rPerG": 4.79,
          "avg": ".236",
          "ops": ".726",
          "kPct": 24.1,
          "bbPct": 9.5,
          "bullpenERA_L14": 5.0
        },
        "home": {
          "name": "Cleveland Guardians",
          "_source": "mlb_stats_api",
          "rPerG": 4.19,
          "avg": ".239",
          "ops": ".696",
          "kPct": 20.8,
          "bbPct": 9.4,
          "bullpenERA_L14": 4.24
        }
      },
      "lines": {
        "ml": "Cleveland Guardians -134 / Chicago White Sox +120",
        "spread": "Cleveland Guardians -1.5 (+155)",
        "total": "O/U 7.5 (Over +108 / Under -132)",
        "raw": {
          "homeML": -134,
          "awayML": 120,
          "homeSpread": -1.5,
          "homeSpreadOdds": 155,
          "awaySpread": 1.5,
          "awaySpreadOdds": -188,
          "total": 7.5,
          "overOdds": 108,
          "underOdds": -132
        }
      },
      "props": {
        "Sean Burke": {
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": -142,
            "under": 112,
            "overStr": "-142",
            "underStr": "+112"
          }
        },
        "Gavin Williams": {
          "pitcher_strikeouts": {
            "point": 6.5,
            "over": -130,
            "under": 102,
            "overStr": "-130",
            "underStr": "+102"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
