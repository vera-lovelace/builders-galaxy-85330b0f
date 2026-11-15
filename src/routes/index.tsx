import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { Button } from "@/components/Button";
import { Earth } from "@/components/Earth";
import { BrandMark, Rocket } from "@/components/Rocket";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/")({
  head: () => meta("Builder's Galaxy — PM trivia voyage", "Fly through 12 planets of product management. Answer questions, earn XP, and see where you shine."),
  component: Welcome,
});

function Welcome() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-space">
      <header className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-6">
        <BrandMark />
      </header>
      <section className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-5 pt-16 text-center sm:pt-20">
        <h1 className="font-display text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-8xl">
          Builder's <span className="text-primary">Galaxy</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Fly through 12 planets of product management. Answer questions, earn XP, and see where you shine.
        </p>
        <Button asChild className="mt-8 w-full max-w-xs">
          <Link to="/join"><Play className="fill-current" /> Play</Link>
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">12 planets · 24 questions · up to 24 minutes of answering</p>
      </section>
      <div className="relative h-[34vh] min-h-56">
        <Earth className="top-[38%]" />
        <Rocket size={40} className="absolute left-1/2 top-[8%] -translate-x-1/2" />
      </div>
    </main>
  );
}
