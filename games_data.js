const ODDS_DATA = {
  "fetched_at": "2026-10-02T00:20:36.486950+00:00",
  "date": "2026-10-02",
  "games": [
    {
      "id": "5524c44b05e28aa899909c9e001184ec",
      "home": "Atlanta Braves",
      "away": "Philadelphia Phillies",
      "time": "8:15 PM ET",
      "commence": "2026-10-02T00:15:00Z",
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
        "ml": "Atlanta Braves -142 / Philadelphia Phillies +112",
        "spread": "Atlanta Braves -1.5 (+168)",
        "total": "O/U 7.5 (Over +108 / Under -144)",
        "raw": {
          "homeML": -142,
          "awayML": 112,
          "homeSpread": -1.5,
          "homeSpreadOdds": 168,
          "awaySpread": 1.5,
          "awaySpreadOdds": -230,
          "total": 7.5,
          "overOdds": 108,
          "underOdds": -144
        }
      },
      "props": {
        "Aaron Nola": {
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": 100,
            "under": -128,
            "overStr": "+100",
            "underStr": "-128"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
