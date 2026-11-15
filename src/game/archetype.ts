import type { PlanetScore } from "./rules";

/** Builder types come from fixed planet groups so the label never depends on AI. */
export interface Archetype { id: string; name: string; planets: string[]; keywords: string[] }
export const ARCHETYPES: Archetype[] = [
  { id: "discovery", name: "Discovery Navigator", planets: ["problem-framing", "user-discovery", "prototype-testing"], keywords: ["UX Researcher", "Product Discovery", "Product Designer"] },
  { id: "strategy", name: "Product Strategist", planets: ["product-promise", "mvp-specification", "build-planning"], keywords: ["Product Manager", "Technical Product Manager", "Product Operations"] },
  { id: "growth", name: "Growth Commander", planets: ["business-model", "go-to-market", "metrics-adoption"], keywords: ["Growth Product Manager", "Product Marketing Manager", "Product Analyst"] },
  { id: "pitch", name: "Pitch Pilot", planets: ["demo-prioritization", "commercial-case", "pitch-build"], keywords: ["Solutions Consultant", "Product Lead", "Business Development"] },
];

const ratio = (scores: PlanetScore[], ids: string[]) => {
  const s = scores.filter((p) => ids.includes(p.planetId));
  const total = s.reduce((n, p) => n + p.total, 0);
  return total ? s.reduce((n, p) => n + p.correct, 0) / total : 0;
};

/** Highest-scoring group wins; ties go to the earlier group in voyage order. */
export function archetypeFor(scores: PlanetScore[]): Archetype {
  let best = ARCHETYPES[0]!, top = -1;
  for (const a of ARCHETYPES) { const r = ratio(scores, a.planets); if (r > top) { top = r; best = a; } }
  return best;
}
