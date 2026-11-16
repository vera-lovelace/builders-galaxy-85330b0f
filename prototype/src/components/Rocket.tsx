interface RocketProps {
  size?: number;
  /** Lights the engine flame. */
  thrust?: boolean;
  /** Body hue (0–360). Defaults to the nova-yellow primary. */
  hue?: number;
  className?: string;
}

/** Authored flat rocket. Points up at rotate(0). */
export function Rocket({ size = 40, thrust = false, hue, className }: RocketProps) {
  const body = hue === undefined ? "hsl(var(--primary))" : `hsl(${hue} 85% 64%)`;
  const shade = hue === undefined ? "hsl(40 95% 50%)" : `hsl(${hue} 70% 50%)`;
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 48 68" overflow="visible" className={className} aria-hidden>
      {thrust && (
        <g className="origin-[24px_44px] motion-safe:animate-[flame_160ms_ease-in-out_infinite_alternate]">
          <path d="M17 42c0 10 3 18 7 24 4-6 7-14 7-24Z" fill="hsl(var(--danger))" />
          <path d="M20 42c0 7 2 12 4 16 2-4 4-9 4-16Z" fill="hsl(var(--primary))" />
        </g>
      )}
      <path d="M17 32 9 41l1-11 7-6v8ZM31 32l8 9-1-11-7-6v8Z" fill="hsl(var(--danger))" />
      <path d="M24 2c7 6 10 15 10 24 0 6-1 11-3 16H17c-2-5-3-10-3-16 0-9 3-18 10-24Z" fill={body} />
      <path d="M24 2c7 6 10 15 10 24 0 6-1 11-3 16h-7V2Z" fill={shade} />
      <circle cx="24" cy="21" r="5" fill="hsl(232 46% 14%)" />
      <circle cx="22.5" cy="19.5" r="1.6" fill="hsl(var(--info))" />
    </svg>
  );
}
