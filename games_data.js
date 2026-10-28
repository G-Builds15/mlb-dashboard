const ODDS_DATA = {
  "fetched_at": "2026-10-28T19:19:16.903072+00:00",
  "date": "2026-10-28",
  "games": [
    {
      "id": "99d7f299f7f7feb7980daeeee5f238a9",
      "home": "Tampa Bay Rays",
      "away": "Milwaukee Brewers",
      "time": "8:00 PM ET",
      "commence": "2026-10-29T00:00:00Z",
      "starters": {
        "away": {
          "name": "Jacob Misiorowski",
          "id": 694819,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Drew Rasmussen",
          "id": 656876,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "away": {
          "era": 1.8,
          "whip": 0.8,
          "k9": 12.98,
          "bb9": 2.27,
          "h9": 4.95,
          "ip": 174.2,
          "avgIP": 5.8,
          "gs": 30,
          "kPct": 37.9,
          "_source": "mlb_stats_api",
          "l5ERA": null,
          "l5KPct": 26.3,
          "l5BB9": 3.38,
          "l5AvgIP": 5.1,
          "name": "Jacob Misiorowski",
          "pid": 694819
        },
        "home": {
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
          "name": "Drew Rasmussen",
          "pid": 656876
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
        "ml": "Tampa Bay Rays +118 / Milwaukee Brewers -138",
        "spread": "Tampa Bay Rays +1.5 (-160)",
        "total": "O/U 6.5 (Over -102 / Under -120)",
        "raw": {
          "homeML": 118,
          "awayML": -138,
          "homeSpread": 1.5,
          "homeSpreadOdds": -160,
          "awaySpread": -1.5,
          "awaySpreadOdds": 132,
          "total": 6.5,
          "overOdds": -102,
          "underOdds": -120
        }
      },
      "props": {
        "Jacob Misiorowski": {
          "pitcher_outs": {
            "point": 15.5,
            "over": 102,
            "under": -136,
            "overStr": "+102",
            "underStr": "-136"
          },
          "pitcher_strikeouts": {
            "point": 5.5,
            "over": -142,
            "under": 112,
            "overStr": "-142",
            "underStr": "+112"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
