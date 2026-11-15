import { describe, expect, it } from "vitest";
import { levelFor, weakestPlanets, xpFor, formatTime, SECONDS_PER_QUESTION, isLowTime, questionLevelsFor, hasExtraLowestTies } from "./rules";
import { rankEntries } from "./leaderboard";
import { newRun } from "./run";
import { getQuestion } from "@/data/questionBank";
import { PLANETS } from "@/data/planets";

describe("game rules", () => {
  it("uses 60 seconds per question", () => {
    expect(SECONDS_PER_QUESTION).toBe(60);
  });
  it("awards exactly 100 XP when correct and zero otherwise", () => {
    expect(xpFor(true)).toBe(100);
    expect(xpFor(false)).toBe(0);
  });
  it("uses coral at 10 seconds or less", () => {
    expect(isLowTime(10)).toBe(true);
    expect(isLowTime(11)).toBe(false);
  });
  it.each(["Newbie", "Beginner", "Advanced", "Pro"] as const)("selects picked and next levels for %s", experience => {
    const run = newRun({ nickname: "Ada", experience });
    const expected = experience === "Newbie" ? ["newbie", "beginner"] : experience === "Beginner" ? ["beginner", "advanced"] : ["advanced", "professional"];
    expect(questionLevelsFor(experience)).toEqual(expected);
    for (const planet of PLANETS) expect(run.plan[planet.id].map(id => getQuestion(id)?.level)).toEqual(expected);
  });
  it("detects extra planets tied for the minimum", () => {
    expect(hasExtraLowestTies(Array.from({ length: 4 }, (_, i) => ({ planetId: String(i), correct: 0, total: 2 })))).toBe(true);
    expect(hasExtraLowestTies([{ planetId: "a", correct: 0, total: 2 }])).toBe(false);
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
