import { PLANETS } from '@/data/planets';
import { Planet } from './Planet';
import { Rocket } from './Rocket';

/** Decorative preview of the same twelve-stop voyage. */
export function WelcomeOrbit() {
  return <div className="welcome-orbit" aria-hidden>
    <div className="absolute inset-y-4 left-1/2 border-l-2 border-dashed border-foreground/30" />
    <Rocket size={28} className="relative" />
    {PLANETS.map(planet => <div key={planet.id} className="relative flex h-5 w-12 items-center justify-center">
      <Planet color={planet.color} ring={planet.ring} size={planet.ring ? 13 : 18} />
    </div>)}
  </div>;
}