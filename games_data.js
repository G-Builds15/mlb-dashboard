const ODDS_DATA = {
  "fetched_at": "2026-10-18T17:03:49.575937+00:00",
  "date": "2026-10-18",
  "games": [
    {
      "id": "f4ca2d8a09898a94722dde0633e0a7e1",
      "home": "Cleveland Guardians",
      "away": "Tampa Bay Rays",
      "time": "5:10 PM ET",
      "commence": "2026-10-18T21:10:00Z",
      "starters": {
        "away": {
          "name": "Drew Rasmussen",
          "id": 656876,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Parker Messick",
          "id": 800048,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "away": {
          "era": 2.67,
          "whip": 0.91,
          "k9": 9.1,
          "bb9": 1.67,
          "h9": 6.54,
          "ip": 172.0,
          "avgIP": 5.7,
          "gs": 30,
          "kPct": 26.0,
          "_source": "mlb_stats_api",
          "l5ERA": 0.77,
          "l5KPct": 31.8,
          "l5BB9": 3.86,
          "l5AvgIP": 5.6,
          "name": "Drew Rasmussen",
          "pid": 656876
        },
        "home": {
          "era": 2.56,
          "whip": 1.06,
          "k9": 9.32,
          "bb9": 2.37,
          "h9": 7.2,
          "ip": 186.1,
          "avgIP": 5.8,
          "gs": 32,
          "kPct": 25.8,
          "_source": "mlb_stats_api",
          "l5ERA": 3.21,
          "l5KPct": 24.2,
          "l5BB9": 1.29,
          "l5AvgIP": 4.7,
          "l3ERA": 3.0,
          "l3KPct": 12.5,
          "l3BB9": 3.0,
          "l3AvgIP": 3.0,
          "name": "Parker Messick",
          "pid": 800048
        }
      },
      "team_stats": {
        "away": {
          "name": "Tampa Bay Rays",
          "_source": "mlb_stats_api",
          "rPerG": 4.54,
          "avg": ".258",
          "ops": ".728",
          "kPct": 18.8,
          "bbPct": 8.4
        },
        "home": {
          "name": "Cleveland Guardians",
          "_source": "mlb_stats_api",
          "rPerG": 4.19,
          "avg": ".239",
          "ops": ".696",
          "kPct": 20.8,
          "bbPct": 9.4
        }
      },
      "lines": {
        "ml": "Cleveland Guardians +110 / Tampa Bay Rays -132",
        "spread": "Cleveland Guardians +1.5 (-164)",
        "total": "O/U 6.5 (Over -102 / Under -118)",
        "raw": {
          "homeML": 110,
          "awayML": -132,
          "homeSpread": 1.5,
          "homeSpreadOdds": -164,
          "awaySpread": -1.5,
          "awaySpreadOdds": 135,
          "total": 6.5,
          "overOdds": -102,
          "underOdds": -118
        }
      },
      "props": {
        "Drew Rasmussen": {
          "pitcher_earned_runs": {
            "point": 1.5,
            "over": -108,
            "under": -122,
            "overStr": "-108",
            "underStr": "-122"
          },
          "pitcher_hits_allowed": {
            "point": 4.5,
            "over": -118,
            "under": -113,
            "overStr": "-118",
            "underStr": "-113"
          },
          "pitcher_outs": {
            "point": 17.5,
            "over": -145,
            "under": 109,
            "overStr": "-145",
            "underStr": "+109"
          },
          "pitcher_strikeouts": {
            "point": 5.5,
            "over": 107,
            "under": -137,
            "overStr": "+107",
            "underStr": "-137"
          },
          "pitcher_walks": {
            "point": 1.5,
            "over": 149,
            "under": -200,
            "overStr": "+149",
            "underStr": "-200"
          }
        },
        "Parker Messick": {
          "pitcher_earned_runs": {
            "point": 1.5,
            "over": -122,
            "under": -109,
            "overStr": "-122",
            "underStr": "-109"
          },
          "pitcher_hits_allowed": {
            "point": 4.5,
            "over": -122,
            "under": -109,
            "overStr": "-122",
            "underStr": "-109"
          },
          "pitcher_outs": {
            "point": 15.5,
            "over": 126,
            "under": -167,
            "overStr": "+126",
            "underStr": "-167"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": -130,
            "under": 102,
            "overStr": "-130",
            "underStr": "+102"
          },
          "pitcher_walks": {
            "point": 1.5,
            "over": 105,
            "under": -139,
            "overStr": "+105",
            "underStr": "-139"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
