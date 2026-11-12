export type PlanetId =
  | "problem-framing" | "user-discovery" | "product-promise" | "prototype-testing"
  | "mvp-specification" | "build-planning" | "business-model" | "go-to-market"
  | "metrics-adoption" | "demo-prioritization" | "commercial-case" | "pitch-build";

export interface PlanetInfo {
  id: PlanetId;
  name: string;
  /** Planet base colour (per-planet hue, intentionally not a theme token). */
  color: string;
  ring?: boolean | undefined;
}

/** Voyage order: stop 1 (just above Earth) to stop 12. */
export const PLANETS: PlanetInfo[] = [
  { id: "problem-framing", name: "Problem Framing", color: "#f0684f" },
  { id: "user-discovery", name: "User Discovery", color: "#f2ad4e", ring: true },
  { id: "product-promise", name: "Product Promise", color: "#efd94a" },
  { id: "prototype-testing", name: "Prototype Testing", color: "#43dc8c" },
  { id: "mvp-specification", name: "MVP Specification", color: "#4fe3d6", ring: true },
  { id: "build-planning", name: "Build Planning", color: "#4fb0ea" },
  { id: "business-model", name: "Business Model", color: "#4a72e8" },
  { id: "go-to-market", name: "GTM Strategy", color: "#8a5ae8", ring: true },
  { id: "metrics-adoption", name: "Metrics & Adoption", color: "#c158e6" },
  { id: "demo-prioritization", name: "Demo Prioritization", color: "#e650b4" },
  { id: "commercial-case", name: "Commercial Case", color: "#ec5a86", ring: true },
  { id: "pitch-build", name: "Pitch Build", color: "#86e04a" },
];

export const planetById = (id: PlanetId) => PLANETS.find((p) => p.id === id)!;
