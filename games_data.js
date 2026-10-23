const ODDS_DATA = {
  "fetched_at": "2026-10-23T18:05:03.660280+00:00",
  "date": "2026-10-23",
  "games": [
    {
      "id": "e4c03eec29795f56b6b06c313d3af271",
      "home": "Milwaukee Brewers",
      "away": "Tampa Bay Rays",
      "time": "8:00 PM ET",
      "commence": "2026-10-24T00:00:00Z",
      "starters": {
        "away": {
          "name": "Nick Martinez",
          "id": 607259,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Jacob Misiorowski",
          "id": 694819,
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
          "l5ERA": 6.23,
          "l5KPct": 20.0,
          "l5BB9": 2.08,
          "l5AvgIP": 4.1,
          "name": "Nick Martinez",
          "pid": 607259
        },
        "home": {
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
          "l5KPct": 31.0,
          "l5BB9": 2.16,
          "l5AvgIP": 4.0,
          "name": "Jacob Misiorowski",
          "pid": 694819
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
          "name": "Milwaukee Brewers",
          "_source": "mlb_stats_api",
          "rPerG": 5.14,
          "avg": ".258",
          "ops": ".744",
          "kPct": 22.0,
          "bbPct": 10.6
        }
      },
      "lines": {
        "ml": "Milwaukee Brewers -196 / Tampa Bay Rays +164",
        "spread": "Milwaukee Brewers -1.5 (+125)",
        "total": "O/U 6.5 (Over -110 / Under -110)",
        "raw": {
          "homeML": -196,
          "awayML": 164,
          "homeSpread": -1.5,
          "homeSpreadOdds": 125,
          "awaySpread": 1.5,
          "awaySpreadOdds": -150,
          "total": 6.5,
          "overOdds": -110,
          "underOdds": -110
        }
      },
      "props": {
        "Jacob Misiorowski": {
          "pitcher_outs": {
            "point": 16.5,
            "over": -108,
            "under": -125,
            "overStr": "-108",
            "underStr": "-125"
          },
          "pitcher_strikeouts": {
            "point": 6.5,
            "over": -130,
            "under": 102,
            "overStr": "-130",
            "underStr": "+102"
          }
        },
        "Nick Martinez": {
          "pitcher_outs": {
            "point": 13.5,
            "over": -102,
            "under": -132,
            "overStr": "-102",
            "underStr": "-132"
          },
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": 148,
            "under": -192,
            "overStr": "+148",
            "underStr": "-192"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
