export const SECONDS_PER_QUESTION = 60;
export const QUESTIONS_PER_PLANET = 2;
export const BASE_XP = 100;

export type Level = "Newbie" | "Beginner" | "Advanced" | "Pro";
export const LEVELS: Level[] = ["Newbie", "Beginner", "Advanced", "Pro"];

/** Fixed reward, independent of speed. */
export function xpFor(correct: boolean): number {
  return correct ? BASE_XP : 0;
}

export const LOW_TIME_SECONDS = 10;
export const isLowTime = (seconds: number) => seconds <= LOW_TIME_SECONDS;

/** Pro uses the top two levels; everyone else uses picked + next. */
export function questionLevelsFor(level: Level): ["newbie" | "beginner" | "advanced", "beginner" | "advanced" | "professional"] {
  if (level === "Newbie") return ["newbie", "beginner"];
  if (level === "Beginner") return ["beginner", "advanced"];
  return ["advanced", "professional"];
}

/** More planets share the minimum than fit in the recommendations. */
export function hasExtraLowestTies(scores: PlanetScore[], count = 3): boolean {
  const ratios = scores.map(s => s.total ? s.correct / s.total : 0);
  const min = Math.min(...ratios);
  return ratios.filter(r => r === min).length > count;
}

/** Level from accuracy (0..1): >=85% Pro, >=65% Advanced, >=40% Beginner, else Newbie. */
export function levelFor(accuracy: number): Level {
  if (accuracy >= 0.85) return "Pro";
  if (accuracy >= 0.65) return "Advanced";
  if (accuracy >= 0.4) return "Beginner";
  return "Newbie";
}

export interface PlanetScore { planetId: string; correct: number; total: number }

/** The three lowest-scoring planets (ties keep voyage order). */
export function weakestPlanets<T extends PlanetScore>(scores: T[], count = 3): T[] {
  return scores
    .map((s, i) => ({ s, i, r: s.total ? s.correct / s.total : 0 }))
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .slice(0, count)
    .map((x) => x.s);
}

/** Pick n items deterministically-randomly (pass Math.random in app). */
export function pick<T>(items: T[], n: number, rand: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const first = a[i], second = a[j];
    if (first !== undefined && second !== undefined) [a[i], a[j]] = [second, first];
  }
  return a.slice(0, n);
}

export function formatTime(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
