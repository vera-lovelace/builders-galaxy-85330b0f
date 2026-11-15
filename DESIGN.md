---
name: Builder's Galaxy
description: A single-player product-management voyage through 12 luminous planets, played during a live workshop.
colors:
  background: "hsl(232 50% 5%)"
  foreground: "hsl(225 60% 96%)"
  surface: "hsl(232 38% 10%)"
  surface-raised: "hsl(232 34% 15%)"
  border: "hsl(230 26% 24%)"
  muted: "hsl(230 28% 18%)"
  muted-foreground: "hsl(228 32% 76%)"
  primary: "hsl(45 100% 60%)"
  primary-foreground: "hsl(232 60% 10%)"
  info: "hsl(195 90% 64%)"
  success: "hsl(158 68% 52%)"
  danger: "hsl(8 92% 68%)"
  ring: "hsl(45 100% 60%)"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "3.75rem phone; 6rem desktop"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
  headline:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0"
  title:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0"
  numeral:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
  body:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  sm: "0.625rem"
  md: "1rem"
  lg: "1.5rem"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-primary-lg:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "0 28px"
    height: "56px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.muted}"
  button-ghost:
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
  answer-option:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    minHeight: "64px"
  answer-option-hover:
    backgroundColor: "{colors.surface-raised}"
  answer-badge:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    size: "36px"
  answer-badge-correct:
    backgroundColor: "{colors.success}"
    textColor: "{colors.primary-foreground}"
  answer-badge-wrong:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.primary-foreground}"
  input-nickname:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    minHeight: "64px"
  choice-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    minHeight: "80px"
  mission-bar:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "16px 20px"
  feedback-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "20px"
  xp-chip:
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  timer-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "2px 12px"
  timer-chip-low:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.danger}"
  list-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
---

# Design System: Builder's Galaxy

## Overview

**Creative North Star: "The Voyage Log"**

A run is a voyage, not a quiz form. Every screen sits on the same deep-space ground: a near-black navy field with a quiet, static starfield and a faint indigo nebula at the top. Against it, twelve flat-vector planets carry all of the saturated colour, each with its own hue, and a single nova-yellow action per screen tells the player what to do next. Progress is always distance travelled along one dashed route, drawn the same way on the full Galaxy map and as the compact strip above every question.

Density is low and the type is large. Controls are rounded but firm, with soft offset shadows that lift them off the void instead of making them glow. Motion belongs to the voyage: the rocket flies the route, a flag plants on a finished planet, and the next planet wakes. Everything else stays still. The starfield never moves. Reduced motion is honoured: the rocket appears at its destination and state changes still read.

The build refuses the default trivia layout of a progress bar, a card and four pills on a grey field. Feedback is never carried by colour alone.

**Key Characteristics:**
- Near-black navy ground, indigo surfaces, colour reserved for planets and four signal roles.
- One nova-yellow primary action per screen.
- Progress is a route through 12 named planets, dashed ahead and solid sky where travelled.
- Bricolage Grotesque for headings, numbers and buttons; Figtree for reading.
- Rounded-but-firm controls, soft offset shadows, a static starfield.
- Large touch targets (at least 48px; answers at least 64px) and icon plus label plus colour for every verdict.

## Colors

A dark, cool field where the only loud colour comes from the planets and a few signal roles. Semantic theme values live in `src/styles.css`, primarily as OKLCH colours and are applied through Tailwind with alpha (for example primary at 10 to 15% for selected fills). The direction named a #0A0F24 range for the ground; the build landed darker (Void Navy), and the build is the record.

### Primary
- **Nova Yellow** (primary): the one main action per screen (Play, Launch, Continue), the selected choice border, the XP reward chip and total, the "Galaxy" half of the wordmark, "you" markers on the leaderboard, the focus ring and caret. Text on it is Deep Hull (primary-foreground).

### Secondary
- **Sky Signal** (info): the travelled part of the route, the countdown ring while time is healthy, and answer-option hover borders. It means "where you are and how long you have", never success or failure.

### Tertiary
- **Mint Signal** (success): correct answers, the correct-answer reveal, and correct badges.
- **Coral Signal** (danger): wrong answers, time running out (10 seconds or less), and input errors. Also the rocket's fins and flame.

### Neutral
- **Void Navy** (background): the page ground under the starfield.
- **Starlight** (foreground): primary text; at 28% opacity it draws the untravelled dashed route, at 45% the current planet's dashed halo.
- **Hull Indigo** (surface): mission bar, feedback panel, answer options, list panels, input fields.
- **Raised Hull** (surface-raised): secondary buttons, hover state of surfaces, the player's own leaderboard row.
- **Orbit Line** (border): control and panel borders, dashed route in the progress strip.
- **Dim Track** (muted): timer track, answer letter badges, unfilled skill segments, pending onboarding steps.
- **Moon Grey** (muted-foreground): secondary text, hints, metadata.
- **Deep Hull** (primary-foreground): text and icons on Nova Yellow, Mint and Coral fills.

### Planet hues
Planets are not tokens. Each planet carries a base colour in `src/data/planets.ts`, rendered as lit face `hsl(h 78% 62%)`, shade `hsl(h 58% 40%)`, highlight `hsl(h 90% 80%)` and ring `hsl(h 70% 82%)`. Planet dots, skill segments and arrival pulses use `hsl(h 80% 62%)`.

### Named Rules
**The One Nova Rule.** Each screen has exactly one Nova Yellow action. Everything else is secondary, ghost, or a planet.

**The Planets Own the Colour Rule.** Saturated hue belongs to the planets and the four signal roles. Surfaces, borders and text stay in the navy-indigo family.

**The Signal Meaning Rule.** Sky is position and time, Mint is correct, Coral is wrong or out of time. Never swap them for decoration.

## Typography

**Display Font:** Bricolage Grotesque Variable (with system-ui, sans-serif)
**Body Font:** Figtree Variable (with system-ui, sans-serif)

**Character:** Bricolage brings a chunky, slightly quirky voice to headings, buttons and every number. Figtree keeps questions, explanations and hints calm and readable. All headings use zero letter spacing and wrap balanced.

### Hierarchy
- **Display** (800, 3.75rem on phone to 6rem on desktop, line-height 0.9): the Welcome wordmark only.
- **Headline** (800, 2.25rem rising to 3rem; the Results heading starts at 1.875rem): one onboarding question or results heading per screen.
- **Title** (700, 1.5rem rising to 1.875rem, leading tight): question prompts, section headings, planet names, verdict lines. Buttons use the display face at 600.
- **Numeral** (700 to 800, 1.875rem rising to 2.25rem, tabular): stat values, podium ranks, skill-orbit percentage. Every changing number uses tabular figures.
- **Body** (400 to 500, 1rem, answer text 1rem rising to 1.125rem): answers, explanations (max one prose measure, about 65ch), promises.
- **Label** (400, 0.875rem, Moon Grey): metadata, hints, room code lines, stat labels. Sentence case; no tracked uppercase labels.

### Named Rules
**The Numbers Speak Bricolage Rule.** XP, scores, ranks, seconds and percentages are set in the display face with tabular figures, so they line up and feel like instruments.

## Layout

A single centred column inside a page frame: 16px gutters on phone, 24px from 640px up. Column widths step with the job: 42rem for onboarding, about 36rem for the leaderboard, 48rem for Welcome copy, 72rem for Question, Results and the Galaxy map. The one breakpoint that changes composition is 768px (Galaxy) and 1024px (Question: planet column of 15rem on the left, question on the right, gap 3.5rem; stacked on phone). Spacing follows a 4px base with 8, 12, 16, 24 and 32px doing most of the work: 12px between answer options, 24px between blocks, 32px before a screen's first control.

Primary actions sit within thumb reach: on Welcome the Play button sits under the promise with Earth's limb filling the bottom third; on Galaxy the mission bar is pinned to the bottom of the viewport (full-bleed on phone, a rounded floating panel from 640px) and honours the safe-area inset.

### Named Rules
**The Route Recurs Rule.** The voyage route is the progress indicator everywhere. The Galaxy map draws it as a curve through the planets; the mission bar and the Question screen repeat it as a 12-dot strip with a rocket over the current planet. Never substitute a percentage bar for voyage progress.

**The Ring Slot Rule.** A ringed planet's tilted ring overhangs about 1.1x the planet's diameter on each side, so a ringed planet needs a slot about 2.2x its diameter (render it smaller in a fixed slot: 0.46 versus 0.62 of the orbit-timer, 16 versus 22px in a 40px skill-map slot). Labels beside a planet clear whichever is larger, the ring or the current-planet halo (radius 66 on a 100 viewbox, 1.32x the planet's radius).

## Elevation & Depth

Depth is a hybrid: tonal layering does most of the work (Void Navy, then Hull Indigo, then Raised Hull), and two soft, downward-offset shadows lift interactive pieces off the void. Shadows are dark navy, never black on grey and never hard-edged. The starfield is a fixed background layer with no parallax. Planets carry their own depth through an off-centre radial shade and a thin highlight rim.

### Shadow Vocabulary
- **Raised** (`box-shadow: 0 10px 28px -10px hsl(232 80% 2% / 0.85), 0 2px 6px -2px hsl(232 80% 2% / 0.6)`): secondary buttons and the answer feedback panel.
- **Press** (`box-shadow: 0 6px 16px -6px hsl(232 80% 2% / 0.9), 0 1px 0 0 hsl(45 100% 80% / 0.5) inset`): the primary button only; the warm inset top edge makes Nova Yellow read as a physical key.

### Named Rules
**The Still Sky Rule.** The starfield and nebula never move. Motion is spent on the voyage.

## Shapes

Rounded but firm. Controls and choice cards use a 1rem corner; panels (mission bar, feedback, list panels) use 1.5rem; badges and the focus outline use 0.625rem. Pills are reserved for small counters (XP chip, timer chip, step dots, skill segments, rank badges). Planets, avatars and dots are true circles. Selectable controls use a 2px border that changes colour by state rather than a fill-only change. The route is a 2px line, dashed 4 on 8, with round caps; the current planet wears a dashed halo in the same 4 on 8 rhythm, slowly turning.

## Components

### Buttons
Tactile and confident; set in the display face at 600.
- **Shape:** gently rounded (1rem).
- **Primary:** Nova Yellow fill, Deep Hull text, Press shadow; 48px tall (20px sides) or 56px (28px sides) for the screen's main action. Hover brightens slightly; active nudges down 1px.
- **Secondary:** Raised Hull fill, Orbit Line border, Raised shadow; hover shifts to Dim Track.
- **Ghost:** no fill, Moon Grey text; hover shows Hull Indigo and Starlight text.
- **Disabled:** 45% opacity, no shadow. Leading icons are 20px line icons.
- **Focus:** 3px Nova Yellow outline, 3px offset, on every focusable element.

### Answer Option
- **Shape:** 1rem corner, 2px border, at least 64px tall, 12px by 16px padding, a 36px letter badge (A to D) with 0.625rem corners.
- **Idle:** Hull Indigo with Orbit Line border; hover lifts to Raised Hull with a Sky border at 60%.
- **Correct:** Mint border, Mint at 15% fill, badge becomes a Mint check. **Wrong:** Coral border, Coral at 15%, badge becomes a Coral cross. **Reveal:** Mint border at 70% with a check. **Dim:** faded, Moon Grey text.
- Every state carries an icon and a screen-reader label as well as colour.

### Choice Cards and Inputs
- **Nickname field:** 64px tall, 1rem corner, 2px Orbit Line border on Hull Indigo, typed text in the display face at 1.5rem; focus turns the border Nova Yellow; error turns it Coral with a Coral hint beneath.
- **Experience choice:** 80px radio cards, title plus one-line hint; selected is a Nova Yellow border over Nova at 10%.
- **Step dots:** 6px pills; current is a 32px Nova Yellow pill, done are Starlight at 60%, pending are Dim Track.

### Chips
- **XP reward:** pill, Nova at 15% fill, Nova text in the display face with a sparkle icon; rises in on arrival.
- **Timer chip:** pill on Hull Indigo with Orbit Line border, sits on the bottom of the orbit ring with a timer icon and tabular seconds; turns Coral at 10 seconds or less. Paused swaps the timer icon for a pause icon and, on desktop, adds the word "Paused".

### Cards / Containers
- **Corner Style:** 1.5rem for panels.
- **Background:** Hull Indigo, opaque. The leaderboard list stays opaque Hull Indigo so it reads over the Earth scenery.
- **Shadow Strategy:** only the feedback panel takes Raised; list panels rely on tonal layering.
- **Border:** the feedback panel takes a 2px Mint or Coral border at 60% matching the verdict; list rows divide with Orbit Line hairlines.
- **Internal Padding:** 20px for panels, 8px by 16px for lists, 12px row rhythm.

### Navigation
A brand mark (rocket plus "Builder's Galaxy" in the display face) at top left; a back control is a 48px round ghost button with a left arrow. The Galaxy mission bar is the primary navigation surface: route strip on top, current-planet status and the Nova action below.

### Planet
A flat-vector sphere: radial shade from highlight to lit face to shade to deep navy, two soft cloud bands, a thin highlight rim, and an optional tilted ring split in front of and behind the body. **Locked:** 60% opacity, 30% saturation. **Current:** dashed Starlight halo turning once every 24 seconds. **Done:** full colour, with a planted flag on the map. Arrival plays a one-shot hue-coloured pulse.

### Route Progress
Twelve hue dots joined by a dashed Orbit Line, the travelled stretch solid Sky; the current dot is larger with a small rocket above it; untravelled dots sit at 40%. Exposed as a progressbar with "Planet N of 12: Name".

### Orbit Timer
The countdown is an orbit: a Dim Track ring around the enlarged current planet drains clockwise in Sky, turning Coral at 10 seconds or less, with the seconds on a chip on the ring. Planet on the left and question on the right on desktop. The timer is 60 seconds. A Pause / Resume button (secondary outline, 48px) sits beside the planet name on phone and under it on desktop; answering also resumes. Screen readers hear "10 seconds left" once, "Timer paused" and "Timer resumed", never a per-second count.

### Results
Stat pairs (label above a large numeral), a skill orbit with planets as moons sized by score and each labelled with its score, an always-visible skill map list (planet, name, segmented score in the planet's hue, "n of total" in text, a 48px Lenny's tips bulb button), and the three lowest-scoring planets as next steps, each with its own tips bulb. When more planets tie for lowest, the intro says "Three of your lowest-scoring planets".

### Dialog
One modal pattern for every popup, built on the native `<dialog>` opened with `showModal()`: Hull Indigo panel, 1.5rem corners, Orbit Line border, Raised shadow, backdrop of Void Navy at 80%. Header row with the title (title type) and a text "Close" button with an X icon; content scrolls inside, max 88% of the viewport height, max width 36rem. Focus moves to the title on open and returns to the opener on close; Escape closes. No open or close animation.

### Lenny's tips
A bulb button (Nova bulb icon, 48px) opens a planet's tips in the Dialog. In the Question feedback panel it is a bordered text button, "Lenny's tips"; in result rows it is icon-only with visually hidden text "Lenny's tips for [planet]". Tips never show before an answer. Each tip card (1rem corners, Orbit Line border): level label in the game's level names, the question in semibold, the answer under it, a native "Why it matters" disclosure in Sky, then "Source: title" linked with an external-link icon and hidden "(opens in a new tab)". Tips are sorted Newbie first. The feedback panel also shows the question's own source line when the bank has one.

### What's next
The leaderboard's Nova action ("What's next?", compass icon) opens a Dialog with two sections divided by an Orbit Line rule. "Take your results with you": secondary buttons for Share (only where the device share sheet exists), Copy results, Download (Markdown) and Download (JSON), with a Mint status line for "Results copied." "What should we build next?": a fieldset of checkbox cards (2px border, Nova border and Nova at 10% when checked) for ideas that are not built yet, stated plainly in the legend, and a Nova "Send my vote" button. Voting is currently disabled because Cloud is off; no selections are submitted. Only after explicit approval of a future service connection may a submitted form be replaced by a focused thank-you heading. Nothing about the player may be collected.

## Do's and Don'ts

### Do:
- **Do** show voyage progress as the dashed route (4 on 8) with the travelled part solid Sky, on the map, the mission bar and the Question screen.
- **Do** keep exactly one Nova Yellow action per screen.
- **Do** pair every verdict with an icon and a text label as well as Mint or Coral.
- **Do** draw the countdown as the Orbit Timer, Coral at 10 seconds or less, seconds on a chip, with a Pause button beside it.
- **Do** give ringed planets a slot about 2.2x their diameter and keep labels clear of the ring and the current-planet halo.
- **Do** keep every touch target at least 48px (answers 64px).
- **Do** set numbers in Bricolage Grotesque with tabular figures.
- **Do** respect reduced motion: land the rocket instantly and keep state changes legible.

### Don't:
- **Don't** open a dialog without the player asking for it, or show tips before an answer.
- **Don't** add single-key shortcuts that work anywhere on the page; answer keys work only while focus is in the question.
- **Don't** use a generic percentage bar for voyage progress.
- **Don't** animate or parallax the starfield.
- **Don't** signal correct, wrong or time-up with colour alone.
- **Don't** put saturated colour on surfaces, borders or body text; it belongs to planets and signals.
- **Don't** use hard-edged or black-on-grey shadows; depth is navy and soft.
- **Don't** set translucent list panels over scenery; the leaderboard list stays opaque.

## Accessibility

Implementation requirements; browser checks do not replace NVDA/VoiceOver and keyboard-only user testing.

- **Time:** 60 seconds a question, a Pause button, no speed bonus (100 XP per correct answer), and paused time left out of the Time result. Ties on the leaderboard go to the shorter run.
- **Focus:** each question's text receives focus when it loads, so screen readers start on it; after answering, focus moves to the Continue button. Dialogs move focus to their title and return it to the opener.
- **Announcements:** the verdict panel is a polite live region; the timer announces only "10 seconds left", "Timer paused" and "Timer resumed".
- **Keys:** 1 to 4 and A to D answer only while focus is inside the question (WCAG 2.1.4); the hint "Press 1–4 or A–D to answer." shows from 640px up.
- **Names:** icon-only buttons are named with visually hidden text, not `aria-label`, so the name is translated with the page later.
- **Colour:** every score has text ("1 of 2"), every verdict an icon and a word.
- **Future voice mode** (ElevenLabs, not implemented; deferred to the next profile): opt-in only; the screen reader stays on and the app's own live regions go quiet while the agent speaks; the timer is off in voice mode; everything the agent says is shown as text; the app checks answers, the agent never receives the correct option.


### Deferred question narrator
A separate opt-in question/options/feedback narrator button is planned for all users. It requires no microphone, offers stop/cancel, pauses active time during audio and preserves a manual pause. It is not implemented; voice and Cloud work are deferred to the next profile.

### Verification status
60-second scoring, keyboard answer scope, run completion and browser result exports have automated/browser coverage. Actual NVDA/VoiceOver behaviour and content/source accuracy require human review. Question selection, assessed-level thresholds and recommendations remain the agreed placeholder rules, not validated assessments.
