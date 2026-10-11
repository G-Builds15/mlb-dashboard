const ODDS_DATA = {
  "fetched_at": "2026-10-11T18:36:14.181061+00:00",
  "date": "2026-10-11",
  "games": [
    {
      "id": "c43e98d4effc9181f21e21225fcbd47a",
      "home": "Milwaukee Brewers",
      "away": "Los Angeles Dodgers",
      "time": "8:00 PM ET",
      "commence": "2026-10-12T00:00:00Z",
      "starters": {
        "away": {
          "name": "Tarik Skubal",
          "id": 669373,
          "hand": "?",
          "confirmed": true
        },
        "home": {
          "name": "Jacob Misiorowski",
          "id": 694819,
          "hand": "?",
          "confirmed": true
        }
      },
      "pitcher_stats": {
        "away": {
          "era": 2.72,
          "whip": 0.96,
          "k9": 10.55,
          "bb9": 1.53,
          "h9": 7.15,
          "ip": 158.2,
          "avgIP": 6.1,
          "gs": 26,
          "kPct": 30.0,
          "_source": "mlb_stats_api",
          "l5ERA": 2.05,
          "l5KPct": 27.3,
          "l5BB9": 1.71,
          "l5AvgIP": 6.5,
          "l3ERA": null,
          "l3KPct": 43.5,
          "l3BB9": null,
          "l3AvgIP": 7.0,
          "name": "Tarik Skubal",
          "pid": 669373
        },
        "home": {
          "era": 1.8,
          "whip": 0.8,
          "k9": 12.98,
          "bb9": 2.27,
          "h9": 4.95,
          "ip": 174.2,
          "avgIP": 5.8,
          "gs": 30,
          "kPct": 37.9,
          "_source": "mlb_stats_api",
          "l5ERA": 0.46,
          "l5KPct": 34.2,
          "l5BB9": 2.29,
          "l5AvgIP": 4.8,
          "l3ERA": null,
          "l3KPct": 31.0,
          "l3BB9": 2.16,
          "l3AvgIP": 4.0,
          "name": "Jacob Misiorowski",
          "pid": 694819
        }
      },
      "team_stats": {
        "away": {
          "name": "Los Angeles Dodgers",
          "_source": "mlb_stats_api",
          "rPerG": 4.94,
          "avg": ".257",
          "ops": ".762",
          "kPct": 20.4,
          "bbPct": 10.1,
          "bullpenERA_L14": 0.9
        },
        "home": {
          "name": "Milwaukee Brewers",
          "_source": "mlb_stats_api",
          "rPerG": 5.14,
          "avg": ".258",
          "ops": ".744",
          "kPct": 22.0,
          "bbPct": 10.6,
          "bullpenERA_L14": 4.0
        }
      },
      "lines": {
        "ml": "Milwaukee Brewers -110 / Los Angeles Dodgers -106",
        "spread": "Milwaukee Brewers +1.5 (-196)",
        "total": "O/U 6.5 (Over +114 / Under -140)",
        "raw": {
          "homeML": -110,
          "awayML": -106,
          "homeSpread": 1.5,
          "homeSpreadOdds": -196,
          "awaySpread": -1.5,
          "awaySpreadOdds": 162,
          "total": 6.5,
          "overOdds": 114,
          "underOdds": -140
        }
      },
      "props": {
        "Tarik Skubal": {
          "pitcher_outs": {
            "point": 17.5,
            "over": -154,
            "under": 114,
            "overStr": "-154",
            "underStr": "+114"
          },
          "pitcher_strikeouts": {
            "point": 7.5,
            "over": 116,
            "under": -148,
            "overStr": "+116",
            "underStr": "-148"
          }
        },
        "Jacob Misiorowski": {
          "pitcher_outs": {
            "point": 16.5,
            "over": -125,
            "under": -110,
            "overStr": "-125",
            "underStr": "-110"
          },
          "pitcher_strikeouts": {
            "point": 7.5,
            "over": 108,
            "under": -138,
            "overStr": "+108",
            "underStr": "-138"
          }
        }
      }
    }
  ]
};

if (typeof module !== 'undefined') module.exports = { ODDS_DATA };
