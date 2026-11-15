import { useId } from "react";

/**
 * Earth seen from orbit: a huge sphere whose limb rises `rise` units above `y`,
 * with soft cloud bands and a thin atmosphere rim. Place inside an <svg>.
 */
export function Earth({ w, y, rise = 140 }: { w: number; y: number; rise?: number }) {
  const id = useId().replace(/:/g, "");
  const R = Math.max(w * 1.1, 900);
  const cx = w / 2;
  const cy = y - rise + R;
  const top = y - rise;
  return (
    <g aria-hidden>
      <defs>
        <radialGradient id={`ocean-${id}`} cx={cx} cy={cy} r={R} gradientUnits="userSpaceOnUse">
          <stop offset="0.86" stopColor="hsl(218 70% 14%)" />
          <stop offset="0.955" stopColor="hsl(212 62% 34%)" />
          <stop offset="0.992" stopColor="hsl(204 70% 62%)" />
          <stop offset="1" stopColor="hsl(198 90% 84%)" />
        </radialGradient>
        <clipPath id={`globe-${id}`}>
          <circle cx={cx} cy={cy} r={R} />
        </clipPath>
        <filter id={`soft-${id}`} x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      {/* Atmosphere haze just above the limb */}
      <circle cx={cx} cy={cy} r={R + 9} fill="none" stroke="hsl(200 90% 70% / 0.14)" strokeWidth="18" />
      <circle cx={cx} cy={cy} r={R} fill={`url(#ocean-${id})`} />
      <g clipPath={`url(#globe-${id})`} filter={`url(#soft-${id})`} opacity="0.45">
        <ellipse cx={cx - w * 0.28} cy={top + 40} rx={w * 0.22} ry="14" fill="hsl(210 40% 96%)" />
        <ellipse cx={cx + w * 0.18} cy={top + 64} rx={w * 0.3} ry="12" fill="hsl(210 40% 96%)" />
        <ellipse cx={cx - w * 0.05} cy={top + 110} rx={w * 0.26} ry="18" fill="hsl(210 40% 96%)" />
        <ellipse cx={cx + w * 0.36} cy={top + 128} rx={w * 0.16} ry="10" fill="hsl(210 40% 96%)" />
      </g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="hsl(195 100% 88% / 0.85)" strokeWidth="1.5" />
    </g>
  );
}
