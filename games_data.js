const ODDS_DATA = {
  "fetched_at": "2026-10-29T00:31:23.328567+00:00",
  "date": "2026-10-29",
  "games": [
    {
      "id": "99d7f299f7f7feb7980daeeee5f238a9",
      "home": "Tampa Bay Rays",
      "away": "Milwaukee Brewers",
      "time": "8:10 PM ET",
      "commence": "2026-10-29T00:10:00Z",
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
        "ml": "Tampa Bay Rays +128 / Milwaukee Brewers -164",
        "spread": "Tampa Bay Rays +1.5 (-162)",
        "total": "O/U 5.5 (Over -114 / Under -114)",
        "raw": {
          "homeML": 128,
          "awayML": -164,
          "homeSpread": 1.5,
          "homeSpreadOdds": -162,
          "awaySpread": -1.5,
          "awaySpreadOdds": 122,
          "total": 5.5,
          "overOdds": -114,
          "underOdds": -114
        }
      },
      "props": {
        "Drew Rasmussen": {
          "pitcher_hits_allowed": {
            "point": 3.5,
            "over": -105,
            "under": -145,
            "overStr": "-105",
            "underStr": "-145"
          }
        },
        "Jacob Misiorowski": {
          "pitcher_outs": {
            "point": 15.5,
            "over": -115,
            "under": -135,
            "overStr": "-115",
            "underStr": "-135"
          },
          "pitcher_strikeouts": {
            "point": 5.5,
            "over": 125,
            "under": -165,
            "overStr": "+125",
            "underStr": "-165"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
