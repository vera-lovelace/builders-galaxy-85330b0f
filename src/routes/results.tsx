import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, RotateCcw, Trophy } from "lucide-react";
import { useEffect } from "react";
import { LennyTips } from "@/components/LennyTips";
import { Button } from "@/components/Button";
import { Planet } from "@/components/Planet";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Shell } from "@/components/Shell";
import { summary } from "@/game/run";
import { runStore, useRun } from "@/game/runStore";
import { formatTime, weakestPlanets, hasExtraLowestTies } from "@/game/rules";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/results")({
  head: () => meta("Your results — Builder's Galaxy", "XP, score, assessed level and the planets to explore next."),
  component: Results,
});

function Results() {
  const run = useRun();
  const navigate = useNavigate();
  useEffect(() => {
    if (run === null) navigate({ to: "/join" });
  }, [run, navigate]);
  if (!run) return <div className="min-h-dvh bg-space" />;

  const s = summary(run);
  const pct = Math.round(s.accuracy * 100);
  const weak = weakestPlanets(s.scores);
  const visited = Math.min(run.current, 12);

  return (
    <Shell wide>
      <div className="flex items-center gap-4">
        <PlayerAvatar nickname={run.player.nickname} size={56} />
        <div>
          <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-5xl">Voyage complete, {run.player.nickname}</h1>
          <p className="text-muted-foreground">{visited === 12 ? "All 12 planets visited." : `${visited} of 12 planets visited.`}</p>
        </div>
      </div>

      <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
        <SkillOrbit pct={pct} scores={s.scores} />
        <div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
            <Stat label="XP earned" value={s.xp.toLocaleString("en-US")} accent />
            <Stat label="Score" value={`${s.correct} of ${s.total}`} />
            <Stat label="Time" value={formatTime(s.ms)} />
            <div>
              <dt className="text-sm text-muted-foreground">Assessed level</dt>
              <dd className="font-display text-3xl font-bold">{s.level}</dd>
              <dd className="text-sm text-muted-foreground">You picked {run.player.experience}</dd>
            </div>
          </dl>
          <hr className="my-6 border-border" />
          <h2 className="font-display text-2xl font-bold">Explore next</h2>
          <p className="text-sm text-muted-foreground">{hasExtraLowestTies(s.scores) ? "Three of your lowest-scoring planets" : "Your three lowest-scoring planets"}</p>
          <ul className="mt-4 grid gap-3">
            {weak.map((w) => (
              <li key={w.planetId} className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2">
                <Planet color={w.planet.color} size={38} ring={w.planet.ring} />
                <span className="min-w-0 flex-1 font-display text-lg font-semibold">{w.planet.name}</span>
                <span className="shrink-0 text-sm text-muted-foreground">{w.correct} of {w.total}</span>
                <LennyTips planet={w.planet} iconOnly />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold">Your skill map</h2>
        <ul className="mt-3 divide-y divide-border">
          {s.scores.map(p => <li key={p.planetId} className="flex items-center gap-3 py-3">
            <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: p.planet.color }} aria-hidden />
            <span className="min-w-0 flex-1">{p.planet.name}</span>
            <span className="shrink-0 text-sm text-muted-foreground">{p.correct} of {p.total}<span className="sr-only"> correct</span></span>
            <LennyTips planet={p.planet} iconOnly />
          </li>)}
        </ul>
      </section>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild><Link to="/leaderboard"><Trophy /> See the leaderboard</Link></Button>
        <Button variant="secondary" onClick={() => { runStore.set(null); navigate({ to: "/join" }); }}>
          <RotateCcw /> Play again
        </Button>
      </div>
    </Shell>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className={accent ? "font-display text-3xl font-bold text-primary" : "font-display text-3xl font-bold"}>{value}</dd>
    </div>
  );
}

function SkillOrbit({ pct, scores }: { pct: number; scores: ReturnType<typeof summary>["scores"] }) {
  const S = 340, c = S / 2, R = 140, r = 62, circ = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px]">
      <svg viewBox={`0 0 ${S} ${S}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx={c} cy={c} r={R} fill="none" className="stroke-muted-foreground/30" strokeDasharray="2 6" />
        <circle cx={c} cy={c} r={r + 22} fill="none" className="stroke-border" />
        <circle cx={c} cy={c} r={r + 10} className="fill-surface" />
        <circle cx={c} cy={c} r={r} fill="none" className="stroke-primary" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * circ} ${circ}`} transform={`rotate(-90 ${c} ${c})`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-extrabold">{pct}%</span>
        <span className="text-sm text-muted-foreground">correct</span>
      </div>
      {scores.map((p, i) => {
        const a = (i / scores.length) * 2 * Math.PI - Math.PI / 2;
        const ratio = p.total ? p.correct / p.total : 0;
        const size = 16 + ratio * 22;
        return (
          <div key={p.planetId} className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${((c + R * Math.cos(a)) / S) * 100}%`, top: `${((c + R * Math.sin(a)) / S) * 100}%` }}
            title={`${p.planet.name}: ${p.correct} of ${p.total}`}>
            <Planet color={p.planet.color} size={size} ring={p.planet.ring} state="done" className={p.correct ? undefined : "opacity-50 grayscale"} />
            {ratio === 1 && (
              <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-success text-primary-foreground">
                <Check className="size-3" strokeWidth={3} />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
