import { PLANETS } from '@/data/planets';
import earth from '@/assets/earth-full.png';
import { Planet } from './Planet';
import { Rocket } from './Rocket';

/** Decorative, deliberately impossible solar system; never semantic voyage progress. */
export function WelcomeOrbit() {
  return (
    <div className="welcome-cosmos" aria-hidden="true">
      <div className="cosmos-orbits">
        <i /><i /><i /><i /><i />
      </div>
      <img src={earth} alt="" className="cosmos-earth earth-glow" />
      <div className="cosmos-rocket"><Rocket size={30} flame={false} /></div>
      <div className="cosmos-planets">
      {[...PLANETS, ...PLANETS.slice(0, 6)].map((planet, index) => (
        <div key={`${planet.id}-${index}`} className="cosmos-planet">
          <Planet color={planet.color} ring={planet.ring} size={100} />
        </div>
      ))}
      </div>
      <div className="cosmos-veil" />
    </div>
  );
}
