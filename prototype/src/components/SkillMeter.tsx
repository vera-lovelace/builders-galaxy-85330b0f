import type { ReactNode } from "react";
import type { Planet as PlanetData } from "@/data/planets";
import { Planet } from "./Planet";

/** One row of the results skill map: planet, name, segmented score. */
export function SkillMeter({
  stop,
  planet,
  correct,
  total,
  action,
}: {
  stop: number;
  planet: PlanetData;
  correct: number;
  total: number;
  action?: ReactNode;
}) {
  return (
    <li className="flex items-center gap-3 border-b border-border/60 py-2.5 last:border-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-0">
      <span className="tabular w-5 shrink-0 text-right text-xs text-muted-foreground">{stop}</span>
      {/* Slot sized for a ringed planet's ring */}
      <span className="grid w-10 shrink-0 place-items-center">
        <Planet planet={planet} size={planet.ringed ? 16 : 22} />
      </span>
      <span className="min-w-0 flex-1 text-sm leading-tight sm:text-base">{planet.name}</span>
      <span className="flex gap-1" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className="h-2.5 w-5 rounded-full"
            style={{ background: i < correct ? `hsl(${planet.hue} 80% 62%)` : "hsl(var(--muted))" }}
          />
        ))}
      </span>
      <span className="tabular w-12 shrink-0 text-right text-sm text-muted-foreground">
        {correct} of {total}
        <span className="sr-only"> correct</span>
      </span>
      {action}
    </li>
  );
}
