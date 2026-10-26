const ODDS_DATA = {
  "fetched_at": "2026-10-26T19:43:42.060339+00:00",
  "date": "2026-10-26",
  "games": [
    {
      "id": "82812d5c946d4e055002fcb42673a38b",
      "home": "Tampa Bay Rays",
      "away": "Milwaukee Brewers",
      "time": "8:10 PM ET",
      "commence": "2026-10-27T00:10:00Z",
      "starters": {
        "away": {
          "name": "Robert Gasser",
          "id": 688107,
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
          "era": 3.87,
          "whip": 1.19,
          "k9": 8.48,
          "bb9": 2.88,
          "h9": 7.82,
          "ip": 109.1,
          "avgIP": 5.5,
          "gs": 20,
          "kPct": 22.2,
          "_source": "mlb_stats_api",
          "l5ERA": 1.5,
          "l5KPct": 45.0,
          "l5BB9": 1.5,
          "l5AvgIP": 6.0,
          "name": "Robert Gasser",
          "pid": 688107
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
          "l5ERA": null,
          "l5KPct": 18.2,
          "l5BB9": 5.06,
          "l5AvgIP": 5.1,
          "name": "Freddy Peralta",
          "pid": 642547
        }
      },
      "team_stats": {
        "away": {
          "name": "Milwaukee Brewers",
          "_source": "mlb_stats_api",
          "rPerG": 5.14,
          "avg": ".258",
          "ops": ".744",
          "kPct": 22.0,
          "bbPct": 10.6
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
        "ml": "Tampa Bay Rays -120 / Milwaukee Brewers +102",
        "spread": "Tampa Bay Rays +1.5 (-200)",
        "total": "O/U 7.5 (Over +112 / Under -138)",
        "raw": {
          "homeML": -120,
          "awayML": 102,
          "homeSpread": 1.5,
          "homeSpreadOdds": -200,
          "awaySpread": -1.5,
          "awaySpreadOdds": 164,
          "total": 7.5,
          "overOdds": 112,
          "underOdds": -138
        }
      },
      "props": {
        "Robert Gasser": {
          "pitcher_outs": {
            "point": 12.5,
            "over": -102,
            "under": -132,
            "overStr": "-102",
            "underStr": "-132"
          },
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": 118,
            "under": -148,
            "overStr": "+118",
            "underStr": "-148"
          }
        },
        "Freddy Peralta": {
          "pitcher_outs": {
            "point": 14.5,
            "over": -160,
            "under": 118,
            "overStr": "-160",
            "underStr": "+118"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": -128,
            "under": 100,
            "overStr": "-128",
            "underStr": "+100"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
