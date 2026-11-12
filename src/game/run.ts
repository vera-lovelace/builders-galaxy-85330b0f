import { PLANETS, type PlanetId } from "@/data/planets";
import { questionsForPlanet } from "@/data/questionBank";
import { QUESTIONS_PER_PLANET, levelFor, pick, type Level } from "./rules";

export interface Player { nickname: string; experience: Level }
export interface Answer { choice: number | null; correct: boolean; xp: number; ms: number }

export interface Run {
  player: Player;
  /** Question ids chosen for each planet, in voyage order. */
  plan: Record<PlanetId, string[]>;
  answers: Record<string, Answer>;
  /** Index of the planet the rocket is parked at (12 = voyage complete). */
  current: number;
  /** Index the Galaxy view last showed the rocket at (drives the flight animation). */
  shown: number;
  startedAt: number;
  finishedAt?: number | undefined;
}

export function newRun(player: Player, rand: () => number = Math.random): Run {
  const plan = {} as Record<PlanetId, string[]>;
  for (const p of PLANETS) plan[p.id] = pick(questionsForPlanet(p.id), QUESTIONS_PER_PLANET, rand).map((q) => q.id);
  return { player, plan, answers: {}, current: 0, shown: 0, startedAt: Date.now() };
}

export function planetScores(run: Run) {
  return PLANETS.map((p) => {
    const ids = run.plan[p.id] ?? [];
    const correct = ids.filter((id) => run.answers[id]?.correct).length;
    const xp = ids.reduce((s, id) => s + (run.answers[id]?.xp ?? 0), 0);
    return { planetId: p.id, planet: p, correct, total: ids.length, xp };
  });
}

export function summary(run: Run) {
  const scores = planetScores(run);
  const correct = scores.reduce((s, x) => s + x.correct, 0);
  const total = scores.reduce((s, x) => s + x.total, 0);
  const xp = Object.values(run.answers).reduce((s, a) => s + a.xp, 0);
  const ms = Object.values(run.answers).reduce((s, a) => s + a.ms, 0);
  const accuracy = total ? correct / total : 0;
  return { scores, correct, total, xp, ms, accuracy, level: levelFor(accuracy) };
}
