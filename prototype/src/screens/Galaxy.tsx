import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Check, Crosshair, Lock, Play, Rocket as RocketIcon } from "lucide-react";
import { PLANETS } from "@/data/planets";
import { QUESTIONS_PER_PLANET } from "@/game/rules";
import { Planet, type PlanetStatus } from "@/components/Planet";
import { Rocket } from "@/components/Rocket";
import { Earth } from "@/components/Scenery";
import { Button } from "@/components/Button";
import { RouteProgress } from "@/components/RouteProgress";
import { Shell } from "@/components/Shell";
import { XpTotal } from "@/components/XpReward";
import { useGame } from "@/game/GameContext";
import { cn } from "@/lib/cn";

/*
 * The voyage: a vertical journey from a launchpad up through the 12 planets.
 * Focal moment: flag plants on the finished planet -> rocket lifts off -> flies the
 * curve with the camera following -> the next planet wakes (colour, orbit, name).
 */

type Pt = { x: number; y: number };
const PAD = -1; // index of the launchpad
const PAD_H = 260;
const FLIGHT_MS = 1500;

function buildLayout(w: number, wide: boolean) {
  const big = wide ? 104 : 92;
  const small = wide ? 68 : 62;
  const spacing = wide ? 190 : 205;
  const H = 120 + PLANETS.length * spacing + PAD_H;
  const amp = Math.min(w * 0.27, 300);
  const centers: Pt[] = PLANETS.map((_, i) => ({
    x: w / 2 + Math.sin(i * 1.25 + 0.5) * amp,
    y: H - PAD_H - (i + 0.5) * spacing,
  }));
  // Where the rocket perches: on top of the (enlarged) current planet.
  const perch: Pt[] = centers.map((c) => ({ x: c.x, y: c.y - big / 2 + 10 }));
  const pad: Pt = { x: w / 2, y: H - 175 };
  return { H, big, small, centers, perch, pad };
}

/** Curve with vertical tangents, so flights leave and arrive upright. */
const segment = (a: Pt, b: Pt, move = true) => {
  const dy = (a.y - b.y) / 2;
  return `${move ? `M${a.x} ${a.y} ` : ""}C${a.x} ${a.y - dy} ${b.x} ${b.y + dy} ${b.x} ${b.y}`;
};

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useIsWide() {
  const query = "(min-width: 768px)";
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setWide(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return wide;
}

export default function Galaxy() {
  const { state, dispatch, totalXp, isFinished } = useGame();
  const navigate = useNavigate();
  const wide = useIsWide();
  const current = state.planetIndex;
  const launched = state.launched || state.answers.length > 0;

  const sceneRef = useRef<HTMLDivElement>(null);
  const flightPathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  const [width, setWidth] = useState(0);
  const [settled, setSettled] = useState(() => (state.flyFrom ?? (launched ? current : PAD)));
  const [flight, setFlight] = useState<{ from: number; to: number } | null>(null);
  const [rocket, setRocket] = useState<(Pt & { angle: number }) | null>(null);
  const [planting, setPlanting] = useState<number | null>(null);
  const [peek, setPeek] = useState<number | null>(null);
  const [shake, setShake] = useState<number | null>(null);

  const L = useMemo(() => buildLayout(width || 360, wide), [width, wide]);
  const perchOf = useCallback((i: number) => (i === PAD ? L.pad : L.perch[i]), [L]);

  // Measure the scene width.
  useLayoutEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollTo = useCallback(
    (p: Pt, smooth = false) => {
      const el = sceneRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY + p.y - window.innerHeight * (window.innerWidth < 768 ? 0.4 : 0.5);
      window.scrollTo({ top, behavior: smooth && !reducedMotion() ? "smooth" : "instant" });
    },
    [],
  );

  // Open the camera on the rocket.
  const opened = useRef(false);
  useLayoutEffect(() => {
    if (!width || opened.current) return;
    opened.current = true;
    scrollTo(perchOf(settled));
  }, [width, settled, perchOf, scrollTo]);

  // Returning from a finished planet: plant the flag, then fly on.
  useEffect(() => {
    if (state.flyFrom === null || !width) return;
    const from = state.flyFrom;
    setPlanting(from);
    const t = window.setTimeout(() => setFlight({ from, to: current }), reducedMotion() ? 0 : 650);
    return () => window.clearTimeout(t);
  }, [state.flyFrom, current, width]);

  // The flight itself.
  useEffect(() => {
    if (!flight) return;
    const path = flightPathRef.current;
    const trail = trailRef.current;
    if (!path || !trail) return;
    const len = path.getTotalLength();
    trail.style.strokeDasharray = `${len}`;
    let raf = 0;
    let angle = 0;
    const start = performance.now();

    const finish = () => {
      setSettled(flight.to);
      setRocket(null);
      setFlight(null);
      setPlanting(null);
      setPeek(null);
      dispatch({ type: flight.from === PAD ? "liftoff" : "landed" });
    };

    if (reducedMotion()) {
      trail.style.strokeDashoffset = "0";
      scrollTo(perchOf(flight.to));
      finish();
      return;
    }

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / FLIGHT_MS);
      const e = easeInOut(t);
      const p = path.getPointAtLength(len * e);
      const ahead = path.getPointAtLength(Math.min(len, len * e + 2));
      if (ahead.x !== p.x || ahead.y !== p.y) {
        angle = (Math.atan2(ahead.y - p.y, ahead.x - p.x) * 180) / Math.PI + 90;
      }
      setRocket({ x: p.x, y: p.y, angle });
      trail.style.strokeDashoffset = `${len * (1 - e)}`;
      scrollTo(p);
      if (t < 1) raf = requestAnimationFrame(frame);
      else finish();
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [flight, dispatch, perchOf, scrollTo]);

  if (isFinished) return <Navigate to="/results" replace />;

  const launch = () => {
    setFlight({ from: PAD, to: 0 });
  };

  const statusOf = (i: number): PlanetStatus =>
    i < current ? "done" : i === current && settled === current ? "current" : "locked";

  const onPlanet = (i: number) => {
    if (flight) return;
    const s = statusOf(i);
    if (s === "current") return navigate("/play");
    setPeek(i);
    if (s === "locked") {
      setShake(i);
      window.setTimeout(() => setShake(null), 450);
    }
  };

  const backToRocket = () => {
    setPeek(null);
    scrollTo(perchOf(settled), true);
  };

  // Route: dashed all the way, solid where you've travelled.
  const routePts = [L.pad, ...L.perch];
  const fullRoute = routePts.map((p, i) => (i === 0 ? `M${p.x} ${p.y}` : segment(routePts[i - 1], p, false))).join(" ");
  const travelled = settled === PAD ? "" : routePts
    .slice(0, settled + 2)
    .map((p, i) => (i === 0 ? `M${p.x} ${p.y}` : segment(routePts[i - 1], p, false)))
    .join(" ");

  const rocketPos = rocket ?? { ...perchOf(settled), angle: 0 };
  const rocketSize = wide ? 52 : 44;
  const target = flight ? PLANETS[flight.to] : null;
  return (
    <Shell width="lg" aside={<XpTotal xp={totalXp} />} className="pt-2">
      <h1 className="sr-only">Your voyage</h1>

      <div ref={sceneRef} className="relative w-full" style={{ height: L.H }}>
        {width > 0 && (
          <>
            <svg className="absolute inset-0 overflow-visible" width={width} height={L.H} aria-hidden>
              {/* Home world horizon and the launchpad */}
              <Earth w={width} y={L.H} rise={150} />

              <path d={fullRoute} fill="none" stroke="hsl(var(--foreground) / 0.28)" strokeWidth="2" strokeDasharray="4 8" strokeLinecap="round" />
              {travelled && (
                <path d={travelled} fill="none" stroke="hsl(var(--info) / 0.8)" strokeWidth="2" strokeLinecap="round" />
              )}
              {flight && (
                <>
                  <path ref={flightPathRef} d={segment(perchOf(flight.from), perchOf(flight.to))} fill="none" stroke="none" />
                  {/* Exhaust trail paints the route as the rocket flies */}
                  <path
                    ref={trailRef}
                    d={segment(perchOf(flight.from), perchOf(flight.to))}
                    fill="none"
                    stroke="hsl(225 60% 96%)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>

            <ol>
              {PLANETS.map((p, i) => {
                const status = statusOf(i);
                const c = L.centers[i];
                const size = status === "current" ? L.big : L.small;
                const labelLeft = c.x > width / 2;
                // Clear the tilted ring (SVG stretches its arc to ~1.1x the diameter) and the current halo (r=66/100).
                const reach = Math.max(p.ringed ? 1.1 : 0.5, status === "current" ? 0.7 : 0);
                const gap = size * reach + 12;
                const answers = state.answers.filter((a) => a.planetId === p.id);
                const correct = answers.filter((a) => a.correct).length;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => onPlanet(i)}
                      aria-label={`Stop ${i + 1}, ${p.name}: ${
                        status === "done" ? `completed, ${correct} correct` : status === "current" ? "you are here, start questions" : "locked"
                      }`}
                      className={cn(
                        "absolute rounded-full transition-transform duration-500 ease-out-expo",
                        shake === i && "motion-safe:animate-[nudge_420ms_ease-in-out]",
                      )}
                      style={{ left: c.x, top: c.y, transform: "translate(-50%, -50%)" }}
                    >
                      <Planet
                        planet={p}
                        status={status}
                        size={size}
                        arriving={status === "current" && !flight}
                        className="[transition-duration:700ms]"
                      />
                      {status === "done" && <Flag planting={planting === i} />}
                      {status === "locked" && (
                        <Lock className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-foreground/80" aria-hidden />
                      )}
                    </button>
                    <span
                      className={cn(
                        "pointer-events-none absolute flex flex-col whitespace-nowrap transition-[opacity,transform] duration-500 ease-out-expo",
                        labelLeft ? "items-end text-right" : "items-start",
                      )}
                      style={{
                        left: labelLeft ? c.x - gap : c.x + gap,
                        top: c.y,
                        transform: `translate(${labelLeft ? "-100%" : "0"}, -50%)`,
                      }}
                    >
                      <span className="tabular text-xs text-muted-foreground">
                        Stop {i + 1}
                        {status === "done" && ` · ${correct}/${QUESTIONS_PER_PLANET}`}
                      </span>
                      <span
                        className={cn(
                          "font-display leading-tight",
                          status === "current" ? "text-lg font-bold text-foreground sm:text-xl" : "text-sm text-muted-foreground sm:text-base",
                        )}
                      >
                        {p.name}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>

            {/* The rocket */}
            <div
              aria-hidden
              className={cn("pointer-events-none absolute left-0 top-0 z-10", !flight && "transition-transform duration-500 ease-out-expo")}
              style={{
                transform: `translate(${rocketPos.x}px, ${rocketPos.y}px) rotate(${rocketPos.angle}deg) translate(-50%, -78%)`,
              }}
            >
              <Rocket size={rocketSize} thrust={!!flight} />
            </div>
          </>
        )}
        <p className="sr-only" aria-live="polite">
          {target ? `Flying to ${target.name}` : settled === PAD ? "On the launchpad" : `Landed on ${PLANETS[settled].name}`}
        </p>
      </div>

      {/* Mission bar */}
      <div className="sticky bottom-0 -mx-4 border-t border-border bg-surface px-4 pb-safe pt-2 sm:mx-0 sm:pt-4 sm:mb-4 sm:rounded-lg sm:border sm:px-5 sm:pb-4">
        <RouteProgress planetIndex={current} className="mb-3 mt-5 sm:mb-4 sm:mt-3" />
        <MissionBar
          flying={target?.name ?? null}
          onPad={settled === PAD}
          peek={peek !== null && peek !== current ? peek : null}
          answers={state.answers}
          onLaunch={launch}
          onStart={() => navigate("/play")}
          onBack={backToRocket}
          planetIndex={current}
        />
      </div>
    </Shell>
  );
}

function MissionBar({
  flying,
  onPad,
  peek,
  answers,
  onLaunch,
  onStart,
  onBack,
  planetIndex,
}: {
  flying: string | null;
  onPad: boolean;
  peek: number | null;
  answers: { planetId: string; correct: boolean; xp: number }[];
  onLaunch: () => void;
  onStart: () => void;
  onBack: () => void;
  planetIndex: number;
}) {
  const planet = PLANETS[planetIndex];
  const count = QUESTIONS_PER_PLANET;
  let lead: React.ReactNode;
  let action: React.ReactNode;

  if (flying) {
    lead = <Lead meta="In flight" title={`Heading to ${flying}`} planet={planet} />;
    action = (
      <Button size="lg" variant="secondary" disabled className="w-full sm:w-auto">
        <RocketIcon className="size-5" aria-hidden /> Flying…
      </Button>
    );
  } else if (onPad) {
    lead = <Lead meta="Launchpad" title="12 planets ahead. Ready?" />;
    action = (
      <Button size="lg" onClick={onLaunch} className="w-full sm:w-auto">
        <RocketIcon className="size-5" aria-hidden /> Launch
      </Button>
    );
  } else if (peek !== null) {
    const p = PLANETS[peek];
    const done = peek < planetIndex;
    const mine = answers.filter((a) => a.planetId === p.id);
    lead = (
      <Lead
        meta={done ? `Stop ${peek + 1} · completed` : `Stop ${peek + 1} · locked`}
        title={p.name}
        detail={
          done
            ? `${mine.filter((a) => a.correct).length} of ${QUESTIONS_PER_PLANET} correct · ${mine.reduce((s, a) => s + a.xp, 0)} XP`
            : `Unlocks after ${PLANETS[peek - 1].name}`
        }
        planet={p}
        icon={done ? <Check className="size-3.5" strokeWidth={3} /> : <Lock className="size-3.5" />}
      />
    );
    action = (
      <Button size="lg" variant="secondary" onClick={onBack} className="w-full sm:w-auto">
        <Crosshair className="size-5" aria-hidden /> Back to my rocket
      </Button>
    );
  } else {
    lead = <Lead meta={`Stop ${planetIndex + 1} of ${PLANETS.length} · ${count} questions`} title={planet.name} planet={planet} />;
    action = (
      <Button size="lg" onClick={onStart} className="w-full sm:w-auto">
        <Play className="size-5 fill-current" aria-hidden /> Start
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {lead}
      {action}
    </div>
  );
}

function Lead({
  meta,
  title,
  detail,
  planet,
  icon,
}: {
  meta: string;
  title: string;
  detail?: string;
  planet?: (typeof PLANETS)[number];
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {planet ? <Planet planet={planet} size={38} /> : <Rocket size={26} />}
      <div className="min-w-0">
        <p className="truncate font-display text-xl font-bold">{title}</p>
        <p className="tabular flex items-center gap-1.5 text-sm text-muted-foreground">
          {icon}
          {meta}
          {detail && <span>· {detail}</span>}
        </p>
      </div>
    </div>
  );
}

/** Pennant planted on a finished planet. */
function Flag({ planting }: { planting: boolean }) {
  return (
    <svg
      viewBox="0 0 24 32"
      width="24"
      height="32"
      aria-hidden
      className={cn(
        "absolute -top-6 left-1/2 origin-bottom",
        planting && "motion-safe:animate-[plant_520ms_cubic-bezier(0.16,1,0.3,1)]",
      )}
    >
      <rect x="3" y="2" width="2.5" height="30" rx="1.2" fill="hsl(225 60% 96%)" />
      <path d="M5.5 3h15l-4 5.5 4 5.5h-15Z" fill="hsl(var(--primary))" />
    </svg>
  );
}
