const ODDS_DATA = {
  "fetched_at": "2026-10-27T19:12:41.518605+00:00",
  "date": "2026-10-27",
  "games": [
    {
      "id": "e03ea0f98bdd5fa277a34fbfe1a47efa",
      "home": "Tampa Bay Rays",
      "away": "Milwaukee Brewers",
      "time": "8:00 PM ET",
      "commence": "2026-10-28T00:00:00Z",
      "starters": {
        "away": {
          "name": "TBD",
          "id": null,
          "hand": "?",
          "confirmed": false
        },
        "home": {
          "name": "Griffin Jax",
          "id": 643377,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "home": {
          "era": 3.53,
          "whip": 1.18,
          "k9": 9.29,
          "bb9": 2.8,
          "h9": 7.77,
          "ip": 112.1,
          "avgIP": 4.9,
          "gs": 23,
          "kPct": 25.3,
          "_source": "mlb_stats_api",
          "l5ERA": null,
          "l5KPct": null,
          "l5BB9": null,
          "l5AvgIP": 3.0,
          "name": "Griffin Jax",
          "pid": 643377
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
        "ml": "Tampa Bay Rays +106 / Milwaukee Brewers -124",
        "spread": "Tampa Bay Rays +1.5 (-164)",
        "total": "O/U 7.5 (Over +110 / Under -134)",
        "raw": {
          "homeML": 106,
          "awayML": -124,
          "homeSpread": 1.5,
          "homeSpreadOdds": -164,
          "awaySpread": -1.5,
          "awaySpreadOdds": 136,
          "total": 7.5,
          "overOdds": 110,
          "underOdds": -134
        }
      },
      "props": {
        "Griffin Jax": {
          "pitcher_outs": {
            "point": 11.5,
            "over": 114,
            "under": -154,
            "overStr": "+114",
            "underStr": "-154"
          },
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": -113,
            "under": -113,
            "overStr": "-113",
            "underStr": "-113"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
