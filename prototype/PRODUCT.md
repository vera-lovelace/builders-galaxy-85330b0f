# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite + TypeScript + Tailwind CSS (+ shadcn/ui where it fits), chosen by the user so the prototype hands off cleanly to Lovable, which builds on the same stack. This repo holds the coded prototype and design system; Lovable builds the production app from it.

## Users

Participants in a live product-management workshop (SheBuilds), with PM experience ranging from newcomer to professional (self-selected as Newbie, Beginner, Advanced, Pro). They play on phones and laptops in roughly equal measure, in the same room. The game is single-player for now; the leaderboard compares each player with sample players. Players include blind and low-vision people using screen readers (VoiceOver, NVDA) and people who prefer voice.

## Product Purpose

Builder's Galaxy is a short PM trivia game. A rocket travels through 12 planets, each a PM discipline; players answer timed multiple-choice questions and finish with XP, a score, an assessed PM level, a per-topic skill map, three recommended learning areas with Lenny's tips, and a way to take their results with them. Success: players finish the voyage, learn where their gaps are, and vote on what to build next.

## Positioning

A short, workshop-native learning game: one session, one room code, one leaderboard, and a personal skill map across the 12 disciplines of building a product, from problem framing to pitch.

## Operating Context

- Played during a facilitated workshop; a facilitator shares a room code and players join with a nickname.
- Six screens: Welcome, Onboarding (nickname + experience level), Galaxy map, Question, Results, Leaderboard.
- The 12 planets, in order: Problem Framing, User Discovery, Product Promise, Prototype Testing, MVP Specification, Build Planning, Business Model, GTM Strategy, Metrics & Adoption, Demo & Prioritization, Commercial Case, Pitch Build.
- Two questions per planet (24 a run), four answer options each, a 60-second timer with pause, and immediate correct/incorrect feedback with an explanation and its source.
- After the leaderboard, a "What's next?" dialog offers share, copy and download (Markdown, JSON), plus a vote on features that are not built yet.

## Capabilities and Constraints

- Question bank: `src/data/questions.json` (48 questions, one per level for each of the 12 topics). Lenny's tips: `src/data/lenny-tips.json` (93 entries, never asked as questions). Each has one adapter; the data layer adapts to the files, never the other way round.
- Decided (2026-11-15): 60-second timer with pause; no speed bonus; 100 XP per correct answer; leaderboard ties go to the shorter run, paused time excluded.
- Still placeholder: which two questions a player gets per planet (now: their picked level and the next one up), the assessed-level thresholds and the recommendation rule.
- Single-player. The leaderboard shows labelled sample players; live rooms and multiplayer need a backend and are a later phase.
- Feature votes are stored in an insert-only table in Lovable (no reads for anonymous users, no personal data). The prototype keeps them in the browser.
- Voice mode uses an ElevenLabs agent, built in Lovable.
- Open source: code under MIT (`LICENSE`), content wording under CC BY-NC 4.0 (`src/data/LICENSE.md`); third-party sources keep their rights. An About page (`/about`), reached only from an About link, explains the licences, sources, accessibility and privacy.
- Out of scope for this beta: login, payment, multiplayer, multiple languages, AI-generated content, and the voted ideas (build your own trivia, job search tips, chat with the sources).
- Must stay realistic to implement in Lovable: reusable components and design tokens.

## Brand Commitments

- Name: Builder's Galaxy.
- Binding visual constraints from the brief: space-exploration theme; deep navy and indigo backgrounds; luminous planets; restrained gradients; bright, accessible accent colours; friendly, legible typography; large touch-friendly controls; delightful but restrained motion.
- Tone: friendly and rewarding (in the spirit of Duolingo) while professional enough for a workshop.

## Evidence on Hand

The question bank and Lenny's tips are sourced from Lenny's Newsletter and Podcast (public starter pack) and the Pragmatic Framework guide; 34 of 48 questions carry a source link. No player data or brand assets. Do not fabricate testimonials, stats, or real player names; sample leaderboard entries must read as obvious placeholders.

## Product Principles

1. No friction: from Play to first question in seconds; nothing blocks the run, and no one is rushed.
2. Learning over winning: feedback and the results skill map must teach, not just score.
3. Equal on phone and laptop: every screen works fully at either size.
4. Content-driven: the game adapts to the question bank; the design never assumes final content.
5. Hand-off ready: everything built here must be reproducible in Lovable.

## Accessibility & Inclusion

Involve disabled players from the start: test each release with screen reader users (VoiceOver and NVDA) and keyboard-only players, not only automated checks.

- WCAG 2.2 AA: AA contrast, 48px touch targets, reduced motion respected, feedback never by colour alone.
- Time limits can be paused, and voice mode is untimed (WCAG 2.2.1).
- Native HTML first: buttons, fieldsets, `<dialog>`, `<details>`. Single-key shortcuts only work while focus is in the question (WCAG 2.1.4).
- The screen reader is the primary way blind players play; voice mode is a second way, never a replacement, and never starts on its own.
- Everything spoken is also on screen as text. AI output (voice agent, any generated text) is reviewed before release.
- Privacy: no personal data in exports or votes; voice mode asks for consent before the microphone starts.
