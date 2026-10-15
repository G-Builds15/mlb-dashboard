const ODDS_DATA = {
  "fetched_at": "2026-10-15T23:26:05.124349+00:00",
  "date": "2026-10-15",
  "games": [
    {
      "id": "ab3e5655be6b32e0853d683e51a60baa",
      "home": "Los Angeles Dodgers",
      "away": "Milwaukee Brewers",
      "time": "8:00 PM ET",
      "commence": "2026-10-16T00:00:00Z",
      "starters": {
        "away": {
          "name": "Shane Drohan",
          "id": 675660,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Tyler Glasnow",
          "id": 607192,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "away": {
          "era": 4.19,
          "whip": 1.32,
          "k9": 9.02,
          "bb9": 3.18,
          "h9": 8.74,
          "ip": 124.2,
          "avgIP": 6.5,
          "gs": 19,
          "kPct": 23.7,
          "_source": "mlb_stats_api",
          "l5ERA": 5.23,
          "l5KPct": 22.7,
          "l5BB9": 4.35,
          "l5AvgIP": 5.0,
          "l3ERA": 2.08,
          "l3KPct": 22.2,
          "l3BB9": 4.15,
          "l3AvgIP": 4.1,
          "name": "Shane Drohan",
          "pid": 675660
        },
        "home": {
          "era": 3.53,
          "whip": 0.95,
          "k9": 11.92,
          "bb9": 3.04,
          "h9": 5.47,
          "ip": 74.0,
          "avgIP": 5.7,
          "gs": 13,
          "kPct": 34.0,
          "_source": "mlb_stats_api",
          "l5ERA": 4.96,
          "l5KPct": 40.6,
          "l5BB9": 4.41,
          "l5AvgIP": 5.4,
          "l3ERA": 4.26,
          "l3KPct": 45.8,
          "l3BB9": 2.84,
          "l3AvgIP": 6.1,
          "name": "Tyler Glasnow",
          "pid": 607192
        }
      },
      "team_stats": {
        "away": {
          "name": "Milwaukee Brewers",
          "_source": "mlb_stats_api",
          "rPerG": 5.14,
          "avg": ".258",
          "ops": ".744",
          "kPct": 22.0,
          "bbPct": 10.6
        },
        "home": {
          "name": "Los Angeles Dodgers",
          "_source": "mlb_stats_api",
          "rPerG": 4.94,
          "avg": ".257",
          "ops": ".762",
          "kPct": 20.4,
          "bbPct": 10.1
        }
      },
      "lines": {
        "ml": "Los Angeles Dodgers -150 / Milwaukee Brewers +134",
        "spread": "Los Angeles Dodgers -1.5 (+139)",
        "total": "O/U 8.0 (Over -107 / Under -113)",
        "raw": {
          "homeML": -150,
          "awayML": 134,
          "homeSpread": -1.5,
          "homeSpreadOdds": 139,
          "awaySpread": 1.5,
          "awaySpreadOdds": -168,
          "total": 8.0,
          "overOdds": -107,
          "underOdds": -113
        }
      },
      "props": {
        "Shane Drohan": {
          "pitcher_earned_runs": {
            "point": 0.5,
            "over": -144,
            "under": 108,
            "overStr": "-144",
            "underStr": "+108"
          },
          "pitcher_hits_allowed": {
            "point": 2.5,
            "over": 129,
            "under": -172,
            "overStr": "+129",
            "underStr": "-172"
          },
          "pitcher_outs": {
            "point": 7.5,
            "over": -122,
            "under": -109,
            "overStr": "-122",
            "underStr": "-109"
          },
          "pitcher_strikeouts": {
            "point": 2.5,
            "over": 106,
            "under": -135,
            "overStr": "+106",
            "underStr": "-135"
          },
          "pitcher_walks": {
            "point": 0.5,
            "over": -203,
            "under": 151,
            "overStr": "-203",
            "underStr": "+151"
          }
        },
        "Tyler Glasnow": {
          "pitcher_earned_runs": {
            "point": 1.5,
            "over": -121,
            "under": -109,
            "overStr": "-121",
            "underStr": "-109"
          },
          "pitcher_hits_allowed": {
            "point": 3.5,
            "over": -128,
            "under": -103,
            "overStr": "-128",
            "underStr": "-103"
          },
          "pitcher_outs": {
            "point": 14.5,
            "over": -161,
            "under": 121,
            "overStr": "-161",
            "underStr": "+121"
          },
          "pitcher_strikeouts": {
            "point": 5.5,
            "over": -155,
            "under": 121,
            "overStr": "-155",
            "underStr": "+121"
          },
          "pitcher_walks": {
            "point": 2.5,
            "over": 130,
            "under": -174,
            "overStr": "+130",
            "underStr": "-174"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
