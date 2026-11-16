import { useId, useState } from "react";
import { PLANETS } from "@/data/planets";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/Button";
import { Rocket } from "@/components/Rocket";
import { Earth } from "@/components/Scenery";
import { AboutLink } from "@/components/AboutLink";

/**
 * Welcome: the rocket idles in low Earth orbit. Pressing Play sends it up and away
 * before onboarding begins.
 */
export default function Welcome() {
  const navigate = useNavigate();
  const [launching, setLaunching] = useState(false);

  const play = () => {
    if (launching) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return navigate("/join");
    setLaunching(true);
    window.setTimeout(() => navigate("/join"), 1000);
  };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 pt-4 sm:px-6 sm:pt-6">
        <span className="inline-flex items-center gap-2 font-display text-lg font-bold">
          <Rocket size={20} />
          Builder's Galaxy
        </span>
        <AboutLink className="-mr-3" />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-end px-4 pb-[36vh] pt-8 text-center sm:justify-center sm:pb-[34vh]">
        <p className="mb-4 font-display text-lg font-semibold text-foreground sm:text-xl">
          Every great product starts with a builder.
        </p>
        <h1 className="font-display text-6xl font-extrabold leading-[0.9] sm:text-8xl">
          Builder's
          <br />
          <span className="text-primary">Galaxy</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted-foreground sm:text-xl">
          Discover where you shine across 12 product skills, learn from people who've built it, and chart your next
          step.
        </p>
        <Button size="lg" className="mt-8 w-full max-w-xs" onClick={play} disabled={launching}>
          <Play className="size-5 fill-current" aria-hidden />
          {launching ? "Lift-off!" : "Start your voyage"}
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">12 planets · 24 questions · free, no sign-up</p>
      </main>

      {/* Home world with the rocket on its pad: one scene per width so it never over-scales */}
      <HomeWorld w={400} launching={launching} className="h-[36vh] min-h-56 sm:hidden" />
      <HomeWorld w={1280} launching={launching} className="hidden h-[34vh] min-h-64 sm:block" />
    </div>
  );
}

function HomeWorld({ w, launching, className }: { w: number; launching: boolean; className: string }) {
  const H = 260;
  const rise = 118;
  const rocket = w > 600 ? 54 : 38;
  const id = useId().replace(/:/g, "");
  // The 12 planets wait along an orbit concentric with Earth's limb, parted where the rocket sits.
  const R = Math.max(w * 1.1, 900);
  const cx = w / 2;
  const cy = H - rise + R;
  const Ro = R + (w > 600 ? 78 : 64);
  const wide = w > 600;
  // On phones the arc runs off both edges so the planets keep their spacing.
  const span = wide ? [80, w - 80] : [-6, w + 6];
  const gapHalf = wide ? 70 : 34;
  const dot = wide ? 26 : 14;
  const side = PLANETS.length / 2;
  const xs = PLANETS.map((_, i) => {
    const left = i < side;
    const k = left ? i : i - side;
    const [a, b] = left ? [span[0], cx - gapHalf] : [cx + gapHalf, span[1]];
    return a + ((b - a) * (k + 0.5)) / side;
  });
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 w-full overflow-visible ${className}`}
      viewBox={`0 0 ${w} ${H}`}
      preserveAspectRatio="xMidYMax slice"
    >
      <Earth w={w} y={H} rise={rise} />
      <circle cx={cx} cy={cy} r={Ro} fill="none" stroke="hsl(var(--foreground) / 0.28)" strokeWidth={wide ? 2 : 1.5} strokeDasharray="4 8" strokeLinecap="round" />
      {PLANETS.map((p, i) => {
        const x = xs[i];
        const y = cy - Math.sqrt(Ro * Ro - (x - cx) * (x - cx));
        const r = dot / 2;
        return (
          <g key={p.id} transform={`translate(${x} ${y})`}>
            <defs>
              <radialGradient id={`w-${id}-${i}`} cx="36%" cy="32%" r="78%">
                <stop offset="0" stopColor={`hsl(${p.hue} 90% 80%)`} />
                <stop offset="0.45" stopColor={`hsl(${p.hue} 78% 62%)`} />
                <stop offset="0.85" stopColor={`hsl(${p.hue} 58% 40%)`} />
                <stop offset="1" stopColor="hsl(232 60% 6%)" />
              </radialGradient>
            </defs>
            <circle r={r} fill={`url(#w-${id}-${i})`} />
            {p.ringed && (
              <ellipse rx={r * 1.7} ry={r * 0.42} transform="rotate(-12)" fill="none" stroke={`hsl(${p.hue} 70% 82%)`} strokeWidth={wide ? 2.5 : 1.5} />
            )}
          </g>
        );
      })}
      <g
        style={{
          transform: launching ? "translateY(-1400px)" : "translateY(0)",
          transition: "transform 1100ms cubic-bezier(0.55, 0, 0.8, 0.25)",
        }}
      >
        <g transform={`translate(${w / 2 - rocket / 2} ${H - rise - 22 - rocket * 1.4 * 0.62})`}>
          <Rocket size={rocket} thrust />
        </g>
      </g>
    </svg>
  );
}
