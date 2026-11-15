# Builder's Galaxy — portable project handover

Saved 15 November 2026 at the user's request for a move to another profile.
This file travels with the project source; profile-to-profile memory transfer is not assumed.

## Start here in the new profile

1. Read this file, `DESIGN.md`, `AGENTS.md`, and `roadmap.md` before changing anything.
2. Preserve the working prototype and supplied visual direction; work in small, verifiable steps.
3. Keep Lovable Cloud disabled. Do not reconnect services or build voting/voice without a fresh request.
4. Confirm what files and original uploads are available after transfer. Do not assume credentials, connections, credits, published-domain ownership, browser sessions, or chat history transfer.
5. Run the existing tests for any rules changed; verify the central user flow in the browser. Do not claim actual NVDA or voice verification without performing it.

## Purpose and boundaries

Builder's Galaxy is a workshop trivia game spanning 12 product-building planets. Six core screens are implemented: Welcome, Onboarding, Galaxy, Question, Results, Leaderboard. Keep it a usable experience, not a new marketing site.

Phase 1 uses local/mock data only. No authentication, backend, GitHub connection, MCP connection, external archives or paid services unless explicitly requested anew. Do not generate questions or introduce unnecessary dependencies, extra pages or elaborate animations.

The user initially requested Cloud, then explicitly reversed that instruction. Cloud must remain disabled, including for votes. ElevenLabs was requested later, but connecting it was declined and work postponed. Neither service is connected in this prototype.

## Visual authority and supplied assets

- Original `LOVABLE.md` and six desktop plus six 390px mobile screenshots are the visual source of truth. Later design-fix notes and numbered Prompts 1–5 refine them.
- Navy space background, nova-yellow primary controls, Bricolage Grotesque display font and Figtree body font, distinctive planet colours.
- Original prototype source was not supplied; the implementation was reconstructed from screenshots and the handoff. Initial onboarding steps 1–2 were inferred in the same style. Planet colours were initially matched visually.
- Avoid heavy animation; preserve reduced-motion support. Rocket flight is 1.5 seconds via `--duration-flight: 1500ms`.
- Podium gradient has named top/bottom tokens (requested HSL values 210 45% 42% and 210 45% 30%). Leaderboard panels use the 1.5rem panel radius; back controls on Onboarding and Leaderboard are 48px.
- Original attached screenshots may not be part of a source transfer. Reattach missing designs before attempting exact visual comparisons.

## Rules — current, superseding earlier versions

- 60 seconds per question. Earlier 15s and 30s rules are obsolete.
- Correct answer: 100 XP. Wrong answer or timeout: 0 XP. No speed bonus. Maximum: 2,400 XP over 24 questions.
- Pause/Resume retains the manual pause control. Answering while paused resumes. Paused time does not count toward the Results Time.
- Orbit timer turns coral at 10 seconds or less, not 5.
- Equal leaderboard XP is ordered by shorter active answering time; the leaderboard remains mock, not shared multiplayer.
- Two questions per planet, 24 total: one at the selected level and one at the next level. Newbie → newbie/beginner; Beginner → beginner/advanced; Advanced and Pro → advanced/professional. The user described this selection rule as a placeholder.
- Display levels: Newbie, Beginner, Advanced, Pro. Assessed level thresholds: ≥85% Pro, ≥65% Advanced, ≥40% Beginner, otherwise Newbie.
- Explore-next recommendations select three lowest accuracy planets; ties keep voyage order. When more planets tie for minimum than fit, intro reads 'Three of your lowest-scoring planets'.

## Content

### Playable questions

The supplied `baseline_questions.json` replaced the original easy/medium/hard bank. Its 48 entries are now `src/data/questions.json`; read them only through `src/data/questionBank.ts`. Fields include level, sourceTitle and sourceUrl. Never mix tips into run plans or make up missing questions/sources.

Feedback shows explanation and available source title/link, with a visually hidden '(opens in a new tab)' when linked. Fourteen of the 48 questions were reported without sources; omission is preserved, and the user still needs to decide whether this is intended before release.

### Lenny's tips

93 supplied tips are in `src/data/lenny_tips_questions.json`, grouped by topic through `src/data/tips.ts`. They never become playable questions. `go-to-market` means GTM Strategy. Cards sort Newbie → Beginner → Advanced → Pro, show the question, correct option and all four options, explanation inside native details titled 'Why it matters', and source title/link without sourceAuthor.

All four options were included because 16 explanations refer to distractors. Do not remove that context without rewriting and reviewing the affected explanations.

Bulb controls appear in post-answer feedback, each Explore-next card and each skill-map row, never before answering. Icon names are 'Lenny's tips for [planet]'. Dialog title is 'Lenny's tips: [planet]'. Results scores use '1 of 2' text with hidden 'correct', not colour alone.

### Voyage order

Problem Framing; User Discovery; Product Promise; Prototype Testing; MVP Specification; Build Planning; Business Model; GTM Strategy; Metrics & Adoption; Demo Prioritization; Commercial Case; Pitch Build.

## Accessibility contracts

- Question heading receives focus on load and has tabindex -1.
- One polite timer live region announces only '10 seconds left', 'Timer paused', 'Timer resumed'. Ring seconds have visually hidden 'N seconds left', not an aria-label that announces every tick.
- Answer keys 1–4 and A–D work only while focus is inside the question area, not page-wide. Hint appears from 640px upwards.
- Pause/Resume is a native button with icon, at least 48px. Paused timer shows pause icon and desktop 'Paused'.
- Shared native dialogs open using showModal, focus title, support Escape and visible Close, restore opener focus and scroll internally up to 88% viewport height. No dialog animation. Preserve 320px/200% zoom usability.
- Actual NVDA behaviour still requires human review; browser accessibility checks are not NVDA certification.

## What's next and export privacy

After a finished run, the leaderboard has a yellow compass 'What's next?' button and secondary 'Back to my results'. The dialog never opens automatically.

On-device exports provide score, XP, active time, picked/assessed level, three explore-next planets, planet-by-planet results and all questions with player's answer, correct answer, outcome, explanation and source. No player identity is included. Controls: Share only where navigator.share exists; Copy Markdown with 'Results copied.' status; Download Markdown and JSON. Nothing is uploaded.

The four not-built ideas are Build your own trivia, PM job search tips, Ask the sources, Play live against the room. Checkbox choices and a hidden website honeypot are displayed, but 'Send my vote' is disabled and explicitly says nothing is submitted.

Future voting requirements, only after a new Cloud approval: `feature_votes` stores `{ ideas: string[], created_at }`, no personal data; anonymous INSERT only with no public SELECT, UPDATE or DELETE; reject a filled honeypot. No table or submission service currently exists.

## Voice — requested but not implemented

The user wants (1) an ElevenLabs narrator button for all players, followed by (2) a full interactive eyes-free agent for blind users. They plan NVDA-compatible HTML changes too.

Feature 1 was requested first, but the ElevenLabs connection approval was declined and the user said 'continue later'. No voice code was added. The existing shared ElevenLabs connection was inaccessible to the project owner. Do not treat it as usable; do not substitute browser narration without permission.

When resumed: narrator reads question/options and post-answer feedback on explicit button activation, offers stop/cancel, requires no microphone, pauses active time during audio and preserves a pre-existing manual pause. Coordinate with screen readers without unsolicited competing speech or hiding essential controls. Interactive agent tools discussed included answering, repeating questions/options, remaining time, next, pause/resume; these are proposals, not implemented contracts. No agent ID, voice choice or persona configuration has been confirmed. Human-check all spoken/AI-written explanations.

Earlier chat estimates of build credits, TTS costs, SDK methods and model availability were not verified pricing/implementation commitments; check current documentation when resuming. Never paste or store private credentials in chat or source.

## Technical continuation map

- TanStack Start v1, React 19, Vite 7, Tailwind v4. Keep the existing routing framework.
- Routes: `/` (`index.tsx`), `/join`, `/galaxy`, `/play`, `/results`, `/leaderboard` in `src/routes/`. Root layout is `__root.tsx`; route metadata uses `src/lib/meta.ts`.
- Game rules: `src/game/rules.ts`; run planning and summaries: `run.ts`; sessionStorage adapter and hook: `runStore.ts`; mock room leaderboard: `leaderboard.ts`.
- Active answering time and keyboard mapping: `src/game/clock.ts`. Screens use QuestionClock pause/resume; no direct storage access.
- Questions: `src/data/questionBank.ts` over `questions.json`; tips: `src/data/tips.ts` over the separate tip JSON; planet definitions/hues: `src/data/planets.ts`.
- Reusable UI: Button, Shell, Planet, Rocket, PlayerAvatar, Earth, game.tsx (including OrbitTimer), Source, Modal, LennyTips, WhatsNext in `src/components/`.
- Browser-only result building/downloads: `src/game/exportResults.ts`.
- Global tokens/utilities: `src/styles.css`; planet hues deliberately live in planet data instead of theme tokens. Other colours should use semantic tokens.
- Do not edit generated routeTree files. Read and respect `AGENTS.md` for architecture rules. Do not restore older speed-bonus rules or mix old/new question schemas.

## Last completed verification and remaining work

Previous implementation turn reported all Vitest tests passing, including rule boundaries, level selection, active-time pauses, key mapping, export completeness and tip separation. A 24-question browser run scored 2,400 XP and verified keyboard answers, heading focus, timer pause, dialog focus restoration, Results, JSON/Markdown downloads; no console errors were reported. Question/dialog checks at 320px and dialog checks at 200% zoom reported no horizontal overflow. These are prior checks, not new tests performed while writing this handover.

Latest implementation commit before this handover: 'Update trivia rules, accessible tips and private results exports'. See Git history for its identifier.

Open items:
- Feature voting blocked by the deliberate Cloud-disabled decision.
- Narrator and interactive voice blocked by postponed ElevenLabs setup.
- Human NVDA, missing-source/content and spoken explanation accuracy review before release.
- Remaining non-service design updates were implemented after the handover: Welcome orbit, dashed Galaxy route and mission strip, laptop spacing, ring clearance, desktop Question split, timer chip, visible orbit scores, segmented skill scores, dialog/tip styling, focus outlines and post-answer focus/live feedback. Voice and Cloud are explicitly left for the next profile, without permission to connect automatically.
- Reverification: 18 tests passed and a full 24-answer browser run confirmed focus on the next action after every answer with no runtime errors. Human screen-reader verification remains pending.
- Welcome duration now says '12 planets · 24 questions · up to 24 minutes of answering'; earlier 'about 5 minutes' is obsolete. Final landing/voyage wording can still be reviewed with the user.

Project URLs at handover: published/primary `https://builders-galaxy.lovable.app`; preview `https://id-preview--eb1b10bb-8e9d-4ce1-8b3f-deb21bf5fa55.lovable.app`. Their availability/ownership after transfer is unverified. Saving code does not publish it.

## Suggested opening instruction after transfer

> Continue Builder's Galaxy from PROJECT_HANDOVER.md, AGENTS.md and roadmap.md. Preserve the supplied designs and current rules. Keep Cloud and ElevenLabs disconnected unless I explicitly resume them. Review existing work before editing; do not rebuild working parts.