const ODDS_DATA = {
  "fetched_at": "2026-10-08T00:35:10.198955+00:00",
  "date": "2026-10-08",
  "games": [
    {
      "id": "2f041c00e4bddc69bd1bbfbd40cc3c09",
      "home": "Atlanta Braves",
      "away": "Los Angeles Dodgers",
      "time": "6:09 PM ET",
      "commence": "2026-10-07T22:09:10Z",
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
        "ml": "Atlanta Braves +680 / Los Angeles Dodgers -1480",
        "spread": "Atlanta Braves +2.5 (-255)",
        "total": "O/U 5.5 (Over +130 / Under -170)",
        "raw": {
          "homeML": 680,
          "awayML": -1480,
          "homeSpread": 2.5,
          "homeSpreadOdds": -255,
          "awaySpread": -2.5,
          "awaySpreadOdds": 189,
          "total": 5.5,
          "overOdds": 130,
          "underOdds": -170
        }
      },
      "props": {}
    },
    {
      "id": "aa266da6f8d98646bc59d18ddbc5b2de",
      "home": "New York Yankees",
      "away": "Tampa Bay Rays",
      "time": "8:15 PM ET",
      "commence": "2026-10-08T00:15:00Z",
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
        "ml": "New York Yankees -225 / Tampa Bay Rays +172",
        "spread": "New York Yankees -1.5 (+116)",
        "total": "O/U 5.5 (Over -136 / Under +102)",
        "raw": {
          "homeML": -225,
          "awayML": 172,
          "homeSpread": -1.5,
          "homeSpreadOdds": 116,
          "awaySpread": 1.5,
          "awaySpreadOdds": -154,
          "total": 5.5,
          "overOdds": -136,
          "underOdds": 102
        }
      },
      "props": {
        "Max Fried": {
          "pitcher_earned_runs": {
            "point": 0.5,
            "over": -170,
            "under": 125,
            "overStr": "-170",
            "underStr": "+125"
          },
          "pitcher_hits_allowed": {
            "point": 3.5,
            "over": -175,
            "under": 125,
            "overStr": "-175",
            "underStr": "+125"
          },
          "pitcher_outs": {
            "point": 17.5,
            "over": -110,
            "under": -125,
            "overStr": "-110",
            "underStr": "-125"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": 115,
            "under": -160,
            "overStr": "+115",
            "underStr": "-160"
          },
          "pitcher_walks": {
            "point": 1.5,
            "over": 175,
            "under": -240,
            "overStr": "+175",
            "underStr": "-240"
          }
        },
        "Nick Martinez": {
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": 110,
            "under": -150,
            "overStr": "+110",
            "underStr": "-150"
          }
        }
      }
    },
    {
      "id": "3c71012ad7a75e6c11575285e6841e14",
      "home": "San Diego Padres",
      "away": "Milwaukee Brewers",
      "time": "10:00 PM ET",
      "commence": "2026-10-08T02:00:00Z",
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
        "ml": "San Diego Padres -110 / Milwaukee Brewers -106",
        "spread": "San Diego Padres +1.5 (-200)",
        "total": "O/U 7.5 (Over -108 / Under -112)",
        "raw": {
          "homeML": -110,
          "awayML": -106,
          "homeSpread": 1.5,
          "homeSpreadOdds": -200,
          "awaySpread": -1.5,
          "awaySpreadOdds": 164,
          "total": 7.5,
          "overOdds": -108,
          "underOdds": -112
        }
      },
      "props": {
        "Walker Buehler": {
          "pitcher_outs": {
            "point": 11.5,
            "over": 158,
            "under": -235,
            "overStr": "+158",
            "underStr": "-235"
          },
          "pitcher_strikeouts": {
            "point": 2.5,
            "over": -150,
            "under": 118,
            "overStr": "-150",
            "underStr": "+118"
          }
        },
        "Robert Gasser": {
          "pitcher_outs": {
            "point": 8.5,
            "over": -166,
            "under": 122,
            "overStr": "-166",
            "underStr": "+122"
          },
          "pitcher_strikeouts": {
            "point": 2.5,
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
