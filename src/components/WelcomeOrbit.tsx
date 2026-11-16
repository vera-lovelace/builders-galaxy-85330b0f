import { PLANETS } from '@/data/planets';
import earth from '@/assets/earth-full.png';
import { Planet } from './Planet';
import { Rocket } from './Rocket';

/** Decorative horizontal preview of the voyage: Earth, rocket, then the twelve stops. */
export function WelcomeOrbit() {
  return (
    <div className="relative mx-auto flex w-full max-w-6xl items-center gap-1 overflow-x-auto px-5 py-8 sm:gap-2" aria-hidden>
      <div className="absolute inset-x-10 top-1/2 border-t-2 border-dashed border-foreground/30" />
      <img src={earth} alt="" className="earth-glow relative h-16 w-16 shrink-0 sm:h-24 sm:w-24" />
      <Rocket size={22} className="relative shrink-0 rotate-90" />
      {PLANETS.map(planet => (
        <div key={planet.id} className="relative flex h-12 min-w-8 flex-1 items-center justify-center">
          <Planet color={planet.color} ring={planet.ring} size={planet.ring ? 16 : 22} />
        </div>
      ))}
    </div>
  );
}
