const ODDS_DATA = {
  "fetched_at": "2026-10-20T00:02:35.436107+00:00",
  "date": "2026-10-20",
  "games": [
    {
      "id": "be50f6c59c20efa430eec6f146a0fcb1",
      "home": "Tampa Bay Rays",
      "away": "Cleveland Guardians",
      "time": "8:10 PM ET",
      "commence": "2026-10-20T00:10:00Z",
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
        "ml": "Tampa Bay Rays -158 / Cleveland Guardians +138",
        "spread": "Tampa Bay Rays -1.5 (+146)",
        "total": "O/U 6.5 (Over -128 / Under +104)",
        "raw": {
          "homeML": -158,
          "awayML": 138,
          "homeSpread": -1.5,
          "homeSpreadOdds": 146,
          "awaySpread": 1.5,
          "awaySpreadOdds": -176,
          "total": 6.5,
          "overOdds": -128,
          "underOdds": 104
        }
      },
      "props": {
        "Freddy Peralta": {
          "pitcher_outs": {
            "point": 13.5,
            "over": -192,
            "under": 140,
            "overStr": "-192",
            "underStr": "+140"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": 128,
            "under": -164,
            "overStr": "+128",
            "underStr": "-164"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
