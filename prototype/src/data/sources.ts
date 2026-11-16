/**
 * Source register for the About page, derived from the two content files so it
 * can never drift from what the game shows.
 */
import questions from "./questions.json";
import tips from "./lenny-tips.json";

export interface SourceEntry {
  title: string;
  url?: string;
  /** How many questions or tips draw on it. */
  count: number;
}

interface Raw {
  sourceTitle?: string | null;
  sourceUrl?: string | null;
}

function register(items: Raw[]): SourceEntry[] {
  const map = new Map<string, SourceEntry>();
  for (const i of items) {
    const title = i.sourceTitle?.trim();
    if (!title) continue;
    const entry = map.get(title) ?? { title, url: i.sourceUrl || undefined, count: 0 };
    entry.count += 1;
    map.set(title, entry);
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
}

export const QUESTION_SOURCES = register(questions as Raw[]);
export const TIP_SOURCES = register(tips as Raw[]);
export const QUESTION_COUNT = (questions as Raw[]).length;
export const TIP_COUNT = (tips as Raw[]).length;
