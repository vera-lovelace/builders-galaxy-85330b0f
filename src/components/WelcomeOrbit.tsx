import { PLANETS } from '@/data/planets';
import { Planet } from './Planet';
import { Rocket } from './Rocket';

/** Decorative preview of the same twelve-stop voyage. */
export function WelcomeOrbit() {
  return <div className="welcome-orbit" aria-hidden>
    <svg viewBox="0 0 1000 230" className="absolute inset-0 size-full">
      <path d="M -40 200 Q 225 -20 475 55 M 525 55 Q 775 -20 1040 200" fill="none" className="stroke-foreground/30" strokeWidth="2" strokeDasharray="4 8" strokeLinecap="round" />
    </svg>
    {PLANETS.map((planet, index) => {
      const x = index < 6 ? index * 84 : 580 + (index - 6) * 84;
      const t = x / 1000;
      const y = 180 - 135 * Math.sin(t * Math.PI);
      return <div key={planet.id} className="absolute flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ left: `${x / 10}%`, top: `${y / 2.3}%` }}>
        <Planet color={planet.color} ring={planet.ring} size={planet.ring ? 25 : 34} />
      </div>;
    })}
    <Rocket size={34} className="absolute left-1/2 top-[24%] -translate-x-1/2 -translate-y-1/2" />
  </div>;
}