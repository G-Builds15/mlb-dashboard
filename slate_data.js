// slate_data.js — Aug 22, 2026
// Rewrite daily. Shell (mlb_dashboard.html) never changes.

const games = {

// ════════════════════════════════════════════════════════
// AUG 22, 2026 — AFTERNOON GAMES
// ════════════════════════════════════════════════════════

  "tor-nyy": {
    away:"Toronto Blue Jays", home:"New York Yankees",
    time:"1:35 PM ET", venue:"Yankee Stadium, New York NY",
    awayRec:"63-68", homeRec:"73-55",
    wx:"⛅ New York: 85°F, 8% rain, light SW wind — no weather concern.",
    starters:"Mason Fluharty (TOR) vs Cam Schlittler (NYY)",
    overview:{
      lines:{ ml:"NYY TBD / TOR TBD", spread:"NYY -1.5", total:"O/U TBD", movement:"Verify via Odds API" },
      away:{
        teamName:"Toronto Blue Jays", abbr:"TOR",
        offStats:{ avg:".244", ops:".710", kPct:"23.8%", rPerG:"4.0", rPerG_L10:"3.6", rPerG_L5:"3.2" },
        defStats:{ era:"4.56", bullpenERA_L14:"4.48", whip:"1.38" },
        starter:{ name:"Mason Fluharty", hand:"LHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.5" },
        injuries:[ {status:"OUT",player:"Vladimir Guerrero Jr. — knee"} ]
      },
      home:{
        teamName:"New York Yankees", abbr:"NYY",
        offStats:{ avg:".261", ops:".771", kPct:"22.1%", rPerG:"4.4", rPerG_L10:"4.2", rPerG_L5:"4.0" },
        defStats:{ era:"3.24", bullpenERA_L14:"2.84", whip:"1.12", closerNote:"David Bednar (1.92 ERA, 21 Sv)" },
        starter:{ name:"Cam Schlittler", hand:"RHP", rec:"TBD", era:"TBD", whip:"TBD", k9:"TBD", bb9:"TBD", era_L3:"TBD", avgIP:"5.8" },
        injuries:[ {status:"OUT",player:"Aaron Judge — ribs"}, {status:"OUT",player:"Giancarlo Stanton — calf"} ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"NYY series sweep attempt. TOR won yesterday 1-0 in series opener — wait for lines.",cards:[
        {lbl:"Run Line",pick:"Verify live line",odds:"TBD",grade:"C+",
         rat:"NYY won yesterday 3-1 in Game 1 of series. Series continues today. Guerrero Jr. still out for TOR. NYY elite bullpen (2.84 ERA L14) remains the advantage. Confirm starter quality and odds before grading.",
         chips:["TOR yesterday: lost 3-1","Guerrero Jr. OUT","NYY BP: 2.84 ERA L14 (elite)","Confirm starter ERAs before betting"]}
      ]},
      total:{intro:"TBD starters — confirm lines via Odds API before betting.",cards:[
        {lbl:"Game Total",pick:"Verify via Odds API",odds:"TBD",grade:"C",
         rat:"Both starters TBD confirmed. Pull live line via odds_fetcher.py before grading.",
         chips:["Run odds_fetcher.py for live line","TOR L5: 3.2 R/G","NYY L5: 4.0 R/G","NYY BP: 2.84 ERA L14"]}
      ]},
      pitcher:{intro:"Starters TBD — populate once confirmed.",cards:[]},
      batter:{intro:"TOR without Guerrero Jr. NYY missing Judge and Stanton.",cards:[
        {lbl:"TOR Offense",pick:"TOR Team Under 3.5 Runs",odds:"-115 est",grade:"B-",
         rat:"TOR averaging 3.2 R/G last 5 without Guerrero Jr. Against NYY rotation and elite 2.84 ERA bullpen, under 3.5 TOR team runs is the structural lean.",
         chips:["TOR L5: 3.2 R/G","Guerrero Jr. OUT","NYY BP ERA L14: 2.84","Under 3.5 requires 0-3 TOR runs"]}
      ]}
    }
  },

  "atl-mil": {
    away:"Atlanta Braves", home:"Milwaukee Brewers",
    time:"2:10 PM ET", venue:"American Family Field, Milwaukee WI (Retractable Dome)",
    awayRec:"75-54", homeRec:"80-49",
    wx:"🏟 Retractable dome — fully weather neutral. MIL 80-49 (best record in NL).",
    starters:"Chris Sale (ATL) 12-8, 2.16 ERA vs Jacob Misiorowski (MIL) 12-5, 1.75 ERA",
    overview:{
      lines:{ ml:"MIL -166 / ATL +140", spread:"MIL -1.5 (+132)", total:"O/U 8.0 (Over -106 / Under -114)", movement:"MIL won yesterday 2-1 — Sale was dominant (1 ER)" },
      away:{
        teamName:"Atlanta Braves", abbr:"ATL",
        offStats:{ avg:".261", ops:".770", kPct:"21.8%", rPerG:"4.8", rPerG_L10:"4.1", rPerG_L5:"3.6" },
        defStats:{ era:"3.85", bullpenERA_L14:"3.72", whip:"1.22" },
        starter:{ name:"Chris Sale", hand:"LHP", rec:"12-8", era:"2.16", whip:"1.04", k9:"11.2", bb9:"2.1", era_L3:"1.80", avgIP:"6.5" },
        injuries:[ ]
      },
      home:{
        teamName:"Milwaukee Brewers", abbr:"MIL",
        offStats:{ avg:".255", ops:".748", kPct:"22.4%", rPerG:"4.6", rPerG_L10:"5.8", rPerG_L5:"7.2" },
        defStats:{ era:"3.21", bullpenERA_L14:"3.18", whip:"1.15", closerNote:"Devin Williams (2.14 ERA, 22 Sv)" },
        starter:{ name:"Jacob Misiorowski", hand:"RHP", rec:"12-5", era:"1.75", whip:"0.98", k9:"11.8", bb9:"3.2", era_L3:"1.20", avgIP:"6.2" },
        injuries:[ ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"MIL won yesterday. Sale vs Misiorowski — best pitching matchup on the slate again.",cards:[
        {lbl:"Run Line",pick:"Brewers -1.5",odds:"+132",grade:"B",
         rat:"MIL 80-49 — best record in NL. Misiorowski (1.75 ERA, L3 ERA 1.20) vs Sale (2.16 ERA, L3 ERA 1.80). Yesterday MIL won 2-1. MIL at home in dome with best closer in NL (Williams 2.14 ERA). +132 run line on a team this dominant is value.",
         chips:["MIL: 80-49 best NL record","Misiorowski L3 ERA: 1.20","MIL BP: 3.18 ERA L14 · Williams closer","MIL won yesterday 2-1"]}
      ]},
      total:{intro:"O/U 8.0 — MOVED from 6.0 yesterday. Two elite aces, new number reflects yesterday's scoring.",cards:[
        {lbl:"Game Total",pick:"Under 8.0",odds:"-114",grade:"B+",
         rat:"Line moved to 8.0 after yesterday's 2-1 game — but the pitching matchup hasn't changed. Sale (2.16 ERA, 6.5 avg IP) + Misiorowski (1.75 ERA, 6.2 avg IP) are two of the best aces in baseball. ATL L5: 3.6 R/G with recency flag. MIL offense vs elite arms is suppressed. Under 8.0 at -114 is the lean — the O/U increase from 6.0 to 8.0 may overcompensate for yesterday.",
         chips:["Sale ERA: 2.16 · Misiorowski ERA: 1.75","ATL L5: 3.6 R/G (⚑ recency flag)","Under 8.0 at -114 — value after line move from 6.0","Both aces averaging 6.2+ IP/start"],
         recency:{team:"Atlanta Braves",seasonAvg:4.8,last10Avg:4.1,last5Avg:3.6},
         bullpen:{away:{name:"ATL",starterERA:2.16,starterAvgIP:6.5,bullpenERA_L14:3.72},home:{name:"MIL",starterERA:1.75,starterAvgIP:6.2,bullpenERA_L14:3.18},postedTotal:8.0}}
      ]},
      pitcher:{intro:"Same elite matchup as yesterday. Both aces were dominant in Game 1.",cards:[
        {lbl:"Sale — Strikeouts",pick:"Over 6.5 Ks",odds:"-118",grade:"B+",
         rat:"Sale averaged 11.2 K/9 in 2026. Yesterday: 7 K in 7 IP. Today's second start against same MIL lineup. MIL K%: 22.4%. Over 6.5 in 6.5 avg IP is highly achievable — hitters rarely adjust same-series.",
         chips:["Sale K/9: 11.2 · yesterday: 7 K in 7 IP","MIL K%: 22.4% — average lineup","Second start vs same lineup","Over 6.5 requires 7 Ks"]},
        {lbl:"Misiorowski — Strikeouts",pick:"Over 6.5 Ks",odds:"-120",grade:"B+",
         rat:"Misiorowski is 12-5, 1.75 ERA, 11.8 K/9 — best ERA in MLB. ATL bats .261. L3 ERA 1.20. Yesterday's start data not available but his K profile makes Over 6.5 the strong play in 6.2 avg IP.",
         chips:["Misiorowski ERA: 1.75 — best in MLB","K/9: 11.8 · L3 ERA: 1.20","ATL avg: .261 — average contact lineup","Over 6.5 in 6.2 avg IP"]}
      ]},
      batter:{intro:"Both lineups face elite arms. Avoid batter hit props.",cards:[
        {lbl:"Batter Note",pick:"Avoid batter props",odds:"—",grade:"C",
         rat:"Sale (2.16 ERA) and Misiorowski (1.75 ERA) represent the best 1-2 pitching matchup on the slate. Individual batter props are structurally weak. No batter props recommended.",
         chips:["Sale ERA: 2.16 · Misiorowski ERA: 1.75","Best pitching matchup on today's slate","Skip batter hit props entirely"]}
      ]}
    }
  },

// ════════════════════════════════════════════════════════
// AUG 22, 2026 — EVENING GAMES
// ════════════════════════════════════════════════════════

  "pit-lad": {
    away:"Pittsburgh Pirates", home:"Los Angeles Dodgers",
    time:"7:15 PM ET", venue:"Dodger Stadium, Los Angeles CA",
    awayRec:"63-66", homeRec:"77-51",
    wx:"🌤 Los Angeles: 82°F, 2% rain, light breeze — ideal pitching conditions.",
    starters:"Bubba Chandler (PIT) 6-8, 4.23 ERA vs Yoshinobu Yamamoto (LAD) 12-7, 2.60 ERA",
    overview:{
      lines:{ ml:"LAD TBD / PIT TBD", spread:"LAD -1.5", total:"O/U TBD", movement:"Pull via Odds API — Yamamoto starts expected to be heavy fav" },
      away:{
        teamName:"Pittsburgh Pirates", abbr:"PIT",
        offStats:{ avg:".250", ops:".720", kPct:"23.1%", rPerG:"4.2", rPerG_L10:"3.8", rPerG_L5:"3.5" },
        defStats:{ era:"4.38", bullpenERA_L14:"4.42", whip:"1.31" },
        starter:{ name:"Bubba Chandler", hand:"RHP", rec:"6-8", era:"4.23", whip:"1.37", k9:"8.6", bb9:"3.8", era_L3:"3.90", avgIP:"5.5" },
        injuries:[ ]
      },
      home:{
        teamName:"Los Angeles Dodgers", abbr:"LAD",
        offStats:{ avg:".268", ops:".782", kPct:"21.4%", rPerG:"5.1", rPerG_L10:"5.4", rPerG_L5:"5.8" },
        defStats:{ era:"3.42", bullpenERA_L14:"3.28", whip:"1.18", closerNote:"Evan Phillips (1.84 ERA, 22 Sv)" },
        starter:{ name:"Yoshinobu Yamamoto", hand:"RHP", rec:"12-7", era:"2.60", whip:"0.89", k9:"8.4", bb9:"2.6", era_L3:"1.83", avgIP:"6.5" },
        injuries:[ ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"LAD massive home fav. Yamamoto (August ERA 1.83) vs Chandler (4.23 ERA). FOX national broadcast.",cards:[
        {lbl:"Run Line",pick:"Dodgers -1.5",odds:"TBD",grade:"B+",
         rat:"Yamamoto (12-7, 2.60 ERA, August ERA 1.83) is in elite form — 2nd in MLB in WHIP at 0.89. LAD offense surging (5.8 R/G L5). PIT is 63-66 with Chandler (4.23 ERA) on the mound. LAD bullpen is elite (3.28 ERA L14). Run line is the play regardless of the exact price — confirm odds via Odds API.",
         chips:["Yamamoto: 2.60 ERA · August: 1.83 ERA","Yamamoto WHIP: 0.89 (2nd in MLB)","LAD L5: 5.8 R/G (surging)","LAD BP: 3.28 ERA L14 · Phillips closer"]}
      ]},
      total:{intro:"Yamamoto vs Chandler — clear under lean on the Yamamoto side.",cards:[
        {lbl:"Game Total",pick:"Under (verify line)",odds:"TBD",grade:"B+",
         rat:"Yamamoto (2.60 ERA, 0.89 WHIP, .245 wOBA against) allows very little scoring. August ERA 1.83 in 19.2 IP. PIT averages 3.5 R/G last 5. LAD offense is strong but Chandler (4.23 ERA) will give up runs — the question is whether LAD runs are enough to push over. Under 8.0 or lower is the lean on Yamamoto limiting PIT completely.",
         chips:["Yamamoto wOBA against: .245 (elite)","Yamamoto August ERA: 1.83","PIT L5: 3.5 R/G (suppressed)","Pull live line via Odds API"],
         bullpen:{away:{name:"PIT",starterERA:4.23,starterAvgIP:5.5,bullpenERA_L14:4.42},home:{name:"LAD",starterERA:2.60,starterAvgIP:6.5,bullpenERA_L14:3.28},postedTotal:8.0}}
      ]},
      pitcher:{intro:"Yamamoto is the primary prop target — elite suppressor on FOX national stage.",cards:[
        {lbl:"Yamamoto — Strikeouts",pick:"Over 5.5 Ks",odds:"TBD",grade:"A-",
         rat:"Yamamoto has 136 Ks in 145.1 IP (8.4 K/9). August: 18 Ks in 19.2 IP. Against a 63-66 PIT team with 23.1% K rate. August ERA 1.83. Over 5.5 (requires 6) is extremely achievable in 6.5 avg IP. Verify market line via Odds API.",
         chips:["Yamamoto K/9: 8.4 · August: 18 Ks in 19.2 IP","PIT K%: 23.1% — above average","August ERA: 1.83 — elite recent form",".245 wOBA against — elite suppression"],
         src:"Baseball Savant · MLB.com"},
        {lbl:"Yamamoto — Earned Runs",pick:"Under 2.5 ER",odds:"TBD",grade:"B+",
         rat:"Yamamoto's .245 wOBA against and 6.5% barrel rate make Under 2.5 ER the structural lean. August ERA 1.83 in 3 starts. PIT averages 3.5 R/G L5. 0.89 WHIP means he doesn't allow free baserunners.",
         chips:["Yamamoto wOBA: .245 · barrel%: 6.5%","August ERA: 1.83","WHIP: 0.89 (2nd MLB)","PIT L5: 3.5 R/G"],
         src:"Baseball Savant · Yahoo Sports"}
      ]},
      batter:{intro:"LAD offense surging (5.8 R/G L5) vs Chandler (4.23 ERA).",cards:[
        {lbl:"LAD Offense",pick:"LAD Team Over 4.5 Runs",odds:"-115 est",grade:"B",
         rat:"LAD averaging 5.8 R/G over their last 5 games — highest on today's slate. Freddie Freeman .303 AVG. Chandler (4.23 ERA, 1.37 WHIP) is hittable. At Dodger Stadium in ideal conditions. Over 4.5 LAD runs is the volume play.",
         chips:["LAD L5: 5.8 R/G (surging — highest on slate)","Freeman: .303 AVG","Chandler ERA: 4.23 · WHIP: 1.37","Dodger Stadium: pitcher-neutral"]}
      ]}
    }
  },

  "chc-sea": {
    away:"Chicago Cubs", home:"Seattle Mariners",
    time:"7:15 PM ET", venue:"T-Mobile Park, Seattle WA",
    awayRec:"70-59", homeRec:"72-56",
    wx:"🌤 Seattle: 72°F, 10% rain, light breeze — good conditions.",
    starters:"Matthew Boyd (CHC) 8-2, 4.02 ERA vs Emerson Hancock (SEA) 7-7, 3.30 ERA",
    overview:{
      lines:{ ml:"SEA TBD / CHC TBD", spread:"SEA -1.5", total:"O/U TBD", movement:"SEA won yesterday 6-5 in 10 inn. Pull live line via Odds API." },
      away:{
        teamName:"Chicago Cubs", abbr:"CHC",
        offStats:{ avg:".256", ops:".752", kPct:"22.8%", rPerG:"4.5", rPerG_L10:"4.8", rPerG_L5:"5.1" },
        defStats:{ era:"4.12", bullpenERA_L14:"4.08", whip:"1.28" },
        starter:{ name:"Matthew Boyd", hand:"LHP", rec:"8-2", era:"4.02", whip:"1.28", k9:"7.8", bb9:"3.1", era_L3:"4.20", avgIP:"5.8" },
        injuries:[ ]
      },
      home:{
        teamName:"Seattle Mariners", abbr:"SEA",
        offStats:{ avg:".248", ops:".718", kPct:"22.2%", rPerG:"4.3", rPerG_L10:"4.6", rPerG_L5:"4.8" },
        defStats:{ era:"3.52", bullpenERA_L14:"3.44", whip:"1.19" },
        starter:{ name:"Emerson Hancock", hand:"RHP", rec:"7-7", era:"3.30", whip:"1.06", k9:"8.9", bb9:"2.6", era_L3:"2.80", avgIP:"6.2" },
        injuries:[ ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"SEA home with Hancock (3.30 ERA) vs Boyd (4.02 ERA). SEA won Game 1 6-5 yesterday.",cards:[
        {lbl:"Run Line",pick:"Mariners -1.5",odds:"TBD",grade:"B-",
         rat:"Hancock (3.30 ERA, 0.95 WHIP, L3 ERA 2.80) is the better pitcher tonight. SEA won Game 1 yesterday. CHC is 70-59 but their pitching matchup is the worse side tonight. -1.5 run line is the lean if odds are accessible.",
         chips:["Hancock ERA: 3.30 · L3 ERA: 2.80","SEA won Game 1 yesterday 6-5","Boyd ERA: 4.02 — hittable","SEA home T-Mobile Park"]}
      ]},
      total:{intro:"O/U TBD. Boyd (4.02 ERA) vs Hancock (3.30 ERA). CHC offense surging (5.1 R/G L5).",cards:[
        {lbl:"Game Total",pick:"Over (verify line)",odds:"TBD",grade:"B-",
         rat:"CHC averaging 5.1 R/G last 5 — surging offense. Boyd (4.02 ERA) is hittable. SEA offense (4.8 R/G L5) also active. Combined offense profile suggests scoring. Verify line via Odds API before committing.",
         chips:["CHC L5: 5.1 R/G (surging)","SEA L5: 4.8 R/G (solid)","Boyd ERA: 4.02 — hittable","Pull live O/U via Odds API"]}
      ]},
      pitcher:{intro:"Hancock is the primary prop target — elite recent form.",cards:[
        {lbl:"Hancock — Strikeouts",pick:"Over 5.5 Ks",odds:"-115 est",grade:"B",
         rat:"Hancock has 70:15 K:BB in 70.2 IP (8.9 K/9, 0.95 WHIP). L3 ERA: 2.80 — excellent recent form. CHC K%: 22.8% — slightly above average. Over 5.5 in 6.2 avg IP is the lean.",
         chips:["Hancock K/9: 8.9 · K:BB 70:15","L3 ERA: 2.80 — strong recent form","CHC K%: 22.8% — above average","Over 5.5 in 6.2 avg IP"],
         src:"Heavy.com · Baseball Savant"},
        {lbl:"Hancock — Earned Runs",pick:"Under 2.5 ER",odds:"-118 est",grade:"B",
         rat:"Hancock wOBA against: .288. L3 ERA 2.80. At home in T-Mobile Park (pitcher-friendly). CHC averages 4.5 R/G season. Under 2.5 aligns with his recent form.",
         chips:["Hancock wOBA: .288","L3 ERA: 2.80","T-Mobile Park: pitcher-friendly","CHC season avg: 4.5 R/G"],
         src:"Baseball Savant 2026"}
      ]},
      batter:{intro:"CHC offense surging (5.1 R/G L5) vs Boyd (4.02 ERA).",cards:[
        {lbl:"CHC vs Boyd",pick:"CHC Team Over 4.5 Runs",odds:"-115 est",grade:"B-",
         rat:"CHC averaging 5.1 R/G in their last 5 games. Boyd (4.02 ERA, 1.28 WHIP) is hittable. Away team at T-Mobile Park where pitcher-park factors slightly suppress offense but CHC's hot offense is the lean.",
         chips:["CHC L5: 5.1 R/G (surging)","Boyd ERA: 4.02 · WHIP: 1.28","T-Mobile Park: mild pitcher advantage","Over 4.5 requires 5+ runs"]}
      ]}
    }
  },

  "sf-bos": {
    away:"San Francisco Giants", home:"Boston Red Sox",
    time:"7:15 PM ET", venue:"Fenway Park, Boston MA",
    awayRec:"52-76", homeRec:"69-59",
    wx:"⛅ Boston: 80°F, 10% rain, SE wind 8 mph — no significant concern.",
    starters:"Logan Webb (SF) 8-7, 3.50 ERA vs Sonny Gray (BOS) 15-3, 2.65 ERA",
    overview:{
      lines:{ ml:"BOS TBD / SF TBD", spread:"BOS -1.5", total:"O/U TBD", movement:"BOS won yesterday 6-4. Pull live line via Odds API." },
      away:{
        teamName:"San Francisco Giants", abbr:"SF",
        offStats:{ avg:".238", ops:".688", kPct:"24.1%", rPerG:"3.8", rPerG_L10:"3.4", rPerG_L5:"3.1" },
        defStats:{ era:"4.28", bullpenERA_L14:"4.44", whip:"1.34" },
        starter:{ name:"Logan Webb", hand:"RHP", rec:"8-7", era:"3.50", whip:"1.22", k9:"8.2", bb9:"2.6", era_L3:"3.10", avgIP:"6.2" },
        injuries:[ ]
      },
      home:{
        teamName:"Boston Red Sox", abbr:"BOS",
        offStats:{ avg:".262", ops:".768", kPct:"21.2%", rPerG:"4.9", rPerG_L10:"5.2", rPerG_L5:"5.1" },
        defStats:{ era:"3.58", bullpenERA_L14:"3.62", whip:"1.18", closerNote:"Kenley Jansen (2.44 ERA, 18 Sv)" },
        starter:{ name:"Sonny Gray", hand:"RHP", rec:"15-3", era:"2.65", whip:"1.15", k9:"11.0", bb9:"2.8", era_L3:"2.10", avgIP:"6.8" },
        injuries:[ ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"BOS won Game 1 yesterday 6-4. Gray (15-3, 2.65 ERA) starts Game 2.",cards:[
        {lbl:"Run Line",pick:"Red Sox -1.5",odds:"TBD",grade:"B+",
         rat:"Gray is 15-3 with a 2.65 ERA and team goes 15-7 ATS in his starts. BOS won yesterday 6-4. SF is 52-76. BOS offense averaging 5.1 R/G L5. Gray at Fenway vs a weak SF team is the highest-conviction run line on the slate. Pull current odds via Odds API.",
         chips:["Gray: 15-3, 2.65 ERA · team 15-7 ATS","BOS won yesterday 6-4","SF: 52-76, 3.1 R/G L5 (suppressed)","Pull live odds via Odds API"],
         bullpen:{away:{name:"SF",starterERA:3.50,starterAvgIP:6.2,bullpenERA_L14:4.44},home:{name:"BOS",starterERA:2.65,starterAvgIP:6.8,bullpenERA_L14:3.62},postedTotal:8.0}}
      ]},
      total:{intro:"Gray suppresses SF. Webb is solid. Under lean remains.",cards:[
        {lbl:"Game Total",pick:"Under (verify line)",odds:"TBD",grade:"B+",
         rat:"Gray (2.65 ERA, .295 wOBA against) projects minimal SF scoring. Yesterday scored 4 off BOS but that came from Crochet. Tonight is Gray — a different level. Bullpen-adjusted: SF side projects 3.5 runs, BOS side 3.1 = 6.6 combined. Under 7.5 or whatever the line is should be achievable.",
         chips:["Gray wOBA against: .295 (elite)","Gray avg IP: 6.8 — limits bullpen exposure","SF L5: 3.1 R/G (suppressed)","Pull live O/U via Odds API"],
         recency:{team:"San Francisco Giants",seasonAvg:3.8,last10Avg:3.4,last5Avg:3.1},
         bullpen:{away:{name:"SF",starterERA:3.50,starterAvgIP:6.2,bullpenERA_L14:4.44},home:{name:"BOS",starterERA:2.65,starterAvgIP:6.8,bullpenERA_L14:3.62},postedTotal:8.0}}
      ]},
      pitcher:{intro:"Gray is the premier prop target on today's full slate.",cards:[
        {lbl:"Gray — Strikeouts",pick:"Over 5.5 Ks",odds:"-136",grade:"A-",
         rat:"Market consensus: 5.5 line (requires 6 Ks). Gray averages 5.7 Ks/start vs SF career (4-1, 3.16 ERA). 11.0 K/9 in 2026. SF K%: 24.1% — above average. BOS won yesterday so Gray is in full prep mode for Game 2.",
         chips:["Market line: 5.5 (confirmed consensus)","Gray career vs SF: 4-1, 3.16 ERA, 5.7 Ks/start","K/9: 11.0 · K:BB: 117:34 (elite)","SF K%: 24.1% — favorable matchup"],
         src:"BettingPros consensus · Baseball Savant"},
        {lbl:"Gray — Earned Runs",pick:"Under 2.5 ER",odds:"-145",grade:"B+",
         rat:"Gray career vs SF: 3.16 ERA. .295 wOBA against. SF L5: 3.1 R/G. Under 2.5 ER in 6.8 avg IP against a weak SF lineup is the structural play.",
         chips:["Gray career ERA vs SF: 3.16","wOBA against: .295 · barrel%: 6.1%","SF L5: 3.1 R/G (suppressed)","Under 2.5 aligns with career line"],
         src:"Baseball Savant 2026"},
        {lbl:"Gray — Outs Recorded",pick:"Over 17.5 outs",odds:"-190",grade:"B",
         rat:"Gray averages 6.8 IP/start = 20.4 outs. PropCruncher sets 17.5 consensus across 26 books. SF 52-76 — should pitch deep. Needs 6 IP / 18 outs to cover. Price is steep at -190 but probability is high.",
         chips:["Gray avg IP: 6.8 (20.4 outs avg)","PropCruncher: 17.5 consensus over-favored","SF: 52-76 — pitch deep expected","Needs 18 outs = 6 IP"],
         src:"PropCruncher · RotoWire"},
        {lbl:"Gray — Walks",pick:"Under 1.5 BB",odds:"-115",grade:"B",
         rat:"Gray BB/9: 2.8 — 2.1 walks/start season avg. SF contact-oriented team that doesn't walk much. Under 1.5 requires 0 or 1 BB. Good command profile makes this achievable.",
         chips:["Gray BB/9: 2.8 (good command)","2.1 BB/start season average","SF: contact-oriented approach","Under 1.5 requires 0 or 1 BB"],
         src:"Baseball Reference 2026"}
      ]},
      batter:{intro:"BOS offense (5.1 R/G L5) vs Webb (3.50 ERA, 1.22 WHIP).",cards:[
        {lbl:"BOS vs Webb",pick:"BOS Team Over 4.5 Runs",odds:"-115 est",grade:"B",
         rat:"BOS averaging 5.1 R/G last 5 games. Webb (3.50 ERA, 1.22 WHIP) is hittable at Fenway (park factor 108). BOS won yesterday 6-4. Over 4.5 BOS runs against a middling arm at home is the lean.",
         chips:["BOS L5: 5.1 R/G (surging)","Webb ERA: 3.50 · WHIP: 1.22","Fenway PF: 108 (hitter-friendly)","BOS won yesterday 6-4"]},
        {lbl:"Batter · Total Bases",pick:"Rafael Devers Over 1.5 Total Bases",odds:"-115 est",grade:"B-",
         rat:"Devers is BOS best power bat. Webb RHP vs Devers LHB at Fenway. BOS surging. Total bases captures doubles and multi-hit potential.",
         chips:["Devers: LHB vs Webb RHP advantage","Fenway: short left field wall","BOS offense surging","Over 1.5 TB = double or 2 singles"]}
      ]}
    }
  },

  "laa-tex": {
    away:"Los Angeles Angels", home:"Texas Rangers",
    time:"7:05 PM ET", venue:"Globe Life Field, Arlington TX (Retractable Dome)",
    awayRec:"50-78", homeRec:"63-65",
    wx:"🏟 Globe Life Field: Dome closed — fully neutral.",
    starters:"Reid Detmers (LAA) vs MacKenzie Gore (TEX)",
    overview:{
      lines:{ ml:"TEX TBD / LAA TBD", spread:"TEX -1.5", total:"O/U TBD", movement:"Pull via Odds API" },
      away:{
        teamName:"Los Angeles Angels", abbr:"LAA",
        offStats:{ avg:".230", ops:".670", kPct:"25.6%", rPerG:"3.4", rPerG_L10:"2.5", rPerG_L5:"2.3" },
        defStats:{ era:"5.12", bullpenERA_L14:"5.50", whip:"1.52" },
        starter:{ name:"Reid Detmers", hand:"LHP", rec:"TBD", era:"4.75", whip:"1.38", k9:"8.8", bb9:"3.6", era_L3:"TBD", avgIP:"5.4" },
        injuries:[ {status:"OUT",player:"Mike Trout — knee"} ]
      },
      home:{
        teamName:"Texas Rangers", abbr:"TEX",
        offStats:{ avg:".248", ops:".728", kPct:"23.2%", rPerG:"4.1", rPerG_L10:"3.6", rPerG_L5:"3.2" },
        defStats:{ era:"4.19", bullpenERA_L14:"4.19", whip:"1.31", closerNote:"Jacob Latz (1.77 ERA)" },
        starter:{ name:"MacKenzie Gore", hand:"LHP", rec:"TBD", era:"3.85", whip:"1.22", k9:"9.4", bb9:"3.2", era_L3:"TBD", avgIP:"5.8" },
        injuries:[ ]
      }
    },
    tabs:{
      overview:{intro:"",cards:[]},
      runline:{intro:"TEX home in dome. Gore (3.85 ERA) vs Detmers (4.75 ERA). TEX won yesterday 2-1.",cards:[
        {lbl:"Run Line",pick:"Rangers -1.5",odds:"TBD",grade:"B-",
         rat:"Gore (3.85 ERA) vs Detmers (4.75 ERA) — TEX has the pitching edge. TEX won yesterday 2-1. Dome is neutral. LAA is 50-78 with suppressed offense (2.3 R/G L5). Verify live run line odds.",
         chips:["Gore ERA: 3.85 vs Detmers: 4.75","TEX won yesterday 2-1","LAA L5: 2.3 R/G (suppressed)","Dome: neutral — no weather factor"]}
      ]},
      total:{intro:"Under lean given Gore quality and LAA suppressed offense.",cards:[
        {lbl:"Game Total",pick:"Under (verify line)",odds:"TBD",grade:"B-",
         rat:"LAA L5: 2.3 R/G — one of the most suppressed offenses on the slate. TEX L5: 3.2 R/G. Gore (9.4 K/9) limits scoring. Dome removes weather variable. Under is the lean — verify line via Odds API.",
         chips:["LAA L5: 2.3 R/G (⚑ flagged)","TEX L5: 3.2 R/G","Gore K/9: 9.4 — strong arm","Dome: neutral"],
         recency:{team:"Los Angeles Angels",seasonAvg:3.4,last10Avg:2.5,last5Avg:2.3}}
      ]},
      pitcher:{intro:"Gore is the primary pitcher prop. Detmers is volatile.",cards:[
        {lbl:"Gore — Strikeouts",pick:"Over 5.5 Ks",odds:"-115 est",grade:"B",
         rat:"Gore averages 9.4 K/9 with solid recent form. LAA K%: 25.6% — highest on today's slate. Over 5.5 in 5.8 avg IP against the team with the highest K rate is the lean.",
         chips:["Gore K/9: 9.4","LAA K%: 25.6% — highest K rate today","Over 5.5 in 5.8 avg IP","Dome: neutral, no weather suppression"]},
        {lbl:"Detmers — Earned Runs",pick:"Over 2.5 ER",odds:"-118 est",grade:"B-",
         rat:"Detmers career ERA is 4.75 with a 3.6 BB/9. TEX offense (3.2 R/G L5) is moderate. Over 2.5 ER against a team that can score is directionally right but TEX's recent suppression limits confidence.",
         chips:["Detmers ERA: 4.75 (career)","Detmers BB/9: 3.6 — walk risk","TEX L5: 3.2 R/G","Over 2.5 requires 3+ ER"]}
      ]},
      batter:{intro:"TEX vs Detmers (4.75 ERA) is the offensive angle.",cards:[
        {lbl:"TEX vs Detmers",pick:"TEX Team Over 3.5 Runs",odds:"-115 est",grade:"B-",
         rat:"Detmers (4.75 ERA) is hittable. TEX in dome with no weather variable. Over 3.5 runs in a dome against a 4.75 ERA arm is the lean.",
         chips:["Detmers ERA: 4.75","TEX in dome: neutral conditions","Over 3.5 requires 4+ runs","TEX L5: 3.2 R/G — modest but achievable"]}
      ]}
    }
  }

};
// ── BEST BETS STRIP ───────────────────────────────────
const bestBets = [
  {game:"SF@BOS",  pick:"Gray Over 5.5 Ks",         odds:"-136",  grade:"A-"},
  {game:"SF@BOS",  pick:"Red Sox -1.5",              odds:"TBD",   grade:"B+"},
  {game:"SF@BOS",  pick:"Under 7.5 Total",           odds:"TBD",   grade:"B+"},
  {game:"PIT@LAD", pick:"Yamamoto Over 5.5 Ks",      odds:"TBD",   grade:"A-"},
  {game:"PIT@LAD", pick:"Dodgers -1.5",              odds:"TBD",   grade:"B+"},
  {game:"ATL@MIL", pick:"Under 8.0 Total",           odds:"-114",  grade:"B+"},
  {game:"ATL@MIL", pick:"Sale Over 6.5 Ks",          odds:"-118",  grade:"B+"},
  {game:"ATL@MIL", pick:"Misiorowski Over 6.5 Ks",   odds:"-120",  grade:"B+"},
  {game:"SF@BOS",  pick:"Gray Under 2.5 ER",         odds:"-145",  grade:"B+"},
  {game:"SF@BOS",  pick:"Gray Over 17.5 Outs",       odds:"-190",  grade:"B"},
  {game:"CHC@SEA", pick:"Hancock Over 5.5 Ks",       odds:"-115",  grade:"B"},
  {game:"TOR@NYY", pick:"TOR Under 3.5 Runs",        odds:"-115",  grade:"B-"},
];
// ── BEST BETS STRIP ───────────────────────────────────

// ── BEST BETS STRIP ───────────────────────────────────


const strip = document.getElementById('strip');
bestBets.forEach(b => {
  const p = document.createElement('div');
  p.className = 'pill';
  p.innerHTML = `<span class="gtag">${b.game}</span><span class="pk">${b.pick}</span><span class="odds">${b.odds}</span><span class="grade ${gc(b.grade)}">${b.grade}</span>`;
  strip.appendChild(p);
});

