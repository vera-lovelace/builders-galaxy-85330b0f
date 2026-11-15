import { Lock } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils";

export type PlanetState = "locked" | "current" | "done";

interface Props {
  color: string;
  size?: number;
  ring?: boolean | undefined;
  state?: PlanetState;
  className?: string | undefined;
}

/** Shaded sphere with an atmosphere rim and optional ring. */
export function Planet({ color, size = 80, ring, state = "done", className }: Props) {
  const id = useId().replace(/:/g, "");
  const locked = state === "locked";
  const pad = ring ? size * 0.6 : size * 0.25;
  const w = size + pad * 2;
  const c = w / 2;
  const r = size / 2;
  return (
    <div className={cn("relative", className)} style={{ width: w, height: w }}>
      {state === "current" && (
        <div
          className="absolute rounded-full border-2 border-dashed border-foreground/45 animate-spin-slow"
          style={{ inset: pad - size * 0.16 }}
        />
      )}
      <svg width={w} height={w} viewBox={`0 0 ${w} ${w}`} className={cn("relative !h-full !w-full transition-[filter] duration-700", locked && "planet-locked")}>
        <defs>
          <radialGradient id={`g${id}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="white" stopOpacity="0.55" />
            <stop offset="35%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`s${id}`} cx="70%" cy="75%" r="70%">
            <stop offset="30%" stopColor="black" stopOpacity="0" />
            <stop offset="75%" stopColor="black" stopOpacity="0.55" />
            <stop offset="100%" stopColor="black" stopOpacity="0.85" />
          </radialGradient>
          <clipPath id={`c${id}`}><circle cx={c} cy={c} r={r} /></clipPath>
          <filter id={`t${id}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency={`${(0.9 / size).toFixed(3)} ${(7 / size).toFixed(3)}`} numOctaves="4" seed={color.length + size} />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.6 -0.55" />
          </filter>
          <radialGradient id={`a${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor={color} stopOpacity="0" />
            <stop offset="100%" stopColor={color} stopOpacity="0.45" />
          </radialGradient>
        </defs>
        {ring && (
          <ellipse cx={c} cy={c} rx={r * 1.75} ry={r * 0.45} fill="none" stroke={color} strokeOpacity="0.55" strokeWidth={size * 0.06}
            transform={`rotate(-12 ${c} ${c})`} />
        )}
        <circle cx={c} cy={c} r={r * 1.12} fill={`url(#a${id})`} />
        <circle cx={c} cy={c} r={r} fill={`url(#g${id})`} />
        <g clipPath={`url(#c${id})`} style={{ mixBlendMode: "multiply" }} opacity="0.55">
          <rect x={c - r} y={c - r} width={size} height={size} filter={`url(#t${id})`} transform={`rotate(-12 ${c} ${c})`} />
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
