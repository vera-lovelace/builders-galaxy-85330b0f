# Builder's Galaxy PM question bank: content sources

> **Archived 2026-11-15.** Describes the first question bank (`archive/questions-v1.json`). The game now uses `src/data/questions.json` and `src/data/lenny-tips.json`.

Companion to `questions.json` (48 questions, 12 topics, 27 Lenny's Newsletter and Lenny's Podcast sources). Prepared 12 November 2026.

## Contents

1. [[#Scope and decisions]]
2. [[#Methodology]]
3. [[#Topic framework and principles]]
4. [[#Source register]]
5. [[#Coverage matrix]]
6. [[#Quality-control results]]
7. [[#Data-quality notes]]
8. [[#Limitations]]

## Scope and decisions

- **Question count.** The brief specified both 24 and 48 questions. Following the commissioning decision, the bank contains 48 questions: four per topic across the 12 Builder's Galaxy topics.
- **Domain field.** Each question carries one additional key, `domain`, placed after `topicId`, holding one of the six reporting categories. All other keys follow the specified schema exactly.
- **Evidence base.** Only the public starter pack of Lenny's Data was available (10 newsletter posts and 50 podcast transcripts). The paid archive was not accessed, and no source outside the starter pack is cited.
- **Option format.** Every question has exactly one correct answer, two half-truths and one clearly incorrect option. Explanations refer to options by content, so the game may shuffle option order without breaking them.

## Methodology

### Use of the Product Management Skills Matrix

The attached Skills Matrix served as the primary content blueprint. Its four quadrants and twenty disciplines were extracted in full:

| Quadrant | Disciplines |
|---|---|
| Knowledge | Target Market; Market Needs; Product Knowledge; Technical Knowledge; Competitive Knowledge |
| Product Management Experience & Skills | Methodology & Process; Market and Evidence Based; Driven by Self-Opinion; Operate at a Senior Level; Organisational Skills |
| Commercial Acumen | Managing Products as a Business; Building Business Cases; Pricing Skills; Product Marketing Skills; Analytical Skills |
| Other Key Skills | Collaborative Working; Negotiation Skills; Prioritisation Capabilities; Communication Skills; Leadership Skills |

Each topic was mapped to the disciplines it exercises (see the topic framework below), and every question records the discipline it addresses in the coverage matrix. The Matrix's five rating bands (1-2 little or no knowledge; 3-4 limited, often seeking support; 5-6 adequate, able to get the job done; 7-8 fully competent; 9-10 best practitioner) informed the difficulty definitions. Driven by Self-Opinion is a discipline the Matrix wants reduced, so questions that test it reward evidence over attachment to an idea. All twenty disciplines are covered at least once.

### Use of the Pragmatic Framework

The brief refers to a 'Pragmatic Product Capability Assessment'; the attached document is the *Product Professionals' Guide to the Pragmatic Framework* (refreshed for 2027). It organises product work into 7 categories (Market, Focus, Business, Planning, Go-to-Market, Enablement, Operations) and 37 focus areas, and its team worksheet rates each focus area as strong, partial or gap. The guide states that the worksheet is not a validated diagnostic, so it was used as an organising framework only. Its focus areas were mapped to the 12 topics and recorded per question as the capability area addressed. Its distinction between understanding a market problem, deciding where to invest and executing was used, together with the Matrix bands, to separate foundational knowledge from applied judgement and strategic capability. Operations focus areas (Scaling, Exceptions, Escalations, Customer Value Realization) are only lightly represented because the 12 topics stop at metrics and adoption.

### Search and selection in Lenny's dataset

1. The repository `LennysNewsletter/lennys-newsletterpodcastdata` was cloned on 11 November 2026 (commit `dcac7d0`). Its README confirms it is the public starter pack, and `index.json` lists 10 newsletters and 50 podcasts.
2. Topic keywords (for example problem, discovery, prototype, MVP, PRD, pricing, distribution, retention, metric, demo, prioritisation, pitch, story, influence) were counted per file to locate concentrations of relevant material.
3. Candidate files were read at the relevant passages, and in full where a source was used for several questions, to extract principles in context.
4. Sources were preferred when they offered a concrete, practical scenario; a guest's own words were preferred over the host's summaries; and breadth across guests was preferred over repeated use of a single episode. The final bank draws on 27 sources (24 podcasts and 3 guest newsletter posts), with no source supporting more than six questions.

### Verification

- **Evidence.** Each question is tied to two to four exact passages in its source file (173 in total). An automated check confirmed that every passage appears verbatim in the cited file, and the coverage matrix records where each appears (podcast timestamps or newsletter section headings).
- **Paraphrase.** Questions and explanations paraphrase the sources; no source text is reproduced beyond framework names and short terms such as 'pull', 'Hail Mary', 'barrels and ammunition' and 'elephant curve'.
- **URLs and titles.** Every `sourceUrl` was confirmed in lennysnewsletter.com search results on 11 and 12 November 2026. Where the dataset's title differs from the title shown on the live page, the live title is used in `questions.json` and both are recorded in the source register. Typographic apostrophes and quotation marks in titles were normalised to straight characters.
- **Authors.** Podcast guests come from the dataset's `guest` field; the three newsletter authors (Colin Matthews, Aman Khan and Jorge Mazal) were taken from each post's introduction, because the dataset gives no author for newsletters.

### Difficulty assignment

| Difficulty | Definition | Indicative band |
|---|---|---|
| Easy | Recognise a principle the source states plainly, applied to a simple scenario; the half-truths are plausible but answerable from the principle alone. | Skills Matrix 3-6; foundational knowledge |
| Medium | Apply the principle where a half-truth captures a genuinely valid point that is incomplete or misapplied in this scenario. | Skills Matrix 5-8; applied judgement |
| Hard | Weigh competing considerations, transfer the principle to a less familiar situation, or handle a quantitative, causal or strategic nuance. | Skills Matrix 7-10; strategic capability |

Each topic contains one easy, two medium and one hard question (12 easy, 24 medium, 12 hard overall). These bands are design intentions and have not been calibrated against player data.

### Domain assignment

The six reporting domains overlap for Build Planning and Demo & Prioritization. Each question was assigned the single domain matching its main learning objective:

| Domain | Topics included | Questions |
|---|---|---|
| `discovery-insight` | problem-framing, user-discovery | 8 (problem-framing-01, problem-framing-02, problem-framing-03, problem-framing-04, user-discovery-01, user-discovery-02, user-discovery-03, user-discovery-04) |
| `strategy-positioning` | business-model, commercial-case, product-promise | 12 (product-promise-01, product-promise-02, product-promise-03, product-promise-04, business-model-01, business-model-02, business-model-03, business-model-04, commercial-case-01, commercial-case-02, commercial-case-03, commercial-case-04) |
| `execution-validation` | build-planning, mvp-specification, prototype-testing | 10 (prototype-testing-01, prototype-testing-02, prototype-testing-03, prototype-testing-04, mvp-specification-01, mvp-specification-02, mvp-specification-03, mvp-specification-04, build-planning-01, build-planning-02) |
| `prioritization-delivery` | build-planning, demo-prioritization | 4 (build-planning-03, build-planning-04, demo-prioritization-03, demo-prioritization-04) |
| `growth-measurement` | go-to-market, metrics-adoption | 8 (go-to-market-01, go-to-market-02, go-to-market-03, go-to-market-04, metrics-adoption-01, metrics-adoption-02, metrics-adoption-03, metrics-adoption-04) |
| `communication-influence` | demo-prioritization, pitch-build | 6 (demo-prioritization-01, demo-prioritization-02, pitch-build-01, pitch-build-02, pitch-build-03, pitch-build-04) |

Build Planning questions about specifying and sequencing the build (build-planning-01, -02) sit in `execution-validation`; those about team shape and ownership (-03, -04) sit in `prioritization-delivery`. Demo questions (demo-prioritization-01, -02) sit in `communication-influence`; prioritisation questions (-03, -04) sit in `prioritization-delivery`. `prioritization-delivery` therefore has four questions, the fewest; it is the natural first domain to expand.

## Topic framework and principles

Three practical principles were extracted for each topic. Each principle is paraphrased and attributed to the source(s) in parentheses.

### Problem Framing (`problem-framing`)

- **Primary domain(s):** `discovery-insight`
- **Skills Matrix:** Knowledge: Market Needs, Target Market; PM Experience: Market and Evidence Based (and reducing Driven by Self-Opinion)
- **Pragmatic Framework:** Market: Market Problems, Product Strategy, Competitive Landscape
- **Sources used:** Tony Fadell; Rob Snyder; Jorge Mazal; Josh Woodward

1. Frame a problem as a specific person's urgent, blocked project: a Project, an Unavoidable reason to act now, a List of options considered, and Limitations that leave the person stuck (Snyder).
2. Start from a pain people live with today, often a legacy of an earlier product's technical limits, and only then ask whether new technology can remove it (Fadell).
3. Commit to the problem while holding solutions loosely, and test whether a borrowed solution's success will translate to your own context before adopting it (Woodward; Mazal).

### User Discovery (`user-discovery`)

- **Primary domain(s):** `discovery-insight`
- **Skills Matrix:** Knowledge: Market Needs; Other Skills: Communication Skills (listening and questioning); PM Experience: Market and Evidence Based
- **Pragmatic Framework:** Market: Market Problems, Win/Loss Analysis; Planning: Buyer Personas
- **Sources used:** Rob Snyder; Jen Abel; Jason Cohen

1. Read discovery through behaviour: leaning in and trying to buy signal pull, whereas polite interest that defers action does not (Snyder).
2. Keep first conversations about the customer, informal and unscripted, with no demo, slides, recorder or checklist questions (Abel).
3. Probe beneath stated reasons such as 'too expensive', and revise the hypothesis after small batches of conversations instead of persisting (Cohen; Snyder).

### Product Promise (`product-promise`)

- **Primary domain(s):** `strategy-positioning`
- **Skills Matrix:** Commercial Acumen: Product Marketing Skills (positioning and messaging), Pricing Skills; Knowledge: Product Knowledge
- **Pragmatic Framework:** Planning: Positioning, Ideation; Go-to-Market: Customer Satisfaction
- **Sources used:** Jenny Wen; Jason Cohen; Mark Pincus; Rob Snyder

1. Promise more of what the customer values, such as growth, because a savings frame caps both perceived value and price (Cohen).
2. When releasing early, label the release and keep a visible promise to iterate; trust is lost when nothing follows an early launch (Wen).
3. Make the promise repeatable: treat the novel 'reason to try' as a bet with alternatives ready, and build around one case study that customers endorse before and after buying (Pincus; Snyder).

### Prototype Testing (`prototype-testing`)

- **Primary domain(s):** `execution-validation`
- **Skills Matrix:** PM Experience: Market and Evidence Based, Methodology & Process; Knowledge: Technical Knowledge
- **Pragmatic Framework:** Planning: Ideation, Requirements, User Personas
- **Sources used:** Josh Woodward; Andrew Ambrosino; Colin Matthews; Jenny Wen

1. Choose the medium for the question: documents for clarity on vague areas, prototypes for stress-testing interactions, and caution about over-anchoring on polished explorations (Ambrosino).
2. Judge early prototypes by live reactions, and for AI features test with the real model on users' own use cases, since non-deterministic states cannot all be mocked (Woodward; Wen).
3. Build test prototypes in small, specific, planned batches, asking the tool to reason before it codes (Matthews).

### MVP Specification (`mvp-specification`)

- **Primary domain(s):** `execution-validation`
- **Skills Matrix:** PM Experience: Methodology & Process; Knowledge: Product Knowledge, Technical Knowledge, Competitive Knowledge; Commercial Acumen: Analytical Skills
- **Pragmatic Framework:** Planning: Requirements; Business: Measurement; Focus: Product Roadmap
- **Sources used:** Aishwarya Naresh Reganti and Kiriti Badam; Mark Pincus; Aman Khan; Tulsee Doshi

1. Specify AI products to start with high human control and low agency, widening autonomy as behaviour is calibrated (Reganti and Badam).
2. Copy proven patterns, on the same platform and for the same audience, for everything the team is not innovating on (Pincus).
3. Define 'good' with a small, human-labelled eval set, and build partly ahead of current model capability using a 60/20/20 split (Khan; Doshi).

### Build Planning (`build-planning`)

- **Primary domain(s):** `execution-validation / prioritization-delivery`
- **Skills Matrix:** PM Experience: Organisational Skills, Methodology & Process; Other Skills: Prioritisation Capabilities, Leadership Skills
- **Pragmatic Framework:** Focus: Product Roadmap; Planning: Requirements, Stakeholder Management
- **Sources used:** Lazar Jovanovic; Zevi Arnovitz; Roman Ugarte; Tom Verrilli

1. Plan before executing with AI agents: explore, write source-of-truth documents and a task list, and execute one task at a time (Jovanovic; Arnovitz).
2. For a zero-to-one build, a small isolated team with one objective and a short timebox can make the many daily decisions a long-horizon plan cannot (Ugarte).
3. Plan around outcomes that must be true, with one accountable owner for each, including priorities that sit unowned across teams (Verrilli).

### Business Model (`business-model`)

- **Primary domain(s):** `strategy-positioning`
- **Skills Matrix:** Commercial Acumen: Managing Products as a Business, Pricing Skills; Knowledge: Target Market (trends)
- **Pragmatic Framework:** Business: Business Plan, Pricing, Business Outcomes; Market: Product Strategy
- **Sources used:** Jason Cohen; Peter Sellis; Benedict Evans

1. Price selects the market; keep testing upwards while customer behaviour does not change (Cohen).
2. Expansion revenue tied to delivered value, reflected in net revenue retention above 100%, is needed to outrun churn (Cohen).
3. Product and market structure constrain monetisation, from where ads can appear in a core flow to whether a commoditised offer can sustain margins (Sellis; Evans).

### Go-to-Market (`go-to-market`)

- **Primary domain(s):** `growth-measurement`
- **Skills Matrix:** Commercial Acumen: Product Marketing Skills, Analytical Skills; Other Skills: Collaborative Working
- **Pragmatic Framework:** Focus: Distribution Strategy; Go-to-Market: Marketing Plan, Growth, Launch, Organizational Alignment, Awareness
- **Sources used:** Evan Spiegel; Hector Serrano; Cat Wu; Jason Cohen

1. Treat distribution as a first-order problem alongside product-market fit, because consumer attention is far harder to win than when app stores were new (Spiegel).
2. Use paid acquisition early, within budget, as a fast test of whether messaging converts cold traffic into paying users (Serrano).
3. Expect channels to saturate and sag, and give launches a repeatable cross-functional path so speed of shipping reaches the market (Cohen; Wu).

### Metrics & Adoption (`metrics-adoption`)

- **Primary domain(s):** `growth-measurement`
- **Skills Matrix:** Commercial Acumen: Analytical Skills, Managing Products as a Business; PM Experience: Market and Evidence Based
- **Pragmatic Framework:** Business: Measurement, Business Outcomes; Go-to-Market: Retention; Enablement: Adoption
- **Sources used:** Jason Cohen; Amol Avasare; Fiona Fung; Jorge Mazal

1. Know the structural ceiling that churn imposes: new customers per period divided by the cancellation rate (Cohen).
2. Treat early activation as a major lever on retention, and recognise that well-designed friction can raise it (Avasare).
3. Keep metrics honest by revisiting proxies that drift from their outcomes and by treating correlations as hypotheses to test (Fung; Mazal).

### Demo & Prioritization (`demo-prioritization`)

- **Primary domain(s):** `communication-influence / prioritization-delivery`
- **Skills Matrix:** Other Skills: Prioritisation Capabilities, Communication Skills (presentation), Leadership Skills; Commercial Acumen: Analytical Skills
- **Pragmatic Framework:** Focus: Product Roadmap, Product Portfolio; Enablement: Assets; Go-to-Market: Engagement, Launch
- **Sources used:** Jen Abel; Cat Wu; Jorge Mazal; Keith Rabois

1. Demo the narrow slice of the product that carries most of the value for the priorities already learned (Abel).
2. Keep the narrative and the choice of demos as human decisions even when AI drafts the material (Wu).
3. Prioritise the lever with the greatest compounding effect and deliberately stop other work, within a capacity bounded by people who can drive initiatives end to end (Mazal; Rabois).

### Commercial Case (`commercial-case`)

- **Primary domain(s):** `strategy-positioning`
- **Skills Matrix:** Commercial Acumen: Building Business Cases, Pricing Skills, Managing Products as a Business; Other Skills: Negotiation Skills
- **Pragmatic Framework:** Business: Business Plan, Pricing, Business Outcomes
- **Sources used:** Jen Abel; Rob Snyder; Eric Ries

1. Anchor price on the value of getting the job done or the cost of the buyer's current alternative (Snyder).
2. Let price reflect sales-cycle economics, and co-author the ROI case with the champion, preferring step-ups to reflexive discounts (Abel).
3. Weigh long-run costs to trust and to channels against short-term ROI results before changing a defining practice (Ries).

### Pitch Build (`pitch-build`)

- **Primary domain(s):** `communication-influence`
- **Skills Matrix:** Other Skills: Communication Skills, Negotiation Skills; PM Experience: Operate at a Senior Level; Commercial Acumen: Building Business Cases
- **Pragmatic Framework:** Planning: Positioning, Stakeholder Management, Buyer Personas; Go-to-Market: Launch
- **Sources used:** Jessica Fain; Tony Fadell; Jen Abel

1. Re-establish context for time-poor executives, and show the options considered while keeping detailed proof in an appendix (Fain).
2. Lead with why the product matters, establish the pain truthfully, and refine the story by retelling it to people outside the project (Fadell).
3. For an executive sponsor, pitch a distinctive advantage they could describe to their board, beyond time savings (Abel).

## Source register

Dates are the episode or publication dates recorded in the dataset's `index.json`. 'Dataset file' is the path within the repository, linked to GitHub.

| # | Source title | Author or guest | Type | Date | Topics covered | Key principle used | Questions supported | Dataset file |
|---|---|---|---|---|---|---|---|---|
| 1 | [Father of the iPod and iPhone on building taste, judgment, and creativity in the AI era](https://www.lennysnewsletter.com/p/father-of-the-ipod-and-iphone-on) | Tony Fadell | Podcast | 2026-06-07 | Problem Framing; Pitch Build | Start from pain, tell the why truthfully, and hone the product story by repeated retelling. | problem-framing-01, pitch-build-02 | [`podcasts/tony-fadell.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/tony-fadell.md) |
| 2 | [An 86-minute guide to finding PMF](https://www.lennysnewsletter.com/p/an-86-minute-guide-to-finding-pmf) | Rob Snyder | Podcast | 2026-10-25 | Problem Framing; User Discovery; Product Promise; Commercial Case | Pull exists when a specific person has an unavoidable project that current options cannot handle; sell to learn, anchor price on the project's value, and repeat one case study. | problem-framing-02, user-discovery-01, user-discovery-04, product-promise-04, commercial-case-02 | [`podcasts/rob-snyder.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/rob-snyder.md) |
| 3 | [How Duolingo reignited user growth](https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth) | Jorge Mazal | Newsletter (guest post) | 2023-02-28 | Problem Framing; Metrics & Adoption; Demo & Prioritization | Adapt borrowed features to context, model growth to find the highest-impact metric (CURR), treat correlations cautiously, and protect channels from over-use. | problem-framing-03, metrics-adoption-04, demo-prioritization-03 | [`newsletters/how-duolingo-reignited-user-growth.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/newsletters/how-duolingo-reignited-user-growth.md) |
| 4 | [Why every company now needs to think and operate like a lab team](https://www.lennysnewsletter.com/p/why-every-company-now-needs-to-think) | Josh Woodward | Podcast | 2026-10-11 | Problem Framing; Prototype Testing | Commit to problems over particular products, read early prototypes through people's reactions, and let teams call failing projects. | problem-framing-04, prototype-testing-01 | [`podcasts/josh-woodward.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/josh-woodward.md) |
| 5 | [How to close $100K+ enterprise deals, step by step](https://www.lennysnewsletter.com/p/how-to-close-100k-1m-deals-step-by) | Jen Abel | Podcast | 2026-08-23 [VERIFY] | User Discovery; Demo & Prioritization; Commercial Case; Pitch Build | Enterprise deals depend on executive-level value, a candid first call, narrow demos co-designed with a champion, and pricing consistent with the sales cycle. | user-discovery-02, demo-prioritization-01, commercial-case-01, commercial-case-03, pitch-build-04 | [`podcasts/jen-abel-3.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/jen-abel-3.md) |
| 6 | [5 questions to ask when your product stops growing](https://www.lennysnewsletter.com/p/why-your-product-stopped-growing) | Jason Cohen | Podcast | 2026-01-25 | User Discovery; Product Promise; Business Model; Go-to-Market; Metrics & Adoption | Diagnose stalled growth in order: logo churn, pricing and positioning, net revenue retention, channel saturation, and whether growth is needed. | user-discovery-03, product-promise-02, business-model-01, business-model-03, go-to-market-04, metrics-adoption-01 | [`podcasts/jason-cohen.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/jason-cohen.md) |
| 7 | [The design process is dead. Here's what's replacing it.](https://www.lennysnewsletter.com/p/the-design-process-is-dead) | Jenny Wen | Podcast | 2026-03-01 | Product Promise; Prototype Testing | Early releases need a visible promise to iterate; AI features must be tested with real models and real use cases. | product-promise-01, prototype-testing-04 | [`podcasts/jenny-wen.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/jenny-wen.md) |
| 8 | [The hidden pattern behind successful products](https://www.lennysnewsletter.com/p/the-common-pattern-behind-successful) | Mark Pincus | Podcast | 2026-06-14 [VERIFY] | Product Promise; MVP Specification | Proven, Better, New: copy what is proven on the platform, make it better for all existing users, and treat the new idea as a likely-failing bet. | product-promise-03, mvp-specification-02 | [`podcasts/mark-pincus.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/mark-pincus.md) |
| 9 | [OpenAI Codex lead on the new shape of product work](https://www.lennysnewsletter.com/p/openai-codex-lead-on-the-new-shape) | Andrew Ambrosino | Podcast | 2026-06-28 | Prototype Testing | Pick the medium (document or prototype) for the point being made, and avoid over-anchoring on polished explorations. | prototype-testing-02 | [`podcasts/andrew-ambrosino.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/andrew-ambrosino.md) |
| 10 | [A guide to AI prototyping for product managers](https://www.lennysnewsletter.com/p/a-guide-to-ai-prototyping-for-product) | Colin Matthews | Newsletter (guest post) | 2025-01-07 | Prototype Testing | Prototype with AI through reflection, batching, specificity and checkpoints. | prototype-testing-03 | [`newsletters/a-guide-to-ai-prototyping-for-product-managers.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/newsletters/a-guide-to-ai-prototyping-for-product-managers.md) |
| 11 | [Why most AI products fail: Lessons from 50+ AI deployments at OpenAI, Google, and Amazon](https://www.lennysnewsletter.com/p/what-openai-and-google-engineers-learned) | Aishwarya Naresh Reganti and Kiriti Badam | Podcast | 2026-01-11 | MVP Specification | The agency-control trade-off: start AI products small with high human control and widen autonomy as behaviour is calibrated. | mvp-specification-01 | [`podcasts/aishwarya-naresh-reganti--kiriti-badam.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/aishwarya-naresh-reganti--kiriti-badam.md) |
| 12 | [Beyond vibe checks: A PM's complete guide to evals](https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete) | Aman Khan | Newsletter (guest post) | 2025-04-08 | MVP Specification | Evals define 'good' for AI products: start with one feature, a small labelled dataset and an iterated LLM judge. | mvp-specification-03 | [`newsletters/beyond-vibe-checks-a-pms-complete-guide-to-evals.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/newsletters/beyond-vibe-checks-a-pms-complete-guide-to-evals.md) |
| 13 | [Why PMs are suddenly valuable again](https://www.lennysnewsletter.com/p/what-it-actually-takes-to-build-frontier) | Tulsee Doshi | Podcast | 2026-11-08 | MVP Specification | Build roughly 60% that works now, 20% that nearly works and 20% aimed at where models are heading. | mvp-specification-04 | [`podcasts/tulsee-doshi.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/tulsee-doshi.md) |
| 14 | [The rise of the professional vibe coder (a new AI-era job)](https://www.lennysnewsletter.com/p/getting-paid-to-vibe-code) | Lazar Jovanovic | Podcast | 2026-02-08 | Build Planning | Spend most effort on planning; write PRDs and a task file, then execute one task at a time. | build-planning-01 | [`podcasts/lazar-jovanovic.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/lazar-jovanovic.md) |
| 15 | [The non-technical PM's guide to building with Cursor](https://www.lennysnewsletter.com/p/the-non-technical-pms-guide-to-building-with-cursor) | Zevi Arnovitz | Podcast | 2026-01-18 | Build Planning | A structured AI build workflow: issue, exploration, plan, execution, review, peer review, documentation. | build-planning-02 | [`podcasts/zevi-arnovitz.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/zevi-arnovitz.md) |
| 16 | [How we built Grok Bot in a month](https://www.lennysnewsletter.com/p/how-we-built-grok-bot-in-a-month) | Roman Ugarte | Podcast | 2026-09-08 | Build Planning | A small isolated team with one objective and a one-month timebox built a new product faster than a long-vision plan could. | build-planning-03 | [`podcasts/roman-ugarte.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/roman-ugarte.md) |
| 17 | [This CPO regrets that product management exists](https://www.lennysnewsletter.com/p/this-cpo-regrets-that-product-management) | Tom Verrilli | Podcast | 2026-08-02 | Build Planning | Plan around what needs to be true and assign a directly responsible individual to each outcome. | build-planning-04 | [`podcasts/tom-verrilli.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/tom-verrilli.md) |
| 18 | [90 minutes of unfiltered product advice from Snap and Discord's product chief](https://www.lennysnewsletter.com/p/90-minutes-of-unfiltered-product) | Peter Sellis | Podcast | 2026-09-20 | Business Model | Audience age, a camera-first flow and a messaging core structurally limit an ads business. | business-model-02 | [`podcasts/peter-sellis.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/peter-sellis.md) |
| 19 | [A rational conversation on where AI is actually going](https://www.lennysnewsletter.com/p/a-rational-conversation-on-where) | Benedict Evans | Podcast | 2026-05-31 | Business Model | If models remain competitive commodities, metered intelligence behaves like a low-margin utility and value moves up the stack. | business-model-04 | [`podcasts/benedict-evans.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/benedict-evans.md) |
| 20 | [Snapchat CEO: Why distribution has become the most important moat](https://www.lennysnewsletter.com/p/snapchat-ceo-why-distribution-is) | Evan Spiegel | Podcast | 2026-04-26 | Go-to-Market | Distribution is underweighted relative to product-market fit and has become the hardest problem in consumer technology. | go-to-market-01 | [`podcasts/evan-spiegel.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/evan-spiegel.md) |
| 21 | [How a 19-year-old intern built the growth engine behind this $2B AI company](https://www.lennysnewsletter.com/p/how-a-19-year-old-intern-built-the) | Hector Serrano | Podcast | 2026-11-01 | Go-to-Market | Use paid acquisition early as a fast, budgeted signal of message-market fit, and judge channels by conversion over views. | go-to-market-02 | [`podcasts/hector-serrano.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/hector-serrano.md) |
| 22 | [How Anthropic's product team moves faster than anyone else](https://www.lennysnewsletter.com/p/how-anthropics-product-team-moves) | Cat Wu | Podcast | 2026-04-23 | Go-to-Market; Demo & Prioritization | Shorten idea-to-user time with research previews and a standing launch process; the PM still decides narrative and priorities. | go-to-market-03, demo-prioritization-02 | [`podcasts/cat-wu.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/cat-wu.md) |
| 23 | [Head of Growth (Anthropic): "Claude is growing itself at this point"](https://www.lennysnewsletter.com/p/anthropics-1b-to-19b-growth-run) | Amol Avasare | Podcast | 2026-04-05 | Metrics & Adoption | Early activation is a top retention lever, and the right onboarding friction can raise it. | metrics-adoption-02 | [`podcasts/amol-avasare.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/amol-avasare.md) |
| 24 | [What happens after coding is solved?](https://www.lennysnewsletter.com/p/building-the-most-ai-pilled-engineering) | Fiona Fung | Podcast | 2026-06-21 | Metrics & Adoption | Check continually that a metric still serves the outcome it was chosen for. | metrics-adoption-03 | [`podcasts/fiona-fung.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/fiona-fung.md) |
| 25 | [Hard truths about building in the AI era](https://www.lennysnewsletter.com/p/hard-truths-about-building-in-the-ai-era) | Keith Rabois | Podcast | 2026-04-12 | Demo & Prioritization | Barrels and ammunition: the number of people who can drive initiatives end to end limits how much a company can do in parallel. | demo-prioritization-04 | [`podcasts/keith-rabois.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/keith-rabois.md) |
| 26 | [How to build a company that withstands any era](https://www.lennysnewsletter.com/p/how-to-build-a-company-that-withstands) | Eric Ries | Podcast | 2026-05-10 | Commercial Case | Short-term ROI experiments can erode a company's defining principles; principled choices can build durable trust. | commercial-case-04 | [`podcasts/eric-ries-2.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/eric-ries-2.md) |
| 27 | [The art of influence: The single most important skill that AI can't replace](https://www.lennysnewsletter.com/p/the-art-of-influence-jessica-fain) | Jessica Fain | Podcast | 2026-03-22 | Pitch Build | Influence executives by giving context, showing options considered, and treating stakeholder meetings as learning. | pitch-build-01, pitch-build-03 | [`podcasts/jessica-fain.md`](https://github.com/LennysNewsletter/lennys-newsletterpodcastdata/blob/main/podcasts/jessica-fain.md) |

### Title and URL variants

| Source | Title or URL in dataset | Title or URL used |
|---|---|---|
| Jenny Wen | Title: Jenny Wen | Title: The design process is dead. Here's what's replacing it. |
| Colin Matthews | URL: https://www.lennysnewsletter.com/p/a-guide-to-ai-prototyping-for-product-managers | URL: https://www.lennysnewsletter.com/p/a-guide-to-ai-prototyping-for-product (canonical form in search results) |
| Aishwarya Naresh Reganti and Kiriti Badam | Title: Aishwarya Naresh Reganti + Kiriti Badam | Title: Why most AI products fail: Lessons from 50+ AI deployments at OpenAI, Google, and Amazon |
| Aman Khan | URL: https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete-guide-to-evals | URL: https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete (canonical form in search results) |
| Tulsee Doshi | Title: Why PMs are suddenly valuable again | Live page heading seen earlier: What it actually takes to build frontier models; current listings use the dataset title, which is retained |
| Amol Avasare | Title: Anthropic's $1B to $19B growth run: how Claude became the fastest-growing AI product in history | Title: Head of Growth (Anthropic): "Claude is growing itself at this point" |
| Fiona Fung | Title: Building the most AI-pilled engineering team in the world | Title: What happens after coding is solved? |

Ten podcast entries had no `post_url` in the dataset (Spiegel, Wu, Avasare, Fain, Wen, Jovanovic, Cohen, Arnovitz, Reganti and Badam, Rabois). Their URLs were found through lennysnewsletter.com search results and are not inferred.

## Coverage matrix

| Topic | Question | Difficulty | Domain | Source | Skills Matrix competency | Pragmatic capability area | Evidence location |
|---|---|---|---|---|---|---|---|
| Problem Framing | problem-framing-01 | easy | `discovery-insight` | Tony Fadell | Knowledge: Market Needs | Market Problems | 00:22:25; 00:03:08; 00:23:32 |
| Problem Framing | problem-framing-02 | medium | `discovery-insight` | Rob Snyder | Knowledge: Market Needs | Market Problems | 00:11:42; 00:07:35; 01:24:20 |
| Problem Framing | problem-framing-03 | medium | `discovery-insight` | Jorge Mazal | PM Experience: Market and Evidence Based | Market Problems; Competitive Landscape | section "Phase 2: Referrals"; section "Time to regroup" |
| Problem Framing | problem-framing-04 | hard | `discovery-insight` | Josh Woodward | PM Experience: Driven by Self-Opinion (to be reduced) | Market Problems; Product Strategy | 00:15:00; 00:18:09 |
| User Discovery | user-discovery-01 | easy | `discovery-insight` | Rob Snyder | Other Skills: Communication Skills (listening and questioning) | Market Problems | 00:25:22; 00:26:55 |
| User Discovery | user-discovery-02 | medium | `discovery-insight` | Jen Abel | Other Skills: Communication Skills | Market Problems; Buyer Personas | 00:18:48; 00:00:25; 00:26:48; 00:30:05 |
| User Discovery | user-discovery-03 | medium | `discovery-insight` | Jason Cohen | Knowledge: Market Needs; Commercial Acumen: Analytical Skills | Win/Loss Analysis; Retention | 00:20:28; 00:23:31 |
| User Discovery | user-discovery-04 | hard | `discovery-insight` | Rob Snyder | PM Experience: Market and Evidence Based | Market Problems; Market Definition | 00:44:57; 00:31:15 |
| Product Promise | product-promise-01 | easy | `strategy-positioning` | Jenny Wen | Commercial Acumen: Product Marketing Skills | Positioning; Customer Satisfaction | 00:24:46; 00:25:49 |
| Product Promise | product-promise-02 | medium | `strategy-positioning` | Jason Cohen | Commercial Acumen: Product Marketing Skills; Pricing Skills | Positioning; Pricing | 00:45:23; 00:46:34; 00:46:00 |
| Product Promise | product-promise-03 | medium | `strategy-positioning` | Mark Pincus | Commercial Acumen: Product Marketing Skills (positioning) | Positioning; Ideation | 00:09:46; 00:10:21 |
| Product Promise | product-promise-04 | hard | `strategy-positioning` | Rob Snyder | Commercial Acumen: Managing Products as a Business | Positioning; Product Strategy | 01:15:45; 01:12:37; 01:15:03; 01:13:38 |
| Prototype Testing | prototype-testing-01 | easy | `execution-validation` | Josh Woodward | PM Experience: Market and Evidence Based | Ideation | 00:01:10; 00:15:00 |
| Prototype Testing | prototype-testing-02 | medium | `execution-validation` | Andrew Ambrosino | PM Experience: Methodology & Process | Ideation; Requirements | 00:07:05; 00:08:05; 00:09:51; 00:19:31 |
| Prototype Testing | prototype-testing-03 | medium | `execution-validation` | Colin Matthews | Knowledge: Technical Knowledge | Ideation | section "Reflection"; section "Batching"; section "Lost context"; section "Building a prototype from scratch" |
| Prototype Testing | prototype-testing-04 | hard | `execution-validation` | Jenny Wen | Knowledge: Technical Knowledge; PM Experience: Market and Evidence Based | Ideation; User Personas | 00:11:58 |
| MVP Specification | mvp-specification-01 | easy | `execution-validation` | Aishwarya Naresh Reganti and Kiriti Badam | PM Experience: Methodology & Process; Knowledge: Technical Knowledge | Requirements | 00:13:38; 00:14:33; 00:16:02 |
| MVP Specification | mvp-specification-02 | medium | `execution-validation` | Mark Pincus | Knowledge: Competitive Knowledge; Product Knowledge | Requirements; Competitive Landscape | 00:07:30; 00:05:40; 00:12:55; 00:08:32 |
| MVP Specification | mvp-specification-03 | medium | `execution-validation` | Aman Khan | Commercial Acumen: Analytical Skills | Requirements; Measurement | section "What’s next?"; section "Phase 1: Collection"; section "Phase 2: First-pass evaluation"; section "Common mistakes I’ve seen teams make when adopting evals:" |
| MVP Specification | mvp-specification-04 | hard | `execution-validation` | Tulsee Doshi | Knowledge: Technical Knowledge; PM Experience: Methodology & Process | Requirements; Product Roadmap | 00:33:30; 00:34:14 |
| Build Planning | build-planning-01 | easy | `execution-validation` | Lazar Jovanovic | PM Experience: Organisational Skills, Methodology & Process | Requirements | 00:13:12; 00:32:43; 00:37:53; episode description |
| Build Planning | build-planning-02 | medium | `execution-validation` | Zevi Arnovitz | PM Experience: Methodology & Process | Requirements; Stakeholder Management | 00:09:27; 00:16:26; 00:25:26 |
| Build Planning | build-planning-03 | medium | `prioritization-delivery` | Roman Ugarte | Other Skills: Leadership Skills; PM Experience: Organisational Skills | Product Roadmap; Stakeholder Management | 00:04:42; 00:05:29; 00:09:20 |
| Build Planning | build-planning-04 | hard | `prioritization-delivery` | Tom Verrilli | Other Skills: Prioritisation Capabilities; PM Experience: Organisational Skills | Product Roadmap; Stakeholder Management | 00:15:54; 00:16:28; 00:16:59 |
| Business Model | business-model-01 | easy | `strategy-positioning` | Jason Cohen | Commercial Acumen: Pricing Skills | Pricing | 00:38:19; 00:38:56 |
| Business Model | business-model-02 | medium | `strategy-positioning` | Peter Sellis | Commercial Acumen: Managing Products as a Business | Business Plan; Pricing | 00:22:02; 00:23:08; 00:24:18; 00:21:25 |
| Business Model | business-model-03 | medium | `strategy-positioning` | Jason Cohen | Commercial Acumen: Pricing Skills; Managing Products as a Business | Pricing; Retention; Business Outcomes | 00:55:42; 00:59:35; 00:54:00; 00:40:51 |
| Business Model | business-model-04 | hard | `strategy-positioning` | Benedict Evans | Knowledge: Target Market (trends); Commercial Acumen: Managing Products as a Business | Business Plan; Product Strategy | 00:32:36; 00:34:11; 00:36:18; 00:38:28 |
| Go-to-Market | go-to-market-01 | easy | `growth-measurement` | Evan Spiegel | Commercial Acumen: Product Marketing Skills | Distribution Strategy; Growth | 00:00:08; 00:03:21; 00:04:09; 00:12:02 |
| Go-to-Market | go-to-market-02 | medium | `growth-measurement` | Hector Serrano | Commercial Acumen: Product Marketing Skills; Analytical Skills | Marketing Plan; Growth; Awareness | 00:05:24; 00:05:44; 00:06:15; 00:04:49 |
| Go-to-Market | go-to-market-03 | medium | `growth-measurement` | Cat Wu | Commercial Acumen: Product Marketing Skills; Other Skills: Collaborative Working | Launch; Organizational Alignment | 00:07:42; 00:08:17; 00:10:05 |
| Go-to-Market | go-to-market-04 | hard | `growth-measurement` | Jason Cohen | Commercial Acumen: Product Marketing Skills; Analytical Skills | Growth; Marketing Plan; Distribution Strategy | 01:11:16; 01:07:53; 01:15:58 |
| Metrics & Adoption | metrics-adoption-01 | easy | `growth-measurement` | Jason Cohen | Commercial Acumen: Analytical Skills | Retention; Measurement | 00:16:10; 00:17:19; 00:14:58 |
| Metrics & Adoption | metrics-adoption-02 | medium | `growth-measurement` | Amol Avasare | Commercial Acumen: Analytical Skills | Adoption; Measurement | 00:15:19; 00:17:03; 00:20:28; 00:23:38 |
| Metrics & Adoption | metrics-adoption-03 | medium | `growth-measurement` | Fiona Fung | Commercial Acumen: Analytical Skills; PM Experience: Market and Evidence Based | Measurement; Business Outcomes | 00:42:50; 00:43:19; 00:42:21; 00:41:26 |
| Metrics & Adoption | metrics-adoption-04 | hard | `growth-measurement` | Jorge Mazal | Commercial Acumen: Analytical Skills | Measurement; Retention; Adoption | section "The streak vector"; section "Push notifications vector" |
| Demo & Prioritization | demo-prioritization-01 | easy | `communication-influence` | Jen Abel | Other Skills: Communication Skills (presentation) | Assets; Engagement | 00:41:06; 00:40:35 |
| Demo & Prioritization | demo-prioritization-02 | medium | `communication-influence` | Cat Wu | Other Skills: Communication Skills (presentation) | Assets; Launch | 00:37:33; 00:40:07 |
| Demo & Prioritization | demo-prioritization-03 | medium | `prioritization-delivery` | Jorge Mazal | Other Skills: Prioritisation Capabilities; Commercial Acumen: Analytical Skills | Measurement; Product Roadmap | section "Phase 3: Using data and models" |
| Demo & Prioritization | demo-prioritization-04 | hard | `prioritization-delivery` | Keith Rabois | Other Skills: Prioritisation Capabilities; Leadership Skills | Product Portfolio; Product Roadmap | 00:16:22; 00:17:04; 00:18:59; 00:17:50 |
| Commercial Case | commercial-case-01 | easy | `strategy-positioning` | Jen Abel | Commercial Acumen: Pricing Skills; Building Business Cases | Pricing; Business Plan | 00:59:36; 00:59:14 |
| Commercial Case | commercial-case-02 | medium | `strategy-positioning` | Rob Snyder | Commercial Acumen: Pricing Skills; Building Business Cases | Pricing; Business Plan | 00:55:51; 01:00:57; 01:01:38 |
| Commercial Case | commercial-case-03 | medium | `strategy-positioning` | Jen Abel | Commercial Acumen: Building Business Cases; Other Skills: Negotiation Skills | Pricing; Business Plan | 00:55:52; 00:57:15; 00:57:52 |
| Commercial Case | commercial-case-04 | hard | `strategy-positioning` | Eric Ries | Commercial Acumen: Building Business Cases; Managing Products as a Business | Business Plan; Business Outcomes | 00:43:38; 00:41:48 |
| Pitch Build | pitch-build-01 | easy | `communication-influence` | Jessica Fain | Other Skills: Communication Skills; PM Experience: Operate at a Senior Level | Stakeholder Management | 00:07:29; 00:08:33; 00:22:56 |
| Pitch Build | pitch-build-02 | medium | `communication-influence` | Tony Fadell | Other Skills: Communication Skills; Commercial Acumen: Product Marketing Skills | Positioning; Launch | 00:01:00; 01:03:25; 01:01:17 |
| Pitch Build | pitch-build-03 | medium | `communication-influence` | Jessica Fain | Other Skills: Communication Skills; Negotiation Skills; PM Experience: Operate at a Senior Level | Stakeholder Management; Business Plan | 00:23:21; 00:24:03; 00:24:52; 00:12:20 |
| Pitch Build | pitch-build-04 | hard | `communication-influence` | Jen Abel | Other Skills: Communication Skills; Commercial Acumen: Building Business Cases | Positioning; Buyer Personas | 00:13:48; 00:18:10; 00:17:34; 00:12:12 |

### Skills Matrix discipline coverage

| Discipline | Questions tagged |
|---|---|
| Target Market | 1 |
| Market Needs | 3 |
| Product Knowledge | 1 |
| Technical Knowledge | 4 |
| Competitive Knowledge | 1 |
| Methodology & Process | 5 |
| Market and Evidence Based | 5 |
| Driven by Self-Opinion | 1 |
| Operate at a Senior Level | 2 |
| Organisational Skills | 3 |
| Managing Products as a Business | 5 |
| Building Business Cases | 5 |
| Pricing Skills | 5 |
| Product Marketing Skills | 8 |
| Analytical Skills | 9 |
| Collaborative Working | 1 |
| Negotiation Skills | 2 |
| Prioritisation Capabilities | 3 |
| Communication Skills | 8 |
| Leadership Skills | 2 |

Every discipline is tagged at least once. The thinnest areas are Target Market, Product Knowledge, Competitive Knowledge, Driven by Self-Opinion and Collaborative Working (one question each), followed by Operate at a Senior Level, Negotiation Skills and Leadership Skills (two each). These are the first candidates for expansion.

## Quality-control results

| Check | Result |
|---|---|
| 1. Each question maps to one of the 12 topics | Pass: 12 topics with exactly 4 questions each; IDs follow `topic-0n` |
| 2. Each question is grounded in an accessible Lenny source | Pass: 27 sources from the public starter pack; 173 evidence passages matched verbatim by script |
| 3. Exactly four options per question | Pass: 48 of 48, with no duplicate options within a question |
| 4. Exactly one correct option | Pass: one `correctIndex` per question, checked against the source in review |
| 5. Two genuine half-truths per question | Pass on review: each half-truth contains an idea the source or common practice supports, and the explanation names it before stating why it fails |
| 6. Explanation addresses all three distractors | Pass on review for all 48 |
| 7. Source titles, authors and URLs are accurate | Pass: URLs confirmed in live search results; title variants recorded above; one mismatched transcript excluded (see data-quality notes) |
| 8. No ambiguous items or multiple defensible answers | Pass on review; scenarios state the source's lens ('according to...') where practitioners might otherwise disagree |
| 9. No duplicate concepts | Pass on review; a win-rate pricing item was replaced because it overlapped with business-model-01 |
| 10. Valid, parseable JSON | Pass: 48 objects (the brief's figure of 24 was superseded by the decision to build 48) |
| Answer position | Correct option at index 0, 1, 2 and 3 exactly 12, 12, 12 and 12 times; each topic uses all four positions |
| Length cue | The correct option is the longest in 15 of 48 questions (12 would be expected by chance); distractors were lengthened to reduce the cue |
| Style | British spelling; no em or en dashes in question text, options or explanations |

## Data-quality notes

- **Excluded transcript.** `podcasts/jason-m-lemkin.md` is titled 'We replaced our sales team with 20 AI agents' in the dataset and on the live page, but its transcript discusses hiring a human sales team, refers to 2024, and does not mention AI agents. Because the title and content do not match, it was not cited.
- **Transcription errors.** The transcripts are machine-generated. Examples encountered include 'burials' for 'barrels' (Keith Rabois) and 'DAO over a MOU' for DAU over MAU (Josh Woodward). Questions paraphrase the intended meaning.
- **Cold-open passages.** A few evidence locations fall in the first minutes of an episode, where the trailer replays the guest's own lines; the same point also appears later in the body.
- **Dates.** Two dataset dates (Jen Abel, Mark Pincus) could not be matched unambiguously to the live archive listing and are marked [VERIFY].

## Limitations

- **Practitioner guidance.** Lenny's content is practitioner guidance from individual guests, not a psychometrically validated assessment. The correct answers reflect what the cited guest advises, and some guests disagree with one another on specific tactics (for example, whether a short demo belongs in a first sales call).
- **Knowledge and judgement only.** The questions measure knowledge and applied judgement in written scenarios. They do not measure, and cannot guarantee, on-the-job performance.
- **Not a hiring instrument.** The game should not be used as a sole hiring, promotion or certification instrument without independent validation, including item analysis, reliability testing and checks for adverse impact.
- **Narrow evidence base.** Only the 60-item starter pack was available. It is weighted towards 2026 episodes and AI-native companies, so classic topics such as roadmapping, discovery interviewing technique and regulated-industry practice are under-represented compared with the full archive.
- **Source concentration.** Jason Cohen supports 6 questions, and Rob Snyder and Jen Abel 5 each; their views therefore weigh heavily in User Discovery, Business Model and Commercial Case.
- **Uncalibrated difficulty.** Difficulty labels are expert judgements and should be recalibrated once player response data exist.
- **Framework fit.** The Pragmatic document is a framework guide with a team worksheet, not a capability assessment, and its Operations category is barely represented.
- **Paywalls and change.** Several cited pages are partly paywalled, and episode titles on lennysnewsletter.com change over time; links and titles should be re-checked before publication.

