const ODDS_DATA = {
  "fetched_at": "2026-10-01T00:16:09.566643+00:00",
  "date": "2026-10-01",
  "games": [
    {
      "id": "766096a9312f4528ba2e8b59fe9550fd",
      "home": "Houston Astros",
      "away": "Chicago White Sox",
      "time": "5:11 PM ET",
      "commence": "2026-09-30T21:11:17Z",
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
        "ml": "Houston Astros N/A / Chicago White Sox N/A",
        "spread": "Houston Astros +3.5 (+1040)",
        "total": "O/U 10.5 (Over +1040 / Under -4200)",
        "raw": {
          "homeML": null,
          "awayML": null,
          "homeSpread": 3.5,
          "homeSpreadOdds": 1040,
          "awaySpread": -3.5,
          "awaySpreadOdds": -4200,
          "total": 10.5,
          "overOdds": 1040,
          "underOdds": -4200
        }
      },
      "props": {}
    },
    {
      "id": "110c5c1a6de988c7066e2f291be8d7ff",
      "home": "New York Yankees",
      "away": "Boston Red Sox",
      "time": "8:15 PM ET",
      "commence": "2026-10-01T00:15:00Z",
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
        "ml": "New York Yankees -142 / Boston Red Sox +120",
        "spread": "New York Yankees -1.5 (+152)",
        "total": "O/U 6.5 (Over -122 / Under +100)",
        "raw": {
          "homeML": -142,
          "awayML": 120,
          "homeSpread": -1.5,
          "homeSpreadOdds": 152,
          "awaySpread": 1.5,
          "awaySpreadOdds": -184,
          "total": 6.5,
          "overOdds": -122,
          "underOdds": 100
        }
      },
      "props": {
        "Sonny Gray": {
          "pitcher_outs": {
            "point": 14.5,
            "over": -120,
            "under": -114,
            "overStr": "-120",
            "underStr": "-114"
          },
          "pitcher_strikeouts": {
            "point": 5.5,
            "over": 102,
            "under": -130,
            "overStr": "+102",
            "underStr": "-130"
          }
        },
        "Max Fried": {
          "pitcher_outs": {
            "point": 16.5,
            "over": -148,
            "under": 108,
            "overStr": "-148",
            "underStr": "+108"
          },
          "pitcher_strikeouts": {
            "point": 5.5,
            "over": 100,
            "under": -128,
            "overStr": "+100",
            "underStr": "-128"
          }
        }
      }
    },
    {
      "id": "66c0c13a06424600557af241371043fc",
      "home": "San Diego Padres",
      "away": "Chicago Cubs",
      "time": "10:00 PM ET",
      "commence": "2026-10-01T02:00:00Z",
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
        "ml": "San Diego Padres -144 / Chicago Cubs +122",
        "spread": "San Diego Padres -1.5 (+146)",
        "total": "O/U 7.5 (Over +102 / Under -124)",
        "raw": {
          "homeML": -144,
          "awayML": 122,
          "homeSpread": -1.5,
          "homeSpreadOdds": 146,
          "awaySpread": 1.5,
          "awaySpreadOdds": -178,
          "total": 7.5,
          "overOdds": 102,
          "underOdds": -124
        }
      },
      "props": {
        "Kevin Gausman": {
          "pitcher_outs": {
            "point": 14.5,
            "over": 106,
            "under": -152,
            "overStr": "+106",
            "underStr": "-152"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": 116,
            "under": -148,
            "overStr": "+116",
            "underStr": "-148"
          }
        },
        "Nick Pivetta": {
          "pitcher_outs": {
            "point": 13.5,
            "over": -122,
            "under": -112,
            "overStr": "-122",
            "underStr": "-112"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": -122,
            "under": -104,
            "overStr": "-122",
            "underStr": "-104"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
