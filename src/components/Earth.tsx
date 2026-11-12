import { cn } from "@/lib/utils";

/** Earth limb seen from orbit, anchored to the bottom of its parent. */
export function Earth({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden", className)}>
      <div
        className="absolute left-1/2 top-0 aspect-square w-[260%] -translate-x-1/2 rounded-full sm:w-[160%]"
        style={{
          background:
            "radial-gradient(ellipse 40% 3% at 30% 6%, color-mix(in oklab, white 35%, transparent), transparent)," +
            "radial-gradient(ellipse 35% 2.5% at 65% 9%, color-mix(in oklab, white 30%, transparent), transparent)," +
            "radial-gradient(ellipse 45% 3% at 45% 13%, color-mix(in oklab, white 25%, transparent), transparent)," +
            "radial-gradient(circle at 50% 0%, var(--earth) 0%, var(--earth-deep) 35%, var(--background) 60%)",
          boxShadow: "0 0 0 14px color-mix(in oklab, var(--earth) 18%, transparent), 0 -20px 60px -10px color-mix(in oklab, var(--earth) 50%, transparent)",
        }}
      />
    </div>
  );
}
