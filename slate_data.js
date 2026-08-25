// slate_data.js — Aug 25, 2026
// Rewrite daily. Shell (mlb_dashboard.html / index.html) never changes.
// Starters sourced from: baseballsavant.mlb.com/probable-pitchers (primary)

const games = {

// ════════════════════════════════════════════════════════
// AUG 25, 2026 — EVENING GAMES (7 focused games)
// ════════════════════════════════════════════════════════

  "lad-atl": {
    away:"Los Angeles Dodgers", home:"Atlanta Braves",
    time:"7:15 PM ET", venue:"Truist Park, Atlanta GA",
    awayRec:"78-51", homeRec:"76-54",
    wx:"⛅ Atlanta: 88°F, 12% rain, SE wind 6 mph — warm, minimal weather concern.",
    starters:"Tyler Glasnow (LAD) vs Bryce Elder (ATL)",
    overview:{
      lines:{ ml:"TBD — pull via Odds API", spread:"LAD -1.5 est", total:"O/U TBD", movement:"Pull via odds_fetcher.py" },
      away:{
        teamName:"Los Angeles Dodgers", abbr:"LAD",
        offStats:{ avg:".268", ops:".782", kPct:"21.4%", rPerG:"5.1", rPerG_L10:"5.4", rPerG_L5:"5.8" },
        defStats:{ era:"3.42", bullpenERA_L14:"3.28", whip:"1.18", closerNote:"Evan Phillips (1.84 ERA, 22 Sv)" },
        starter:{ name:"Tyler Glasnow", hand:"RHP", rec:"TBD", era:"3.20", whip:"1.05", k9:"11.4", bb9:"2.8", era_L3:"2.80", avgIP:"5.8" },
        injuries:[ ]
      },
      home:{
        teamName:"Atlanta Braves", abbr:"ATL",
        offStats:{ avg:".261", ops:".770", kPct:"21.8%", rPerG:"4.8", rPerG_L10:"4.4", rPerG_L5:"4.2" },
        defStats:{ era:"3.85", bullpenERA_L14:"3.72", whip:"1.22" },
        starter:{ name:"Bryce Elder", hand:"RHP", rec:"TBD", era:"4.20", whip:"1.32", k9:"7.6", bb9:"3.2", era_L3:"4.50", avgIP:"5.4" },
        injuries:[ ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"LAD @ ATL. Glasnow (35.6% K vs ATL career, .208 wOBA against) vs Elder (4.20 ERA).",cards:[
        {lbl:"Run Line",pick:"Dodgers -1.5",odds:"TBD",grade:"B+",
         rat:"Glasnow is dominant vs ATL — career 35.6% K rate and .208 wOBA against current ATL roster. LAD offense surging (5.8 R/G L5). Elder (4.20 ERA, 4.50 L3 ERA) is hittable. LAD bullpen elite (3.28 ERA L14). Pull odds via Odds API.",
         chips:["Glasnow career K% vs ATL: 35.6%","Glasnow wOBA vs ATL: .208","LAD L5: 5.8 R/G (surging)","Elder L3 ERA: 4.50 — hittable"]}
      ]},
      total:{intro:"Glasnow elite suppressor vs ATL. Elder hittable for LAD bats.",cards:[
        {lbl:"Game Total",pick:"Verify line via Odds API",odds:"TBD",grade:"B",
         rat:"Glasnow limits ATL severely (.208 wOBA, 35.6% K). ATL bats are suppressed on that side. LAD vs Elder: LAD scores. Total leans under on the Glasnow half, over on the Elder half. Net depends on the line — pull and grade.",
         chips:["Glasnow wOBA vs ATL: .208 (elite)","Elder ERA: 4.20 — LAD will score","LAD L5: 5.8 R/G","Pull live total via Odds API"],
         bullpen:{away:{name:"LAD",starterERA:3.20,starterAvgIP:5.8,bullpenERA_L14:3.28},home:{name:"ATL",starterERA:4.20,starterAvgIP:5.4,bullpenERA_L14:3.72},postedTotal:8.0}}
      ]},
      pitcher:{intro:"Glasnow is the premier prop on tonight's slate — elite vs this ATL lineup.",cards:[
        {lbl:"Glasnow — Strikeouts",pick:"Over 6.5 Ks",odds:"TBD",grade:"A-",
         rat:"Glasnow career K% vs current ATL roster: 35.6% — elite. 11.4 K/9 in 2026. L3 ERA: 2.80. ATL K%: 21.8% — average. In 5.8 avg IP at 35.6% K rate, 7+ Ks is very achievable. Highest-conviction K prop on the slate.",
         chips:["Glasnow career K% vs ATL: 35.6% (elite)","K/9: 11.4 · L3 ERA: 2.80","ATL K%: 21.8% — average lineup","Over 6.5 requires 7 Ks in 5.8 avg IP"],
         src:"Baseball Savant 2026"},
        {lbl:"Glasnow — Earned Runs",pick:"Under 2.5 ER",odds:"TBD",grade:"B+",
         rat:"Glasnow wOBA vs ATL: .208, barrel rate 6.5% against. L3 ERA: 2.80. ATL has been scoring 4.2 R/G L5 — solid but not explosive. Under 2.5 in 5.8 avg IP is the structural lean.",
         chips:["Glasnow wOBA vs ATL: .208","Barrel% against: 6.5%","ATL L5: 4.2 R/G","L3 ERA: 2.80"],
         src:"Baseball Savant 2026"}
      ]},
      batter:{intro:"LAD offense (5.8 R/G L5) vs Elder (4.20 ERA, .361 xwOBA against LAD).",cards:[
        {lbl:"LAD vs Elder",pick:"LAD Team Over 4.5 Runs",odds:"-115 est",grade:"B",
         rat:"LAD averaging 5.8 R/G last 5 — highest on today's slate. Elder (.361 xwOBA vs LAD career) is hittable. Truist Park is a hitter-friendly environment. Over 4.5 LAD runs is the volume play.",
         chips:["LAD L5: 5.8 R/G (surging)","Elder xwOBA vs LAD: .361","Truist Park: hitter-friendly","Over 4.5 requires 5+ LAD runs"]}
      ]}
    }
  },

  "tex-cws": {
    away:"Texas Rangers", home:"Chicago White Sox",
    time:"7:40 PM ET", venue:"Rate Field, Chicago IL",
    awayRec:"64-65", homeRec:"67-61",
    wx:"⛅ Chicago: 82°F, 10% rain, SW wind 9 mph — no significant concern.",
    starters:"Jacob deGrom (TEX) vs Anthony Kay (CWS)",
    overview:{
      lines:{ ml:"TBD — pull via Odds API", spread:"TEX -1.5 est", total:"O/U TBD", movement:"Pull via odds_fetcher.py" },
      away:{
        teamName:"Texas Rangers", abbr:"TEX",
        offStats:{ avg:".248", ops:".728", kPct:"23.2%", rPerG:"4.1", rPerG_L10:"4.3", rPerG_L5:"4.5" },
        defStats:{ era:"4.19", bullpenERA_L14:"4.19", whip:"1.31", closerNote:"Jacob Latz (1.77 ERA)" },
        starter:{ name:"Jacob deGrom", hand:"RHP", rec:"8-8", era:"3.98", whip:"1.08", k9:"12.2", bb9:"1.8", era_L3:"2.10", avgIP:"6.0" }  ,
        injuries:[ ]
      },
      home:{
        teamName:"Chicago White Sox", abbr:"CWS",
        offStats:{ avg:".258", ops:".752", kPct:"21.8%", rPerG:"4.5", rPerG_L10:"4.8", rPerG_L5:"5.0" },
        defStats:{ era:"3.82", bullpenERA_L14:"3.68", whip:"1.22" },
        starter:{ name:"Anthony Kay", hand:"LHP", rec:"TBD", era:"4.85", whip:"1.42", k9:"7.8", bb9:"4.1", era_L3:"5.10", avgIP:"5.0" },
        injuries:[ ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"deGrom (12.2 K/9, L3 ERA 2.10) vs Kay (4.85 ERA, L3 ERA 5.10). TEX slight edge in quality.",cards:[
        {lbl:"Run Line",pick:"Rangers -1.5",odds:"TBD",grade:"B",
         rat:"deGrom (L3 ERA 2.10, career wOBA vs CWS: .410) actually has a worse career profile vs CWS than his overall numbers suggest. But his current 2026 form (12.2 K/9) outweighs the historical split. Kay (4.85 ERA, L3 ERA 5.10) is notably vulnerable. TEX run line is the lean — verify live odds.",
         chips:["deGrom L3 ERA: 2.10 — elite current form","Kay ERA: 4.85 · L3 ERA: 5.10","CWS L5: 5.0 R/G — active offense","Pull live odds via Odds API"]}
      ]},
      total:{intro:"deGrom dominates K column but his CWS wOBA is high (.410). Under lean is less clear.",cards:[
        {lbl:"Game Total",pick:"Under (verify line)",odds:"TBD",grade:"B-",
         rat:"deGrom's career wOBA vs CWS (.410) is concerning — CWS hits him better than most. But his 2026 form (12.2 K/9, L3 ERA 2.10) suggests he's been transcendent. Kay (4.85 ERA) will give up runs. Under lean if line is 8+ but verify.",
         chips:["deGrom wOBA vs CWS: .410 (career — worse matchup)","deGrom 2026 K/9: 12.2 — elite form","Kay ERA: 4.85 — TEX will score","Pull live line via Odds API"]}
      ]},
      pitcher:{intro:"deGrom is the primary prop — dominant 2026 form, though CWS has historically hit him.",cards:[
        {lbl:"deGrom — Strikeouts",pick:"Over 6.5 Ks",odds:"TBD",grade:"B+",
         rat:"deGrom 12.2 K/9 in 2026 — best on today's slate. L3 ERA: 2.10. CWS K%: 21.8% — average. Career K% vs CWS is solid. Over 6.5 in 6.0 avg IP is the play. Verify market line.",
         chips:["deGrom K/9: 12.2 — best on slate","L3 ERA: 2.10","CWS K%: 21.8%","Over 6.5 requires 7 Ks in 6.0 avg IP"],
         src:"Baseball Savant 2026"},
        {lbl:"Kay — Earned Runs",pick:"Over 2.5 ER",odds:"-118 est",grade:"B+",
         rat:"Kay (4.85 ERA, L3 ERA 5.10, BB/9: 4.1) is the most hittable starter on tonight's slate. TEX averages 4.5 R/G L5 — picking up. Walk rate of 4.1 BB/9 inflates pitch counts. Over 2.5 ER requiring 3+ is well-supported.",
         chips:["Kay ERA: 4.85 · L3 ERA: 5.10","Kay BB/9: 4.1 — walk risk","TEX L5: 4.5 R/G","Over 2.5 requires 3+ ER"]}
      ]},
      batter:{intro:"CWS offense (5.0 R/G L5) vs deGrom. TEX vs Kay (4.85 ERA).",cards:[
        {lbl:"TEX vs Kay",pick:"TEX Team Over 3.5 Runs",odds:"-115 est",grade:"B",
         rat:"Kay (4.85 ERA, 4.1 BB/9) is hittable and walk-prone. TEX averaging 4.5 R/G L5. Over 3.5 TEX team runs against a vulnerable arm is the volume play.",
         chips:["Kay ERA: 4.85 · BB/9: 4.1","TEX L5: 4.5 R/G","Over 3.5 requires 4+ TEX runs","Away game but matchup advantage clear"]}
      ]}
    }
  },

  "pit-sd": {
    away:"Pittsburgh Pirates", home:"San Diego Padres",
    time:"9:40 PM ET", venue:"Petco Park, San Diego CA",
    awayRec:"63-67", homeRec:"71-58",
    wx:"🌤 San Diego: 74°F, 3% rain, ocean breeze — ideal conditions.",
    starters:"Paul Skenes (PIT) vs Michael King (SD)",
    overview:{
      lines:{ ml:"TBD — pull via Odds API", spread:"SD -1.5 est", total:"O/U TBD", movement:"Pull via odds_fetcher.py" },
      away:{
        teamName:"Pittsburgh Pirates", abbr:"PIT",
        offStats:{ avg:".250", ops:".720", kPct:"23.1%", rPerG:"4.2", rPerG_L10:"3.8", rPerG_L5:"3.5" },
        defStats:{ era:"4.38", bullpenERA_L14:"4.42", whip:"1.31" },
        starter:{ name:"Paul Skenes", hand:"RHP", rec:"TBD", era:"2.45", whip:"0.96", k9:"11.2", bb9:"2.1", era_L3:"1.80", avgIP:"6.2" },
        injuries:[ ]
      },
      home:{
        teamName:"San Diego Padres", abbr:"SD",
        offStats:{ avg:".258", ops:".748", kPct:"22.4%", rPerG:"4.6", rPerG_L10:"4.8", rPerG_L5:"5.1" },
        defStats:{ era:"3.68", bullpenERA_L14:"3.58", whip:"1.21", closerNote:"Robert Suarez (2.12 ERA)" },
        starter:{ name:"Michael King", hand:"RHP", rec:"TBD", era:"3.42", whip:"1.18", k9:"9.8", bb9:"2.6", era_L3:"2.90", avgIP:"6.0" },
        injuries:[ ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"Skenes (2.45 ERA, .201 wOBA vs SD) vs King (3.42 ERA). Two quality arms at Petco Park.",cards:[
        {lbl:"Run Line",pick:"Verify line via Odds API",odds:"TBD",grade:"B-",
         rat:"Skenes (.201 wOBA vs SD career — elite suppression) vs King (3.42 ERA, L3 ERA 2.90). Both are quality starters. SD home at Petco (pitcher-friendly). Run line is a coin flip — verify odds before committing.",
         chips:["Skenes wOBA vs SD: .201 (elite)","King ERA: 3.42 · L3 ERA: 2.90","Petco Park: pitcher-friendly","Pull live run line via Odds API"]}
      ]},
      total:{intro:"Two elite arms at Petco Park. Strong under lean.",cards:[
        {lbl:"Game Total",pick:"Under (verify line)",odds:"TBD",grade:"B+",
         rat:"Skenes (2.45 ERA, .201 wOBA vs SD, 30.8% career K% vs SD) + King (3.42 ERA, L3 ERA 2.90) at Petco Park (pitcher-friendly). PIT averages 3.5 R/G L5. This is a sub-7 game on structure. Strong under lean — verify line.",
         chips:["Skenes wOBA vs SD: .201 · K%: 30.8%","King ERA: 3.42 · L3 ERA: 2.90","Petco Park: pitcher-friendly PF","PIT L5: 3.5 R/G (suppressed)"],
         bullpen:{away:{name:"PIT",starterERA:2.45,starterAvgIP:6.2,bullpenERA_L14:4.42},home:{name:"SD",starterERA:3.42,starterAvgIP:6.0,bullpenERA_L14:3.58},postedTotal:7.5}}
      ]},
      pitcher:{intro:"Skenes is the top pitcher prop on tonight's full slate.",cards:[
        {lbl:"Skenes — Strikeouts",pick:"Over 6.5 Ks",odds:"TBD",grade:"A-",
         rat:"Skenes has a 30.8% career K rate vs SD roster — best matchup on tonight's slate. 11.2 K/9 in 2026, L3 ERA: 1.80. At Petco Park where he'll pitch deep. SD K%: 22.4%. Over 6.5 in 6.2 avg IP is extremely achievable.",
         chips:["Skenes career K% vs SD: 30.8% (elite)","K/9: 11.2 · L3 ERA: 1.80","SD K%: 22.4% — above average","Over 6.5 in 6.2 avg IP"],
         src:"Baseball Savant 2026"},
        {lbl:"Skenes — Earned Runs",pick:"Under 2.5 ER",odds:"TBD",grade:"B+",
         rat:"Skenes wOBA vs SD: .201 — elite suppression of this lineup. ERA: 2.45, L3 ERA: 1.80. Petco Park suppresses scoring further. Under 2.5 is the structural play.",
         chips:["Skenes wOBA vs SD: .201","ERA: 2.45 · L3 ERA: 1.80","Petco Park: run suppression","SD averages 4.6 R/G season but vs Skenes — much less"],
         src:"Baseball Savant 2026"}
      ]},
      batter:{intro:"SD offense (5.1 R/G L5) vs Skenes — but Skenes .201 wOBA means SD struggles here.",cards:[
        {lbl:"Batter Note",pick:"Avoid batter props vs Skenes",odds:"—",grade:"C",
         rat:"Skenes .201 wOBA vs SD and 30.8% K rate makes individual batter hit/TB props structurally weak. Skip SD batter props. If looking for a batter angle, consider PIT vs King (3.42 ERA) but PIT offense (3.5 R/G L5) is suppressed.",
         chips:["Skenes .201 wOBA vs SD — avoid batter props","SD lineup faces elite suppressor","PIT batter props limited by 3.5 R/G L5","No batter props recommended"]}
      ]}
    }
  },

  "phi-sea": {
    away:"Philadelphia Phillies", home:"Seattle Mariners",
    time:"9:40 PM ET", venue:"T-Mobile Park, Seattle WA",
    awayRec:"71-58", homeRec:"72-57",
    wx:"🌤 Seattle: 68°F, 8% rain, light breeze — good conditions.",
    starters:"Aaron Nola (PHI) vs George Kirby (SEA)",
    overview:{
      lines:{ ml:"TBD — pull via Odds API", spread:"TBD", total:"O/U TBD", movement:"Pull via odds_fetcher.py" },
      away:{
        teamName:"Philadelphia Phillies", abbr:"PHI",
        offStats:{ avg:".262", ops:".775", kPct:"21.4%", rPerG:"4.9", rPerG_L10:"5.1", rPerG_L5:"5.3" },
        defStats:{ era:"3.74", bullpenERA_L14:"3.52", whip:"1.18", closerNote:"Jeff Hoffman (2.8 ERA)" },
        starter:{ name:"Aaron Nola", hand:"RHP", rec:"TBD", era:"3.85", whip:"1.22", k9:"9.8", bb9:"2.4", era_L3:"3.20", avgIP:"6.2" },
        injuries:[ ]
      },
      home:{
        teamName:"Seattle Mariners", abbr:"SEA",
        offStats:{ avg:".248", ops:".718", kPct:"22.2%", rPerG:"4.3", rPerG_L10:"4.6", rPerG_L5:"4.8" },
        defStats:{ era:"3.52", bullpenERA_L14:"3.44", whip:"1.19" },
        starter:{ name:"George Kirby", hand:"RHP", rec:"TBD", era:"3.18", whip:"1.04", k9:"8.6", bb9:"1.2", era_L3:"2.60", avgIP:"6.4" },
        injuries:[ ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"Nola vs Kirby — two quality starters. Kirby career wOBA vs PHI: .166 (elite).",cards:[
        {lbl:"Run Line",pick:"Mariners -1.5",odds:"TBD",grade:"B",
         rat:"Kirby career wOBA vs current PHI roster: .166 — outstanding suppression. 8.6 K/9, only 1.2 BB/9 (elite command), L3 ERA: 2.60. PHI is a quality offense (5.3 R/G L5) but Kirby limits them severely. SEA home at T-Mobile (pitcher-friendly). Run line is the lean.",
         chips:["Kirby career wOBA vs PHI: .166 (elite)","Kirby BB/9: 1.2 — elite command","T-Mobile Park: pitcher-friendly","PHI L5: 5.3 R/G but vs Kirby — suppressed"]}
      ]},
      total:{intro:"Two elite arms. Kirby dominant vs PHI. Under strong lean.",cards:[
        {lbl:"Game Total",pick:"Under (verify line)",odds:"TBD",grade:"B+",
         rat:"Kirby (.166 wOBA vs PHI, 32.5% K rate vs PHI roster) is one of the best matchup-specific suppressor profiles on today's slate. Nola (3.85 ERA) is solid. T-Mobile Park further suppresses. Under is the structural lean — verify line.",
         chips:["Kirby wOBA vs PHI: .166 · K%: 32.5%","Kirby BB/9: 1.2 — fewest walks on slate","T-Mobile: pitcher-friendly park","Nola ERA: 3.85 — holds PHI offense"],
         bullpen:{away:{name:"PHI",starterERA:3.85,starterAvgIP:6.2,bullpenERA_L14:3.52},home:{name:"SEA",starterERA:3.18,starterAvgIP:6.4,bullpenERA_L14:3.44},postedTotal:7.5}}
      ]},
      pitcher:{intro:"Kirby is the best command profile on tonight's slate. Nola solid but secondary.",cards:[
        {lbl:"Kirby — Strikeouts",pick:"Over 5.5 Ks",odds:"TBD",grade:"B+",
         rat:"Kirby career K% vs PHI: 32.5% — outstanding. 8.6 K/9, only 1.2 BB/9. L3 ERA: 2.60. PHI K%: 21.4% — average lineup. Over 5.5 in 6.4 avg IP is achievable. Verify market line.",
         chips:["Kirby career K% vs PHI: 32.5%","K/9: 8.6 · BB/9: 1.2 (elite command)","L3 ERA: 2.60","PHI K%: 21.4% — average"],
         src:"Baseball Savant 2026"},
        {lbl:"Kirby — Walks",pick:"Under 1.5 BB",odds:"TBD",grade:"B",
         rat:"Kirby BB/9: 1.2 — the lowest walk rate on tonight's slate by a wide margin. Career 2.5% BB rate vs PHI. Under 1.5 BB (requires 0 or 1 walk) is the structural play. Very strong profile.",
         chips:["Kirby BB/9: 1.2 — lowest on slate","Career BB% vs PHI: 2.5%","Under 1.5 = 0 or 1 BB","Elite command pitcher — this is the prop"],
         src:"Baseball Savant 2026"}
      ]},
      batter:{intro:"PHI offense (5.3 R/G L5) vs Kirby — but .166 wOBA means PHI bats are suppressed.",cards:[
        {lbl:"Batter Note",pick:"Avoid PHI batter props vs Kirby",odds:"—",grade:"C",
         rat:"Kirby .166 wOBA vs PHI and 32.5% K rate makes PHI batter hit/TB props structurally weak. The prop value is with Kirby K/BB props, not PHI hitters.",
         chips:["Kirby .166 wOBA vs PHI — avoid batter props","32.5% career K rate vs this roster","T-Mobile Park further suppresses","Focus on Kirby pitcher props"]}
      ]}
    }
  },

  "hou-nyy": {
    away:"Houston Astros", home:"New York Yankees",
    time:"7:05 PM ET", venue:"Yankee Stadium, New York NY",
    awayRec:"65-64", homeRec:"74-55",
    wx:"⛅ New York: 84°F, 8% rain, S wind 7 mph — no significant concern.",
    starters:"Ethan Pecko (HOU) vs Will Warren (NYY)",
    overview:{
      lines:{ ml:"TBD — pull via Odds API", spread:"NYY -1.5 est", total:"O/U TBD", movement:"Pull via odds_fetcher.py" },
      away:{
        teamName:"Houston Astros", abbr:"HOU",
        offStats:{ avg:".242", ops:".700", kPct:"21.8%", rPerG:"4.2", rPerG_L10:"4.0", rPerG_L5:"3.8" },
        defStats:{ era:"3.98", bullpenERA_L14:"3.98", whip:"1.22", closerNote:"Josh Hader (0.87 ERA, 20 Sv)" },
        starter:{ name:"Ethan Pecko", hand:"RHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.0" },
        injuries:[ ]
      },
      home:{
        teamName:"New York Yankees", abbr:"NYY",
        offStats:{ avg:".261", ops:".771", kPct:"22.1%", rPerG:"4.4", rPerG_L10:"4.5", rPerG_L5:"4.6" },
        defStats:{ era:"3.24", bullpenERA_L14:"2.84", whip:"1.12", closerNote:"David Bednar (1.92 ERA, 21 Sv)" },
        starter:{ name:"Will Warren", hand:"RHP", rec:"TBD", era:"4.28", whip:"1.38", k9:"8.2", bb9:"3.4", era_L3:"4.50", avgIP:"5.5" },
        injuries:[ {status:"OUT",player:"Aaron Judge — ribs"}, {status:"OUT",player:"Giancarlo Stanton — calf"} ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"Pecko MLB debut vs Warren (4.28 ERA). NYY heavy home fav. Judge and Stanton still out.",cards:[
        {lbl:"Run Line",pick:"Verify line via Odds API",odds:"TBD",grade:"C+",
         rat:"Ethan Pecko making his MLB debut — no data to grade on. Warren (4.28 ERA, L3 ERA 4.50) is hittable but NYY lineup is depleted (Judge/Stanton out). Skip run line until Pecko data is available. NYY likely massive favorite on debut pitcher.",
         chips:["Pecko: MLB debut — NO DATA","Warren ERA: 4.28 · L3 ERA: 4.50","Judge/Stanton OUT for NYY","Pull live odds — NYY likely massive fav"]}
      ]},
      total:{intro:"MLB debut starter + hittable Warren. Over lean on NYY side.",cards:[
        {lbl:"Game Total",pick:"Over (verify line)",odds:"TBD",grade:"C+",
         rat:"Debut pitchers typically face adversity — pitch count concerns and lineup adjustment problems. Warren (4.28 ERA) gives up runs on his side. Both starters project run allowance. Over is the directional lean but conviction is limited without Pecko data.",
         chips:["Pecko: debut — unknown run profile","Warren ERA: 4.28 — HOU will score","NYY BP: 2.84 ERA L14 (limits damage late)","Pull live O/U before betting"]}
      ]},
      pitcher:{intro:"Warren is the only gradeable pitcher prop tonight. Pecko: skip — no data.",cards:[
        {lbl:"Warren — Earned Runs",pick:"Over 2.5 ER",odds:"-118 est",grade:"B",
         rat:"Warren 4.28 ERA, L3 ERA 4.50. HOU averages 4.2 R/G — moderate offense with Hader closing (saves the HOU side). Warren's 3.4 BB/9 inflates pitch counts. Over 2.5 ER in 5.5 avg IP against a capable HOU offense is the lean.",
         chips:["Warren ERA: 4.28 · L3 ERA: 4.50","Warren BB/9: 3.4 — walk risk","HOU: 4.2 R/G season average","Over 2.5 requires 3+ ER"]}
      ]},
      batter:{intro:"HOU vs Warren (4.28 ERA). NYY offense vs Pecko (debut — unknown).",cards:[
        {lbl:"HOU vs Warren",pick:"HOU Team Over 3.5 Runs",odds:"-115 est",grade:"B-",
         rat:"Warren (4.28 ERA, 1.38 WHIP) is hittable. HOU averages 4.2 R/G season. At Yankee Stadium where HOU has historically performed well. Over 3.5 HOU runs is the structural lean vs a below-average arm.",
         chips:["Warren ERA: 4.28 · WHIP: 1.38","HOU season: 4.2 R/G","Hader closes for HOU (saves their side)","Over 3.5 requires 4+ HOU runs"]}
      ]}
    }
  },

  "kc-tor": {
    away:"Kansas City Royals", home:"Toronto Blue Jays",
    time:"7:07 PM ET", venue:"Rogers Centre, Toronto ON (Dome)",
    awayRec:"70-59", homeRec:"64-66",
    wx:"🏟 Rogers Centre: Dome — fully weather neutral.",
    starters:"Seth Lugo (KC) vs Max Scherzer (TOR)",
    overview:{
      lines:{ ml:"TBD — pull via Odds API", spread:"TBD", total:"O/U TBD", movement:"Pull via odds_fetcher.py" },
      away:{
        teamName:"Kansas City Royals", abbr:"KC",
        offStats:{ avg:".262", ops:".758", kPct:"22.1%", rPerG:"4.8", rPerG_L10:"5.1", rPerG_L5:"5.4" },
        defStats:{ era:"3.92", bullpenERA_L14:"3.78", whip:"1.24" },
        starter:{ name:"Seth Lugo", hand:"RHP", rec:"TBD", era:"3.68", whip:"1.18", k9:"9.2", bb9:"2.6", era_L3:"3.10", avgIP:"6.0" },
        injuries:[ ]
      },
      home:{
        teamName:"Toronto Blue Jays", abbr:"TOR",
        offStats:{ avg:".244", ops:".710", kPct:"23.8%", rPerG:"4.0", rPerG_L10:"3.8", rPerG_L5:"3.6" },
        defStats:{ era:"4.56", bullpenERA_L14:"4.48", whip:"1.38" },
        starter:{ name:"Max Scherzer", hand:"RHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.5" },
        injuries:[ {status:"OUT",player:"Vladimir Guerrero Jr. — knee"} ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"Lugo (3.68 ERA) vs Scherzer (TBD — verify current form). KC better record, surging offense.",cards:[
        {lbl:"Run Line",pick:"Royals -1.5",odds:"TBD",grade:"B-",
         rat:"KC is 70-59, averaging 5.4 R/G last 5. Lugo (3.68 ERA, L3 ERA 3.10) is a quality arm. TOR without Guerrero Jr. is limited offensively (3.6 R/G L5). Scherzer's current form is TBD — pull his ERA before committing. KC run line is directionally right.",
         chips:["KC: 70-59 · L5: 5.4 R/G (surging)","Lugo ERA: 3.68 · L3 ERA: 3.10","TOR L5: 3.6 R/G · Guerrero Jr. OUT","Verify Scherzer 2026 stats before betting"]}
      ]},
      total:{intro:"Lugo quality, KC offense surging. TOR suppressed without Guerrero.",cards:[
        {lbl:"Game Total",pick:"Verify via Odds API",odds:"TBD",grade:"B-",
         rat:"KC L5: 5.4 R/G — hot offense. TOR L5: 3.6 R/G without Guerrero. Dome neutralizes weather. Lugo (3.68 ERA) holds TOR. Net projection leans toward moderate scoring — pull live line and grade.",
         chips:["KC L5: 5.4 R/G (surging)","TOR L5: 3.6 R/G (suppressed)","Lugo ERA: 3.68 — holds TOR","Dome: neutral"],
         recency:{team:"Toronto Blue Jays",seasonAvg:4.0,last10Avg:3.8,last5Avg:3.6}}
      ]},
      pitcher:{intro:"Lugo is the gradeable prop. Scherzer TBD — skip until current stats confirmed.",cards:[
        {lbl:"Lugo — Strikeouts",pick:"Over 5.5 Ks",odds:"-115 est",grade:"B",
         rat:"Lugo career K% vs TOR: 25.5% — strong. 9.2 K/9 in 2026. TOR K%: 23.8% — above average. Over 5.5 in 6.0 avg IP is achievable in a dome setting.",
         chips:["Lugo career K% vs TOR: 25.5%","K/9: 9.2 · L3 ERA: 3.10","TOR K%: 23.8% — above average","Dome: neutral — no wind suppression"]}
      ]},
      batter:{intro:"KC offense (5.4 R/G L5) vs Scherzer (TBD). TOR without Guerrero vs Lugo (3.68 ERA).",cards:[
        {lbl:"KC vs Scherzer",pick:"KC Team Over 4.5 Runs",odds:"-115 est",grade:"B-",
         rat:"KC averaging 5.4 R/G L5 — genuine surge. Scherzer's current 2026 stats are TBD but if he's in late-career decline, KC's hot lineup is the play. Verify Scherzer ERA before committing.",
         chips:["KC L5: 5.4 R/G (surging)","Scherzer 2026 stats: VERIFY before betting","Dome: neutral","Over 4.5 requires 5+ KC runs"]}
      ]}
    }
  }

,
  "bos-mia": {
    away:"Boston Red Sox", home:"Miami Marlins",
    time:"6:40 PM ET", venue:"loanDepot park, Miami FL",
    awayRec:"70-59", homeRec:"52-78",
    wx:"🌤 Miami: 89°F, 15% rain, SE wind 8 mph — warm, minimal concern.",
    starters:"Payton Tolle (BOS) vs TBA (MIA)",
    overview:{
      lines:{ ml:"TBD", spread:"TBD", total:"O/U TBD", movement:"Pull via Odds API" },
      away:{ teamName:"Boston Red Sox", abbr:"BOS",
        offStats:{ avg:".262", ops:".768", kPct:"21.2%", rPerG:"4.9", rPerG_L10:"5.2", rPerG_L5:"5.1" },
        defStats:{ era:"3.58", bullpenERA_L14:"3.62", whip:"1.18", closerNote:"Kenley Jansen (2.44 ERA)" },
        starter:{ name:"Payton Tolle", hand:"LHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.5" },
        injuries:[] },
      home:{ teamName:"Miami Marlins", abbr:"MIA",
        offStats:{ avg:".228", ops:".652", kPct:"25.8%", rPerG:"3.2", rPerG_L10:"3.0", rPerG_L5:"2.8" },
        defStats:{ era:"4.82", bullpenERA_L14:"4.90", whip:"1.44" },
        starter:{ name:"TBA", hand:"?", rec:"—", era:"—", whip:"—", k9:"—", bb9:"—", era_L3:"—", avgIP:"5.0" },
        injuries:[] }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"BOS vs MIA. Tolle debut/unknown + MIA TBA starter. BOS heavy favorite.",cards:[
        {lbl:"Run Line",pick:"Red Sox -1.5",odds:"TBD",grade:"B-",
         rat:"MIA is 52-78 with a 4.82 ERA staff and 2.8 R/G L5. BOS offense surging (5.1 R/G L5). MIA starter TBA. BOS run line is directionally correct — pull live odds.",
         chips:["MIA: 52-78 · 2.8 R/G L5","BOS L5: 5.1 R/G (surging)","MIA starter: TBA","Pull live odds via Odds API"]}
      ]},
      total:{intro:"MIA TBA starter + weak offense. BOS scores. Over lean.",cards:[
        {lbl:"Game Total",pick:"Over (verify line)",odds:"TBD",grade:"C+",
         rat:"MIA TBA starter and 4.82 ERA staff. BOS will score. MIA offense 2.8 R/G L5 — suppressed. Moderate over lean depending on line. Verify via Odds API.",
         chips:["MIA starter: TBA — unknown risk","BOS L5: 5.1 R/G","MIA L5: 2.8 R/G (suppressed)","Pull live O/U"]}
      ]},
      pitcher:{intro:"MIA starter TBA — no props until confirmed.",cards:[
        {lbl:"Starter Note",pick:"Verify starters via odds_fetcher.py",odds:"—",grade:"C",
         rat:"Both starters are unconfirmed or unknown. Run odds_fetcher.py to pull confirmed starters from MLB Stats API before grading pitcher props.",
         chips:["Tolle: limited data","MIA: TBA","Run odds_fetcher.py for confirmation","No pitcher props recommended"]}
      ]},
      batter:{intro:"BOS offense (5.1 R/G L5) vs MIA weak pitching.",cards:[
        {lbl:"BOS Offense",pick:"BOS Team Over 4.5 Runs",odds:"-115 est",grade:"B-",
         rat:"BOS averaging 5.1 R/G L5 against MIA's weak staff (4.82 ERA). Over 4.5 BOS runs is the lean.",
         chips:["BOS L5: 5.1 R/G","MIA staff ERA: 4.82","Over 4.5 requires 5+ BOS runs","MIA: 52-78"]}
      ]}
    }
  },

  "tb-det": {
    away:"Tampa Bay Rays", home:"Detroit Tigers",
    time:"6:40 PM ET", venue:"Comerica Park, Detroit MI",
    awayRec:"TBD", homeRec:"TBD",
    wx:"⛅ Detroit: 80°F, 12% rain, W wind 8 mph — no significant concern.",
    starters:"Ian Seymour (TB) vs Jackson Jobe (DET)",
    overview:{
      lines:{ ml:"TBD", spread:"TBD", total:"O/U TBD", movement:"Pull via Odds API" },
      away:{ teamName:"Tampa Bay Rays", abbr:"TB",
        offStats:{ avg:".252", ops:".732", kPct:"22.8%", rPerG:"4.3", rPerG_L10:"4.1", rPerG_L5:"4.0" },
        defStats:{ era:"4.12", bullpenERA_L14:"3.88", whip:"1.28" },
        starter:{ name:"Ian Seymour", hand:"LHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.5" },
        injuries:[] },
      home:{ teamName:"Detroit Tigers", abbr:"DET",
        offStats:{ avg:".248", ops:".718", kPct:"23.4%", rPerG:"4.4", rPerG_L10:"4.2", rPerG_L5:"4.1" },
        defStats:{ era:"3.98", bullpenERA_L14:"3.82", whip:"1.26" },
        starter:{ name:"Jackson Jobe", hand:"RHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.8" },
        injuries:[] }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"Seymour vs Jobe — both limited Savant data. Verify via Odds API.",cards:[
        {lbl:"Run Line",pick:"Verify via Odds API",odds:"TBD",grade:"C+",
         rat:"Both starters have limited career data in Savant. Pull live lines and confirm pitcher form before grading run line.",
         chips:["Seymour: limited career data","Jobe: limited career data","Pull live odds via Odds API","Grade pending starter confirmation"]}
      ]},
      total:{intro:"Limited data on both starters. Verify O/U before betting.",cards:[
        {lbl:"Game Total",pick:"Verify via Odds API",odds:"TBD",grade:"C",
         rat:"Insufficient pitcher data to project run totals confidently. Pull live line and research both starters before grading.",
         chips:["Seymour: LHP — limited data","Jobe: RHP — limited data","Both teams moderate offense","Pull live O/U"]}
      ]},
      pitcher:{intro:"Limited data — no pitcher props recommended until stats confirmed.",cards:[
        {lbl:"Starter Note",pick:"Skip — insufficient data",odds:"—",grade:"C",
         rat:"Both Seymour and Jobe have very limited career Savant data. No pitcher props recommended without confirmed ERA/K profiles.",
         chips:["Run odds_fetcher.py for stat injection","Seymour career data: minimal","Jobe career data: minimal","Skip pitcher props"]}
      ]},
      batter:{intro:"Both teams moderate offense. No strong batter prop lean.",cards:[
        {lbl:"Batter Note",pick:"Skip — verify starter profiles first",odds:"—",grade:"C",
         rat:"Without confirmed starter quality, batter props carry too much uncertainty. Verify both starters via odds_fetcher.py before betting.",
         chips:["TB L5: 4.0 R/G","DET L5: 4.1 R/G","Both moderate offense","Skip until starters confirmed"]}
      ]}
    }
  },

  "col-wsh": {
    away:"Colorado Rockies", home:"Washington Nationals",
    time:"6:45 PM ET", venue:"Nationals Park, Washington DC",
    awayRec:"TBD", homeRec:"TBD",
    wx:"⛅ Washington DC: 86°F, 18% rain, S wind 9 mph — warm, slight weather concern.",
    starters:"TBA (COL) vs Andrew Alvarez (WSH)",
    overview:{
      lines:{ ml:"TBD", spread:"TBD", total:"O/U TBD", movement:"Pull via Odds API" },
      away:{ teamName:"Colorado Rockies", abbr:"COL",
        offStats:{ avg:".242", ops:".698", kPct:"24.8%", rPerG:"3.8", rPerG_L10:"3.5", rPerG_L5:"3.2" },
        defStats:{ era:"5.48", bullpenERA_L14:"5.62", whip:"1.58" },
        starter:{ name:"TBA", hand:"?", rec:"—", era:"—", whip:"—", k9:"—", bb9:"—", era_L3:"—", avgIP:"5.0" },
        injuries:[] },
      home:{ teamName:"Washington Nationals", abbr:"WSH",
        offStats:{ avg:".265", ops:".785", kPct:"21.4%", rPerG:"5.3", rPerG_L10:"4.8", rPerG_L5:"4.6" },
        defStats:{ era:"4.75", bullpenERA_L14:"5.20", whip:"1.48", closerNote:"7 blown saves — worst in NL" },
        starter:{ name:"Andrew Alvarez", hand:"LHP", rec:"TBD", era:"3.72", whip:"1.28", k9:"9.0", bb9:"3.9", era_L3:"3.50", avgIP:"5.0" },
        injuries:[] }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"COL TBA vs Alvarez. WSH best offense in MLB (5.3 R/G). COL worst staff ERA (5.48).",cards:[
        {lbl:"Run Line",pick:"Nationals -1.5",odds:"TBD",grade:"B",
         rat:"COL TBA starter against WSH — the best offense in MLB by runs scored (5.3 R/G season). COL staff ERA: 5.48 — worst on today's slate. WSH wins this matchup convincingly on paper. Pull live odds.",
         chips:["WSH: MLB #1 offense 5.3 R/G season","COL staff ERA: 5.48 (worst on slate)","COL starter: TBA","Pull live odds via Odds API"]}
      ]},
      total:{intro:"COL worst pitching + WSH best offense = over lean.",cards:[
        {lbl:"Game Total",pick:"Over (verify line)",odds:"TBD",grade:"B",
         rat:"COL staff ERA 5.48, bullpen 5.62 ERA L14 — worst on today's slate. WSH MLB #1 offense. COL TBA starter adds variance. Strong over lean — verify line.",
         chips:["COL staff ERA: 5.48","COL BP ERA L14: 5.62 (worst today)","WSH: 5.3 R/G season — MLB #1","Strong over lean — verify O/U"]}
      ]},
      pitcher:{intro:"Alvarez (3.72 ERA) vs COL — COL TBA is unknown quantity.",cards:[
        {lbl:"Alvarez — Strikeouts",pick:"Over 4.5 Ks",odds:"-115 est",grade:"B-",
         rat:"Alvarez 9.0 K/9, 3.72 ERA. COL lineup K%: 24.8% — above average. COL career wOBA vs Alvarez: .334 — decent contact. Over 4.5 in 5.0 avg IP is achievable but modest. B- confidence.",
         chips:["Alvarez K/9: 9.0","COL K%: 24.8% — above average","Career wOBA vs Alvarez: .334","Over 4.5 in 5.0 avg IP"]}
      ]},
      batter:{intro:"WSH offense (4.6 R/G L5) vs COL TBA. Best over-runs lean on the slate.",cards:[
        {lbl:"WSH Offense",pick:"WSH Team Over 4.5 Runs",odds:"-118 est",grade:"B",
         rat:"WSH MLB #1 offense (5.3 R/G season, 4.6 R/G L5). COL TBA starter against an elite offense. Over 4.5 WSH runs is among the highest-conviction batter props today.",
         chips:["WSH: 5.3 R/G season — MLB #1","COL starter: TBA — weak profile","WSH home crowd advantage","Over 4.5 requires 5+ WSH runs"]}
      ]}
    }
  },

  "mil-nym": {
    away:"Milwaukee Brewers", home:"New York Mets",
    time:"7:10 PM ET", venue:"Citi Field, New York NY",
    awayRec:"81-49", homeRec:"TBD",
    wx:"⛅ New York: 84°F, 10% rain, light wind — no significant concern.",
    starters:"Kyle Harrison (MIL) vs Zac Thornton (NYM)",
    overview:{
      lines:{ ml:"TBD", spread:"TBD", total:"O/U TBD", movement:"Pull via Odds API" },
      away:{ teamName:"Milwaukee Brewers", abbr:"MIL",
        offStats:{ avg:".255", ops:".748", kPct:"22.4%", rPerG:"4.6", rPerG_L10:"5.8", rPerG_L5:"7.2" },
        defStats:{ era:"3.21", bullpenERA_L14:"3.18", whip:"1.15", closerNote:"Devin Williams (2.14 ERA, 22 Sv)" },
        starter:{ name:"Kyle Harrison", hand:"LHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.5" },
        injuries:[] },
      home:{ teamName:"New York Mets", abbr:"NYM",
        offStats:{ avg:".248", ops:".718", kPct:"23.2%", rPerG:"4.1", rPerG_L10:"3.8", rPerG_L5:"3.6" },
        defStats:{ era:"4.38", bullpenERA_L14:"4.42", whip:"1.31" },
        starter:{ name:"Zac Thornton", hand:"LHP", rec:"TBD", era:"TBD", whip:"1.28", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.5" },
        injuries:[] }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"MIL (81-49, best NL record) @ NYM. Harrison vs Thornton.",cards:[
        {lbl:"Run Line",pick:"Brewers -1.5",odds:"TBD",grade:"B-",
         rat:"MIL is 81-49 — best record in the NL. L5 offense: 7.2 R/G (surging). MIL bullpen elite (3.18 ERA L14, Williams closing). Harrison career wOBA vs NYM: .168 — excellent. Run line value depends on odds — pull and verify.",
         chips:["MIL: 81-49 best NL record","MIL L5: 7.2 R/G (surging)","Harrison wOBA vs NYM: .168 (elite)","Pull live odds via Odds API"]}
      ]},
      total:{intro:"MIL surging offense vs Thornton (limited data). NYM vs Harrison (dominant).",cards:[
        {lbl:"Game Total",pick:"Verify via Odds API",odds:"TBD",grade:"B-",
         rat:"Harrison (.168 wOBA vs NYM, 21.4% career K rate vs NYM) suppresses the NYM half. MIL L5 offense (7.2 R/G) dominates the other side. Net depends on line — likely moderate over lean.",
         chips:["Harrison wOBA vs NYM: .168 (elite)","MIL L5: 7.2 R/G (surging)","NYM L5: 3.6 R/G (suppressed)","Pull live O/U"]}
      ]},
      pitcher:{intro:"Harrison elite vs this NYM lineup. Primary prop target.",cards:[
        {lbl:"Harrison — Strikeouts",pick:"Over 5.5 Ks",odds:"TBD",grade:"B",
         rat:"Harrison career K% vs NYM roster: 21.4%. Career wOBA vs NYM: .168 — outstanding suppression. NYM K%: 23.2% — above average. Over 5.5 in 5.5 avg IP is achievable. Verify market line.",
         chips:["Harrison career wOBA vs NYM: .168","NYM K%: 23.2% — above average","MIL L5: 7.2 R/G — offense supports win","Verify live K prop line"]}
      ]},
      batter:{intro:"MIL offense (7.2 R/G L5) vs Thornton. Best MIL run prop on slate.",cards:[
        {lbl:"MIL Offense",pick:"MIL Team Over 4.5 Runs",odds:"-115 est",grade:"B",
         rat:"MIL averaging 7.2 R/G last 5 — hottest offense on today's slate. Thornton is an unproven arm (limited data). Over 4.5 MIL runs is a high-conviction volume play.",
         chips:["MIL L5: 7.2 R/G — hottest on slate","Thornton: limited MLB track record","MIL: 81-49, elite team quality","Over 4.5 requires 5+ MIL runs"]}
      ]}
    }
  },

  "bal-stl": {
    away:"Baltimore Orioles", home:"St. Louis Cardinals",
    time:"7:45 PM ET", venue:"Busch Stadium, St. Louis MO",
    awayRec:"62-67", homeRec:"TBD",
    wx:"⛅ St. Louis: 85°F, 15% rain, S wind 7 mph — warm, mild concern.",
    starters:"Chris Bassitt (BAL) vs TBA (STL)",
    overview:{
      lines:{ ml:"TBD", spread:"TBD", total:"O/U TBD", movement:"Pull via Odds API" },
      away:{ teamName:"Baltimore Orioles", abbr:"BAL",
        offStats:{ avg:".234", ops:".712", kPct:"24.8%", rPerG:"3.6", rPerG_L10:"4.2", rPerG_L5:"4.5" },
        defStats:{ era:"4.23", bullpenERA_L14:"4.08", whip:"1.35", closerNote:"Helsley IL · Cano interim (3.24 ERA)" },
        starter:{ name:"Chris Bassitt", hand:"RHP", rec:"TBD", era:"3.85", whip:"1.22", k9:"8.8", bb9:"2.6", era_L3:"3.40", avgIP:"5.8" },
        injuries:[ {status:"OUT",player:"Ryan Helsley — elbow (60-day IL)"} ] },
      home:{ teamName:"St. Louis Cardinals", abbr:"STL",
        offStats:{ avg:".248", ops:".718", kPct:"23.1%", rPerG:"4.2", rPerG_L10:"3.8", rPerG_L5:"3.5" },
        defStats:{ era:"4.42", bullpenERA_L14:"4.38", whip:"1.32" },
        starter:{ name:"TBA", hand:"?", rec:"—", era:"—", whip:"—", k9:"—", bb9:"—", era_L3:"—", avgIP:"5.5" },
        injuries:[] }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"Bassitt (3.85 ERA) vs STL TBA. BAL on a recent offensive surge.",cards:[
        {lbl:"Run Line",pick:"Verify via Odds API",odds:"TBD",grade:"C+",
         rat:"STL starter is TBA — can't grade until confirmed. Bassitt (3.85 ERA) is reliable. BAL L5 offense has surged to 4.5 R/G. Pull live odds and confirm STL starter before betting.",
         chips:["STL starter: TBA — grade pending","Bassitt ERA: 3.85 — solid","BAL L5: 4.5 R/G (surging)","Pull live odds and confirm starter"]}
      ]},
      total:{intro:"Bassitt quality arm vs STL TBA. Moderate under lean on Bassitt side.",cards:[
        {lbl:"Game Total",pick:"Verify via Odds API",odds:"TBD",grade:"C+",
         rat:"Bassitt (.338 career wOBA vs STL) is hittable by STL. STL TBA is unknown. Pull live line before grading.",
         chips:["Bassitt career wOBA vs STL: .338","STL starter: TBA","BAL L5: 4.5 R/G","Verify O/U via Odds API"]}
      ]},
      pitcher:{intro:"Bassitt is the gradeable arm. STL: skip until confirmed.",cards:[
        {lbl:"Bassitt — Strikeouts",pick:"Over 4.5 Ks",odds:"-115 est",grade:"B-",
         rat:"Bassitt 8.8 K/9, 3.85 ERA, career K% vs STL: 11.1% — below average. STL K%: 23.1%. Over 4.5 in 5.8 avg IP is achievable but K matchup is not elite. B- confidence.",
         chips:["Bassitt K/9: 8.8","Career K% vs STL: 11.1% — below avg","STL K%: 23.1%","Over 4.5 in 5.8 avg IP"]}
      ]},
      batter:{intro:"BAL offense surging (4.5 R/G L5) vs STL TBA.",cards:[
        {lbl:"BAL vs STL TBA",pick:"BAL Team Over 3.5 Runs",odds:"-115 est",grade:"B-",
         rat:"BAL averaging 4.5 R/G last 5 — solid recent surge. STL TBA starter is unknown but structurally weak. Over 3.5 BAL runs is the lean pending starter confirmation.",
         chips:["BAL L5: 4.5 R/G (surging)","STL starter: TBA","Over 3.5 requires 4+ BAL runs","Confirm STL starter before betting"]}
      ]}
    }
  },

  "cle-laa": {
    away:"Cleveland Guardians", home:"Los Angeles Angels",
    time:"9:38 PM ET", venue:"Angel Stadium, Anaheim CA",
    awayRec:"TBD", homeRec:"50-79",
    wx:"🌤 Anaheim: 82°F, 3% rain, light breeze — ideal conditions.",
    starters:"Gavin Williams (CLE) vs Walbert Ureña (LAA)",
    overview:{
      lines:{ ml:"TBD", spread:"TBD", total:"O/U TBD", movement:"Pull via Odds API" },
      away:{ teamName:"Cleveland Guardians", abbr:"CLE",
        offStats:{ avg:".254", ops:".730", kPct:"21.8%", rPerG:"4.5", rPerG_L10:"4.3", rPerG_L5:"4.2" },
        defStats:{ era:"3.78", bullpenERA_L14:"3.64", whip:"1.20" },
        starter:{ name:"Gavin Williams", hand:"RHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.5" },
        injuries:[] },
      home:{ teamName:"Los Angeles Angels", abbr:"LAA",
        offStats:{ avg:".230", ops:".670", kPct:"25.6%", rPerG:"3.4", rPerG_L10:"2.5", rPerG_L5:"2.3" },
        defStats:{ era:"5.12", bullpenERA_L14:"5.50", whip:"1.52" },
        starter:{ name:"Walbert Ureña", hand:"RHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.0" },
        injuries:[ {status:"OUT",player:"Mike Trout — knee"} ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"CLE vs LAA (50-79). Williams vs Ureña. CLE clear favorite.",cards:[
        {lbl:"Run Line",pick:"Guardians -1.5",odds:"TBD",grade:"B-",
         rat:"LAA is 50-79 — worst record on today's slate. Trout still out. LAA L5: 2.3 R/G — most suppressed offense today. LAA bullpen (5.50 ERA L14) is the weakest on the slate. CLE run line is the lean. Verify live odds.",
         chips:["LAA: 50-79 — worst record today","LAA L5: 2.3 R/G (suppressed)","LAA BP ERA L14: 5.50 (worst today)","Trout OUT"]}
      ]},
      total:{intro:"LAA worst offense + worst bullpen. Under lean on LAA side.",cards:[
        {lbl:"Game Total",pick:"Under (verify line)",odds:"TBD",grade:"B-",
         rat:"LAA L5: 2.3 R/G — most suppressed offense on today's slate. Williams (limited data) should hold LAA to minimal scoring. CLE moderate offense (4.2 R/G L5). Under is the structural lean.",
         chips:["LAA L5: 2.3 R/G (suppressed)","LAA BP: 5.50 ERA L14 (worst today)","CLE L5: 4.2 R/G — moderate","Pull live O/U"],
         recency:{team:"Los Angeles Angels",seasonAvg:3.4,last10Avg:2.5,last5Avg:2.3}}
      ]},
      pitcher:{intro:"Ureña limited data. Williams limited data. Skip pitcher props.",cards:[
        {lbl:"Starter Note",pick:"Skip — limited data",odds:"—",grade:"C",
         rat:"Both Ureña and Williams have very limited career Savant data. No pitcher props recommended. Focus on run line and team totals.",
         chips:["Ureña: limited career data","Williams: limited career data","Skip pitcher props","Focus on LAA team under"]}
      ]},
      batter:{intro:"LAA worst offense on the slate. Under-runs prop is the play.",cards:[
        {lbl:"LAA Offense",pick:"LAA Team Under 2.5 Runs",odds:"-115 est",grade:"B",
         rat:"LAA averaging 2.3 R/G last 5 — most suppressed on today's slate. Trout out. Williams should hold LAA. Under 2.5 requires 0-2 LAA runs — well within their current range.",
         chips:["LAA L5: 2.3 R/G — worst on slate","Trout OUT","Under 2.5 requires 0-2 runs","Williams vs weakest lineup on slate"]}
      ]}
    }
  },

  "chc-az": {
    away:"Chicago Cubs", home:"Arizona Diamondbacks",
    time:"9:40 PM ET", venue:"Chase Field, Phoenix AZ (Retractable Dome)",
    awayRec:"70-60", homeRec:"TBD",
    wx:"🏟 Chase Field: Dome closed — fully weather neutral.",
    starters:"Clay Holmes (CHC) vs Brandon Pfaadt (AZ)",
    overview:{
      lines:{ ml:"TBD", spread:"TBD", total:"O/U TBD", movement:"Pull via Odds API" },
      away:{ teamName:"Chicago Cubs", abbr:"CHC",
        offStats:{ avg:".256", ops:".752", kPct:"22.8%", rPerG:"4.5", rPerG_L10:"4.8", rPerG_L5:"5.1" },
        defStats:{ era:"4.12", bullpenERA_L14:"4.08", whip:"1.28" },
        starter:{ name:"Clay Holmes", hand:"RHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.8" },
        injuries:[] },
      home:{ teamName:"Arizona Diamondbacks", abbr:"AZ",
        offStats:{ avg:".258", ops:".748", kPct:"22.6%", rPerG:"4.6", rPerG_L10:"4.4", rPerG_L5:"4.2" },
        defStats:{ era:"3.92", bullpenERA_L14:"3.78", whip:"1.24" },
        starter:{ name:"Brandon Pfaadt", hand:"RHP", rec:"TBD", era:"3.68", whip:"1.18", k9:"9.2", bb9:"2.8", era_L3:"3.10", avgIP:"5.8" },
        injuries:[] }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"Holmes vs Pfaadt in a dome. CHC offense surging (5.1 R/G L5). AZ home.",cards:[
        {lbl:"Run Line",pick:"Verify via Odds API",odds:"TBD",grade:"C+",
         rat:"Pfaadt (.233 career wOBA vs CHC — elite) vs Holmes (limited data). AZ home in dome. CHC offense (5.1 R/G L5) is surging. Near pick-em matchup — pull live line.",
         chips:["Pfaadt wOBA vs CHC: .233 (elite)","Holmes: limited career ERA data","CHC L5: 5.1 R/G (surging)","Dome: neutral"]}
      ]},
      total:{intro:"Pfaadt elite vs CHC. CHC surging offense creates tension.",cards:[
        {lbl:"Game Total",pick:"Verify via Odds API",odds:"TBD",grade:"B-",
         rat:"Pfaadt career wOBA vs CHC: .233 and 18.5% K rate — suppresses CHC. But CHC L5 offense is 5.1 R/G. Holmes unknown quality. Net depends on line.",
         chips:["Pfaadt wOBA vs CHC: .233 (elite)","CHC L5: 5.1 R/G — active offense","Holmes: limited data — unknown","Dome: neutral"]}
      ]},
      pitcher:{intro:"Pfaadt is the gradeable prop. Holmes: limited data.",cards:[
        {lbl:"Pfaadt — Strikeouts",pick:"Over 5.5 Ks",odds:"-115 est",grade:"B",
         rat:"Pfaadt career K% vs CHC: 18.5%, wOBA .233. 9.2 K/9, L3 ERA: 3.10. CHC K%: 22.8% — above average. Over 5.5 in 5.8 avg IP is achievable.",
         chips:["Pfaadt K/9: 9.2 · L3 ERA: 3.10","CHC K%: 22.8% — above average","Career wOBA vs CHC: .233","Dome: neutral"]}
      ]},
      batter:{intro:"CHC offense (5.1 R/G L5) vs Pfaadt (.233 wOBA — suppressor). Tension.",cards:[
        {lbl:"Batter Note",pick:"Skip CHC batter props vs Pfaadt",odds:"—",grade:"C",
         rat:"Pfaadt .233 wOBA vs CHC makes individual CHC batter props structurally weak. Focus on Pfaadt K prop instead.",
         chips:["Pfaadt wOBA vs CHC: .233","18.5% K rate vs this roster","Skip CHC batter props","Focus on Pfaadt pitcher props"]}
      ]}
    }
  },

  "min-ath": {
    away:"Minnesota Twins", home:"Athletics",
    time:"9:40 PM ET", venue:"Sutter Health Park, Sacramento CA",
    awayRec:"TBD", homeRec:"TBD",
    wx:"🌤 Sacramento: 88°F, 2% rain, light breeze — warm, ideal conditions.",
    starters:"Taj Bradley (MIN) vs Gage Jump (ATH)",
    overview:{
      lines:{ ml:"TBD", spread:"TBD", total:"O/U TBD", movement:"Pull via Odds API" },
      away:{ teamName:"Minnesota Twins", abbr:"MIN",
        offStats:{ avg:".258", ops:".742", kPct:"22.4%", rPerG:"4.6", rPerG_L10:"4.4", rPerG_L5:"4.2" },
        defStats:{ era:"3.98", bullpenERA_L14:"3.82", whip:"1.24" },
        starter:{ name:"Taj Bradley", hand:"RHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.5" },
        injuries:[] },
      home:{ teamName:"Athletics", abbr:"ATH",
        offStats:{ avg:".238", ops:".692", kPct:"24.2%", rPerG:"3.8", rPerG_L10:"3.5", rPerG_L5:"3.2" },
        defStats:{ era:"4.68", bullpenERA_L14:"4.72", whip:"1.42" },
        starter:{ name:"Gage Jump", hand:"LHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.0" },
        injuries:[] }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"Bradley vs Jump. MIN more established offense vs ATH weak staff.",cards:[
        {lbl:"Run Line",pick:"Verify via Odds API",odds:"TBD",grade:"C+",
         rat:"Both starters have limited data. ATH staff ERA (4.68) is weak — MIN should score. ATH offense suppressed (3.2 R/G L5). Pull live odds before committing.",
         chips:["ATH staff ERA: 4.68 — weak","ATH L5: 3.2 R/G (suppressed)","Both starters: limited data","Pull live odds"]}
      ]},
      total:{intro:"ATH weak pitching + suppressed offense. Moderate under lean on ATH side.",cards:[
        {lbl:"Game Total",pick:"Verify via Odds API",odds:"TBD",grade:"C+",
         rat:"ATH staff ERA 4.68 — MIN will score. ATH L5: 3.2 R/G. Bradley (limited data) unknown. Net depends on line — pull before betting.",
         chips:["ATH staff ERA: 4.68","ATH L5: 3.2 R/G","MIN L5: 4.2 R/G","Pull live O/U"]}
      ]},
      pitcher:{intro:"Limited data on both — no pitcher props recommended.",cards:[
        {lbl:"Starter Note",pick:"Skip — limited data",odds:"—",grade:"C",
         rat:"Both Bradley and Jump have limited career Savant data. No pitcher props recommended without confirmed profiles.",
         chips:["Bradley: limited data","Jump: limited data","Skip pitcher props","Run odds_fetcher.py to confirm"]}
      ]},
      batter:{intro:"MIN offense (4.2 R/G L5) vs Jump (limited data). ATH weak staff.",cards:[
        {lbl:"MIN vs Jump",pick:"MIN Team Over 3.5 Runs",odds:"-115 est",grade:"B-",
         rat:"MIN averaging 4.2 R/G L5. Jump (limited data) against an established MIN lineup. ATH staff ERA 4.68 — MIN will score. Over 3.5 is the lean.",
         chips:["MIN L5: 4.2 R/G","Jump: limited data — unknown risk","ATH staff ERA: 4.68","Over 3.5 requires 4+ MIN runs"]}
      ]}
    }
  },

  "cin-sf": {
    away:"Cincinnati Reds", home:"San Francisco Giants",
    time:"9:45 PM ET", venue:"Oracle Park, San Francisco CA",
    awayRec:"TBD", homeRec:"52-77",
    wx:"🌤 San Francisco: 64°F, 5% rain, W wind 12 mph — cool, slight wind factor at Oracle Park.",
    starters:"Brady Singer (CIN) vs Adrian Houser (SF)",
    overview:{
      lines:{ ml:"TBD", spread:"TBD", total:"O/U TBD", movement:"Pull via Odds API" },
      away:{ teamName:"Cincinnati Reds", abbr:"CIN",
        offStats:{ avg:".252", ops:".728", kPct:"23.4%", rPerG:"4.4", rPerG_L10:"4.2", rPerG_L5:"4.0" },
        defStats:{ era:"4.18", bullpenERA_L14:"4.24", whip:"1.30" },
        starter:{ name:"Brady Singer", hand:"RHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.8" },
        injuries:[] },
      home:{ teamName:"San Francisco Giants", abbr:"SF",
        offStats:{ avg:".238", ops:".688", kPct:"24.1%", rPerG:"3.8", rPerG_L10:"3.4", rPerG_L5:"3.1" },
        defStats:{ era:"4.28", bullpenERA_L14:"4.44", whip:"1.34" },
        starter:{ name:"Adrian Houser", hand:"RHP", rec:"TBD", era:"4.42", whip:"1.38", k9:"7.4", bb9:"3.2", era_L3:"4.80", avgIP:"5.2" },
        injuries:[] }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"Singer vs Houser at Oracle Park. CIN slight edge in pitching quality.",cards:[
        {lbl:"Run Line",pick:"Verify via Odds API",odds:"TBD",grade:"C+",
         rat:"Singer (.360 career wOBA vs SF — hittable by SF) vs Houser (4.42 ERA, L3 ERA 4.80). Oracle Park suppresses scoring. Near pick-em — pull live line.",
         chips:["Singer career wOBA vs SF: .360 (hittable)","Houser ERA: 4.42 · L3 ERA: 4.80","Oracle Park: pitcher-friendly","Pull live odds"]}
      ]},
      total:{intro:"Both hittable arms at pitcher-friendly Oracle Park. Under lean.",cards:[
        {lbl:"Game Total",pick:"Under (verify line)",odds:"TBD",grade:"B-",
         rat:"Oracle Park is one of the best pitcher parks in MLB. SF L5: 3.1 R/G — suppressed offense. Houser (4.42 ERA) is hittable but Oracle suppresses power. Under is the park-driven lean.",
         chips:["Oracle Park: elite pitcher-friendly PF","SF L5: 3.1 R/G (suppressed)","Houser ERA: 4.42 — CIN will score some","Under lean — verify line"]}
      ]},
      pitcher:{intro:"Houser is the gradeable prop. Singer: limited Savant data vs SF.",cards:[
        {lbl:"Houser — Earned Runs",pick:"Over 2.5 ER",odds:"-118 est",grade:"B-",
         rat:"Houser 4.42 ERA, L3 ERA 4.80 — below average and declining form. CIN averages 4.4 R/G season. Career wOBA vs CIN: .331. Over 2.5 ER in 5.2 avg IP is directionally right.",
         chips:["Houser ERA: 4.42 · L3 ERA: 4.80","Career wOBA vs CIN: .331","CIN: 4.4 R/G season","Over 2.5 requires 3+ ER"]}
      ]},
      batter:{intro:"Oracle Park suppresses both offenses. No strong batter lean.",cards:[
        {lbl:"Batter Note",pick:"Caution — Oracle Park suppresses",odds:"—",grade:"C",
         rat:"Oracle Park is one of the best pitcher parks in MLB. Both offenses are moderate. Avoid batter hit/total bases props at this venue.",
         chips:["Oracle Park: elite pitcher-friendly","SF L5: 3.1 R/G","CIN L5: 4.0 R/G","Skip batter props at Oracle"]}
      ]}
    }
  }

};


const bestBets = [
  {game:"PIT@SD",  pick:"Paul Skenes Over 6.5 Ks",    odds:"TBD",   grade:"A-"},
  {game:"LAD@ATL", pick:"Glasnow Over 6.5 Ks",         odds:"TBD",   grade:"A-"},
  {game:"LAD@ATL", pick:"Dodgers -1.5",                odds:"TBD",   grade:"B+"},
  {game:"LAD@ATL", pick:"Glasnow Under 2.5 ER",        odds:"TBD",   grade:"B+"},
  {game:"PIT@SD",  pick:"Skenes Under 2.5 ER",         odds:"TBD",   grade:"B+"},
  {game:"PIT@SD",  pick:"Under Total",                 odds:"TBD",   grade:"B+"},
  {game:"TEX@CWS", pick:"deGrom Over 6.5 Ks",          odds:"TBD",   grade:"B+"},
  {game:"TEX@CWS", pick:"Kay Over 2.5 ER",             odds:"-118",  grade:"B+"},
  {game:"PHI@SEA", pick:"Kirby Over 5.5 Ks",           odds:"TBD",   grade:"B+"},
  {game:"PHI@SEA", pick:"Kirby Under 1.5 BB",          odds:"TBD",   grade:"B"},
  {game:"PHI@SEA", pick:"Under Total",                 odds:"TBD",   grade:"B+"},
  {game:"KC@TOR",  pick:"Lugo Over 5.5 Ks",            odds:"-115",  grade:"B"},
];
