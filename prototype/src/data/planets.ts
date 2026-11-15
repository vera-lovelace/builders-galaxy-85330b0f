export type PlanetId =
  | "problem-framing"
  | "user-discovery"
  | "product-promise"
  | "prototype-testing"
  | "mvp-specification"
  | "build-planning"
  | "business-model"
  | "gtm-strategy"
  | "metrics-adoption"
  | "demo-prioritization"
  | "commercial-case"
  | "pitch-build";

export interface Planet {
  id: PlanetId;
  name: string;
  /** Hue (0–360) for this planet's surface colour. */
  hue: number;
  /** Decorative ring, for variety on the map. */
  ringed?: boolean;
}

/** The 12 planets in voyage order. */
export const PLANETS: Planet[] = [
  { id: "problem-framing", name: "Problem Framing", hue: 12 },
  { id: "user-discovery", name: "User Discovery", hue: 38, ringed: true },
  { id: "product-promise", name: "Product Promise", hue: 52 },
  { id: "prototype-testing", name: "Prototype Testing", hue: 150 },
  { id: "mvp-specification", name: "MVP Specification", hue: 178, ringed: true },
  { id: "build-planning", name: "Build Planning", hue: 200 },
  { id: "business-model", name: "Business Model", hue: 222 },
  { id: "gtm-strategy", name: "GTM Strategy", hue: 262, ringed: true },
  { id: "metrics-adoption", name: "Metrics & Adoption", hue: 290 },
  { id: "demo-prioritization", name: "Demo & Prioritization", hue: 318 },
  { id: "commercial-case", name: "Commercial Case", hue: 340, ringed: true },
  { id: "pitch-build", name: "Pitch Build", hue: 96 },
];

export const planetById = (id: PlanetId) => PLANETS.find((p) => p.id === id)!;

/** Content files name one topic differently from its planet id. */
const TOPIC_ALIASES: Record<string, PlanetId> = { "go-to-market": "gtm-strategy" };

/** Maps a content file's `topicId` onto a planet id. */
export function planetForTopic(topicId: string): PlanetId {
  const id = TOPIC_ALIASES[topicId] ?? topicId;
  if (!PLANETS.some((p) => p.id === id)) throw new Error(`Unknown topicId "${topicId}"`);
  return id as PlanetId;
}
