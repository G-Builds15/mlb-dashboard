const ODDS_DATA = {
  "fetched_at": "2026-10-09T00:50:19.345498+00:00",
  "date": "2026-10-09",
  "games": [
    {
      "id": "b57e790481f2b8e5eaf9e0f3eab816bc",
      "home": "Chicago White Sox",
      "away": "Cleveland Guardians",
      "time": "8:08 PM ET",
      "commence": "2026-10-09T00:08:44Z",
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
        "ml": "Chicago White Sox -113 / Cleveland Guardians -115",
        "spread": "Chicago White Sox +1.5 (-211)",
        "total": "O/U 5.5 (Over -120 / Under -108)",
        "raw": {
          "homeML": -113,
          "awayML": -115,
          "homeSpread": 1.5,
          "homeSpreadOdds": -211,
          "awaySpread": -1.5,
          "awaySpreadOdds": 159,
          "total": 5.5,
          "overOdds": -120,
          "underOdds": -108
        }
      },
      "props": {
        "Parker Messick": {
          "pitcher_earned_runs": {
            "point": 1.5,
            "over": 130,
            "under": -180,
            "overStr": "+130",
            "underStr": "-180"
          },
          "pitcher_hits_allowed": {
            "point": 3.5,
            "over": 125,
            "under": -175,
            "overStr": "+125",
            "underStr": "-175"
          },
          "pitcher_outs": {
            "point": 14.5,
            "over": -230,
            "under": 165,
            "overStr": "-230",
            "underStr": "+165"
          },
          "pitcher_strikeouts": {
            "point": 6.5,
            "over": 110,
            "under": -145,
            "overStr": "+110",
            "underStr": "-145"
          },
          "pitcher_walks": {
            "point": 2.5,
            "over": 120,
            "under": -165,
            "overStr": "+120",
            "underStr": "-165"
          }
        },
        "Erick Fedde": {
          "pitcher_strikeouts": {
            "point": 2.5,
            "over": -150,
            "under": 115,
            "overStr": "-150",
            "underStr": "+115"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
