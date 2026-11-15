/**
 * Question bank adapter: the ONE place that knows the question file's shape.
 * Source: questions.json (48 questions, one per level for each of the 12 topics).
 * Nothing else in the app reads the raw JSON.
 */
import raw from "./questions.json";
import { PLANETS, planetForTopic, type PlanetId } from "./planets";
import { roundLevels, type BankLevel, type ExperienceLevel } from "@/game/rules";

export interface Source {
  title: string;
  url: string;
}

export interface Question {
  id: string;
  planetId: PlanetId;
  level: BankLevel;
  prompt: string;
  /** Exactly four options. */
  options: [string, string, string, string];
  /** Index (0–3) of the correct option. */
  answerIndex: number;
  /** Shown after answering. */
  explanation?: string;
  source?: Source;
}

interface RawQuestion {
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

function toQuestion(q: RawQuestion): Question {
  if (q.options.length !== 4) throw new Error(`Question ${q.id} needs exactly 4 options`);
  return {
    id: q.id,
    planetId: planetForTopic(q.topicId),
    level: q.level as BankLevel,
    prompt: q.question,
    options: q.options as Question["options"],
    answerIndex: q.correctIndex,
    explanation: q.explanation,
    source: q.sourceTitle && q.sourceUrl ? { title: q.sourceTitle, url: q.sourceUrl } : undefined,
  };
}

const ALL: Question[] = (raw as RawQuestion[]).map(toQuestion);
const BY_ID = new Map(ALL.map((q) => [q.id, q]));

export const questionById = (id: string) => BY_ID.get(id);

/** The questions a player gets on one planet, in play order (see rules.roundLevels). */
export function questionsFor(planetId: PlanetId, experience: ExperienceLevel | null): Question[] {
  const levels = roundLevels(experience ?? "Newbie");
  return levels.flatMap((level) => ALL.filter((q) => q.planetId === planetId && q.level === level));
}

/** Every planet's questions for one player, in voyage order. */
export function roundFor(experience: ExperienceLevel | null): Question[] {
  return PLANETS.flatMap((p) => questionsFor(p.id, experience));
}
