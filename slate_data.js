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
