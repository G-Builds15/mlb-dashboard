const ODDS_DATA = {
  "fetched_at": "2026-10-28T00:08:59.382669+00:00",
  "date": "2026-10-28",
  "games": [
    {
      "id": "e03ea0f98bdd5fa277a34fbfe1a47efa",
      "home": "Tampa Bay Rays",
      "away": "Milwaukee Brewers",
      "time": "8:10 PM ET",
      "commence": "2026-10-28T00:10:00Z",
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
        "ml": "Tampa Bay Rays +104 / Milwaukee Brewers -118",
        "spread": "Tampa Bay Rays +1.5 (-172)",
        "total": "O/U 7.5 (Over +106 / Under -130)",
        "raw": {
          "homeML": 104,
          "awayML": -118,
          "homeSpread": 1.5,
          "homeSpreadOdds": -172,
          "awaySpread": -1.5,
          "awaySpreadOdds": 142,
          "total": 7.5,
          "overOdds": 106,
          "underOdds": -130
        }
      },
      "props": {
        "Griffin Jax": {
          "pitcher_outs": {
            "point": 11.5,
            "over": 110,
            "under": -146,
            "overStr": "+110",
            "underStr": "-146"
          },
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": -113,
            "under": -113,
            "overStr": "-113",
            "underStr": "-113"
          }
        },
        "Dustin May": {
          "pitcher_strikeouts": {
            "point": 2.5,
            "over": 120,
            "under": -154,
            "overStr": "+120",
            "underStr": "-154"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
