import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Shell } from "@/components/Shell";
import { PLANETS, type PlanetId } from "@/data/planets";
import { tipsForPlanet, tipLevelName } from "@/data/tips";
import { summary } from "@/game/run";
import { weakestPlanets } from "@/game/rules";
import { useRun } from "@/game/runStore";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/drill")({
  head: () => meta("Tips drill — Builder's Galaxy", "Flashcards from Lenny's tips, starting with your weakest planets."),
  component: Drill,
});

function Drill() {
  const run = useRun();
  const weak = useMemo(() => (run ? weakestPlanets(summary(run).scores).map((w) => w.planetId as PlanetId) : []), [run]);
  const [topic, setTopic] = useState<PlanetId | "weak" | "all">("all");
  useEffect(() => { if (weak.length) setTopic("weak"); }, [weak.length]);
  const cards = useMemo(() => {
    const ids = topic === "all" ? PLANETS.map((p) => p.id) : topic === "weak" ? weak : [topic];
    return ids.flatMap((id) => tipsForPlanet(id).map((t) => ({ ...t, planet: PLANETS.find((p) => p.id === id)! })));
  }, [topic, weak]);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { setI(0); setFlipped(false); }, [topic]);
  const card = cards[i];
  const move = (d: number) => { setI((x) => (x + d + cards.length) % cards.length); setFlipped(false); };

  return (
    <Shell wide className="max-w-3xl">
      {run && <Button asChild variant="ghost" size="md" className="mb-4 self-start"><Link to="/results"><ArrowLeft aria-hidden /> Back to results</Link></Button>}
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Tips drill</h1>
      <p className="mt-2 text-muted-foreground">Flashcards from Lenny's tips. Space or Enter flips a card, the arrow keys move between cards.</p>
      <label className="mt-4 grid max-w-sm gap-1 text-sm">Topic
        <select value={topic} onChange={(e) => setTopic(e.target.value as typeof topic)} className="h-12 rounded-lg border border-border bg-background px-2 text-base">
          {weak.length > 0 && <option value="weak">My 3 weakest planets</option>}
          <option value="all">All topics</option>
          {PLANETS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </label>
      {card && <div className="mt-6" onKeyDown={(e) => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }}>
        <p className="text-sm text-muted-foreground" aria-live="polite">Card {i + 1} of {cards.length} · {card.planet.name} · {tipLevelName[card.level]}</p>
        <button type="button" aria-pressed={flipped} onClick={() => setFlipped((f) => !f)}
          className={cn("mt-2 grid min-h-64 w-full content-start gap-3 rounded-2xl border bg-surface p-6 text-left focus-visible:outline-3 focus-visible:outline-ring focus-visible:outline-offset-3", flipped ? "border-primary" : "border-border")}>
          <span className="font-display text-xl font-bold">{card.question}</span>
          {flipped ? <span aria-live="polite" className="grid gap-2">
            <span className="font-semibold text-primary">Answer: {card.options[card.correctIndex]}</span>
            <span className="text-muted-foreground">{card.explanation}</span>
            <span className="text-sm text-muted-foreground">Source: {card.sourceTitle}</span>
          </span> : <ul className="grid gap-1 text-muted-foreground">{card.options.map((o, k) => <li key={k}>{String.fromCharCode(65 + k)}. {o}</li>)}</ul>}
          <span className="text-sm text-muted-foreground">{flipped ? "Press to see the question side" : "Press to reveal the answer"}</span>
        </button>
        <div className="mt-3 flex gap-3">
          <Button variant="secondary" size="md" onClick={() => move(-1)}><ChevronLeft aria-hidden /> Previous</Button>
          <Button variant="secondary" size="md" onClick={() => move(1)}>Next <ChevronRight aria-hidden /></Button>
        </div>
      </div>}
    </Shell>
  );
}
