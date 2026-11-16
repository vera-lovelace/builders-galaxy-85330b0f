import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Briefcase, Info, Mic, Play, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { WelcomeOrbit } from "@/components/WelcomeOrbit";
import { BrandMark, Rocket } from "@/components/Rocket";
import { Planet } from "@/components/Planet";
import { PLANETS } from "@/data/planets";
import earth from "@/assets/earth-full.png";
import { TriviaNote } from "@/components/TriviaNote";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => meta("The Builder's Galaxy", "A fun 12-planet product trivia game for aspiring PMs that reveals your builder type, writes your mission statement and turns it into job pitches. Free, no sign-up."),
  component: Welcome,
});

function Welcome() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-space">
      <WelcomeOrbit />
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6">
        <BrandMark />
        <Button asChild variant="ghost" size="md"><Link to="/about"><Info /> About</Link></Button>
      </header>
      <section className="welcome-intro relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pt-12 pb-6 text-center sm:pt-20">
        <p className="mb-4 font-display text-lg font-semibold text-foreground sm:text-xl">Every great product starts with a builder.</p>
        <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-8xl">
          The Builder's <span className="text-primary">Galaxy</span>
        </h1>
        <p className="mt-6 text-xl text-foreground sm:text-2xl">Find out what kind of builder you are, then turn it into your next role.</p>
        <p className="mt-3 text-lg text-muted-foreground">Play a fun product trivia game across 12 planets. Leave with your builder type, a mission statement in your own voice, and job pitches ready to paste.</p>
        <Button asChild className="mt-8 w-full max-w-xs">
          <Link to="/join"><Play className="fill-current" /> Start your voyage</Link>
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">12 planets · 24 trivia questions · free, no sign-up, nothing stored</p>
      </section>
      <section aria-labelledby="get-h" className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16">
        <h2 id="get-h" className="text-center font-display text-3xl font-extrabold sm:text-5xl">One voyage. Everything you need for the next step.</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-2xl border border-border bg-surface p-6">
              <Icon aria-hidden className="size-7 text-primary" />
              <h3 className="mt-3 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-h" className="voyage-steps relative z-10 mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
        <p className="text-center text-sm font-bold uppercase text-info">From curious to ready for your next step</p>
        <h2 id="how-h" className="mt-3 text-center font-display text-4xl font-extrabold sm:text-5xl">How it works</h2>
        <ol className="voyage-step-list mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((st, i) => (
            <li key={st.title} className="voyage-step relative min-w-0 text-center">
              <div className="step-art" aria-hidden="true">
                {i === 0 && <><img src={earth} alt="" className="step-earth" /><div className="step-launch-rocket"><Rocket size={42} flame={false} /></div></>}
                {i === 1 && <div className="step-planet-field">{PLANETS.slice(0, 4).map(planet => <div key={planet.id}><Planet color={planet.color} ring={planet.ring} size={76} /></div>)}</div>}
                {i === 2 && <div className="step-destination"><Sparkles className="step-destination-star text-primary" /><Briefcase className="size-16 text-success" strokeWidth={1.3} /><div className="step-destination-lines"><i /><i /><i /></div></div>}
              </div>
              <span className="step-number mx-auto flex size-10 items-center justify-center rounded-full border font-display text-sm font-bold">0{i + 1}</span>
              <h3 className="mt-5 font-display text-3xl font-extrabold">{st.title}</h3>
              <p className="mx-auto mt-3 max-w-64 text-base leading-relaxed text-muted-foreground">{st.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pt-6 pb-20">
        <TriviaNote className="rounded-lg border-primary/40 bg-surface-raised p-6 text-base leading-relaxed text-foreground shadow-raised sm:p-8 [&>p+p]:mt-5 [&_svg]:size-5" />
      </div>
    </main>
  );
}

const FEATURES = [
  { icon: Play, title: "A 12-planet trivia voyage", body: "24 trivia questions at your level, from problem framing to the pitch. A 60-second timer you can pause any time." },
  { icon: Sparkles, title: "Your builder type", body: "Discovery Navigator, Product Strategist, Growth Commander or Pitch Pilot, with a mission statement and a card to share on LinkedIn or X." },
  { icon: Briefcase, title: "Jobs that fit you", body: "Live product, engineering and design roles, matched to your builder type, with a tailored pitch for each job, ready to copy." },
  { icon: BookOpen, title: "Lenny's tips drill", body: "93 tips from Lenny's Newsletter and Podcast as flashcards, starting with your three weakest planets." },
  { icon: Mic, title: "Play by voice", body: "An optional voice guide reads questions, answers for you and runs job searches. Built for NVDA, VoiceOver and keyboards." },
  { icon: ShieldCheck, title: "Your data, your space", body: "No sign-up and nothing stored. Your results stay in this browser, and exports are made on your device." },
];
const STEPS = [
  { title: "Launch", body: "Pick a nickname and your experience level. That's it." },
  { title: "Explore", body: "Visit 12 planets and answer two trivia questions on each." },
  { title: "Take off", body: "Get your builder type, share your card and find roles that fit." },
];
