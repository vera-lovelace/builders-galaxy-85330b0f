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
  head: () => meta("Join the voyage — Builder's Galaxy", "Pick a nickname and experience level, then meet your astronaut."),
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
        <Button variant="ghost" size="icon" aria-label="Back" onClick={() => (step ? setStep(step - 1) : navigate({ to: "/" }))}>
          <ArrowLeft />
        </Button>
        <div className="flex gap-1.5" aria-label={`Step ${step + 1} of 3`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("h-1.5 rounded-full transition-all", i === step ? "w-8 bg-primary" : "w-4 bg-muted-foreground/50")} />
          ))}
        </div>
      </div>

      {step === 0 && (
        <form className="flex flex-col items-center text-center" onSubmit={(e) => { e.preventDefault(); if (name) setStep(1); }}>
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Pick a nickname</h1>
          <p className="mt-3 text-muted-foreground">This is how the room will see you.</p>
          <input
            autoFocus
            maxLength={16}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="e.g. Ada"
            aria-label="Nickname"
            className="mt-8 h-14 w-full max-w-sm rounded-lg border-2 border-border bg-surface px-4 text-center font-display text-xl outline-none focus:border-primary"
          />
          <Button type="submit" className="mt-8" disabled={!name}>Continue <ArrowRight /></Button>
        </form>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Your PM experience?</h1>
          <p className="mt-3 text-muted-foreground">We'll compare it with how you actually score.</p>
          <div className="mt-8 grid w-full max-w-sm gap-3" role="radiogroup">
            {LEVELS.map((l) => (
              <button
                key={l}
                role="radio"
                aria-checked={experience === l}
                onClick={() => setExperience(l)}
                className={cn("flex min-h-14 flex-col items-start rounded-lg border-2 bg-surface px-4 py-3 text-left transition-colors",
                  experience === l ? "border-primary bg-primary/10" : "border-border/70 hover:border-primary/60")}
              >
                <span className="font-display font-semibold">{l}</span>
                <span className="font-sans text-sm text-muted-foreground">{LEVEL_HINT[l]}</span>
              </button>
            ))}
          </div>
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
