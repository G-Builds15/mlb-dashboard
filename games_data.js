const ODDS_DATA = {
  "fetched_at": "2026-10-07T00:14:06.960751+00:00",
  "date": "2026-10-07",
  "games": [
    {
      "id": "1bc3bf1d3034010bdfb31d928a71177a",
      "home": "Atlanta Braves",
      "away": "Los Angeles Dodgers",
      "time": "6:11 PM ET",
      "commence": "2026-10-06T22:11:38Z",
      "starters": {
        "away": {
          "name": "TBD",
          "id": null,
          "hand": "?",
          "confirmed": false
        },
        "home": {
          "name": "TBD",
          "id": null,
          "hand": "?",
          "confirmed": false
        }
      },
      "pitcher_stats": {},
      "team_stats": {},
      "lines": {
        "ml": "Atlanta Braves +509 / Los Angeles Dodgers -900",
        "spread": "Atlanta Braves +2.5 (-208)",
        "total": "O/U 5.5 (Over -131 / Under +100)",
        "raw": {
          "homeML": 509,
          "awayML": -900,
          "homeSpread": 2.5,
          "homeSpreadOdds": -208,
          "awaySpread": -2.5,
          "awaySpreadOdds": 157,
          "total": 5.5,
          "overOdds": -131,
          "underOdds": 100
        }
      },
      "props": {
        "Yoshinobu Yamamoto": {
          "pitcher_earned_runs": {
            "point": 1.5,
            "over": 500,
            "under": -900,
            "overStr": "+500",
            "underStr": "-900"
          },
          "pitcher_hits_allowed": {
            "point": 4.5,
            "over": 100,
            "under": -140,
            "overStr": "+100",
            "underStr": "-140"
          },
          "pitcher_outs": {
            "point": 20.5,
            "over": -270,
            "under": 195,
            "overStr": "-270",
            "underStr": "+195"
          },
          "pitcher_strikeouts": {
            "point": 8.5,
            "over": -225,
            "under": 165,
            "overStr": "-225",
            "underStr": "+165"
          },
          "pitcher_walks": {
            "point": 1.5,
            "over": 340,
            "under": -500,
            "overStr": "+340",
            "underStr": "-500"
          }
        }
      }
    },
    {
      "id": "62d8e1c18355ab6b3913d7a28fa677c2",
      "home": "San Diego Padres",
      "away": "Milwaukee Brewers",
      "time": "9:30 PM ET",
      "commence": "2026-10-07T01:30:00Z",
      "starters": {
        "away": {
          "name": "TBD",
          "id": null,
          "hand": "?",
          "confirmed": false
        },
        "home": {
          "name": "TBD",
          "id": null,
          "hand": "?",
          "confirmed": false
        }
      },
      "pitcher_stats": {},
      "team_stats": {},
      "lines": {
        "ml": "San Diego Padres -138 / Milwaukee Brewers +118",
        "spread": "San Diego Padres -1.5 (+155)",
        "total": "O/U 7.5 (Over -104 / Under -118)",
        "raw": {
          "homeML": -138,
          "awayML": 118,
          "homeSpread": -1.5,
          "homeSpreadOdds": 155,
          "awaySpread": 1.5,
          "awaySpreadOdds": -188,
          "total": 7.5,
          "overOdds": -104,
          "underOdds": -118
        }
      },
      "props": {
        "Nick Pivetta": {
          "pitcher_outs": {
            "point": 10.5,
            "over": 102,
            "under": -136,
            "overStr": "+102",
            "underStr": "-136"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": 136,
            "under": -172,
            "overStr": "+136",
            "underStr": "-172"
          }
        },
        "Dustin May": {
          "pitcher_outs": {
            "point": 8.5,
            "over": -152,
            "under": 114,
            "overStr": "-152",
            "underStr": "+114"
          },
          "pitcher_strikeouts": {
            "point": 2.5,
            "over": -154,
            "under": 120,
            "overStr": "-154",
            "underStr": "+120"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
