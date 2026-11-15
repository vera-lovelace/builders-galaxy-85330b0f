import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Info, Play } from "lucide-react";
import { Button } from "@/components/Button";
import { Earth } from "@/components/Earth";
import { WelcomeOrbit } from "@/components/WelcomeOrbit";
import { BrandMark } from "@/components/Rocket";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => meta("Builder's Galaxy — PM trivia voyage", "Discover where you shine across 12 product skills, learn from people who've built it, and chart your next step."),
  component: Welcome,
});

function Welcome() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-space">
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6">
        <BrandMark />
        <Button asChild variant="ghost" size="md"><Link to="/about"><Info /> About</Link></Button>
      </header>
      <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-5 pt-12 pb-6 text-center sm:pt-20">
        <p className="mb-4 font-display text-lg font-semibold text-foreground sm:text-xl">Every great product starts with a builder.</p>
        <h1 className="font-display text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-8xl">
          Builder's <span className="text-primary">Galaxy</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Discover where you shine across 12 product skills, learn from people who've built it, and chart your next step.
        </p>
        <Button asChild className="mt-8 max-sm:mt-auto w-full max-w-xs">
          <Link to="/join"><Play className="fill-current" /> Start your voyage</Link>
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">12 planets · 24 questions · free, no sign-up</p>
        <p className="mt-3 text-sm text-muted-foreground">
          After your voyage, try the <Link to="/jobs" className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 hover:text-info"><Briefcase className="size-3.5" aria-hidden />job search beta</Link>: live product roles, by keyword or by voice.
        </p>
      </section>
      <div className="relative h-96 shrink-0">
        <Earth className="top-[90%]" />
        <WelcomeOrbit />
      </div>
    </main>
  );
}
