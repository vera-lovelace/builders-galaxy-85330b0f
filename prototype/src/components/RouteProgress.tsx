import { PLANETS } from "@/data/planets";
import { Rocket } from "./Rocket";
import { cn } from "@/lib/cn";

/**
 * The voyage route as a compact strip: 12 planet dots joined by a dashed line.
 * Reused on the Question screen so progress always reads as distance travelled.
 */
export function RouteProgress({ planetIndex, className }: { planetIndex: number; className?: string }) {
  return (
    <div
      role="progressbar"
      aria-label="Voyage progress"
      aria-valuemin={1}
      aria-valuemax={PLANETS.length}
      aria-valuenow={planetIndex + 1}
      aria-valuetext={`Planet ${planetIndex + 1} of ${PLANETS.length}: ${PLANETS[planetIndex].name}`}
      className={cn("relative flex items-center justify-between", className)}
    >
      <span className="absolute inset-x-1 top-1/2 border-t-2 border-dashed border-border" />
      <span
        className="absolute left-1 top-1/2 border-t-2 border-info transition-[width] duration-700 ease-out-expo"
        style={{ width: `calc(${(planetIndex / (PLANETS.length - 1)) * 100}% - 0.5rem)` }}
      />
      {PLANETS.map((p, i) => {
        const done = i < planetIndex;
        const current = i === planetIndex;
        return (
          <span key={p.id} className="relative grid place-items-center">
            <span
              className={cn(
                "rounded-full transition-transform duration-300",
                current ? "size-3.5" : "size-2.5",
                !done && !current && "opacity-40",
              )}
              style={{ background: `hsl(${p.hue} 80% 62%)` }}
            />
            {current && <Rocket size={14} className="absolute -top-6 left-1/2 -translate-x-1/2" />}
          </span>
        );
      })}
    </div>
  );
}
