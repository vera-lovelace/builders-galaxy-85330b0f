import { describe, expect, it } from "vitest";
import { levelFor, weakestPlanets, xpFor, formatTime } from "./rules";
import { rankEntries } from "./leaderboard";
import { newRun } from "./run";
import { PLANETS } from "@/data/planets";

describe("game rules", () => {
  it("gives 100 XP plus up to 50 for speed, 0 when wrong", () => {
    expect(xpFor(true, 30)).toBe(150);
    expect(xpFor(true, 0)).toBe(100);
    expect(xpFor(true, 15)).toBe(125);
    expect(xpFor(false, 30)).toBe(0);
  });
  it("assigns levels at 85/65/40% accuracy", () => {
    expect(levelFor(0.85)).toBe("Pro");
    expect(levelFor(0.84)).toBe("Advanced");
    expect(levelFor(0.65)).toBe("Advanced");
    expect(levelFor(0.4)).toBe("Beginner");
    expect(levelFor(0.39)).toBe("Newbie");
  });
  it("recommends the three lowest-scoring planets", () => {
    const s = [
      { planetId: "a", correct: 2, total: 2 },
      { planetId: "b", correct: 0, total: 2 },
      { planetId: "c", correct: 1, total: 2 },
      { planetId: "d", correct: 1, total: 2 },
    ];
    expect(weakestPlanets(s).map((x) => x.planetId)).toEqual(["b", "c", "d"]);
  });
  it("picks 2 questions from each of the 12 planets", () => {
    const run = newRun({ nickname: "Ada", experience: "Beginner" });
    expect(PLANETS.length).toBe(12);
    for (const p of PLANETS) expect(run.plan[p.id]).toHaveLength(2);
  });
  it("ranks by XP, then faster time", () => {
    const r = rankEntries([
      { id: "a", nickname: "a", xp: 100, level: "Newbie", ms: 5 },
      { id: "b", nickname: "b", xp: 100, level: "Newbie", ms: 3 },
      { id: "c", nickname: "c", xp: 200, level: "Newbie", ms: 9 },
    ]);
    expect(r.map((e) => e.id)).toEqual(["c", "b", "a"]);
    expect(formatTime(240000)).toBe("4:00");
  });
});
