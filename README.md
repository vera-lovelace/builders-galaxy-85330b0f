# The Builder's Galaxy

A space-themed product-management **trivia game** for aspiring PMs and curious builders. Explore 12 planets, reflect on your answers, practise with tips, and turn that momentum into words for your next role.

**This is a fun learning game, not a validated skills assessment or a hiring recommendation.** Builder types and trivia levels are motivational game outputs, not professional certifications.

[Play the app](https://builders-galaxy.lovable.app) · [About and sources](https://builders-galaxy.lovable.app/about) · [Buy the developers a coffee](https://buymeacoffee.com/caldaily)

## The journey

**Welcome → Join → Galaxy → Trivia → Results → Tips practice / Job search**

| Feature | What is included |
| --- | --- |
| Trivia voyage | 12 product topics, 24 questions per run, drawn from the supplied 48-question bank. |
| Time and scoring | 60 seconds per question, Pause/Resume, 100 XP per correct answer, no speed bonus. Paused time is excluded from results; equal XP ranks by shorter active time. |
| Results | Per-planet scores, trivia level, rule-based builder type, and suggestions for topics to revisit. |
| Learning tips | 93 supplied Lenny tips, separate from playable questions, with source credits and a flashcard drill. |
| Sharing | Browser-generated result exports and a shareable builder card; native sharing where supported, PNG download, and LinkedIn/X links. LinkedIn does not automatically attach the downloaded image. |
| Career writing | Optional AI mission statement, plain-language role/background matcher, and job-specific pitches with copy/apply actions. Review AI writing before using it. |
| Job search beta | JSearch listings, location/remote/date filters, pagination, and suggested keywords connected to Results. Keyword ranking uses observed result counts, not labour-market demand statistics. |
| Voice and sound | Optional ElevenLabs navigation and browser-generated sound cues, with sound off by default. |
| Leaderboard | Local/sample room scores today; an optional shared Supabase adapter and SQL setup are prepared but not wired into the screens. |

Question selection uses the chosen level plus the next level up. Advanced and Pro both use Advanced + Professional questions. The gameplay rules are in [`src/game/rules.ts`](src/game/rules.ts).

## Run locally

The app uses React 19, TypeScript, TanStack Start/Router, Vite, Tailwind CSS v4, and Vitest. [Lovable](https://lovable.dev) was used to build it. Use a current Node.js release supported by Vite (22.12+), and [Bun](https://bun.sh/) for the committed lockfile.

Clone the repository using your own GitHub access, then run:

```sh
git clone https://github.com/vera-lovelace/builders-galaxy.git
cd builders-galaxy
bun install --frozen-lockfile
bun run dev
```

Open the local URL printed by Vite. No service credentials are required for the local trivia, tips, results, or sample leaderboard. Network-backed features need the optional setup below; a cached development session is not proof of offline support.

### Commands

```sh
bun run test          # Automated game, clock, export, archetype, and source tests
bun run lint          # ESLint
bun run build         # Production build
bun run preview       # Preview the production build
```

This app includes server functions: deployment must support TanStack Start's server runtime, not just serve static files. The existing Vite configuration targets Cloudflare via Lovable's build tooling. Keep that configuration unless deliberately adapting deployment.

## Optional integrations

Secrets belong in the server environment or Lovable's Secrets settings, **never in Git or browser code**. For local development, use an untracked `.env.local` file. Any variable prefixed `VITE_` is public browser configuration.

| Setting | Purpose | Required for |
| --- | --- | --- |
| `RAPIDAPI_KEY` | Server-only RapidAPI key with an active JSearch subscription. | Live job listings. |
| `LOVABLE_API_KEY` | Server-only Lovable AI Gateway credential with available credits and model access. Managed by Lovable in hosted projects; configure separately outside Lovable. | Role suggestions, mission statements, and tailored pitches. |
| `VITE_SUPABASE_URL` | Public Supabase project URL. | Future shared leaderboard integration. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public Supabase publishable key; `VITE_SUPABASE_ANON_KEY` is also accepted by the adapter. Never use a service-role or secret key here. | Future shared leaderboard integration. |

### JSearch / RapidAPI

1. Subscribe to [JSearch on RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch).
2. Add `RAPIDAPI_KEY` to the server environment.
3. Open `/jobs` and test a real search, filters, pagination, and an application link.

Requests run in [`src/lib/jobs.functions.ts`](src/lib/jobs.functions.ts). Successful results have a best-effort 15-minute in-memory cache per server instance. Provider limits and pricing apply; this is not a durable cache or global rate limiter. Missing credentials produce a setup warning, not invented job listings.

### AI Gateway

The AI functions use the Lovable AI Gateway SDK and currently request `openai/gpt-6-astra`. Confirm access to that model and available AI credits in the destination workspace or hosting environment. AI is optional; it does not determine answer correctness or the builder type.

### ElevenLabs

Both voice controls use the public agent ID exported by [`src/components/VoiceAgent.tsx`](src/components/VoiceAgent.tsx). Forks should configure their own agent there. A public agent ID is not an API secret; a private agent would require server-issued access rather than a client-side private key.

Register these **client tools** in the ElevenLabs agent dashboard:

| Screen | Tool | Parameters |
| --- | --- | --- |
| Trivia | `selectOption` | `option` or `number`, 1–4 |
| Trivia | `repeatQuestion`, `nextQuestion`, `pauseTimer`, `resumeTimer` | None |
| Job search | `searchJobs` | Optional `keywords`, `location`, `remoteOnly` |
| Job search | `selectKeyword` | `keyword` |
| Job search | `describeJob` | `index` (1-based) |
| Job search | `filterResults` | Optional `remoteOnly`, `postedWithinDays` |
| Job search | `nextPage` | None |

Voice requires microphone permission, a supported browser, and HTTPS outside localhost. The job-search guide has a 10-minute session timeout; the trivia guide currently has no equivalent enforced timeout. Live conversation and tool behaviour still need end-to-end verification. ElevenLabs usage is subject to the agent owner's plan and settings.

### Optional shared leaderboard (not active in the UI)

1. Connect your own Supabase project and enable **Anonymous sign-ins**.
2. Review and run [`supabase/setup/001_shared_leaderboard.sql`](supabase/setup/001_shared_leaderboard.sql) once in its SQL editor. It creates `public.leaderboard_entries` with public reads, owner-only writes, and value constraints.
3. Configure the public `VITE_SUPABASE_*` settings.
4. Wire the Results and Leaderboard screens to [`src/game/sharedLeaderboard.ts`](src/game/sharedLeaderboard.ts), preserving the local fallback, then test anonymous submission and readback.

**Adding keys alone does not switch the screens to shared scores.** The SQL has not been verified against your hosted database. RLS enforces ownership and valid ranges, not proof that a submitted score was earned. A shared leaderboard stores nicknames and scores publicly and therefore changes the local-only privacy model. Lovable Cloud is not required or enabled by this setup.

## Privacy: what actually happens

The core trivia does not require an account and does not upload runs to an application database in the current flow. However, **“nothing stored” must not be interpreted as no storage or third-party processing**:

- Run details (including the chosen nickname), mission text, and job keyword counts use browser `sessionStorage` for the current tab session.
- The sound preference uses browser `localStorage` and persists until cleared.
- Result files and card images are generated locally. Sharing or applying opens the service you choose, which has its own privacy policy.
- Job queries and filters are sent through the server to RapidAPI/JSearch; successful responses are temporarily cached in server memory.
- AI requests send the entered background/role text or mission/job context through the server to the AI Gateway. Avoid identifying or sensitive details; review providers' retention policies.
- Opt-in voice sends audio and page context to ElevenLabs. Provider retention and processing are governed by its settings and policies.
- Enabling the shared leaderboard would add anonymous authentication and persistent database records.

No blanket security guarantee or zero-retention promise is made for external providers.

## Accessibility

The app includes question-heading focus, keyboard answer shortcuts scoped to the question area, visible text feedback, reduced-motion support, native dialogs with focus restoration, and timer announcements limited to “10 seconds left”, “Timer paused”, and “Timer resumed”.

Keyboard, narrow-screen, and 200% zoom checks have been performed. **Independent testing by people using NVDA or VoiceOver remains outstanding**; this is not a claim of certified WCAG compliance or flawless screen-reader compatibility. Voice guidance is optional and does not replace accessible text controls.

## AI transparency

The About page uses the European Commission's official basic AI icon with accessible text labels for AI-generated text, AI-generated voice, and AI-assisted learning content. It explains human review, model limitations, third-party processing, and the distinction between AI outputs and rule-based trivia results.

See the [European Commission guidance](https://digital-strategy.ec.europa.eu/en/policies/eu-icons-labelling-ai-generated-content). Icons, local storage, and database RLS do not by themselves establish EU AI Act or GDPR compliance. The About disclosure is not a substitute for content-level labels at first exposure or on exports wherever legally required; those obligations need a feature-specific review.

## Project map and documentation

| Path | Responsibility |
| --- | --- |
| `src/routes/` | Welcome, Join, Galaxy, Trivia, Results, Leaderboard, About, Jobs, and Tips drill screens. See [route conventions](src/routes/README.md). |
| `src/data/questionBank.ts` + `questions.json` | The single playable question source and adapter. Never inline or generate replacement questions. |
| `src/data/tips.ts` + `lenny_tips_questions.json` | Separate learning-tip content; tips never enter the playable question plan. |
| `src/data/sources.ts` | Generates the About page's source lists from content attribution. |
| `src/game/` | Rules, active-time clock, run/mission storage, exports, archetypes, sound, and leaderboard adapters. |
| `src/lib/*.functions.ts` | Server-side job search and AI calls. |
| `src/components/` + `src/styles.css` | Shared controls, visuals, and semantic design tokens. Planet hues live in planet data. |
| `supabase/setup/` | Optional, manually applied shared-leaderboard SQL. |
| `prototype/` | Archived design reference only, not the shipped app; do not import or build it as part of the main app. |

Use this README as the entry point. [PRODUCT.md](PRODUCT.md) and [DESIGN.md](DESIGN.md) cover product/design intent; [AGENTS.md](AGENTS.md) covers development constraints; [roadmap.md](roadmap.md) tracks work; [PROJECT_HANDOVER.md](PROJECT_HANDOVER.md) covers transfer; [CHAT_HISTORY.md](CHAT_HISTORY.md) is historical context, not a current setup guarantee. Where old prototype or historical notes disagree with the implemented app, inspect `src/` and the current root documents.

## Contributing and repository visibility

Keep changes focused, preserve supplied question/tip content and attribution, use the existing adapters, and run relevant tests. For interface changes, check desktop, phone, keyboard, and reduced-motion behaviour. Keep secrets out of commits and do not edit generated route files.

Lovable Git sync is managed in **Project settings → Git**. Do not force-push or rewrite synced history. The intended repository is [vera-lovelace/builders-galaxy](https://github.com/vera-lovelace/builders-galaxy); a public unauthenticated check returned **404 on 16 November 2026**, so public visibility, remote contents, and sync status could not be verified. A public app does not imply a public repository. Check repository visibility in GitHub and sync status in Lovable before announcing the source as publicly available.

## Licensing and credits

- **Code:** [MIT](LICENSE), permitting commercial reuse subject to its notice requirements.
- **Question and tip wording:** [CC BY-NC 4.0](src/data/LICENSE.md), permitting attributed **non-commercial** sharing/adaptation. This restriction means the content is not open source in the unrestricted commercial-use sense.
- Original sources retain their rights; our content licence grants no rights to their original material. Attribution includes Pragmatic Institute and Lenny's Newsletter/Podcast. The project is not affiliated with or endorsed by them.
- Third-party packages and assets retain their respective licences; do not assume the code licence covers every external work.

Support the developers at [buymeacoffee.com/caldaily](https://buymeacoffee.com/caldaily).


