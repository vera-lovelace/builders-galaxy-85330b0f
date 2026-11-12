import { Lock } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils";

export type PlanetState = "locked" | "current" | "done";

interface Props {
  color: string;
  size?: number;
  ring?: boolean | undefined;
  state?: PlanetState;
  className?: string;
}

/** Shaded sphere with an atmosphere rim and optional ring. */
export function Planet({ color, size = 80, ring, state = "done", className }: Props) {
  const id = useId().replace(/:/g, "");
  const locked = state === "locked";
  const pad = ring ? size * 0.45 : size * 0.25;
  const w = size + pad * 2;
  const c = w / 2;
  const r = size / 2;
  return (
    <div className={cn("relative", className)} style={{ width: w, height: w }}>
      {state === "current" && (
        <div
          className="absolute rounded-full border-2 border-dashed border-muted-foreground/60 animate-spin-slow"
          style={{ inset: pad - size * 0.16 }}
        />
      )}
      <svg width={w} height={w} viewBox={`0 0 ${w} ${w}`} className={cn("relative transition-[filter] duration-700", locked && "grayscale opacity-70")}>
        <defs>
          <radialGradient id={`g${id}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="white" stopOpacity="0.55" />
            <stop offset="35%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`s${id}`} cx="70%" cy="75%" r="70%">
            <stop offset="40%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.45" />
          </radialGradient>
          <clipPath id={`c${id}`}><circle cx={c} cy={c} r={r} /></clipPath>
        </defs>
        {ring && (
          <ellipse cx={c} cy={c} rx={r * 1.75} ry={r * 0.45} fill="none" stroke={color} strokeOpacity="0.55" strokeWidth={size * 0.06}
            transform={`rotate(-12 ${c} ${c})`} />
        )}
        <circle cx={c} cy={c} r={r + 2} fill={color} opacity="0.25" />
        <circle cx={c} cy={c} r={r} fill={`url(#g${id})`} />
        <g clipPath={`url(#c${id})`} opacity="0.25">
          <rect x={c - r} y={c - r * 0.15} width={size} height={r * 0.12} fill="white" />
          <rect x={c - r} y={c + r * 0.25} width={size} height={r * 0.2} fill="black" opacity="0.6" />
        </g>
        <circle cx={c} cy={c} r={r} fill={`url(#s${id})`} />
        {ring && (
          <path
            d={`M ${c - r * 1.75} ${c} A ${r * 1.75} ${r * 0.45} 0 0 0 ${c + r * 1.75} ${c}`}
            fill="none" stroke={color} strokeWidth={size * 0.06} transform={`rotate(-12 ${c} ${c})`}
          />
        )}
      </svg>
      {locked && <Lock className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-foreground/80" aria-hidden />}
    </div>
  );
}
