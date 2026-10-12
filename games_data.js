const ODDS_DATA = {
  "fetched_at": "2026-10-12T00:06:41.353084+00:00",
  "date": "2026-10-12",
  "games": [
    {
      "id": "c43e98d4effc9181f21e21225fcbd47a",
      "home": "Milwaukee Brewers",
      "away": "Los Angeles Dodgers",
      "time": "8:15 PM ET",
      "commence": "2026-10-12T00:15:00Z",
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
        "ml": "Milwaukee Brewers -102 / Los Angeles Dodgers -110",
        "spread": "Milwaukee Brewers +1.5 (-210)",
        "total": "O/U 6.5 (Over +104 / Under -128)",
        "raw": {
          "homeML": -102,
          "awayML": -110,
          "homeSpread": 1.5,
          "homeSpreadOdds": -210,
          "awaySpread": -1.5,
          "awaySpreadOdds": 172,
          "total": 6.5,
          "overOdds": 104,
          "underOdds": -128
        }
      },
      "props": {
        "Tarik Skubal": {
          "pitcher_outs": {
            "point": 17.5,
            "over": -162,
            "under": 118,
            "overStr": "-162",
            "underStr": "+118"
          },
          "pitcher_strikeouts": {
            "point": 7.5,
            "over": 124,
            "under": -160,
            "overStr": "+124",
            "underStr": "-160"
          }
        },
        "Jacob Misiorowski": {
          "pitcher_outs": {
            "point": 16.5,
            "over": -130,
            "under": -106,
            "overStr": "-130",
            "underStr": "-106"
          },
          "pitcher_strikeouts": {
            "point": 7.5,
            "over": 102,
            "under": -130,
            "overStr": "+102",
            "underStr": "-130"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
