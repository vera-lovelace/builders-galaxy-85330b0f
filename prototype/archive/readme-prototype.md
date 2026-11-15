# 🚀 Builder's Galaxy

**Explore product management. Level up your skills. Build better products.**

Builder's Galaxy is a gamified product-management learning experience designed to make practical PM knowledge more accessible, engaging, and measurable.

Through interactive quizzes, arcade-style mini-games, and expert-informed learning content, players explore 12 essential product-management disciplines, discover their knowledge gaps, and strengthen their ability to make better product decisions.

The mission is simple: turn product knowledge into practical capability.

---

## 🌌 The Concept

Product-management knowledge is often fragmented, theoretical, and difficult to translate into real-world decisions. Traditional training can be time-consuming, passive, and difficult to personalize.

Builder's Galaxy explores a more engaging approach: short, interactive learning experiences that combine technology, gamification, and the knowledge of experienced practitioners.

Players travel across 12 planets, each representing an essential product-management discipline.

## 🪐 Explore the 12 PM Planets

| Planet | Product Management Discipline |
|---|---|
| 01 | Problem Framing |
| 02 | User Discovery |
| 03 | Product Promise |
| 04 | Prototype Testing |
| 05 | MVP Specification |
| 06 | Build Planning |
| 07 | Business Model |
| 08 | Go-to-Market Strategy |
| 09 | Metrics & Adoption |
| 10 | Demo & Prioritization |
| 11 | Commercial Case |
| 12 | Pitch Build |

## 🎮 Game Features

### 1. Builder's Galaxy Quiz: the voyage

A rocket flies from Earth through the 12 planets. On each planet, players answer two multiple-choice questions.

- 24 questions in a run, two per planet. The player gets one at the level they picked (Newbie, Beginner, Advanced or Pro) and one at the next level up.
- Four answers per question, with a 60-second timer drawn as an orbit around the planet. Players can pause it.
- Immediate feedback with an explanation and its source.
- 100 XP for every correct answer, with no speed bonus. The maximum is 2,400 XP.
- Results: XP, score, time (paused time excluded), assessed level, a skill map of all 12 planets, and the three planets to explore next.
- **Lenny's tips:** after answering, and on every planet in the results, a button opens practical tips from Lenny's Newsletter and Podcast, easiest first.
- **What's next?:** after the leaderboard, players can share, copy or download their results (Markdown or JSON). They can also vote on which feature to build next.

### 2. Catch the Product!

A fast-paced emoji-catching arcade mini-game. *(Built in Lovable; not part of the coded prototype in this repo.)*

Catch product-management-related emojis while avoiding irrelevant objects.

- Three levels, each lasting 60 seconds.
- Level 1: User Discovery.
- Level 2: Product Building.
- Level 3: Product Strategy & Growth.
- Correct catch: +1 point.
- Incorrect catch: -1 point.
- Increasing difficulty and falling speed.
- Positive and negative sound effects.
- Keyboard and touchscreen controls.

### 3. Workshop Leaderboard

Compare your run with other players.

- Nickname-based participation with workshop room codes.
- XP rankings, with a completion-time tie-breaker.
- **For now the game is single-player:** your result is ranked among labelled sample players. A live shared leaderboard and multiplayer need a backend and come later.

### 4. Voice mode (in development)

An opt-in voice mode, built with an ElevenLabs voice agent in Lovable:
- It reads each question and accepts spoken answers.
- The game itself checks answers. The agent never sees the correct option in advance.
- Voice mode is untimed, and everything spoken also appears on screen as text.

### 5. Personalized Learning

Builder's Galaxy aims to help players understand not only what they know, but what they should learn next.

Future possibilities include:
- AI-assisted learning recommendations.
- Personalized practice exercises.
- Scenario-based product challenges.
- Expert-curated learning paths.

---

## 🤖 AI + Human Expertise

Builder's Galaxy combines technology with the experience of product practitioners.

**AI helps to:**
- Identify knowledge gaps.
- Personalize learning recommendations.
- Explain product-management concepts.
- Turn expert insights into reusable learning experiences.

**Expert partnerships help to:**
- Contribute practical questions and scenarios.
- Validate learning content.
- Share real-world product-management experience.
- Bring the game to professional communities, universities, and startup ecosystems.

The ambition is to create a learning flywheel: experts contribute knowledge, technology makes it accessible, and learners provide feedback that improves the experience.

---

## 🌍 Mission & Social Impact

Builder's Galaxy aims to democratize access to practical product-management knowledge.

Potential areas of impact include:

- **Digital skills:** Making product-management education more accessible.
- **Employability:** Helping people develop capabilities relevant to digital careers.
- **Entrepreneurship:** Encouraging better problem discovery and product validation.
- **Inclusive innovation:** Supporting people from diverse backgrounds in building user-centered solutions.
- **Better products:** Promoting evidence-based product decisions that create meaningful value.

### North Star Metric

**Learning Improvement Rate**

The percentage of learners who demonstrate measurable improvement in product-management knowledge and decision-making between baseline and follow-up assessments.

The goal is to measure learning outcomes, not just game participation.

---

## 🛠️ Technology & Architecture

The project is designed around a lightweight, modular architecture.

| Layer | Technology / Approach |
|---|---|
| Design | Claude Design |
| AI-assisted development | Claude Pro |
| Application development | Lovable (coded prototype in this repo) |
| Voice | ElevenLabs conversational agent |
| Backend and database | Supabase |
| Version control | GitHub |
| Learning content | Curated question bank and Lenny's tips, each with sources |
| Game experience | Interactive quiz voyage and arcade mini-game |

*The final implementation and technology choices may evolve as the MVP develops.*

---

## 🚀 MVP Scope

The current beta focuses on:

- 12 PM disciplines, 24 questions per run from a 48-question bank.
- A 60-second timer with pause.
- XP and scoring mechanics.
- Nickname-based onboarding.
- Results, a skill map and learning recommendations, with Lenny's tips.
- Exporting results, and a vote on future features.
- A leaderboard against sample players.
- Accessibility from the start, and an opt-in voice mode.
- A three-level emoji-catching game (in Lovable).

The MVP deliberately avoids unnecessary complexity such as account registration, paid subscriptions, multiplayer, multiple languages and runtime AI-generated questions.

**Features players can vote on (not built yet):** build your own trivia from your own questions, PM job search tips, chatting with the sources, and playing live against the room.

---

## ♿ Accessibility

Accessibility is designed in, not added afterwards, and the plan is to test with disabled players.

- Targets WCAG 2.2 AA. All touch targets are at least 48 px. Correct and incorrect answers are always shown with an icon and words, never colour alone.
- The timer can be paused, and voice mode is untimed.
- The game works with a keyboard alone. Answer shortcuts (1–4, A–D) work only while you're in the question.
- Screen readers start on each new question, and the timer speaks only at 10 seconds left and when paused or resumed.
- Pop-ups never open on their own, and focus returns to where you were when they close.
- Reduced-motion settings are respected: the rocket jumps to its destination instead of flying.

---

## 📚 Content Sources

All questions, explanations and tips paraphrase their sources; no source text is reproduced. Each item links to its source, where it has one.

**Question bank** (`src/data/questions.json`): 48 questions, one per level for each of the 12 disciplines.
- 34 are based on Pragmatic Institute's *[Product Professionals' Guide to the Pragmatic Framework](https://www.pragmaticinstitute.com/product/framework/)*.
- 14 are based on a *Product Management Skills Matrix* (unattributed, no public link).

**Lenny's tips** (`src/data/lenny-tips.json`): 93 tips from 30 episodes and articles of [Lenny's Newsletter and Podcast](https://www.lennysnewsletter.com/).
- The sources include Rob Snyder on finding product-market fit, Jen Abel on enterprise sales, Jessica Fain on influence, Jason Cohen on growth stalls, Tal Raviv on the PM role, and Cat Wu on how Anthropic's product team works.
- Each tip shows its source title and link in the game.
- The tips are never asked as quiz questions.

**Earlier bank:** the first question bank and its source register are archived in `archive/`.

Lenny's Newsletter, Lenny's Podcast and Pragmatic Institute own their original content. This project is an independent learning game and isn't affiliated with or endorsed by them.

---

## ⚖️ Licence

Builder's Galaxy is open source.

- **Code:** [MIT](LICENSE).
- **Content:** the wording of the questions, explanations and tips is licensed [CC BY-NC 4.0](src/data/LICENSE.md). You may share and adapt it with credit, for non-commercial use.
- **Sources:** the ideas behind the content come from the sources listed above, whose owners keep all rights.

In the game, the **About** page (from the About link on the Welcome screen and on Results) explains the licences, every content source, the accessibility statement and privacy.

---

## 💻 Running the Prototype

This repository holds the coded prototype and design system that Lovable builds from: React, Vite, TypeScript and Tailwind.

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build
```

- **Product brief:** `PRODUCT.md`
- **Design system:** `DESIGN.md`
- **Handoff spec:** `design/LOVABLE.md`, with change requests in `design/LOVABLE-UPDATE.md`
- **Screenshots:** `design/screens/`, at phone (390 px) and laptop (1440 px) sizes
- **Guidance for AI coding agents:** `AGENTS.md`

---

## 🗺️ Product Roadmap

**Phase 1 — Build the Galaxy**
- Establish the visual identity.
- Implement onboarding and the 12-planet map.
- Build the quiz and scoring system.

**Phase 2 — Make Learning Playful**
- Introduce Catch the Product!
- Add sound effects and increasing difficulty.
- Improve results and topic-level feedback.

**Phase 3 — Connect the Community**
- Add persistent player sessions.
- Introduce workshop room codes.
- Launch the live shared leaderboard and multiplayer.

**Phase 4 — Expand Learning Impact**
- Introduce AI-assisted personalization.
- Invite expert contributors.
- Partner with product communities and educational organizations.
- Measure learning improvement and real-world skill application.

---

## 🤝 Get Involved

Builder's Galaxy is built around the idea that better products emerge from shared knowledge.

Potential contributors include:
- Product managers and product leaders.
- UX researchers and designers.
- Product coaches and educators.
- Startup founders.
- Universities and learning communities.
- Organizations supporting digital skills and employability.

Ideas, feedback, practical scenarios, and expert contributions are welcome.

---

## 📌 Project Status

**Status:** MVP in development.

Builder's Galaxy is an evolving experiment in making product-management education more engaging, practical, and accessible.

---

**Let's make product learning a journey worth exploring.**

🚀 Welcome to Builder's Galaxy!