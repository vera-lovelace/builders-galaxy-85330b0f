# Builders Galaxy

Build the Builder's Galaxy MVP in this project using the attached Claude prd and designs as the visual source of truth.

First, inspect the supplied designs and project structure. Implement the six core screens and reusable components: Welcome, Onboarding, Galaxy, Question, Results, and Leaderboard.

Use the supplied questions.json as the only question source. Do not generate questions, browse external archives, connect MCP servers, connect GitHub, connect Supabase, add authentication, or add paid services.

For this first phase, use local/mock data only. Implement the visual experience and basic navigation, keeping the game logic modular so persistent storage and a shared leaderboard can be added later.

Preserve the supplied visual direction. Prioritize a polished, responsive workshop experience. Avoid unnecessary dependencies, elaborate animations, extra pages, and features outside the MVP.

Before making large changes, summarize the implementation plan and identify any missing assets. Work in small, verifiable steps and avoid rebuilding parts that already work.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://builders-galaxy.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eb1b10bb-8e9d-4ce1-8b3f-deb21bf5fa55).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
