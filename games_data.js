const ODDS_DATA = {
  "fetched_at": "2026-10-24T22:47:14.095700+00:00",
  "date": "2026-10-24",
  "games": [
    {
      "id": "238f598685f7210fbfbbe3de39289264",
      "home": "Milwaukee Brewers",
      "away": "Tampa Bay Rays",
      "time": "8:00 PM ET",
      "commence": "2026-10-25T00:00:00Z",
      "starters": {
        "away": {
          "name": "Drew Rasmussen",
          "id": 656876,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Logan Henderson",
          "id": 701656,
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
          "l5ERA": 1.35,
          "l5KPct": 45.8,
          "l5BB9": 4.05,
          "l5AvgIP": 6.2,
          "name": "Drew Rasmussen",
          "pid": 656876
        },
        "home": {
          "era": 2.47,
          "whip": 0.84,
          "k9": 10.07,
          "bb9": 1.74,
          "h9": 5.86,
          "ip": 98.1,
          "avgIP": 5.4,
          "gs": 18,
          "kPct": 29.6,
          "_source": "mlb_stats_api",
          "l5ERA": 1.8,
          "l5KPct": 13.6,
          "l5BB9": 5.4,
          "l5AvgIP": 5.0,
          "name": "Logan Henderson",
          "pid": 701656
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
          "name": "Milwaukee Brewers",
          "_source": "mlb_stats_api",
          "rPerG": 5.14,
          "avg": ".258",
          "ops": ".744",
          "kPct": 22.0,
          "bbPct": 10.6
        }
      },
      "lines": {
        "ml": "Milwaukee Brewers -120 / Tampa Bay Rays +100",
        "spread": "Milwaukee Brewers +1.5 (-222)",
        "total": "O/U 6.5 (Over -108 / Under -111)",
        "raw": {
          "homeML": -120,
          "awayML": 100,
          "homeSpread": 1.5,
          "homeSpreadOdds": -222,
          "awaySpread": -1.5,
          "awaySpreadOdds": 181,
          "total": 6.5,
          "overOdds": -108,
          "underOdds": -111
        }
      },
      "props": {
        "Logan Henderson": {
          "pitcher_earned_runs": {
            "point": 1.5,
            "over": 114,
            "under": -152,
            "overStr": "+114",
            "underStr": "-152"
          },
          "pitcher_hits_allowed": {
            "point": 3.5,
            "over": -140,
            "under": 105,
            "overStr": "-140",
            "underStr": "+105"
          },
          "pitcher_outs": {
            "point": 14.5,
            "over": -141,
            "under": 106,
            "overStr": "-141",
            "underStr": "+106"
          },
          "pitcher_strikeouts": {
            "point": 4.5,
            "over": -129,
            "under": 101,
            "overStr": "-129",
            "underStr": "+101"
          },
          "pitcher_walks": {
            "point": 0.5,
            "over": -219,
            "under": 163,
            "overStr": "-219",
            "underStr": "+163"
          }
        },
        "Drew Rasmussen": {
          "pitcher_earned_runs": {
            "point": 1.5,
            "over": -121,
            "under": -110,
            "overStr": "-121",
            "underStr": "-110"
          },
          "pitcher_hits_allowed": {
            "point": 4.5,
            "over": 107,
            "under": -142,
            "overStr": "+107",
            "underStr": "-142"
          },
          "pitcher_outs": {
            "point": 17.5,
            "over": 110,
            "under": -146,
            "overStr": "+110",
            "underStr": "-146"
          },
          "pitcher_strikeouts": {
            "point": 5.5,
            "over": -159,
            "under": 125,
            "overStr": "-159",
            "underStr": "+125"
          },
          "pitcher_walks": {
            "point": 1.5,
            "over": 103,
            "under": -136,
            "overStr": "+103",
            "underStr": "-136"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
