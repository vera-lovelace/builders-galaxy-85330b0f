export function Rocket({ size = 40, flame = true, className }: { size?: number; flame?: boolean; className?: string }) {
  return (
    <svg width={size} height={size * 2} viewBox="0 0 40 80" className={className} aria-hidden>
      {flame && (
        <g className="animate-flame" style={{ transformBox: "fill-box" }}>
          <path d="M14 52 Q20 80 26 52 Z" className="fill-danger" />
          <path d="M17 52 Q20 68 23 52 Z" className="fill-primary" />
        </g>
      )}
      <path d="M6 38 L14 30 L14 50 L6 52 Z" className="fill-danger" />
      <path d="M34 38 L26 30 L26 50 L34 52 Z" className="fill-danger" />
      <path d="M20 2 C30 12 30 30 27 52 L13 52 C10 30 10 12 20 2 Z" className="fill-primary" />
      <path d="M20 2 C26 10 27 24 26 40 L20 40 Z" fill="black" opacity="0.12" />
      <circle cx="20" cy="24" r="5" className="fill-background stroke-suit" strokeWidth="2" />
      <circle cx="18.5" cy="22.5" r="1.4" className="fill-info" />
    </svg>
  );
}

export function BrandMark() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-lg font-bold text-foreground">
      <Rocket size={14} /> Builder's Galaxy
    </span>
  );
}
