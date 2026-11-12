import { cn } from "@/lib/utils";

/** Stable visor hue derived from the nickname. */
export function visorHue(nickname: string) {
  let h = 0;
  for (const ch of nickname.toLowerCase()) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

interface Props { nickname: string; size?: number; full?: boolean; cheer?: boolean; className?: string }

export function PlayerAvatar({ nickname, size = 48, full, cheer, className }: Props) {
  const hue = visorHue(nickname || "?");
  const visor = `hsl(${hue} 60% 28%)`;
  const rim = `hsl(${hue} 75% 62%)`;
  const initial = (nickname.trim()[0] || "?").toUpperCase();
  const vb = full ? "0 0 120 150" : "0 0 120 110";
  return (
    <svg viewBox={vb} width={size} height={full ? size * 1.25 : (size * 110) / 120} className={cn("shrink-0", className)} role="img" aria-label={`${nickname} astronaut`}>
      {full && (
        <g className="fill-suit stroke-background" strokeWidth="3">
          {cheer ? (
            <rect x="88" y="78" width="14" height="34" rx="7" transform="rotate(40 95 95)" />
          ) : (
            <rect x="90" y="88" width="14" height="32" rx="7" />
          )}
          <rect x="16" y="88" width="14" height="32" rx="7" />
          <rect x="32" y="80" width="56" height="48" rx="14" />
          <rect x="38" y="122" width="18" height="20" rx="5" />
          <rect x="64" y="122" width="18" height="20" rx="5" />
          <rect x="34" y="136" width="24" height="10" rx="5" className="fill-suit-shade" />
          <rect x="62" y="136" width="24" height="10" rx="5" className="fill-suit-shade" />
          <rect x="46" y="94" width="28" height="16" rx="5" fill={visor} stroke={rim} />
          <circle cx="55" cy="102" r="2.5" fill={rim} stroke="none" />
          <circle cx="65" cy="102" r="2.5" className="fill-primary" stroke="none" />
        </g>
      )}
      <rect x="10" y="40" width="10" height="24" rx="4" className="fill-suit-shade" />
      <rect x="100" y="40" width="10" height="24" rx="4" className="fill-suit-shade" />
      <circle cx="60" cy="52" r="44" className="fill-suit stroke-background" strokeWidth="3" />
      <circle cx="60" cy="52" r="33" fill={visor} stroke={rim} strokeWidth="5" />
      <path d="M40 38 A26 26 0 0 1 58 26" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
      <text x="60" y="64" textAnchor="middle" fontSize="34" fontWeight="800" fill={rim} style={{ fontFamily: "var(--font-display)" }}>
        {initial}
      </text>
    </svg>
  );
}
