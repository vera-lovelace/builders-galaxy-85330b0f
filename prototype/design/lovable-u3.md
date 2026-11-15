# Lovable update 3: Welcome promise and About page

Paste the two prompts below into Lovable one at a time, and check each result before sending the next.

Attach these screenshots from `design/screens/`:
- **Prompt 1:** `mobile-1-welcome.png`, `desktop-1-welcome.png`
- **Prompt 2:** `mobile-8-about.png`, `desktop-8-about.png`

---

## Prompt 1: Welcome promise

```text
Update the Welcome screen copy to match the attached screenshots. Keep the layout, Earth, the planets on their orbit and the rocket exactly as they are.

1. Above the big "Builder's Galaxy" name, add a one-line kicker in the display font (Bricolage Grotesque), semibold, in the foreground colour, about 1.125rem on phones and 1.25rem on desktop:
   "Every great product starts with a builder."
2. Replace the line under the name with:
   "Discover where you shine across 12 product skills, learn from people who've built it, and chart your next step."
3. Rename the yellow button from "Play" to "Start your voyage". Keep its play icon and the lift-off animation.
4. Replace the small line under the button with:
   "12 planets · 24 questions · free, no sign-up"
5. Remove every mention of "about 5 minutes", "answer fast" and "room leaderboard". None of them are true any more.

Rules:
- The name stays the largest text on the screen.
- The yellow button stays the only yellow action.
- Do not change the question flow, the scoring or any other screen.
```

---

## Prompt 2: About page and licences

```text
Add an About page at /about that matches the attached screenshots. It explains the open-source licences, where the content comes from, accessibility and privacy. Players only reach it when they choose to.

HOW PLAYERS REACH IT
- On the Welcome screen, add a link at the right of the header: an info icon plus the word "About". On Results, add the same link labelled "About and sources" after the "Play again" button.
- These are links (<a> / router Link), not buttons, because they go to another page. Style them like a ghost button: muted text, at least 48 px tall, a hover background, the standard focus ring. Never yellow.
- Nothing opens the About page automatically.

PAGE STRUCTURE
- Use the same page frame as the other screens (brand mark top left), with a single narrow column.
- At the top, a ghost "Back" button with a left-arrow icon, at least 48 px. It returns to the previous screen, or to Welcome if the player landed on /about directly.
- When the page loads:
  - Set the page title to "About · Builder's Galaxy".
  - Move focus to the h1, which has tabindex="-1" and no visible focus outline.
- Each section is a <section> with one h2. Separate the sections with a thin border-top rule.

PAGE TEXT (use it word for word)

h1: About Builder's Galaxy
Intro: A free, open-source game for learning product management, made for SheBuilds workshops.

h2: What it is
A rocket flies through 12 planets, one for each product skill, from problem framing to pitch. You answer 2 questions on each planet, see where you shine, and leave with three places to learn next. There is no account and no sign-up.

h2: Open source
Use a description list (<dl>), with each term in semibold and each description in muted text:
- Code: MIT licence: use, change and share it freely, including commercially.
- Questions and tips: The wording of the questions, explanations and tips is licensed CC BY-NC 4.0: share and adapt it with credit, not for commercial use. The ideas come from the sources below, whose owners keep all rights.
  ("CC BY-NC 4.0" links to https://creativecommons.org/licenses/by-nc/4.0/ in a new tab.)
- Source code: The repository will be linked here when it is public.
- Contribute: Questions, scenarios, translations and accessibility feedback are welcome once the repository is public.

h2: The content
[N] questions at four levels (Newbie, Beginner, Advanced, Pro) and [M] tips. Everything is written in our own words, not copied from the sources, and every item links to its source where it has one. Tips are never asked as quiz questions. AI helped draft the content; people review it before release.
(Compute N and M from the question bank and the Lenny's tips file. Today they are 48 and 93.)

Then two source lists, each inside a native <details> card (surface background, border, rounded):
- Summary: "Question sources", with a second line in muted small text: "[count] sources".
- Summary: "Lenny's tips sources", with a second line: "[count] episodes and articles from Lenny's Newsletter and Podcast".
Each summary is at least 48 px tall.

Inside each list:
- Generate the entries from the data files. Never type them by hand.
- Group the items by sourceTitle and count them. Sort by most-used first, then alphabetically.
- Each entry shows the title as a link to its sourceUrl in a new tab. After the title, show a small inline external-link icon (aria-hidden) and visually hidden text "(opens in a new tab)". Then, in muted text, "· [count] questions" or "· [count] tips", using the singular for 1.
- A title with no URL shows "(no public link)" instead of a link.
- Do not show sourceAuthor.

After the lists, in small muted text:
Builder's Galaxy is independent and is not affiliated with or endorsed by Lenny's Newsletter, Lenny's Podcast or Pragmatic Institute.

h2: Accessibility
We aim for WCAG 2.2 level AA and design with disabled players, not just for them.
Bulleted list:
- Every control works with a keyboard and has a touch target of at least 48 pixels.
- Right and wrong answers always show an icon and words, never colour alone.
- The 60-second timer can be paused. Screen readers hear it only at 10 seconds left.
- Answer keys (1 to 4, A to D) work only while you are in the question.
- Reduced-motion settings are respected.
- Voice mode, in development, is opt-in, untimed and shows everything it says as text.
Then: "Known gaps:" (semibold) the game has not yet been tested with screen reader users, and it is available in English only. To report a problem, tell your workshop facilitator; once the repository is public you can also open an issue there.

h2: Privacy
Bulleted list:
- Your nickname and answers stay in this browser tab and are cleared when you close it.
- Downloads and copies of your results are made on your device; nothing is uploaded.
- Feature votes are anonymous: only the ideas you pick are stored.
- Voice mode sends your voice to ElevenLabs while it is on, and only after you start it.
Check every point against what this app actually does. If anything differs (for example, if run state is saved anywhere other than the browser tab), change the text to the truth and tell me what you changed.

h2: Credits
Fonts: Bricolage Grotesque and Figtree (SIL Open Font License). Icons: Lucide (ISC licence). Built with React, Vite and Tailwind, and in Lovable.

LICENCE FILES
1. Add a LICENSE file at the project root with the standard MIT licence text, "Copyright (c) 2026 Builder's Galaxy contributors". Below it, add:
   "This licence covers the source code. The game content (the question bank and Lenny's tips files) is licensed separately under CC BY-NC 4.0; see the content LICENSE.md."
2. Next to the question bank and tips files, add LICENSE.md:
   - The wording of the questions, answer options, explanations and tips is licensed under CC BY-NC 4.0 (link to https://creativecommons.org/licenses/by-nc/4.0/). You may share and adapt it for non-commercial purposes, with credit to Builder's Galaxy and a link to the licence.
   - The items paraphrase ideas from the sources named in each item's sourceTitle and sourceUrl: Pragmatic Institute and Lenny's Newsletter and Podcast. Those owners keep all rights to their original material. This licence covers only Builder's Galaxy's own wording, and grants no rights to the sources. Builder's Galaxy is not affiliated with or endorsed by them.

ACCESSIBILITY CHECKS BEFORE YOU FINISH
- Tab through the page: Back, every link, both <details> summaries. Each shows the focus ring.
- With a screen reader, the heading list reads: h1, then the six h2s in order.
- Every external link has the visually hidden "(opens in a new tab)".
- At 320 px width and at 200% zoom there is no horizontal scrolling, and long source titles wrap with the icon next to the text.
- No animation on this page.

When done, list the files you changed and confirm that the source counts come from the data files.
```
