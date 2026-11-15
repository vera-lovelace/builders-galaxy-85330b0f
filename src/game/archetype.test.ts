import { describe, expect, it } from "vitest";
import { archetypeFor } from "./archetype";

const all = (ids: string[]) => ["problem-framing","user-discovery","prototype-testing","product-promise","mvp-specification","build-planning","business-model","go-to-market","metrics-adoption","demo-prioritization","commercial-case","pitch-build"]
  .map((planetId) => ({ planetId, total: 2, correct: ids.includes(planetId) ? 2 : 0 }));

describe("archetypeFor", () => {
  it("picks the group with the best score", () => expect(archetypeFor(all(["go-to-market", "business-model"])).name).toBe("Growth Commander"));
  it("breaks ties by voyage order", () => expect(archetypeFor(all([])).name).toBe("Discovery Navigator"));
});
