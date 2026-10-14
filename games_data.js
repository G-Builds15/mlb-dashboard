const ODDS_DATA = {
  "fetched_at": "2026-10-14T00:01:44.550549+00:00",
  "date": "2026-10-14",
  "games": [
    {
      "id": "38049724abb5fcb2b69405bbe4bb3d72",
      "home": "Tampa Bay Rays",
      "away": "Cleveland Guardians",
      "time": "8:00 PM ET",
      "commence": "2026-10-14T00:00:00Z",
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
        "ml": "Tampa Bay Rays -128 / Cleveland Guardians +114",
        "spread": "Tampa Bay Rays -1.5 (+168)",
        "total": "O/U 6.5 (Over -120 / Under -102)",
        "raw": {
          "homeML": -128,
          "awayML": 114,
          "homeSpread": -1.5,
          "homeSpreadOdds": 168,
          "awaySpread": 1.5,
          "awaySpreadOdds": -205,
          "total": 6.5,
          "overOdds": -120,
          "underOdds": -102
        }
      },
      "props": {
        "Freddy Peralta": {
          "pitcher_outs": {
            "point": 13.5,
            "over": -125,
            "under": -108,
            "overStr": "-125",
            "underStr": "-108"
          },
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": -130,
            "under": 102,
            "overStr": "-130",
            "underStr": "+102"
          }
        },
        "Parker Messick": {
          "pitcher_outs": {
            "point": 14.5,
            "over": -172,
            "under": 128,
            "overStr": "-172",
            "underStr": "+128"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": -104,
            "under": -122,
            "overStr": "-104",
            "underStr": "-122"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
