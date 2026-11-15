<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Questions load only through `src/data/questionBank.ts` (adapter over `src/data/questions.json`); never inline or generate questions — keeps one swappable source.
- Game rules live in `src/game/rules.ts`, run state in `src/game/runStore.ts` (sessionStorage) and room data in `src/game/leaderboard.ts` (mock); screens never touch storage directly so a backend can replace these adapters later.
- Planet hues are per-planet data in `src/data/planets.ts`, not theme tokens; all other colours are tokens in `src/styles.css`.

- Lenny tip data is separate from the question adapter and never enters run plans, so tips cannot disclose a playable answer.
- QuestionClock owns active-time accounting; screens use its pause/resume API so elapsed results exclude pauses.
- Native dialogs share Modal for focus containment and opener restoration; exports are generated only in the browser to avoid uploading results.
