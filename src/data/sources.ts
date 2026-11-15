import questions from "./questions.json";
import tips from "./lenny_tips_questions.json";

export type SourceEntry = { title: string; url?: string; count: number };
type Item = { sourceTitle?: string | null; sourceUrl?: string | null };

export function groupSources(items: Item[]): SourceEntry[] {
  const map = new Map<string, SourceEntry>();
  for (const i of items) {
    if (!i.sourceTitle) continue;
    const e = map.get(i.sourceTitle) ?? { title: i.sourceTitle, count: 0 };
    if (!e.url && i.sourceUrl && /^https?:\/\//.test(i.sourceUrl)) e.url = i.sourceUrl;
    e.count++;
    map.set(i.sourceTitle, e);
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
}

export const questionCount = (questions as Item[]).length;
export const tipCount = (tips as Item[]).length;
export const questionSources = groupSources(questions as Item[]);
export const tipSources = groupSources(tips as Item[]);
