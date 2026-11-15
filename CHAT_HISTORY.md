# Builder's Galaxy — chat history summary

Chronological record of requests and outcomes in this project (as of 15 Nov 2026).

1. **MVP build** — Six screens (Welcome, Onboarding, Galaxy, Question, Results, Leaderboard) from supplied PRD/designs. Local/mock data only, questions only from questions.json, no auth/backend/MCP/GitHub/paid services. Verified at 1440px and 390px.
2. **Timer 30s + Pause button** — later superseded by Prompt 1.
3. **Design-fix review** — Gap analysis of Welcome, Question, Galaxy, Results, Leaderboard, tokens.
4. **Do not enable Cloud** — confirmed; still disabled.
5. **Credits question** — estimated 2–5 credits for the design phases.
6. **Voice options** — Web Speech API, AI Gateway TTS, ElevenLabs real-time agent. MCPs are dev-time only.
7. **Narrator + eyes-free agent plan** — designed; ElevenLabs connection declined; postponed.
8. **Prompts 1–5 + content fixes** — 60s timer, fixed 100 XP, no speed bonus, paused time excluded, coral ring at 10s, ties to shorter run; new 48-question bank (picked level + next level per planet); 93 Lenny tips in an accessible dialog; source links; scoped 1–4/A–D keys; focused question heading; single polite live region; What's next dialog with on-device Share/Copy/Markdown/JSON; flight/podium tokens, 48px back buttons. Tests added (rules, clock, exports).
9. **Portable memory + PROJECT_HANDOVER.md** created.
10. **DESIGN.md / PRODUCT.md / LOVABLE-UPDATE.md review** — flagged doc and design gaps; user said skip voice and Cloud, do all other design changes. Round-2 desktop/mobile screenshots applied.
11. **Welcome orbit** — clarified "two graphs" was one arch; replaced with one vertical line; rocket moved to the bottom, launching upward.
12. **Lenny's tips button** moved under the planet's stop/question label.
13. **What's next button** — now always visible on Results and Leaderboard; exports disabled without a run.
14. **Credits** — 44 of a 150 budget used at that point.
15. **About page (lovable-u3.md)** — Welcome promise copy, /about with generated source lists, MIT + CC BY-NC 4.0 licence files. Tested at 200% zoom, keyboard and screen-reader tree; fixed heading focus outline. Added NVDA/VoiceOver statement with honest known gaps.
16. **ElevenLabs voice agent** — sharing/transfer explained (workspace members can use it; connections and secrets don't move between workspaces). Agent ID `agent_9101m7gm0xw6e59sjgm71sxkfhrf` (public) wired via `src/components/VoiceAgent.tsx`: "Voice guide" button under Pause with selectOption, repeatQuestion, nextQuestion, pauseTimer, resumeTimer. Live session not yet tested.
17. **Keeping the domain** — move the project between workspaces to keep `builders-galaxy.lovable.app`, or free the subdomain here and claim it in the new project.

18. **Voice agent check** — agent published; test browser reached ElevenLabs and joined a session, but speech and the five actions were not heard or seen (no mic/speakers). Credits: 56 of 150 used.
19. **LinkedIn job search** — the LinkedIn connector can't search jobs (no official job search API); suggested JSearch, Adzuna or similar.
20. **Job search beta plan** — live jobs + ElevenLabs voice guide chosen.
21. **About page** — voice guide now described as available for up to 10 minutes per session (Accessibility and Privacy).
22. **Job search beta built (/jobs)** — JSearch via RapidAPI (key kept on the server, 15-min cache), suggested keywords, "Best performing this session" ranked by real result counts, location/remote/date filters, details, Apply links, paging. "Job search beta" button on Results. "Voice search guide" with searchJobs, selectKeyword, describeJob, filterResults, nextPage; ends after 10 minutes. RapidAPI key form was closed, so live search is not on yet.
23. **Job search setup page (/jobs-setup)** — five steps: JSearch key (shows live connected status), public agent, the five actions table, agent instructions, try it. Linked from /jobs.

## Open items
- Feature voting: disabled (Cloud stays off).
- Human review: real NVDA/VoiceOver testing and content/source accuracy.
- Test the voice guide live; update About page voice/privacy wording once confirmed.
- Add the RapidAPI JSearch key, then test a live job search.
- Add the five job search actions to the ElevenLabs agent and test the voice search guide.
- The game's Voice guide doesn't stop at 10 minutes yet; only the job search one does.
