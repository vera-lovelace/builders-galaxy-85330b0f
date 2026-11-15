# Builder's Galaxy: coded design prototype

This folder holds the coded prototype and design work that the Lovable app (the rest of this repository) was built from. It is **reference only**: the app in `src/` and the documents at the repository root are the source of truth, and they win wherever they differ from anything here.

## What's here

| Path | What it is |
|---|---|
| `src/` | The prototype app (React, Vite, TypeScript, Tailwind). Not built or linted with the main app. |
| `design/screens/` | Reference screenshots, phone (390 px) and desktop (1440 px), from the prototype. |
| `design/LOVABLE.md` | The original handoff spec: screens, tokens, components, the Galaxy motion. |
| `design/LOVABLE-UPDATE.md`, `design/lovable-u3.md` | The prompts sent to Lovable, rounds 1 to 3. |
| `design/elevenlabs-agent.md` | The ElevenLabs voice agent spec: system prompt, first message, client tools, question data, and the test script. |
| `DESIGN.md`, `PRODUCT.md`, `AGENTS.md` | The prototype-era design system, product brief and agent guidance. The root versions are newer. |
| `.impeccable/` | Design-review record: the direction contract and the design-system data. |
| `archive/` | The first question bank, its source register, the pre-review overview images and the prototype-era README. |

## Running it

```bash
cd prototype
npm install
npm run dev
```

It is a separate app with its own `package.json`. The main app's build, lint, tests and formatting ignore this folder.

## Licence

The repository's root licences apply: the code is under the MIT licence (`LICENSE`), and the content wording is under CC BY-NC 4.0 (`src/data/LICENSE.md`).
