import raw from "./questions.json";
import { PLANETS, type PlanetId } from "./planets";

export const QUESTION_LEVELS = ["newbie", "beginner", "advanced", "professional"] as const;
export type QuestionLevel = typeof QUESTION_LEVELS[number];

export interface Question {
  id: string;
  planetId: PlanetId;
  prompt: string;
  options: [string, string, string, string];
  answerIndex: number;
  explanation?: string | undefined;
  level: QuestionLevel;
  sourceTitle?: string | undefined;
  sourceUrl?: string | undefined;
}

interface RawQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  level: QuestionLevel;
  sourceTitle?: string;
  sourceUrl?: string;
}

const planetIds = new Set<string>(PLANETS.map((p) => p.id));

/** Single adapter from the supplied questions.json to the app's shape. */
export function toQuestion(q: RawQuestion): Question | null {
  if (!planetIds.has(q.topicId) || q.options.length !== 4) return null;
  return {
    id: q.id,
    planetId: q.topicId as PlanetId,
    prompt: q.question,
    options: q.options as Question["options"],
    answerIndex: q.correctIndex,
    explanation: q.explanation,
    level: q.level,
    sourceTitle: q.sourceTitle,
    sourceUrl: q.sourceUrl,
  };
}

export const QUESTIONS: Question[] = (raw as RawQuestion[])
  .map(toQuestion)
  .filter((q): q is Question => q !== null);

const byId = new Map(QUESTIONS.map((q) => [q.id, q]));
export const getQuestion = (id: string) => byId.get(id);
export const questionsForPlanet = (id: PlanetId) => QUESTIONS.filter((q) => q.planetId === id);
