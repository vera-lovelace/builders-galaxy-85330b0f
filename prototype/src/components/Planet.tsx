import type { CSSProperties } from "react";
import type { Planet as PlanetData } from "@/data/planets";
import { cn } from "@/lib/cn";

export type PlanetStatus = "locked" | "current" | "done";

interface PlanetProps {
  planet: PlanetData;
  status?: PlanetStatus;
  /** Diameter in px. */
  size?: number;
  /** Plays the one-shot arrival pulse. */
  arriving?: boolean;
  className?: string;
}

/**
 * Flat-vector planet: lit face, crescent shade, craters, optional ring.
 * Current planets get a slowly turning dashed orbit. Purely visual.
 */
export function Planet({ planet, status = "done", size = 64, arriving, className }: PlanetProps) {
  const h = planet.hue;
  const lit = `hsl(${h} 78% 62%)`;
  const shade = `hsl(${h} 58% 40%)`;
  const highlight = `hsl(${h} 90% 80%)`;
  const ring = `hsl(${h} 70% 82%)`;
  const clip = `clip-${planet.id}`;

  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-block shrink-0 transition-[filter,opacity] duration-300",
        status === "locked" && "opacity-60 saturate-[0.3]",
        className,
      )}
      style={{ width: size, height: size, "--planet-glow": `${h} 80% 62%` } as CSSProperties}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} overflow="visible" className="block">
        <defs>
          <clipPath id={clip}>
            <circle cx="50" cy="50" r="50" />
          </clipPath>
          <radialGradient id={`${clip}-shade`} cx="36%" cy="32%" r="78%">
            <stop offset="0" stopColor={highlight} />
            <stop offset="0.45" stopColor={lit} />
            <stop offset="0.85" stopColor={shade} />
            <stop offset="1" stopColor="hsl(232 60% 6%)" />
          </radialGradient>
        </defs>
        {status === "current" && (
          <circle
            cx="50"
            cy="50"
            r="66"
            fill="none"
            stroke="hsl(var(--foreground) / 0.45)"
            strokeWidth="2"
            strokeDasharray="4 8"
            className="origin-center motion-safe:animate-[spin_24s_linear_infinite]"
          />
        )}
        {planet.ringed && (
          <path d="M-24 46 A74 18 -12 0 1 124 54" fill="none" stroke={ring} strokeWidth="6" strokeLinecap="round" />
        )}
        <g clipPath={`url(#${clip})`}>
          <rect width="100" height="100" fill={`url(#${clip}-shade)`} />
          {/* Cloud or gas bands */}
          <path d="M-5 38 Q50 30 105 40" stroke={highlight} strokeOpacity="0.35" strokeWidth="5" fill="none" />
          <path d="M-5 62 Q50 54 105 66" stroke={shade} strokeOpacity="0.45" strokeWidth="7" fill="none" />
        </g>
        <circle cx="50" cy="50" r="49.5" fill="none" stroke={highlight} strokeOpacity="0.55" strokeWidth="1.5" />
        {planet.ringed && (
          <path d="M-24 46 A74 18 -12 0 0 124 54" fill="none" stroke={ring} strokeWidth="6" strokeLinecap="round" />
        )}
      </svg>
      {arriving && (
        <span className="absolute inset-0 rounded-full motion-safe:animate-[arrive_900ms_ease-out_2]" />
      )}
    </span>
  );
}
