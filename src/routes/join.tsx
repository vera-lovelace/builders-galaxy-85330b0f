import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Shell } from "@/components/Shell";
import { DEFAULT_ROOM } from "@/game/leaderboard";
import { newRun } from "@/game/run";
import { runStore } from "@/game/runStore";
import { LEVELS, type Level } from "@/game/rules";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/join")({
  head: () => meta("Join the voyage — Builder's Galaxy", "Give yourself a nickname and experience level, then meet your astronaut."),
  component: Onboarding,
});

const LEVEL_HINT: Record<Level, string> = {
  Newbie: "New to product work",
  Beginner: "A year or two in",
  Advanced: "Shipping regularly",
  Pro: "Leading product teams",
};

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [experience, setExperience] = useState<Level | null>(null);
  const name = nickname.trim();

  const start = () => {
    runStore.set(newRun({ nickname: name, experience: experience ?? "Beginner" }));
    navigate({ to: "/galaxy" });
  };

  return (
    <Shell right={<span className="text-sm text-muted-foreground">Room {DEFAULT_ROOM}</span>}>
      <div className="mb-10 flex items-center gap-4">
        <Button variant="ghost" size="icon"  onClick={() => (step ? setStep(step - 1) : navigate({ to: "/" }))}>
          <ArrowLeft aria-hidden /><span className="sr-only">Back</span>
        </Button>
        <div className="flex gap-1.5" aria-label={`Step ${step + 1} of 3`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("h-1.5 rounded-full transition-all", i === step ? "w-8 bg-primary" : "w-4 bg-muted-foreground/50")} />
          ))}
        </div>
      </div>

      {step === 0 && (
        <form className="flex flex-1 flex-col items-start text-left" onSubmit={(e) => { e.preventDefault(); if (name) setStep(1); }}>
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Give yourself a nickname</h1>
          <p className="mt-3 text-muted-foreground">It's how the room finds you on the leaderboard.</p>
          <input
            autoFocus
            maxLength={16}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="e.g. Ada"
            aria-label="Nickname"
            className="mt-8 h-16 w-full max-w-none rounded-lg border-2 border-border bg-surface px-4 text-left font-display text-2xl outline-none focus:border-primary"
          />
          <Button type="submit" className="mt-8 max-sm:mt-auto max-sm:w-full" disabled={!name}>Continue <ArrowRight /></Button>
        </form>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Your PM experience?</h1>
          <p className="mt-3 text-muted-foreground">We'll compare it with how you actually score.</p>
          <fieldset className="mt-8 grid w-full max-w-sm gap-3 text-left">
            <legend className="sr-only">Your PM experience</legend>
            {LEVELS.map(l => <label key={l} className={cn("flex min-h-20 cursor-pointer items-center gap-3 rounded-lg border-2 bg-surface px-5 py-3", experience === l ? "border-primary bg-primary/10" : "border-border hover:border-primary/60")}>
              <input type="radio" name="experience" value={l} checked={experience === l} onChange={() => setExperience(l)} className="size-5 shrink-0 accent-primary" />
              <span><span className="block font-display font-semibold">{l}</span><span className="block text-sm text-muted-foreground">{LEVEL_HINT[l]}</span></span>
            </label>)}
          </fieldset>
          <Button className="mt-8" disabled={!experience} onClick={() => setStep(2)}>Continue <ArrowRight /></Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Meet your astronaut</h1>
          <p className="mt-3 text-muted-foreground">Your visor colour marks you on the leaderboard.</p>
          <div className="mt-8 flex size-52 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/40">
            <PlayerAvatar nickname={name} size={130} full cheer />
          </div>
          <p className="mt-8 font-display text-3xl font-bold">{name}</p>
          <p className="text-muted-foreground">{experience}</p>
          <Button className="mt-8" onClick={start}>Let's go <ArrowRight /></Button>
        </div>
      )}
    </Shell>
  );
}
