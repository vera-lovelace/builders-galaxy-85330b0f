# Lovable updates

## Round 2 (2026-11-15): timer, Lenny's tips, What's next, voice mode

**What changed in the prototype:**
- 60-second timer with Pause, and no speed bonus.
- The new question bank, with Lenny's tips.
- A "What's next?" dialog after the leaderboard.
- Accessibility fixes.
- The round 1 consistency items, now built.

**Current Lovable status:** Voice and Cloud are deferred to the next profile; votes are disabled and no ElevenLabs voice mode exists. Prompts 3 (vote saving) and 4 below are future specifications, not completed features. The remaining visual changes have been applied.

**Supporting docs:** `PRODUCT.md`, `DESIGN.md` (new sections: Dialog, Lenny's tips, What's next, Accessibility) and `design/LOVABLE.md` are in sync.

### Screenshots to attach

All are in `design/screens/`, as `mobile-*` (390 px) and `desktop-*` (1440 px):

| File | Shows |
|---|---|
| `*-4-question` | 60-second orbit timer and Pause button |
| `*-4b-question-paused` | Paused state |
| `*-4c-question-feedback` | Feedback panel with the source line and the "Lenny's tips" button |
| `*-4d-lenny-tips` | Tips dialog |
| `*-5-results` | "n of 2" scores and a tips bulb on every planet row |
| `*-6-leaderboard` | Tie-break, 48 px back button, "What's next?" button |
| `*-7-whats-next` | Share, copy, download and feature-vote dialog |

Send the prompts one at a time. Each one is a separate change you can check on its own.

### Prompt 1: Timer, pause and scoring

> Change the question rules, using the attached screenshots `*-4-question` and `*-4b-question-paused`:
>
> **Timer and scoring**
> - 60 seconds per question. No speed bonus: a correct answer is 100 XP, a wrong answer or time-up is 0.
> - The orbit ring turns coral at 10 seconds or less (not 5).
> - Leaderboard ties go to the shorter run.
>
> **Pause button**
> - Keep the existing Pause button. Make it a native button at least 48 px, labelled "Pause" / "Resume" with an icon.
> - While paused, the timer chip shows a pause icon (and the word "Paused" on desktop).
> - Answering while paused resumes the timer.
> - Paused time is left out of the Time result.
>
> **Screen readers**
> - When a question loads, move focus to the question text (a heading with tabindex -1), so screen readers start there.
> - Announce, in one polite live region, only "10 seconds left", "Timer paused" and "Timer resumed". Never announce each second.
> - The seconds on the ring are read as "N seconds left" through visually hidden text, not aria-label.
>
> **Keyboard**
> - Keys 1–4 and A–D answer only while focus is inside the question area, never as page-wide shortcuts.
> - Show the hint "Press 1–4 or A–D to answer." from 640 px up.
>
> **Questions**
> - Use the new question bank: 2 questions per planet, at the player's picked level and the next one up (Pro gets Advanced and Professional).
> - Show the question's source under the explanation, as "Source: [title]" linking to its URL in a new tab, with visually hidden "(opens in a new tab)".

### Prompt 2: Lenny's tips

> Add Lenny's tips from lenny_tips_questions.json. Do not change the question flow or scoring. Match the screenshots `*-4c-question-feedback`, `*-4d-lenny-tips` and `*-5-results`.
>
> **Data**
> - Group tips by topicId; `go-to-market` is the GTM Strategy planet.
> - These items are never asked as questions.
>
> **Tip card**
> - The level label, using the game's names: Newbie, Beginner, Advanced, Pro.
> - The item's question in semibold, then the correct option (options[correctIndex]) under it.
> - The explanation inside a native `<details>` with the summary "Why it matters".
> - "Source: [sourceTitle]" linked to sourceUrl in a new tab, with visually hidden "(opens in a new tab)".
> - Do not show sourceAuthor.
> - Sort cards from Newbie to Pro.
>
> **Where the tips button appears** (a bulb icon, never before the player answers):
> 1. In the question's feedback panel, as a bordered button "Lenny's tips".
> 2. In each "Explore next" card on Results, as a 48 px icon button.
> 3. In each row of the planet-by-planet list on Results, as a 48 px icon button.
>
> **Button names**
> - Icon buttons are named "Lenny's tips for [planet]" in visually hidden text.
> - In the same list, replace the XP figure with "1 of 2" text plus visually hidden "correct". The coloured pills are no longer the only signal.
>
> **The popup**
> - A native `<dialog>` opened with showModal(), titled "Lenny's tips: [planet]".
> - Focus moves to the title on open.
> - Escape and a visible "Close" button close it and return focus to the button that opened it.
> - Content scrolls inside the dialog, up to 88% of the viewport height.
> - Works at 320 px width and 200% zoom. No animation.
>
> **Explore next intro**
> - If more planets tie for the lowest score than are shown, say "Three of your lowest-scoring planets" instead of "Your three lowest-scoring planets".

### Prompt 3: What's next? (after the leaderboard)

> On the leaderboard, after a finished run, add a primary (yellow) button "What's next?" with a compass icon. "Back to my results" becomes secondary. The button opens the same dialog pattern, titled "What's next?". Never open it automatically. Match the screenshots `*-6-leaderboard` and `*-7-whats-next`.
>
> **Section 1: "Take your results with you"**
> - Intro: "Your score, every question and its source. Made on this device, nothing is uploaded."
> - Secondary buttons:
>   - **Share:** only where navigator.share exists. Shares a one-line summary of score, level and the three planets to explore.
>   - **Copy results:** copies the Markdown.
>   - **Download (Markdown)**
>   - **Download (JSON)**
> - Build both files in the browser. Contents:
>   - score, XP, time, picked and assessed level, explore-next planets
>   - planet-by-planet results
>   - every question with: your answer, correct answer, result (Correct / Incorrect / Time's up), explanation and source
> - Show "Results copied." in a role="status" line.
>
> **Section 2: "What should we build next?"**
> - A `<fieldset>` whose `<legend>` reads "None of these exist yet. Pick any you would use."
> - Checkbox cards, each with a title and a hint:
>   - Build your own trivia
>   - PM job search tips
>   - Ask the sources
>   - Play live against the room
> - Add a hidden honeypot text field named "website".
> - A yellow "Send my vote" button saves `{ ideas: string[], created_at }` to a new Supabase table `feature_votes`:
>   - RLS: anonymous INSERT only, no SELECT, UPDATE or DELETE.
>   - No name, nickname or other personal data.
>   - Reject inserts where the honeypot is filled.
> - After sending, replace the form with the heading "Thanks, your vote is in" and move focus to it.

### Prompt 4: Voice mode check (ElevenLabs)

> Review the existing ElevenLabs voice mode against these rules and fix anything that doesn't match. List what you changed.
>
> **Starting and stopping**
> - Voice mode is opt-in through a visible button, "Start voice mode". It never starts on its own.
> - Before the microphone starts, one line says that audio is processed by ElevenLabs. Starting is the consent.
> - "Stop voice mode" and a "Mute microphone" toggle are always visible while it runs.
> - Leaving the question screen ends the session.
>
> **Screen reader**
> - Do not ask players to turn off their screen reader. While the agent is speaking, the app's own live-region announcements go quiet, so two voices never talk at once.
> - Status is shown as text in a role="status" line: Connecting, Listening, Speaking, Stopped.
> - Everything the agent says and hears appears in a visible transcript (role="log"), so deaf-blind players using braille, and anyone else, can follow.
>
> **Timer**
> - Voice mode is untimed: the timer pauses when voice mode starts and stays paused.
>
> **What the agent knows** (app state, never the agent, decides correctness)
> - Send a contextual update for each question with: planet name, "Question N of 2", the question, and options A–D.
> - Never send correctIndex or the explanation before the answer.
>
> **Client tools** (each waits for the app's reply)
> - `selectOption({ index })` returns `{ result: "correct" | "incorrect", correctOption, explanation, xp }`. The agent then reads the result and the explanation.
> - `nextQuestion()`
> - `repeatQuestion()` returns the question and options again.
> - `getStatus()` returns XP, score so far, the current planet and its stop number.
> - `openTips()` reads the planet's first three tips aloud, only after an answer.
>
> **Keys and sounds**
> - No page-wide single-key shortcuts such as Space or R. They clash with screen readers and typing. Use on-screen buttons. Keys 1–4 and A–D still answer while focus is in the question.
> - Optional sounds (listening chime, correct and wrong tones) always come with text, and can be turned off.
>
> **Agent behaviour**
> - The agent says XP as 100 per correct answer.
> - It uses the real planet names.
> - It accepts "A", the letter name, or the option's words.

### Prompt 5: Consistency, from round 1 (skip if already done)

> - Make the back buttons on Onboarding and Leaderboard 48 px.
> - Make the rocket flight 1.5 s, and set the `--duration-flight` token to 1500 ms.
> - Make the podium gradient tokens: `--podium-top: 210 45% 42%`, `--podium-bottom: 210 45% 30%`.
> - Use the 1.5rem panel radius on the leaderboard panels.

### Content to fix before release

- **Tip explanations:** 16 of the 93 refer to answer options the tip card doesn't show (for example "the first distractor"). Reword them to stand alone, or show all four options in those cards.
- **Sources:** 14 of the 48 questions have no source. Their feedback panel shows no source line, which is fine, but decide whether that's intended.
- **Landing page:** the older Welcome screen said "about 5 minutes"; the current game says "up to 24 minutes of answering". 24 questions at up to 60 seconds each no longer fit that. You plan to rewrite this with the landing page and voyage description at the end.
- **Accuracy:** the agent's spoken explanations and any AI-written text need a human check before release.

### Still open

- **Which questions players get:** two per planet, at the picked level and the next one up, is a placeholder. Confirm it, or tell Lovable your rule.
- **Assessed level and recommendations:** both rules are still placeholders.
- **Testing with people:** the build needs a session with screen reader users (VoiceOver on iPhone, NVDA on Windows) and a keyboard-only pass. No automated check replaces that.
- **Old screenshots:** onboarding error states and the rocket flight still have no current screenshots, and `design/overview-*.png` is out of date.

---

## Round 1 (2026-11-12): fixes from the Impeccable design review

The coded prototype went through an Impeccable finish review (first verdict: fix; final verdict: ship). Its consistency items are now built in the prototype; see Prompt 5 above.

> Update Builder's Galaxy to match the new screenshots and these design rules. Progress is a voyage, not a quiz form: never use a generic percentage or progress bar.
>
> 1. **Welcome:** show all 12 planets along a dashed orbit above Earth, with a gap in the orbit where the rocket sits. The orbit runs off both screen edges. On phones, put the Play button in the lower half of the screen, within thumb reach.
> 2. **Question:** replace the timer bar with an orbit ring around a large version of the current planet. Show the seconds on the ring. On laptops, put the planet on the left and the question on the right. Under the header, show a 12-dot route strip with a rocket over the current planet.
> 3. **Results:** label each of the 12 planets around the score ring with its score, and make the centre ring smaller. Add an always-visible "Your skill map" list that names every planet and its result.
> 4. **Galaxy map:**
>    - The route is a thin dashed line (`4 8`), and the part already travelled is solid sky blue.
>    - Keep planet names clear of planet rings and of the current planet's halo. A ringed planet needs a slot about 2.2× its diameter.
>    - On laptops, space the planets closer together.
>    - Add the 12-dot route strip to the bottom mission bar.
>    - The starfield is static, with no parallax or drifting stars.
> 5. **Contrast:** set locked planets' names in the full muted-foreground colour, which meets 4.5:1. Do not fade them.
> 6. **Leaderboard:** make the player list panel opaque, so Earth's clouds don't show through it. Move the rank badge on each helmet so it doesn't cover the player's initial.
>
> Rules to keep:
> - One yellow (primary) action per screen.
> - Saturated colour belongs to the planets and the signal colours: sky = position/time, mint = correct, coral = wrong/time up.
> - Correct and wrong feedback always has an icon and a text label.
> - Touch targets are at least 48 px.
> - Respect prefers-reduced-motion.
