/**
 * Game rules. Decided (2026-11-15): 60-second timer with pause, no speed bonus,
 * 100 XP per correct answer. Still PLACEHOLDER: questions per planet and how they
 * are picked, the assessed-level thresholds and the recommendation rule.
 */
import { PLANETS, type PlanetId } from "@/data/planets";

export const SECONDS_PER_QUESTION = 60;
/** The orbit timer turns coral, and screen readers hear a warning, at this many seconds. */
export const LOW_TIME_SECONDS = 10;
export const XP_CORRECT = 100;

export const EXPERIENCE_LEVELS = ["Newbie", "Beginner", "Advanced", "Pro"] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

/** Difficulty levels used in the question bank and the Lenny's tips file. */
export const BANK_LEVELS = ["newbie", "beginner", "advanced", "professional"] as const;
export type BankLevel = (typeof BANK_LEVELS)[number];

/** Bank levels shown with the game's own level names. */
export const levelLabel = (level: BankLevel): ExperienceLevel => EXPERIENCE_LEVELS[BANK_LEVELS.indexOf(level)];

/** PLACEHOLDER: questions asked per planet. The bank holds one per level (four). */
export const QUESTIONS_PER_PLANET = 2;

/**
 * PLACEHOLDER: which bank levels a player gets on every planet: the level they
 * picked, then the next one up (Pro gets Advanced, then Professional).
 */
export function roundLevels(experience: ExperienceLevel): BankLevel[] {
  const i = Math.min(EXPERIENCE_LEVELS.indexOf(experience), BANK_LEVELS.length - QUESTIONS_PER_PLANET);
  return BANK_LEVELS.slice(i, i + QUESTIONS_PER_PLANET);
}

export function xpForAnswer(correct: boolean): number {
  return correct ? XP_CORRECT : 0;
}

/** PLACEHOLDER: assessed level from overall accuracy (0–1). */
export function assessLevel(accuracy: number): ExperienceLevel {
  if (accuracy >= 0.85) return "Pro";
  if (accuracy >= 0.65) return "Advanced";
  if (accuracy >= 0.4) return "Beginner";
  return "Newbie";
}

export interface PlanetScore {
  planetId: PlanetId;
  correct: number;
  total: number;
}

const ratio = (s: PlanetScore) => (s.total ? s.correct / s.total : 0);

/** Three lowest-scoring planets, ties broken by voyage order. */
export function recommend(scores: PlanetScore[], count = 3): PlanetId[] {
  const order = new Map(PLANETS.map((p, i) => [p.id, i]));
  return [...scores]
    .filter((s) => s.total > 0)
    .sort((a, b) => ratio(a) - ratio(b) || order.get(a.planetId)! - order.get(b.planetId)!)
    .slice(0, count)
    .map((s) => s.planetId);
}

/** True when more planets share the lowest scores than the recommendation shows. */
export function recommendationIsTied(scores: PlanetScore[], picked: PlanetId[]): boolean {
  if (!picked.length) return false;
  const last = scores.find((s) => s.planetId === picked[picked.length - 1])!;
  return scores.some((s) => s.total > 0 && !picked.includes(s.planetId) && ratio(s) === ratio(last));
}
