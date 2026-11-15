import { Pause, Timer } from "lucide-react";
import { LOW_TIME_SECONDS } from "@/game/rules";
import type { Planet as PlanetData } from "@/data/planets";
import { Planet } from "./Planet";
import { cn } from "@/lib/cn";

/**
 * Countdown drawn as an orbit around the current planet: the ring drains clockwise
 * and turns coral at LOW_TIME_SECONDS or less. The seconds count sits on the ring, so the
 * time left never depends on colour alone. Paused shows a pause icon and the word.
 */
export function OrbitTimer({
  planet,
  secondsLeft,
  total,
  size,
  paused = false,
}: {
  planet: PlanetData;
  secondsLeft: number;
  total: number;
  /** Outer diameter in px. */
  size: number;
  paused?: boolean;
}) {
  const low = secondsLeft <= LOW_TIME_SECONDS;
  const pct = (secondsLeft / total) * 100;
  const big = size > 120;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} className="absolute inset-0" aria-hidden>
        <circle cx="50" cy="50" r="46" fill="none" stroke="hsl(var(--muted))" strokeWidth={big ? 3 : 5} />
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={low ? "hsl(var(--danger))" : "hsl(var(--info))"}
          strokeWidth={big ? 3 : 5}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${pct} 100`}
          transform="rotate(-90 50 50)"
          className="transition-[stroke-dasharray,stroke] duration-1000 ease-linear motion-reduce:transition-none"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <Planet planet={planet} size={Math.round(size * (planet.ringed ? 0.46 : 0.62))} />
      </span>
      <span
        className={cn(
          "tabular absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border bg-surface font-display font-bold",
          big ? "-bottom-3 px-3 py-0.5 text-xl" : "-bottom-2.5 px-2 text-sm",
          low ? "border-danger text-danger" : "border-border text-foreground",
        )}
      >
        {paused ? (
          <Pause className={big ? "size-5" : "size-3.5"} aria-hidden />
        ) : (
          <Timer className={big ? "size-5" : "size-3.5"} aria-hidden />
        )}
        {secondsLeft}
        <span className="sr-only"> seconds left{paused ? ", paused" : ""}</span>
        {paused && big && <span className="text-base font-semibold" aria-hidden>Paused</span>}
      </span>
    </div>
  );
}
