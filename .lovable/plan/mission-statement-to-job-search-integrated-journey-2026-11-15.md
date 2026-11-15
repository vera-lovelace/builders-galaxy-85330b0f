# Mission statement to job search: integrated journey

Trivia first, then everything else. The four extras (sound, debrief, tips drill, background matcher) are not built yet, so this plan builds them and links your mission statement to every job.

```text
Voyage (sound effects) -> Results: Mission statement card
   -> "Practice weak areas" -> Tips drill
   -> "Find matching jobs"   -> Job search, prefilled from your mission statement
        each job: Copy pitch | Copy mission statement | Apply (copies pitch, then opens job)
```

## 1. Mission statement on Results
- Builder type (for example "Systems Architect") worked out from your planet scores by fixed rules, not AI.
- AI writes a 3-sentence mission statement from your scores only. No name or personal data is sent.
- Buttons: Copy statement, Download card (image made on your device), Find matching jobs, Practice weak areas.
- Kept for this browser session only, like the run.

## 2. Mission statement carried into job search
- "Find matching jobs" opens job search with suggested keywords for your builder type and runs the first search.
- A "Your mission statement" panel at the top of job search, with Copy and Edit (edits stay in this session).
- The existing "Describe what you're looking for" box gains a "Use my mission statement" button.

## 3. Job details: copy-ready buttons
On each job's Details:
- **Copy pitch**: AI writes a short 3-4 sentence note linking your mission statement to that job's title and description. Shown in an editable box before copying.
- **Copy mission statement**: copies your statement as is.
- **Copy job summary**: title, company, location, salary and link, for your notes.
- **Apply**: copies the pitch (if made) and opens the job's page in a new tab, with a spoken/on-screen "Pitch copied" confirmation.
- Without a voyage, the mission buttons are hidden and a "Play a voyage to get your mission statement" link shows.

## 4. Tips drill page
- Flashcards from Lenny's 93 tips, starting with your 3 lowest-scoring planets; tabs for topic or all.
- Space flips, arrow keys move; works with screen readers. Linked from Results.

## 5. Sound effects
- Small sounds made in the browser for answer, 10-second warning, flight, pause/resume and finish. Off by default, with a Sound on/off button in the header.

## 6. Background matcher
- Second tab in the AI box: paste a CV summary or LinkedIn headline to get keywords and filters. Nothing is saved.

## Also updated
About page (new features, privacy lines), Welcome line, memory, chat summary, task list.

## Technical details
- `src/game/archetype.ts` (pure rules + tests), `src/game/missionStore.ts` (sessionStorage adapter, screens never touch storage directly).
- `src/lib/mission.functions.ts`: `writeMission` and `writePitch` server functions via AI Gateway SDK, zod input/output, 429/402 handling; pitch prompt forbids inventing experience or salaries.
- Card PNG via canvas in browser only.
- `/jobs` reads `?from=mission` search param; new `MissionPanel` and job-detail copy actions using `navigator.clipboard` with fallback and an aria-live status.
- `src/routes/drill.tsx` using `src/data/tips.ts` (tips never enter run plans).
- `src/game/sound.ts` Web Audio, no new packages.
- Tests: archetype rules, mission store, pitch input limits.
- Not tested live until RapidAPI key is added; AI parts use workspace AI credits.
