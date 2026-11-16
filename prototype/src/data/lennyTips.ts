/**
 * Lenny's tips adapter: the ONE place that knows lenny-tips.json's shape.
 * Each item is a quiz-style entry; the tip is its question plus the correct option.
 * These items are never asked in the game, so tips can't give away an answer.
 */
import raw from "./lenny-tips.json";
import { planetForTopic, type PlanetId } from "./planets";
import { BANK_LEVELS, type BankLevel } from "@/game/rules";
import type { Source } from "./questionBank";

export interface Tip {
  id: string;
  planetId: PlanetId;
  level: BankLevel;
  question: string;
  answer: string;
  why?: string;
  source?: Source;
}

interface RawTip {
  id: string;
  topicId: string;
  level: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  sourceTitle?: string | null;
  sourceUrl?: string | null;
}

const ALL: Tip[] = (raw as RawTip[]).map((t) => ({
  id: t.id,
  planetId: planetForTopic(t.topicId),
  level: t.level as BankLevel,
  question: t.question,
  answer: t.options[t.correctIndex],
  why: t.explanation,
  source: t.sourceTitle && t.sourceUrl ? { title: t.sourceTitle, url: t.sourceUrl } : undefined,
}));

/** A planet's tips, newbie first. */
export function tipsFor(planetId: PlanetId): Tip[] {
  return ALL.filter((t) => t.planetId === planetId).sort(
    (a, b) => BANK_LEVELS.indexOf(a.level) - BANK_LEVELS.indexOf(b.level),
  );
}
