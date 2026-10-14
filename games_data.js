const ODDS_DATA = {
  "fetched_at": "2026-10-14T18:17:44.648800+00:00",
  "date": "2026-10-14",
  "games": [
    {
      "id": "622fd31d2c8178b025455656e0d2fb89",
      "home": "Los Angeles Dodgers",
      "away": "Milwaukee Brewers",
      "time": "8:00 PM ET",
      "commence": "2026-10-15T00:00:00Z",
      "starters": {
        "away": {
          "name": "Robert Gasser",
          "id": 688107,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Blake Snell",
          "id": 605483,
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
          "l5ERA": 1.0,
          "l5KPct": 24.2,
          "l5BB9": 3.0,
          "l5AvgIP": 6.0,
          "l3ERA": 1.5,
          "l3KPct": 45.0,
          "l3BB9": 1.5,
          "l3AvgIP": 6.0,
          "name": "Robert Gasser",
          "pid": 688107
        },
        "home": {
          "era": 1.9,
          "whip": 1.1,
          "k9": 11.6,
          "bb9": 3.38,
          "h9": 6.54,
          "ip": 42.2,
          "avgIP": 4.7,
          "gs": 9,
          "kPct": 31.8,
          "_source": "mlb_stats_api",
          "l5ERA": 1.69,
          "l5KPct": 29.3,
          "l5BB9": 1.69,
          "l5AvgIP": 3.4,
          "l3ERA": 2.25,
          "l3KPct": 18.8,
          "l3BB9": null,
          "l3AvgIP": 4.0,
          "name": "Blake Snell",
          "pid": 605483
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
          "name": "Los Angeles Dodgers",
          "_source": "mlb_stats_api",
          "rPerG": 4.94,
          "avg": ".257",
          "ops": ".762",
          "kPct": 20.4,
          "bbPct": 10.1
        }
      },
      "lines": {
        "ml": "Los Angeles Dodgers -174 / Milwaukee Brewers +146",
        "spread": "Los Angeles Dodgers -1.5 (+125)",
        "total": "O/U 7.5 (Over -105 / Under -115)",
        "raw": {
          "homeML": -174,
          "awayML": 146,
          "homeSpread": -1.5,
          "homeSpreadOdds": 125,
          "awaySpread": 1.5,
          "awaySpreadOdds": -150,
          "total": 7.5,
          "overOdds": -105,
          "underOdds": -115
        }
      },
      "props": {
        "Robert Gasser": {
          "pitcher_outs": {
            "point": 11.5,
            "over": -132,
            "under": -102,
            "overStr": "-132",
            "underStr": "-102"
          },
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": 100,
            "under": -128,
            "overStr": "+100",
            "underStr": "-128"
          }
        },
        "Blake Snell": {
          "pitcher_outs": {
            "point": 14.5,
            "over": -166,
            "under": 124,
            "overStr": "-166",
            "underStr": "+124"
          },
          "pitcher_strikeouts": {
            "point": 6.5,
            "over": 106,
            "under": -136,
            "overStr": "+106",
            "underStr": "-136"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
