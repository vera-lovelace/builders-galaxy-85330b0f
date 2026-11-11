# Builder's Galaxy MVP — Plan

## What I reviewed
- LOVABLE.md handoff (screens, tokens, components, rules, data shape)
- Six desktop designs: Welcome, Onboarding, Galaxy, Question, Results, Leaderboard
- questions.json: 48 questions, 12 topics x 4, easy/medium/hard, with explanation and source fields
- Project: fresh template, nothing built yet, so nothing to preserve

## Missing assets / gaps
1. **Prototype source code (`src/screens`, `src/components`, `tokens.css`, `planets.ts`)** is referenced as the source of truth but was not attached. I will rebuild from the screenshots and the tokens table.
2. **Phone (390px) designs and overview images** were not attached. I will derive mobile layouts from desktop + handoff rules (48px touch targets).
3. **Planet list/colours (`planets.ts`)**: I will use the 12 topicIds from questions.json in their file order, with names (e.g. "Build Planning", "MVP Specification") and hues matched to the screenshots.
4. **Question count per planet**: designs show 2 per planet (24 total, ~5 min); the bank has 4. Default: pick 2 per planet per run (random), keeping the 15s timer.
5. **Onboarding steps 1–2** (nickname, experience) only exist as described; step 3 is shown. I'll build steps 1–2 in the same style.
6. Fonts: Bricolage Grotesque + Figtree via Google Fonts link (no new packages).

## Build steps (small, verifiable)
1. **Foundation**: design tokens in styles.css (navy/nova yellow/info/success/danger, radii, fonts), starry background, page shell with brand mark, head metadata per route.
2. **Data + game logic (modular, no UI)**: `planets` list, `questionBank` adapter (maps questions.json -> internal Question), `rules` (15s, 100 XP + up to 50 speed bonus, level thresholds 85/65/40, three weakest planets), `runStore` (sessionStorage, behind an interface so persistent storage can be swapped later), `leaderboard` provider (mock sample players + you, room code `DEMO-42` or `?room=`), and small tests for the rules.
3. **Shared components (SVG/CSS)**: Button, Planet (locked/current/done, ring), Rocket, PlayerAvatar (helmet/full, nickname-derived visor colour + initial), Earth, AnswerOption, RouteProgress, TimerBar, XpTotal, RankRow.
4. **Screens / routes**: `/` Welcome, `/join` Onboarding (3 steps), `/galaxy` vertical voyage with curved path, rocket on current planet, bottom bar with Start, `/play` Question with timer + instant feedback + explanation, `/results` stats + skill orbit + Explore next + collapsible planet-by-planet, `/leaderboard` podium, "Your rank is N", rows.
5. **Motion (kept simple)**: rocket flight along path with CSS transition + auto-scroll, flag plant, dashed orbit rotate, locked-planet shake; all disabled under prefers-reduced-motion.
6. **Verify**: screenshot each screen at 1440 and 390 widths and play one full run.

## Out of scope
No auth, database, backend, AI, external sources, extra pages, or new dependencies.

## Technical notes
- TanStack Router file routes: index, join, galaxy, play, results, leaderboard; guards redirect to `/join` if no player.
- Run state shape is plain JSON so a backend adapter can replace sessionStorage/mock leaderboard later.
