import { cn } from "@/lib/cn";

/** Stable hue (0–360) from a nickname, so each player keeps their colour. */
export function hueFor(name: string) {
  let h = 0;
  for (const ch of name.toLowerCase()) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

const initial = (name: string) => (name.trim()[0] ?? "?").toUpperCase();

const SUIT = "hsl(225 40% 97%)";
const SUIT_SHADE = "hsl(226 30% 80%)";
const LINE = "hsl(232 46% 14%)";

function Helmet({ name, h }: { name: string; h: number }) {
  return (
    <g>
      <rect x="11" y="34" width="8" height="16" rx="3" fill={SUIT_SHADE} stroke={LINE} strokeWidth="2" />
      <rect x="81" y="34" width="8" height="16" rx="3" fill={SUIT_SHADE} stroke={LINE} strokeWidth="2" />
      <circle cx="50" cy="42" r="33" fill={SUIT} stroke={LINE} strokeWidth="2.5" />
      <circle cx="50" cy="44" r="24" fill={`hsl(${h} 50% 26%)`} stroke={`hsl(${h} 70% 62%)`} strokeWidth="3" />
      <path d="M34 34a18 18 0 0 1 12-9" fill="none" stroke="hsl(0 0% 100% / 0.55)" strokeWidth="3" strokeLinecap="round" />
      <text
        x="50"
        y="52"
        textAnchor="middle"
        fontFamily="Bricolage Grotesque Variable, system-ui, sans-serif"
        fontWeight="800"
        fontSize="24"
        fill={`hsl(${h} 90% 82%)`}
      >
        {initial(name)}
      </text>
    </g>
  );
}

/**
 * A player's astronaut: helmet visor tinted with their colour and showing their initial.
 * `full` draws the whole suit; `cheer` raises one arm (podium winner, onboarding reveal).
 */
export function PlayerAvatar({
  name,
  size = 48,
  full = false,
  cheer = false,
  className,
}: {
  name: string;
  size?: number;
  full?: boolean;
  cheer?: boolean;
  className?: string;
}) {
  const h = hueFor(name);
  if (!full) {
    return (
      <svg viewBox="8 6 84 76" width={size} height={size * (76 / 84)} aria-hidden className={cn("shrink-0", className)}>
        <Helmet name={name} h={h} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 128" width={size} height={size * 1.28} aria-hidden className={cn("shrink-0 overflow-visible", className)}>
      {/* Legs and boots */}
      <rect x="33" y="98" width="14" height="24" rx="6" fill={SUIT} stroke={LINE} strokeWidth="2.5" />
      <rect x="53" y="98" width="14" height="24" rx="6" fill={SUIT} stroke={LINE} strokeWidth="2.5" />
      <rect x="31" y="116" width="18" height="9" rx="4" fill={SUIT_SHADE} stroke={LINE} strokeWidth="2.5" />
      <rect x="51" y="116" width="18" height="9" rx="4" fill={SUIT_SHADE} stroke={LINE} strokeWidth="2.5" />
      {/* Arms */}
      <rect x="14" y="74" width="14" height="28" rx="7" fill={SUIT} stroke={LINE} strokeWidth="2.5" />
      {cheer ? (
        <g transform="rotate(-140 78 78)">
          <rect x="72" y="74" width="14" height="28" rx="7" fill={SUIT} stroke={LINE} strokeWidth="2.5" />
        </g>
      ) : (
        <rect x="72" y="74" width="14" height="28" rx="7" fill={SUIT} stroke={LINE} strokeWidth="2.5" />
      )}
      {/* Torso with chest panel in the player's colour */}
      <rect x="25" y="68" width="50" height="38" rx="13" fill={SUIT} stroke={LINE} strokeWidth="2.5" />
      <rect x="39" y="78" width="22" height="14" rx="3" fill={`hsl(${h} 55% 40%)`} stroke={LINE} strokeWidth="2" />
      <circle cx="45" cy="85" r="2.2" fill={`hsl(${h} 90% 75%)`} />
      <circle cx="55" cy="85" r="2.2" fill="hsl(var(--primary))" />
      <g transform="translate(0 2)">
        <Helmet name={name} h={h} />
      </g>
    </svg>
  );
}
