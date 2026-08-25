/**
 * Odds Integration Module
 * ───────────────────────
 * Reads ODDS_DATA from games_data.js (written by odds_fetcher.py)
 * and patches live lines into the dashboard.
 *
 * Usage in dashboard HTML:
 *   <script src="games_data.js"></script>   <!-- auto-generated -->
 *   <script src="odds_integration.js"></script>
 *
 * Then call injectLiveOdds() after loadGame() renders a panel.
 */

'use strict';

// ─────────────────────────────────────────────
// TEAM NAME NORMALISATION
// Maps dashboard abbreviations → full names for matching
// ─────────────────────────────────────────────
const TEAM_NAME_MAP = {
  'NYY': 'New York Yankees',   'BAL': 'Baltimore Orioles',
  'BOS': 'Boston Red Sox',     'TB':  'Tampa Bay Rays',
  'TOR': 'Toronto Blue Jays',  'SF':  'San Francisco Giants',
  'LAD': 'Los Angeles Dodgers','COL': 'Colorado Rockies',
  'HOU': 'Houston Astros',     'LAA': 'Los Angeles Angels',
  'ATH': 'Athletics',          'TEX': 'Texas Rangers',
  'WSH': 'Washington Nationals','MIA': 'Miami Marlins',
  'PHI': 'Philadelphia Phillies','STL': 'St. Louis Cardinals',
  'MIL': 'Milwaukee Brewers',  'ATL': 'Atlanta Braves',
  'NYM': 'New York Mets',      'CWS': 'Chicago White Sox',
  'CHC': 'Chicago Cubs',       'SEA': 'Seattle Mariners',
  'MIN': 'Minnesota Twins',    'DET': 'Detroit Tigers',
  'KC':  'Kansas City Royals', 'CLE': 'Cleveland Guardians',
  'CIN': 'Cincinnati Reds',    'PIT': 'Pittsburgh Pirates',
  'SD':  'San Diego Padres',   'AZ':  'Arizona Diamondbacks',
  'OAK': 'Athletics',
};

// ─────────────────────────────────────────────
// PROP MARKET LABELS
// ─────────────────────────────────────────────
const PROP_MARKET_LABELS = {
  pitcher_strikeouts:    'Strikeouts',
  pitcher_earned_runs:   'Earned Runs',
  pitcher_walks:         'Walks',
  pitcher_outs:          'Outs Recorded',
  pitcher_hits_allowed:  'Hits Allowed',
};

// ─────────────────────────────────────────────
// CORE: find a game in ODDS_DATA
// ─────────────────────────────────────────────
function findLiveGame(awayAbbr, homeAbbr) {
  if (typeof ODDS_DATA === 'undefined') return null;
  const awayFull = TEAM_NAME_MAP[awayAbbr] || awayAbbr;
  const homeFull = TEAM_NAME_MAP[homeAbbr] || homeAbbr;
  return ODDS_DATA.games.find(g =>
    (g.home.includes(homeFull) || g.home === homeAbbr) &&
    (g.away.includes(awayFull) || g.away === awayAbbr)
  ) || null;
}

// ─────────────────────────────────────────────
// CORE: find prop line for a player
// ─────────────────────────────────────────────
function findPropLine(liveGame, playerLastName, market) {
  if (!liveGame || !liveGame.props) return null;
  const last = playerLastName.toLowerCase();
  const playerKey = Object.keys(liveGame.props).find(k =>
    k.toLowerCase().includes(last)
  );
  if (!playerKey) return null;
  return liveGame.props[playerKey][market] || null;
}

// ─────────────────────────────────────────────
// FORMAT HELPERS
// ─────────────────────────────────────────────
function fmtOdds(n) {
  if (n == null) return 'N/A';
  return n > 0 ? `+${n}` : `${n}`;
}

function fmtLine(point, overOdds, underOdds) {
  if (point == null) return 'N/A';
  return `O/U ${point} (Over ${fmtOdds(overOdds)} / Under ${fmtOdds(underOdds)})`;
}

// ─────────────────────────────────────────────
// INJECT: overview tab lines
// Patches the lines section of the overview tab with live data
// ─────────────────────────────────────────────
function injectOverviewLines(liveGame) {
  if (!liveGame) return;
  const r = liveGame.lines.raw;
  const boxes = document.querySelectorAll('.ov-line-box');
  if (!boxes.length) return;

  const vals = [
    // [0] Moneyline
    `${liveGame.home.split(' ').pop()} ${fmtOdds(r.homeML)} / ${liveGame.away.split(' ').pop()} ${fmtOdds(r.awayML)}`,
    // [1] Run Line
    `${r.homeSpread > 0 ? '+' : ''}${r.homeSpread} (${fmtOdds(r.homeSpreadOdds)})`,
    // [2] Total
    `O/U ${r.total}`,
    // [3] Movement — we don't have opening line from API without event history
    `Over ${fmtOdds(r.overOdds)} · Under ${fmtOdds(r.underOdds)}`,
  ];

  boxes.forEach((box, i) => {
    if (i < vals.length) {
      const valEl = box.querySelector('.ov-line-val');
      if (valEl) {
        valEl.textContent = vals[i];
        valEl.style.color = 'var(--gold)';
      }
    }
  });

  // Add live badge
  const linesSection = document.querySelector('.ov-section.full');
  if (linesSection && !linesSection.querySelector('.live-badge')) {
    const badge = document.createElement('div');
    badge.className = 'live-badge';
    badge.innerHTML = `⚡ Live — The Odds API · Updated ${new Date(ODDS_DATA.fetched_at).toLocaleTimeString('en-US', {hour:'numeric',minute:'2-digit'})}`;
    linesSection.querySelector('.ov-section-title').after(badge);
  }
}

// ─────────────────────────────────────────────
// INJECT: prop card odds
// Patches odds chips and odds display on pitcher prop cards
// ─────────────────────────────────────────────
function injectPropOdds(liveGame) {
  if (!liveGame) return;

  // Find all odds chips on cards in the active panel
  const cards = document.querySelectorAll('.panel.active .card');
  cards.forEach(card => {
    // Try to extract pitcher name and market from card label
    const lblEl = card.querySelector('.card-lbl');
    const pickEl = card.querySelector('.card-pick');
    if (!lblEl || !pickEl) return;

    const lbl = lblEl.textContent;  // e.g. "Gray — Strikeouts"
    const pick = pickEl.textContent; // e.g. "Over 5.5 Ks"

    // Identify market
    let market = null;
    if (lbl.includes('Strikeout') || pick.includes('Ks'))    market = 'pitcher_strikeouts';
    else if (lbl.includes('Earned Run') || pick.includes('ER')) market = 'pitcher_earned_runs';
    else if (lbl.includes('Walks') || pick.includes('BB'))    market = 'pitcher_walks';
    else if (lbl.includes('Outs'))                             market = 'pitcher_outs';
    else if (lbl.includes('Hits'))                             market = 'pitcher_hits_allowed';
    if (!market) return;

    // Extract pitcher last name from label "Gray — Strikeouts" → "Gray"
    const lastName = lbl.split('—')[0].trim().split(' ').pop();
    const propData = findPropLine(liveGame, lastName, market);
    if (!propData) return;

    // Determine direction from pick text
    const isOver = pick.toLowerCase().includes('over');
    const liveOdds = isOver ? propData.over : propData.under;
    const livePoint = propData.point;

    if (liveOdds == null) return;

    // Update odds chip
    const oddsEl = card.querySelector('.odds-chip');
    if (oddsEl) {
      const oldOdds = oddsEl.textContent;
      const newOdds = fmtOdds(liveOdds);
      if (oldOdds !== newOdds) {
        oddsEl.textContent = newOdds;
        oddsEl.style.background = 'rgba(200,168,75,0.25)';
        oddsEl.title = `Updated from ${oldOdds}`;
      }
    }

    // If line point differs from displayed, add a note
    const displayedPick = pick.trim();
    const displayedPoint = parseFloat(displayedPick.replace(/[^0-9.]/g, ''));
    if (livePoint != null && Math.abs(livePoint - displayedPoint) >= 0.5) {
      // Line has moved
      if (!card.querySelector('.live-line-note')) {
        const note = document.createElement('div');
        note.className = 'live-line-note';
        note.textContent = `⚡ Live line: ${isOver ? 'Over' : 'Under'} ${livePoint} ${fmtOdds(liveOdds)} · was ${displayedPick}`;
        card.querySelector('.card-rat')?.after(note);
      }
    }
  });
}

// ─────────────────────────────────────────────
// INJECT: game total on total tab
// ─────────────────────────────────────────────
function injectTotalLine(liveGame) {
  if (!liveGame) return;
  const r = liveGame.lines.raw;
  const totalCards = document.querySelectorAll('.panel[data-panel="total"] .card');
  totalCards.forEach(card => {
    const oddsEl = card.querySelector('.odds-chip');
    const pickEl = card.querySelector('.card-pick');
    if (!oddsEl || !pickEl) return;
    const isOver = pickEl.textContent.toLowerCase().includes('over');
    const liveOdds = fmtOdds(isOver ? r.overOdds : r.underOdds);
    if (oddsEl.textContent !== liveOdds) {
      oddsEl.textContent = liveOdds;
      oddsEl.style.background = 'rgba(200,168,75,0.25)';
    }
  });
}

// ─────────────────────────────────────────────
// MAIN ENTRY POINT
// Call this after loadGame() renders panels
// ─────────────────────────────────────────────
function injectLiveOdds(awayAbbr, homeAbbr) {
  if (typeof ODDS_DATA === 'undefined') {
    console.log('ODDS_DATA not loaded — run odds_fetcher.py and include games_data.js');
    return;
  }
  const liveGame = findLiveGame(awayAbbr, homeAbbr);
  if (!liveGame) {
    console.log(`No live data for ${awayAbbr} @ ${homeAbbr}`);
    return;
  }
  console.log(`Injecting live odds for ${awayAbbr} @ ${homeAbbr}`);
  injectOverviewLines(liveGame);
  injectPropOdds(liveGame);
  injectTotalLine(liveGame);
}

// ─────────────────────────────────────────────
// CSS for live badges and line notes
// Injected once on load
// ─────────────────────────────────────────────
(function injectOddsCSS() {
  if (document.getElementById('odds-integration-css')) return;
  const style = document.createElement('style');
  style.id = 'odds-integration-css';
  style.textContent = `
    .live-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      color: var(--green);
      background: var(--green-dim);
      border: 1px solid rgba(76,175,125,.3);
      padding: 3px 8px;
      margin-bottom: 8px;
      display: inline-block;
      letter-spacing: .06em;
    }
    .live-line-note {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      color: var(--gold);
      background: var(--gold-dim);
      border-left: 2px solid var(--gold);
      padding: 4px 8px;
      margin: 4px 0;
      line-height: 1.5;
    }
  `;
  document.head.appendChild(style);
})();
