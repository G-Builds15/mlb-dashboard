const ODDS_DATA = {
  "fetched_at": "2026-10-04T23:42:28.437608+00:00",
  "date": "2026-10-04",
  "games": [
    {
      "id": "583202487b52f61769b2404a64e01c77",
      "home": "Los Angeles Dodgers",
      "away": "Atlanta Braves",
      "time": "8:00 PM ET",
      "commence": "2026-10-05T00:00:00Z",
      "starters": {
        "away": {
          "name": "Ray Kerr",
          "id": 678061,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Blake Snell",
          "id": 605483,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "away": {
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
          "l5ERA": 1.2,
          "l5KPct": 20.0,
          "l5BB9": 0.6,
          "l5AvgIP": 15.0,
          "l3ERA": 1.29,
          "l3KPct": 20.8,
          "l3BB9": 1.29,
          "l3AvgIP": 7.0,
          "name": "Ray Kerr",
          "pid": 678061
        },
        "home": {
          "era": 1.9,
          "whip": 1.1,
          "k9": 11.6,
          "bb9": 3.38,
          "h9": 6.54,
          "ip": 42.2,
          "avgIP": 4.7,
          "gs": 9,
          "kPct": 31.8,
          "_source": "mlb_stats_api",
          "l5ERA": 1.08,
          "l5KPct": 29.7,
          "l5BB9": 2.16,
          "l5AvgIP": 4.0,
          "l3ERA": 1.8,
          "l3KPct": 21.1,
          "l3BB9": null,
          "l3AvgIP": 2.5,
          "name": "Blake Snell",
          "pid": 605483
        }
      },
      "team_stats": {
        "away": {
          "name": "Atlanta Braves",
          "_source": "mlb_stats_api",
          "rPerG": 4.58,
          "avg": ".246",
          "ops": ".718",
          "kPct": 21.6,
          "bbPct": 7.7,
          "bullpenERA_L14": 3.77
        },
        "home": {
          "name": "Los Angeles Dodgers",
          "_source": "mlb_stats_api",
          "rPerG": 4.94,
          "avg": ".257",
          "ops": ".762",
          "kPct": 20.4,
          "bbPct": 10.1,
          "bullpenERA_L14": 1.69
        }
      },
      "lines": {
        "ml": "Los Angeles Dodgers -230 / Atlanta Braves +198",
        "spread": "Los Angeles Dodgers -1.5 (-104)",
        "total": "O/U 7.5 (Over -122 / Under +100)",
        "raw": {
          "homeML": -230,
          "awayML": 198,
          "homeSpread": -1.5,
          "homeSpreadOdds": -104,
          "awaySpread": 1.5,
          "awaySpreadOdds": -115,
          "total": 7.5,
          "overOdds": -122,
          "underOdds": 100
        }
      },
      "props": {
        "Blake Snell": {
          "pitcher_outs": {
            "point": 16.5,
            "over": -128,
            "under": -106,
            "overStr": "-128",
            "underStr": "-106"
          },
          "pitcher_strikeouts": {
            "point": 6.5,
            "over": -120,
            "under": -106,
            "overStr": "-120",
            "underStr": "-106"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
