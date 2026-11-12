export const SECONDS_PER_QUESTION = 30;
export const QUESTIONS_PER_PLANET = 2;
export const BASE_XP = 100;
export const MAX_SPEED_BONUS = 50;

export type Level = "Newbie" | "Beginner" | "Advanced" | "Pro";
export const LEVELS: Level[] = ["Newbie", "Beginner", "Advanced", "Pro"];

/** 100 XP per correct answer plus up to 50 for speed (linear on seconds left). */
export function xpFor(correct: boolean, secondsLeft: number): number {
  if (!correct) return 0;
  const left = Math.max(0, Math.min(SECONDS_PER_QUESTION, secondsLeft));
  return BASE_XP + Math.round((MAX_SPEED_BONUS * left) / SECONDS_PER_QUESTION);
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
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a.slice(0, n);
}

export function formatTime(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
