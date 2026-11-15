# AGENTS.md

Guidance for AI coding agents (Lovable, Claude Code, others) working on Builder's Galaxy.

## What this is

A single-player, space-themed product-management trivia game played during live SheBuilds workshops. A rocket flies through 12 planets, one PM discipline each. Players answer 2 questions per planet, with 4 options each. Afterwards they see their results, Lenny's tips and a leaderboard of sample players, then a "What's next?" dialog.

## Read before changing anything

1. `PRODUCT.md`: users, purpose, decided rules, scope and the accessibility commitments.
2. `DESIGN.md`: the design system. Follow its named rules (One Nova, Route Recurs, Ring Slot, Still Sky) and its Accessibility section.
3. `design/LOVABLE.md`: screens, tokens, components, data and rules. The reference screenshots are in `design/screens/`.
4. `design/LOVABLE-UPDATE.md`: the change requests for each handoff round.

## Rules that are easy to break

- **Stack:** React, Vite, TypeScript and Tailwind. Colours come only from the tokens in `src/styles/tokens.css`. Planet hues live in `src/data/planets.ts`.
- **Content:** each content file has exactly one adapter: `src/data/questionBank.ts` and `src/data/lennyTips.ts`. Adapt to the JSON; never invent a schema. Tips are never asked as questions.
- **Rules:**
  - Game rules live only in `src/game/rules.ts`.
  - Timer: 60 seconds with Pause, and no speed bonus (100 XP per correct answer).
  - These are still placeholders and are labelled in the file: which questions a player gets, the assessed level and the recommendations.
- **Answer checking:** the app decides whether an answer is correct. The voice agent never receives the correct option before the player answers.
- **Accessibility (WCAG 2.2 AA):**
  - Touch targets are at least 48 px.
  - Feedback never relies on colour alone.
  - Respect reduced motion.
  - Use native elements: `<button>`, `<dialog>`, `<details>`, `<fieldset>`.
  - Name icon-only buttons with visually hidden text, not `aria-label`.
  - Single-key shortcuts work only while focus is in the question.
  - Never open a dialog unless the player asked for it.
  - Voice mode is opt-in and untimed, and it shows everything it says as text.
- **Licences:** code is MIT, and the content wording in `src/data/` is CC BY-NC 4.0. Don't copy source text into the content. `/about` lists sources generated from the data files, so it never needs hand edits.
- **Placeholder data:** sample leaderboard players must read as placeholders. No fabricated names, stats or testimonials.
- **Out of scope:** login, payments, multiplayer, multiple languages, and the voted-on ideas.

## Checks

- Run `npm run typecheck`, then `npm run build`. There is no test runner.
- Check UI changes at 390 px and 1440 px, with reduced motion turned on.
