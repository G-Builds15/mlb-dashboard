const ODDS_DATA = {
  "fetched_at": "2026-10-01T19:15:42.072242+00:00",
  "date": "2026-10-01",
  "games": [
    {
      "id": "5524c44b05e28aa899909c9e001184ec",
      "home": "Atlanta Braves",
      "away": "Philadelphia Phillies",
      "time": "8:11 PM ET",
      "commence": "2026-10-02T00:11:00Z",
      "starters": {
        "away": {
          "name": "Aaron Nola",
          "id": 605400,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Ray Kerr",
          "id": 678061,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "away": {
          "era": 4.67,
          "whip": 1.35,
          "k9": 9.09,
          "bb9": 3.03,
          "h9": 9.09,
          "ip": 175.1,
          "avgIP": 5.3,
          "gs": 33,
          "kPct": 23.8,
          "_source": "mlb_stats_api",
          "l5ERA": 3.06,
          "l5KPct": 18.8,
          "l5BB9": 2.78,
          "l5AvgIP": 5.4,
          "l3ERA": 3.98,
          "l3KPct": 18.5,
          "l3BB9": 3.1,
          "l3AvgIP": 5.0,
          "name": "Aaron Nola",
          "pid": 605400
        },
        "home": {
          "era": 1.47,
          "whip": 0.6,
          "k9": 5.4,
          "bb9": 0.98,
          "h9": 4.42,
          "ip": 18.1,
          "avgIP": 18.1,
          "gs": 1,
          "kPct": 16.7,
          "_source": "mlb_stats_api",
          "l5ERA": 1.69,
          "l5KPct": 19.6,
          "l5BB9": 1.13,
          "l5AvgIP": 16.0,
          "l3ERA": 1.29,
          "l3KPct": 20.8,
          "l3BB9": 1.29,
          "l3AvgIP": 7.0,
          "name": "Ray Kerr",
          "pid": 678061
        }
      },
      "team_stats": {
        "away": {
          "name": "Philadelphia Phillies",
          "_source": "mlb_stats_api",
          "rPerG": 4.4,
          "avg": ".240",
          "ops": ".707",
          "kPct": 21.7,
          "bbPct": 8.7,
          "rPerG_L5": 2.0,
          "bullpenERA_L14": 4.91
        },
        "home": {
          "name": "Atlanta Braves",
          "_source": "mlb_stats_api",
          "rPerG": 4.58,
          "avg": ".246",
          "ops": ".718",
          "kPct": 21.6,
          "bbPct": 7.7,
          "rPerG_L5": 4.0,
          "bullpenERA_L14": 3.49
        }
      },
      "lines": {
        "ml": "Atlanta Braves -106 / Philadelphia Phillies -110",
        "spread": "Atlanta Braves +1.5 (-192)",
        "total": "O/U 7.5 (Over -104 / Under -118)",
        "raw": {
          "homeML": -106,
          "awayML": -110,
          "homeSpread": 1.5,
          "homeSpreadOdds": -192,
          "awaySpread": -1.5,
          "awaySpreadOdds": 158,
          "total": 7.5,
          "overOdds": -104,
          "underOdds": -118
        }
      },
      "props": {
        "Aaron Nola": {
          "pitcher_strikeouts": {
            "point": 3.5,
            "over": -128,
            "under": 100,
            "overStr": "-128",
            "underStr": "+100"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
