import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Shell } from "@/components/Shell";
import { useGame } from "@/game/GameContext";
import { EXPERIENCE_LEVELS, type ExperienceLevel } from "@/game/rules";
import { cn } from "@/lib/cn";

const LEVEL_HINTS: Record<ExperienceLevel, string> = {
  Newbie: "New to product management",
  Beginner: "Some hands-on exposure",
  Advanced: "Working as a PM",
  Pro: "Leading product teams",
};

const MAX_NICKNAME = 20;
const STEPS = 3;

/** Onboarding in three single-purpose steps: nickname, experience, your rocket. */
export default function Onboarding() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState(state.nickname);
  const [level, setLevel] = useState<ExperienceLevel | null>(state.experience);
  const [error, setError] = useState<string | null>(null);

  const trimmed = nickname.trim();

  function next(e: FormEvent) {
    e.preventDefault();
    if (step === 0 && !trimmed) return setError("Pick a nickname so the room can find you.");
    if (step === 1 && !level) return setError("Choose the level closest to you.");
    setError(null);
    if (step < STEPS - 1) return setStep(step + 1);
    dispatch({ type: "join", nickname: trimmed, experience: level! });
    navigate("/galaxy");
  }

  return (
    <Shell aside={<span className="tabular text-sm text-muted-foreground">Room {state.roomCode}</span>}>
      <form onSubmit={next} noValidate className="flex flex-1 flex-col py-4 sm:py-10">
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => (setError(null), setStep(step - 1))}
              className="-ml-2 grid size-12 place-items-center rounded-full text-muted-foreground hover:bg-surface hover:text-foreground"
              aria-label="Back"
            >
              <ArrowLeft className="size-5" />
            </button>
          )}
          <ol className="flex gap-1.5" aria-label={`Step ${step + 1} of ${STEPS}`}>
            {Array.from({ length: STEPS }, (_, i) => (
              <li
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out-expo",
                  i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-foreground/60" : "w-4 bg-muted",
                )}
              />
            ))}
          </ol>
        </div>

        <div key={step} className="mt-8 flex flex-1 flex-col sm:flex-none motion-safe:animate-[xp-rise_360ms_cubic-bezier(0.16,1,0.3,1)]">
          {step === 0 && (
            <>
              <h1 className="text-4xl font-extrabold sm:text-5xl">Give yourself a nickname</h1>
              <p className="mt-3 text-muted-foreground">It's how the room finds you on the leaderboard.</p>
              <label htmlFor="nickname" className="sr-only">
                Nickname
              </label>
              <input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value.slice(0, MAX_NICKNAME))}
                autoComplete="nickname"
                autoFocus
                placeholder="e.g. Nova"
                aria-invalid={!!error}
                aria-describedby="step-help"
                className={cn(
                  "mt-8 min-h-16 rounded border-2 bg-surface px-5 font-display text-2xl font-semibold placeholder:font-sans placeholder:text-lg placeholder:font-normal placeholder:text-muted-foreground/70",
                  "focus:border-primary focus:outline-none",
                  error ? "border-danger" : "border-border",
                )}
              />
              <p id="step-help" className={cn("mt-2 text-sm", error ? "text-danger" : "text-muted-foreground")}>
                {error ?? `Up to ${MAX_NICKNAME} characters.`}
              </p>
            </>
          )}

          {step === 1 && (
            <fieldset aria-describedby="step-help">
              <legend className="font-display text-4xl font-extrabold sm:text-5xl">How much PM have you done?</legend>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {EXPERIENCE_LEVELS.map((l) => (
                  <label
                    key={l}
                    className={cn(
                      "flex min-h-20 cursor-pointer flex-col justify-center rounded border-2 px-5 py-3 transition-colors duration-150",
                      "has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
                      level === l ? "border-primary bg-primary/10" : "border-border bg-surface hover:bg-surface-raised",
                    )}
                  >
                    <input
                      type="radio"
                      name="level"
                      value={l}
                      checked={level === l}
                      onChange={() => (setLevel(l), setError(null))}
                      className="sr-only"
                    />
                    <span className="font-display text-xl font-bold">{l}</span>
                    <span className="text-sm text-muted-foreground">{LEVEL_HINTS[l]}</span>
                  </label>
                ))}
              </div>
              <p id="step-help" className="mt-3 min-h-5 text-sm text-danger">
                {error}
              </p>
            </fieldset>
          )}

          {step === 2 && (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl">Meet your astronaut</h1>
              <p className="mt-3 text-muted-foreground">Your visor colour marks you on the leaderboard.</p>
              <div className="relative mt-10 grid place-items-center">
                <svg viewBox="0 0 200 200" className="absolute size-56 motion-safe:animate-[spin_30s_linear_infinite]" aria-hidden>
                  <circle cx="100" cy="100" r="96" fill="none" stroke="hsl(var(--foreground) / 0.35)" strokeWidth="1.5" strokeDasharray="3 9" />
                </svg>
                <PlayerAvatar
                  name={trimmed}
                  size={150}
                  full
                  cheer
                  className="motion-safe:animate-[xp-rise_600ms_cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>
              <p className="mt-10 font-display text-3xl font-bold">{trimmed}</p>
              <p className="text-muted-foreground">{level}</p>
            </div>
          )}
        </div>

        <Button type="submit" size="lg" className={cn("mt-8 w-full sm:mt-10 sm:w-auto", step === 2 ? "sm:self-center" : "sm:self-start")}>
          {step < STEPS - 1 ? "Next" : "Let's go"}
          <ArrowRight className="size-5" aria-hidden />
        </Button>
      </form>
    </Shell>
  );
}
