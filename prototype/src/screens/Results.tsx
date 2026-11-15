import { Navigate, useNavigate } from "react-router-dom";
import { RotateCcw, Trophy } from "lucide-react";
import { PLANETS, planetById } from "@/data/planets";
import { Button } from "@/components/Button";
import { Planet } from "@/components/Planet";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Shell } from "@/components/Shell";
import { SkillMeter } from "@/components/SkillMeter";
import { LennyTipsButton } from "@/components/LennyTips";
import { AboutLink } from "@/components/AboutLink";
import { recommendationIsTied } from "@/game/rules";
import { formatDuration, summarize, useGame } from "@/game/GameContext";
import { cn } from "@/lib/cn";

export default function Results() {
  const { state, dispatch, isFinished } = useGame();
  const navigate = useNavigate();
  if (!isFinished) return <Navigate to="/galaxy" replace />;

  const r = summarize(state);
  const pct = Math.round(r.accuracy * 100);

  return (
    <Shell width="lg">
      <div className="flex items-center gap-4">
        <PlayerAvatar name={state.nickname} size={56} />
        <div>
          <h1 className="text-3xl font-extrabold sm:text-5xl">Voyage complete, {state.nickname}</h1>
          <p className="text-muted-foreground">All {PLANETS.length} planets visited.</p>
        </div>
      </div>

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <SkillOrbit scores={r.scores} pct={pct} />

        <div className="flex flex-col gap-6">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
            <Stat label="XP earned" value={r.xp.toLocaleString()} tone="text-primary" />
            <Stat label="Score" value={`${r.correct}/${r.total}`} />
            <Stat label="Time" value={formatDuration(r.elapsedMs)} />
            <Stat
              label="Assessed level"
              value={r.level}
              sub={state.experience && state.experience !== r.level ? `You picked ${state.experience}` : undefined}
            />
          </dl>

          <section aria-labelledby="next" className="border-t border-border pt-6">
            <h2 id="next" className="text-2xl font-bold">Explore next</h2>
            <p className="text-muted-foreground">
              {recommendationIsTied(r.scores, r.recommendations)
                ? "Three of your lowest-scoring planets, with Lenny's tips for each."
                : "Your three lowest-scoring planets, with Lenny's tips for each."}
            </p>
            <ol className="mt-4 flex flex-col gap-2">
              {r.recommendations.map((id) => {
                const p = planetById(id);
                const s = r.scores.find((x) => x.planetId === id)!;
                return (
                  <li key={id} className="flex items-center gap-3 rounded-lg bg-surface py-2 pl-3 pr-1">
                    {/* Slot sized for a ringed planet's ring */}
                    <span className="grid w-16 shrink-0 place-items-center">
                      <Planet planet={p} size={p.ringed ? 28 : 36} />
                    </span>
                    <p className="flex-1 font-display text-lg font-bold">{p.name}</p>
                    <p className="tabular text-sm text-muted-foreground">
                      {s.correct} of {s.total}
                      <span className="sr-only"> correct</span>
                    </p>
                    <LennyTipsButton planet={p} variant="icon" />
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </div>

      <section aria-labelledby="map" className="mt-10">
        <h2 id="map" className="text-2xl font-bold">Your skill map</h2>
        <p className="text-muted-foreground">Correct answers on each planet, in voyage order. The bulb opens Lenny's tips.</p>
        <ol className="mt-4 grid gap-x-8 rounded-lg bg-surface px-4 py-2 sm:grid-cols-2">
          {r.scores.map((s, i) => (
            <SkillMeter
              key={s.planetId}
              stop={i + 1}
              planet={planetById(s.planetId)}
              correct={s.correct}
              total={s.total}
              action={<LennyTipsButton planet={planetById(s.planetId)} variant="icon" className="-my-1" />}
            />
          ))}
        </ol>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={() => navigate("/leaderboard")}>
          <Trophy className="size-5" aria-hidden />
          See the leaderboard
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => {
            dispatch({ type: "reset" });
            navigate("/join");
          }}
        >
          <RotateCcw className="size-5" aria-hidden />
          Play again
        </Button>
        <AboutLink label="About and sources" className="sm:ml-auto" />
      </div>
    </Shell>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: string }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className={cn("tabular font-display text-3xl font-bold sm:text-4xl", tone)}>{value}</dd>
      {sub && <dd className="text-sm text-muted-foreground">{sub}</dd>}
    </div>
  );
}

/**
 * Skill orbit: your overall score at the centre, the 12 disciplines as moons.
 * A moon's size and brightness show how well you did on that planet.
 */
function SkillOrbit({ scores, pct }: { scores: ReturnType<typeof summarize>["scores"]; pct: number }) {
  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[22rem]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden>
        <circle cx="200" cy="200" r="150" fill="none" stroke="hsl(var(--foreground) / 0.25)" strokeWidth="1.5" strokeDasharray="3 9" />
        <circle cx="200" cy="200" r="54" fill="hsl(var(--surface-raised))" />
        <circle
          cx="200"
          cy="200"
          r="54"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${pct} 100`}
          transform="rotate(-90 200 200)"
          className="motion-safe:animate-[orbit-fill_1200ms_cubic-bezier(0.16,1,0.3,1)]"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="tabular font-display text-3xl font-extrabold">{pct}%</p>
          <p className="text-xs text-muted-foreground">correct</p>
        </div>
      </div>

      <ul>
        {scores.map((s, i) => {
          const p = planetById(s.planetId);
          const ratio = s.total ? s.correct / s.total : 0;
          const angle = (-90 + i * 30) * (Math.PI / 180);
          const size = 26 + ratio * 18;
          return (
            <li
              key={s.planetId}
              className="absolute -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[xp-rise_500ms_cubic-bezier(0.16,1,0.3,1)_both]"
              style={{
                left: `${50 + 37.5 * Math.cos(angle)}%`,
                top: `${50 + 37.5 * Math.sin(angle)}%`,
                animationDelay: `${Math.min(i * 55, 660)}ms`,
              }}
              title={`${p.name}: ${s.correct}/${s.total}`}
            >
              <span className="sr-only">
                {p.name}: {s.correct} of {s.total} correct
              </span>
              <span className="flex flex-col items-center gap-0.5" aria-hidden>
                <Planet planet={p} size={size} status={ratio === 0 ? "locked" : "done"} />
                <span className="tabular rounded-full bg-background/80 px-1.5 text-xs font-semibold text-foreground">
                  {s.correct}/{s.total}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <figcaption className="sr-only">Skill orbit: overall {pct}% correct across 12 planets. Larger moons scored higher; details in the skill map below.</figcaption>
    </figure>
  );
}
