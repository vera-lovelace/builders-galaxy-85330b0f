import { Lightbulb } from 'lucide-react';
import { useState } from 'react';
import type { PlanetInfo } from '@/data/planets';
import { tipLevelName, tipsForPlanet } from '@/data/tips';
import { Button } from './Button';
import { Modal } from './Modal';
import { Source } from './Source';

export function LennyTips({ planet, iconOnly = false }: { planet: PlanetInfo; iconOnly?: boolean }) {
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="secondary" size={iconOnly ? 'icon' : 'md'} onClick={() => setOpen(true)} className="shrink-0">
      <Lightbulb aria-hidden />
      {iconOnly ? <span className="sr-only">Lenny's tips for {planet.name}</span> : "Lenny's tips"}
    </Button>
    {open && <Modal title={`Lenny's tips: ${planet.name}`} onClose={() => setOpen(false)}>
      <ul className="space-y-6">
        {tipsForPlanet(planet.id).map(tip => <li key={tip.id} className="border-b border-border pb-6 last:border-0">
          <p className="text-sm font-semibold text-primary">{tipLevelName[tip.level]}</p>
          <h3 className="mt-2 font-semibold">{tip.question}</h3>
          <p className="mt-2 leading-relaxed">{tip.options[tip.correctIndex]}</p>
          <details className="mt-3">
            <summary className="min-h-12 cursor-pointer py-3 font-semibold text-info">Why it matters</summary>
            <ol className="mb-3 list-inside list-[upper-alpha] space-y-2 text-sm text-muted-foreground">
              {tip.options.map((option, index) => <li key={index}>{option}{index === tip.correctIndex && <span className="font-semibold text-success"> (correct)</span>}</li>)}
            </ol>
            <p className="text-sm leading-relaxed text-muted-foreground">{tip.explanation}</p>
          </details>
          <Source title={tip.sourceTitle} url={tip.sourceUrl} />
        </li>)}
      </ul>
    </Modal>}
  </>;
}
