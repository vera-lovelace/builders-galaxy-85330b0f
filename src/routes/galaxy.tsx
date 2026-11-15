import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Flag, Play, Trophy } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Earth } from "@/components/Earth";
import { Planet, type PlanetState } from "@/components/Planet";
import { Rocket } from "@/components/Rocket";
import { PLANETS } from "@/data/planets";
import { planetScores } from "@/game/run";
import { runStore, useRun } from "@/game/runStore";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galaxy")({
  head: () => meta("Galaxy voyage — Builder's Galaxy", "Fly your rocket from Earth through 12 planets of product management."),
  component: Galaxy,
});

const GAP = 240;
const BOTTOM = 300;
const SIZE = 76;

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(390);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function Galaxy() {
  const run = useRun();
  const navigate = useNavigate();
  const [ref, w] = useWidth();
  const H = BOTTOM + GAP * (PLANETS.length - 1) + 160;
  const amp = Math.min(w * 0.26, 200);
  const pts = useMemo(
    () => PLANETS.map((_, i) => ({ x: w / 2 + amp * Math.sin(i * 1.25 + 0.6), y: H - BOTTOM - i * GAP })),
    [w, amp, H],
  );

  const current = run?.current ?? 0;
  const [rocketAt, setRocketAt] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [shake, setShake] = useState<number | null>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (run === null) navigate({ to: "/join" });
  }, [run, navigate]);

  // Flight: start parked at the last shown planet, then fly to the current one.
  useEffect(() => {
    if (!run) return;
    const from = Math.min(run.shown, PLANETS.length - 1);
    const to = Math.min(run.current, PLANETS.length - 1);
    setRocketAt(from);
    const scrollTo = (i: number, smooth: boolean) =>
      requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY + pts[i]!.y - window.innerHeight / 2;
        window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
      });
    scrollTo(from, false);
    if (from === to) return;
    const t = setTimeout(() => {
      setRocketAt(to);
      scrollTo(to, true);
      runStore.update((r) => ({ ...r, shown: r.current }));
    }, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run?.startedAt, w]);

  const scores = useMemo(() => (run ? planetScores(run) : []), [run]);
  if (!run) return <div className="min-h-dvh bg-space" />;

  const done = run.current >= PLANETS.length;
  const landed = rocketAt ?? current;
  const focus = selected ?? Math.min(current, PLANETS.length - 1);
  const fp = PLANETS[focus]!;
  const fs = scores[focus]!;

  const pathD = (upto: number) => {
    let d = `M ${w / 2} ${H - 90}`;
    let prev = { x: w / 2, y: H - 90 };
    for (let i = 0; i <= upto; i++) {
      const p = pts[i]!;
      const dy = (prev.y - p.y) / 2;
      d += ` C ${prev.x} ${prev.y - dy}, ${p.x} ${p.y + dy}, ${p.x} ${p.y}`;
      prev = p;
    }
    return d;
  };

  const tap = (i: number) => {
    if (i > current) {
      setShake(i);
      setTimeout(() => setShake(null), 800);
    }
    setSelected(i);
  };

  const rp = pts[landed]!;
  const prevPt = pts[Math.max(0, landed - 1)]!;
  const angle = landed === 0 ? 0 : (Math.atan2(rp.x - prevPt.x, prevPt.y - rp.y) * 180) / Math.PI * 0.6;

  return (
    <main className="relative min-h-dvh bg-space pb-40">
      <div ref={ref} className="relative mx-auto w-full max-w-3xl" style={{ height: H }}>
        <Earth className="h-[220px]" />
        <svg className="absolute inset-0" width={w} height={H} aria-hidden>
          <path d={pathD(PLANETS.length - 1)} fill="none" className="stroke-muted-foreground/30" strokeWidth="1.5" />
          <path d={pathD(Math.min(landed, PLANETS.length - 1))} fill="none" className="stroke-info transition-all" strokeWidth="2" />
        </svg>

        {PLANETS.map((p, i) => {
          const state: PlanetState = i < current ? "done" : i === current && landed === current ? "current" : "locked";
          const s = scores[i]!;
          const left = pts[i]!.x > w / 2 - 1;
          return (
            <div key={p.id} className="absolute" style={{ left: pts[i]!.x, top: pts[i]!.y }}>
              <button
                type="button"
                onClick={() => tap(i)}
                aria-label={`Stop ${i + 1}: ${p.name}${state === "locked" ? " (locked)" : state === "done" ? ` (${s.correct} of ${s.total} correct)` : " (current)"}`}
                className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-full", shake === i && "animate-shake")}
              >
                <Planet color={p.color} ring={p.ring} size={state === "current" ? SIZE * 1.4 : SIZE} state={state} />
              </button>
              {state === "done" && (
                <Flag className="absolute -top-14 left-0 size-6 animate-plant fill-primary text-primary" aria-hidden />
              )}
              <div
                className={cn("pointer-events-none absolute top-0 -translate-y-1/2 whitespace-nowrap", left ? "right-16 text-right" : "left-16")}
                style={state === "current" ? { [left ? "right" : "left"]: 80 } : undefined}
              >
                <p className="text-xs text-muted-foreground">Stop {i + 1}{state === "done" && ` · ${s.correct}/${s.total}`}</p>
                <p className={cn("font-display transition-all", state === "current" ? "text-xl font-bold text-foreground" : "text-base", state === "locked" && "text-muted-foreground/80")}>{p.name}</p>
              </div>
            </div>
          );
        })}

        {!done && (
          <div
            ref={rocketRef}
            className="pointer-events-none absolute left-0 top-0 transition-transform flight-transition ease-in-out"
            style={{ transform: `translate(${rp.x - 14}px, ${rp.y - SIZE * 0.7 - 44}px) rotate(${angle}deg)` }}
          >
            <Rocket size={28} />
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 backdrop-blur sm:bottom-4 sm:mx-auto sm:max-w-3xl sm:rounded-2xl sm:border">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          {done ? (
            <>
              <div className="flex-1">
                <p className="font-display text-lg font-bold">Voyage complete</p>
                <p className="text-sm text-muted-foreground">All 12 planets visited.</p>
              </div>
              <Button asChild><Link to="/results"><Trophy /> See results</Link></Button>
            </>
          ) : (
            <>
              <div className="flex flex-1 items-center gap-3">
                <Planet color={fp.color} size={36} state={focus > current ? "locked" : "done"} />
                <div aria-live="polite">
                  <p className="font-display text-lg font-bold">{fp.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {focus === current && `Stop ${focus + 1} of 12 · ${fs.total} questions`}
                    {focus < current && `${fs.correct} of ${fs.total} correct · ${fs.xp} XP`}
                    {focus > current && `Locked · finish ${PLANETS[focus - 1]?.name} to unlock`}
                  </p>
                </div>
              </div>
              {focus === current && (
                <Button asChild className="w-full sm:w-auto"><Link to="/play"><Play className="fill-current" /> Start</Link></Button>
              )}
              {focus !== current && (
                <Button variant="secondary" className="w-full sm:w-auto" onClick={() => setSelected(null)}>Back to {PLANETS[current]?.name}</Button>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
