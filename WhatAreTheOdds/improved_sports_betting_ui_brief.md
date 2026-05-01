# Improved Sports Betting Interface Brief

## Product Direction

Build the product as a premium odds intelligence desk, not a generic sportsbook. The user should feel they are comparing markets, spotting movement, and tracking betting performance with a fast, credible tool.

Core mood: dark editorial, trading-terminal precision, sports-magazine typography.

Avoid: casino energy, neon overload, bubbly fintech cards, purple AI gradients, tiny odds chips, emoji sport icons.

## Visual System

### Palette

Use a near-black foundation with one main accent and separate semantic state colors.

```css
:root {
  --bg: #0a0a0b;
  --surface: #111113;
  --surface-2: #171719;
  --line: #2a2a2e;
  --text: #f5f5f0;
  --text-muted: #a6a69f;
  --accent: #c8ff00;
  --accent-ink: #101300;
  --warning: #e87a00;
  --positive: #3ddc84;
  --negative: #ff4d4d;
  --info: #7aa7ff;
}
```

Use `--accent` only for primary CTAs, best-line highlights, active nav, and live status. Use `positive/negative/warning/info` only when their meaning is explicit with text or icons.

### Typography

Recommended upgrade:

- Display: `Barlow Condensed` instead of Bebas/Anton for a more usable sports editorial voice.
- UI/body: `IBM Plex Sans` for trust and readable controls.
- Odds/data: `DM Mono` or `Space Mono` with `font-variant-numeric: tabular-nums`.

Do not make every label mono. Use mono only for odds, timestamps, percentages, units, and table numbers.

### Shape And Density

- Radius: `0px` for tables and ticker modules, `6px` max for cards, `999px` only for pills/toggles.
- Borders: 1px hairlines using `--line`; avoid heavy shadows.
- Grid: use a 10-column desktop grid to preserve the asymmetric editorial concept.
- Table row height: 40px desktop, 48px mobile.
- Tap targets: 44px minimum.

## Navigation Model

Desktop:

- Sticky top live ticker.
- Left rail for primary product sections: Lobby, Odds Board, Live, Value Finder, Tracker, News.
- Secondary sport nav directly below ticker: NFL, NBA, MLB, NHL, Soccer, UFC, Tennis.

Mobile:

- Top ticker becomes a horizontally scrollable score strip.
- Bottom nav max 5 items: Lobby, Odds, Live, Betslip, Tracker.
- Sport selector becomes segmented horizontal tabs below the top bar.

## Key Screen Redesigns

### 1. Homepage / Lobby

First viewport should be a usable betting desk, not a marketing hero.

Layout:

- Left: featured matchup with huge team names, start time, market status, and best available price.
- Right: live odds stack with three primary markets: Moneyline, Spread, Total.
- Below: sport tabs, trending moves, and top value opportunities.

Better modules:

- `Market Pulse`: “Lakers line moved -2.5 to -4.0 in 38 min”
- `Best Price Now`: bookmaker comparison with best line emphasized.
- `Sharp/Public Split`: visible bar with labels, not color alone.
- `Responsible Bet Panel`: small persistent footer link for limits, help, and age/jurisdiction status.

### 2. Odds Comparison Board

Make this the flagship experience.

Desktop:

- Sticky game context header: teams, time, league, venue, last updated.
- Market tabs: Moneyline, Spread, Total, Props.
- Table columns: Book, Open, Current, Movement, Hold, Updated, Action.
- Best line uses acid-lime left border plus “Best” text badge.
- Movement uses arrows and numeric delta, not red/green alone.

Mobile:

- Do not squeeze the full table into tiny columns.
- Use bookmaker cards: Book, current odds, open odds, movement, updated time.
- Add a “Compare all” horizontal table behind an overflow wrapper for power users.

### 3. Game Detail

Structure it as a research page:

- Top: matchup command bar with bet slip action.
- Left/main: odds board and line movement chart.
- Right/aside: team stats, injuries, weather, venue, recent form.
- Bottom: related news and historical head-to-head.

Use line charts for movement over time. Provide exact values in a visible table or expandable data view.

### 4. Live / In-Play

This screen should feel controlled, not chaotic.

- Show connection/refresh status: “Updated 12s ago”
- Use brief background pulse on changed odds, 250ms max.
- Add filters for league, live only, biggest movement, highest volume.
- Pause auto-refresh when user is editing bet slip stake.
- Provide reduced-motion fallback: no pulse, just a “Changed” label.

### 5. Best Bets / Value Finder

This should be analytical and transparent.

Columns:

- Matchup
- Market
- Book
- Best line
- Consensus line
- Implied probability
- Estimated edge
- Confidence
- Updated

UX:

- Add a plain-language tooltip for EV.
- Show methodology link or drawer.
- Let users filter EV threshold, sport, market, and bookmaker.
- Use caution states for stale odds or low-confidence picks.

### 6. Bet Tracker Dashboard

Make this feel like a performance ledger.

Top summary:

- Net P&L
- ROI
- Win rate
- Average odds
- Units risked

Main:

- P&L line chart over time.
- Sport/market breakdown as horizontal bars.
- Wager history table with sorting, filters, and CSV export.

Input:

- Visible labels for stake, odds, bookmaker, market, result.
- Numeric inputs use `inputmode="decimal"`.
- Inline validation and `aria-live` error regions.

## Component Improvements

### OddsCard

Current outline says cards with chips. Better:

- Card header: league, start time, live status.
- Main body: teams as two stacked rows, each with record/seed if available.
- Odds as large mono numbers in three aligned columns.
- Best price gets a left rule and “Best” label.
- Footer: sharp/public split, last updated, add-to-slip button.

### BetSlip

Use as a persistent right drawer on desktop and bottom sheet on mobile.

Must include:

- Legs grouped by game.
- Stake input with visible label.
- Potential payout.
- Warnings for changed/stale odds.
- Remove leg action with icon label.
- Responsible gambling link and “Set limit” entry.

### Age Gate

Full-screen modal, but make it sober and compliant:

- Date of birth fields with labels.
- Jurisdiction selector.
- Clear error message below field.
- Continue button disabled until valid.
- Links to terms, privacy, responsible gambling.
- Do not visually celebrate access after completion.

## Motion Rules

- Odds change pulse: 200-250ms background flash.
- Route transitions: 180-220ms horizontal slide.
- Hover/press states: 150ms.
- No bouncing, floating, spinning decorative elements.
- Respect `prefers-reduced-motion`.

## Accessibility And Trust Rules

- All icon-only buttons need `aria-label`.
- Odds changes should be announced politely only for the focused game or selected watchlist, not every update globally.
- Do not rely on acid lime/red alone; add labels like “Best”, “Moved up”, “Moved down”, “Stale”.
- All tables need sortable headers with `aria-sort`.
- Keep focus visible with a 2px acid-lime ring.
- Gambling actions require clear confirmation, limits, and error recovery.

## Recommended Build Priority

1. Foundation: tokens, fonts, app shell, ticker, sport nav.
2. Flagship flow: Lobby → Odds Board → BetSlip.
3. Live odds behavior: polling, stale states, movement pulse, reduced motion.
4. Value Finder: transparent EV table and filters.
5. Tracker: auth-gated ledger, charts, export.
6. News/SEO pages after the core odds product feels excellent.

