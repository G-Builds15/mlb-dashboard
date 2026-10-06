const ODDS_DATA = {
  "fetched_at": "2026-10-06T01:36:23.271935+00:00",
  "date": "2026-10-06",
  "games": [
    {
      "id": "4be245ad03895bcafcdc42d7d926b675",
      "home": "Tampa Bay Rays",
      "away": "New York Yankees",
      "time": "8:09 PM ET",
      "commence": "2026-10-06T00:09:00Z",
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
        "ml": "Tampa Bay Rays +100 / New York Yankees -128",
        "spread": "Tampa Bay Rays +1.5 (-250)",
        "total": "O/U 5.5 (Over +114 / Under -152)",
        "raw": {
          "homeML": 100,
          "awayML": -128,
          "homeSpread": 1.5,
          "homeSpreadOdds": -250,
          "awaySpread": -1.5,
          "awaySpreadOdds": 182,
          "total": 5.5,
          "overOdds": 114,
          "underOdds": -152
        }
      },
      "props": {
        "Cam Schlittler": {
          "pitcher_earned_runs": {
            "point": 0.5,
            "over": 185,
            "under": -260,
            "overStr": "+185",
            "underStr": "-260"
          },
          "pitcher_hits_allowed": {
            "point": 5.5,
            "over": 105,
            "under": -145,
            "overStr": "+105",
            "underStr": "-145"
          },
          "pitcher_outs": {
            "point": 18.5,
            "over": 165,
            "under": -230,
            "overStr": "+165",
            "underStr": "-230"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": 125,
            "under": -170,
            "overStr": "+125",
            "underStr": "-170"
          },
          "pitcher_walks": {
            "point": 1.5,
            "over": -105,
            "under": -130,
            "overStr": "-105",
            "underStr": "-130"
          }
        },
        "Freddy Peralta": {
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": 135,
            "under": -180,
            "overStr": "+135",
            "underStr": "-180"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
