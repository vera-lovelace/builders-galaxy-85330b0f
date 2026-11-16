---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

Scope: the whole game app (Welcome, Onboarding, Galaxy, Question, Results, Leaderboard). Mode: Operate (Welcome leans Persuade but shares the shell). Code-led.

Audience & job: workshop players on phones and laptops; finish a ~5-minute run, learn their gaps, compare with the room.
Constraints: brief-pinned world (no concept roll); question content from an external JSON (adapter in src/data); sample content only; Lovable-compatible stack.
Unresolved: question count per planet, timer length, XP/level/recommendation rules (placeholders in src/game/rules.ts).

## Direction contract

THESIS: A run is a voyage, not a quiz form. Progress is shown as distance travelled along one route through 12 named planets, never as a generic percentage bar. Refuses the default trivia layout of a progress bar, a card and four pills on a grey field.

OWN-WORLD: Deep navy ground (#0A0F24 range) lifted to indigo surfaces; 12 luminous planets, each with its own hue; nova-yellow primary action; signal mint (correct), coral (wrong), sky (info/timer). Bricolage Grotesque headings, Figtree body. Rounded-but-firm controls, offset soft shadows, a quiet static starfield.

STORY: Players see the whole galaxy, know their place on the route, answer quickly with clear feedback, then read a personal skill map and three places to study next, and see the room ranking.

FIRST VIEWPORT: Welcome: the name set large, one-line promise, the Play button within thumb reach, and a strip of planets along an orbit line. Galaxy: the route map fills the screen with the rocket parked at the current planet and a launch bar pinned at the bottom.

FORM: Brief-pinned space-exploration world, list position n/a. Signature move: the rocket flies along the dashed route to the next planet after each completed planet; the same route recurs as the question progress strip. seed: none (roll skipped: the brief pins the visual world; confirmed by the user 2026-11-12)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
