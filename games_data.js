const ODDS_DATA = {
  "fetched_at": "2026-10-13T02:19:07.794180+00:00",
  "date": "2026-10-13",
  "games": [
    {
      "id": "362511067a27b4ef89418639e15e80b6",
      "home": "Tampa Bay Rays",
      "away": "Cleveland Guardians",
      "time": "8:08 PM ET",
      "commence": "2026-10-13T00:08:00Z",
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
        "ml": "Tampa Bay Rays +106 / Cleveland Guardians -136",
        "spread": "Tampa Bay Rays +1.5 (-320)",
        "total": "O/U 5.5 (Over -114 / Under -114)",
        "raw": {
          "homeML": 106,
          "awayML": -136,
          "homeSpread": 1.5,
          "homeSpreadOdds": -320,
          "awaySpread": -1.5,
          "awaySpreadOdds": 225,
          "total": 5.5,
          "overOdds": -114,
          "underOdds": -114
        }
      },
      "props": {}
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
