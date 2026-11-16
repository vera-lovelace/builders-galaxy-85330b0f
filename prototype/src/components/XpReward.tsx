import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

/** "+130 XP" reward chip. Animates in once when it mounts. */
export function XpReward({ xp, className }: { xp: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 font-display font-bold text-primary",
        "motion-safe:animate-[xp-rise_420ms_cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
    >
      <Sparkles className="size-4" aria-hidden />
      <span className="tabular">+{xp} XP</span>
    </span>
  );
}

/** Running XP total for headers. */
export function XpTotal({ xp }: { xp: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-display font-bold text-primary">
      <Sparkles className="size-4" aria-hidden />
      <span className="tabular">{xp.toLocaleString()} XP</span>
    </span>
  );
}
