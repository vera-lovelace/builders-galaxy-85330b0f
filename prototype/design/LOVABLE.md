# Builder's Galaxy — handoff for Lovable

A single-player, space-themed product-management trivia game played during live workshops. A rocket flies from Earth through 12 planets (one PM discipline each); players answer timed multiple-choice questions, then see their results and a room leaderboard.

The working prototype lives in this repo (`src/`), in the stack Lovable uses: React + Vite + TypeScript + Tailwind. Treat it as the source of truth for layout, behaviour and tokens.

## Screens

Each screen has a phone (390 px) and laptop (1440 px) capture in `design/screens/`, named `mobile-*` and `desktop-*`. Older overview composites are in `archive/` and predate the design review.

| # | Screen | Route | Files | Code |
|---|---|---|---|---|
| 1 | Welcome | `/` | `*-1-welcome.png` | `src/screens/Welcome.tsx` |
| 2 | Onboarding (3 steps: nickname, experience, astronaut reveal) | `/join` | `*-2-onboarding.png` | `src/screens/Onboarding.tsx` |
| 3 | Galaxy voyage | `/galaxy` | `*-3-galaxy.png` | `src/screens/Galaxy.tsx` |
| 4 | Question: unanswered, paused, after answering, Lenny's tips dialog | `/play` | `*-4-question.png`, `*-4b-question-paused.png`, `*-4c-question-feedback.png`, `*-4d-lenny-tips.png` | `src/screens/Question.tsx` |
| 5 | Results | `/results` | `*-5-results.png` | `src/screens/Results.tsx` |
| 6 | Leaderboard | `/leaderboard` | `*-6-leaderboard.png` | `src/screens/Leaderboard.tsx` |
| 7 | What's next? dialog (from the leaderboard) | `/leaderboard` | `*-7-whats-next.png` | `src/components/NextSteps.tsx` |
| 8 | About: open source, content sources, accessibility, privacy | `/about` | `*-8-about.png` | `src/screens/About.tsx` |

## Paste-ready prompt

> Build "Builder's Galaxy", a five-minute PM trivia game, matching the attached screenshots (phone and desktop) and the design tokens below. React + Tailwind + TypeScript, react-router routes `/`, `/join`, `/galaxy`, `/play`, `/results`, `/leaderboard`. Dark near-black navy space with Earth seen from orbit at the bottom of Welcome, Galaxy and Leaderboard; on Welcome the 12 planets wait along a dashed orbit above Earth, parted where the rocket sits. Players are cartoon astronauts whose visor is tinted with a colour derived from their nickname and shows their initial. The Galaxy screen is a vertical voyage: the rocket starts above Earth and flies along a thin dashed curved path through 12 planets (bottom to top); the camera follows the rocket during flight. Questions come from a JSON file (schema below), 2 per planet, 4 options each, a 60-second countdown with a Pause button, drawn as an orbit ring around the enlarged current planet (planet on the left, question on the right on desktop), instant correct/incorrect feedback with an explanation, its source and a "Lenny's tips" button. Results show XP, score, time, assessed level, a "skill orbit" (overall % in the centre, 12 planets around it sized by score, each labelled with its score), a labelled skill map listing every planet's result, and the three lowest-scoring planets, each with a Lenny's tips button. Leaderboard (single player against labelled sample players): top-3 podium with full-body astronauts, a "Your rank is N" row, then the rest as rows with a rank badge on each helmet, and a "What's next?" button that opens a dialog to share, copy or download results and vote on future features. No login, payments or multiplayer. Respect prefers-reduced-motion. All touch targets at least 48 px.

## Design tokens

Colours are HSL triplets used as `hsl(var(--token))` (shadcn convention). Source: `src/styles/tokens.css`.

| Token | Value | Use |
|---|---|---|
| `--background` | `232 50% 5%` | page (near-black navy) |
| `--foreground` | `225 60% 96%` | text |
| `--surface` | `232 38% 10%` | bars, cards |
| `--surface-raised` | `232 34% 15%` | secondary buttons |
| `--border` | `230 26% 24%` | borders |
| `--muted` | `230 28% 18%` | tracks, badges |
| `--muted-foreground` | `228 32% 76%` | secondary text |
| `--primary` | `45 100% 60%` | the one main action per screen (nova yellow) |
| `--primary-foreground` | `232 60% 10%` | text on primary |
| `--info` | `195 90% 64%` | timer, travelled route |
| `--success` | `158 68% 52%` | correct |
| `--danger` | `8 92% 68%` | wrong / time up |

- Radius: `0.625rem` / `1rem` / `1.5rem`.
- Fonts (self-hosted via `@fontsource-variable`): **Bricolage Grotesque** for headings, numbers and buttons; **Figtree** for body text.
- Planet colours are per-planet hues in `src/data/planets.ts`, not tokens.
- Feedback never relies on colour alone: every state also has an icon and a text label.

## Components

All in `src/components/`.

| Component | What it is |
|---|---|
| `Button` | primary / secondary / ghost, heights 48 and 56 px |
| `AboutLink` | ghost-styled link to `/about` (Welcome header, Results) |
| `Dialog` | native `<dialog>` modal: title, Close button, scrolling content; focus to title on open, back to the opener on close |
| `LennyTipsButton` | bulb button (text or 48 px icon) that opens a planet's tips in a `Dialog` |
| `NextStepsDialog` | "What's next?": share / copy / download results and the feature vote |
| `Planet` | shaded sphere with an atmosphere rim and an optional ring; states: locked (desaturated), current (dashed orbit), done |
| `Rocket` | SVG rocket with an optional engine flame; optional colour |
| `PlayerAvatar` | astronaut helmet, or full body (`full`, `cheer`), coloured from the nickname |
| `Scenery` → `Earth` | Earth limb seen from orbit, with clouds and atmosphere |
| `AnswerOption` | A–D answer; states: idle, correct, wrong, correct-answer reveal, dim |
| `RouteProgress` | 12-dot route strip with a rocket marker (Question screen) |
| `OrbitTimer` | countdown drawn as an orbit ring around the current planet, with the seconds on the ring; turns coral at 10 seconds or less; paused state |
| `XpReward` / `XpTotal` | "+130 XP" chip; running total |
| `SkillMeter` | planet-by-planet score row |
| `RankRow` | leaderboard row with a rank badge on the helmet |
| `Shell` | page frame with the brand mark |

## The signature motion (Galaxy)

1. Returning from a finished planet, a yellow flag plants on it (about 0.5 s).
2. The rocket lifts off and flies a curved path to the next planet in 1.5 s with ease-in-out. It turns to face its direction of travel, and a white exhaust trail draws the path behind it. The page scrolls so the rocket stays centred.
3. On landing, the next planet goes from greyed-out to full colour, gains a slowly rotating dashed orbit, and its name enlarges.
4. Tapping a planet: the current one starts its questions; a finished one shows "x of y correct · XP" in the bottom bar; a locked one shakes and says what unlocks it.
5. With reduced motion, the rocket appears at its destination and the planet's colour change still plays.

## Data

Two content files, each read by one adapter:

- `src/data/questions.json` → `src/data/questionBank.ts`. 48 questions: one per level (newbie, beginner, advanced, professional) for each of the 12 topics. Fields: `id`, `topicId`, `domain`, `level`, `question`, `options` (4), `correctIndex`, `explanation`, `sourceAuthor`, `sourceTitle`, `sourceUrl` (missing on 14).
- `src/data/lenny-tips.json` → `src/data/lennyTips.ts`. 93 entries, same fields. They are never asked as questions; a tip shows the question, the correct option, the explanation under "Why it matters", and the source. `sourceAuthor` is not shown.
- `topicId` `go-to-market` maps to the planet `gtm-strategy` (`planetForTopic` in `src/data/planets.ts`).

The app's internal question shape:

```ts
interface Question {
  id: string;
  planetId: PlanetId;
  level: "newbie" | "beginner" | "advanced" | "professional";
  prompt: string;
  options: [string, string, string, string];
  answerIndex: number;  // 0–3
  explanation?: string;
  source?: { title: string; url: string };
}
```

Results export (`src/game/exportResults.ts`) is built in the browser: Markdown and JSON with the score, level, planets and every question (your answer, correct answer, result, explanation, source).

## Rules

In `src/game/rules.ts`:

- **Decided:** 60 seconds per question with pause; no speed bonus, so 100 XP per correct answer; paused time is left out of the Time result; leaderboard ties go to the shorter run.
- **Still placeholders:**
  - 2 questions per planet: the player's picked level and the next one up.
  - Assessed level from accuracy: 85% or more is Pro, 65% Advanced, 40% Beginner, otherwise Newbie.
  - Recommendations are the three lowest-scoring planets.
- **Leaderboard:** sample players are labelled "(sample)", and the room code defaults to `DEMO-42`. The game is single-player; multiplayer needs a backend.
- **Votes:** in Lovable, an insert-only Supabase table with no reads for anonymous users and no personal data. The prototype keeps them in sessionStorage.
- **Run state:** saved in sessionStorage only.
