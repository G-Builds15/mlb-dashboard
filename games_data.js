const ODDS_DATA = {
  "fetched_at": "2026-10-27T00:08:22.451431+00:00",
  "date": "2026-10-27",
  "games": [
    {
      "id": "82812d5c946d4e055002fcb42673a38b",
      "home": "Tampa Bay Rays",
      "away": "Milwaukee Brewers",
      "time": "8:10 PM ET",
      "commence": "2026-10-27T00:10:00Z",
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
        "ml": "Tampa Bay Rays -116 / Milwaukee Brewers +102",
        "spread": "Tampa Bay Rays +1.5 (-205)",
        "total": "O/U 7.5 (Over +112 / Under -138)",
        "raw": {
          "homeML": -116,
          "awayML": 102,
          "homeSpread": 1.5,
          "homeSpreadOdds": -205,
          "awaySpread": -1.5,
          "awaySpreadOdds": 168,
          "total": 7.5,
          "overOdds": 112,
          "underOdds": -138
        }
      },
      "props": {
        "Robert Gasser": {
          "pitcher_outs": {
            "point": 12.5,
            "over": -106,
            "under": -130,
            "overStr": "-106",
            "underStr": "-130"
          },
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": 124,
            "under": -158,
            "overStr": "+124",
            "underStr": "-158"
          }
        },
        "Freddy Peralta": {
          "pitcher_outs": {
            "point": 14.5,
            "over": -166,
            "under": 124,
            "overStr": "-166",
            "underStr": "+124"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
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
