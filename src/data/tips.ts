import raw from './lenny_tips_questions.json';
import type { PlanetId } from './planets';
import { QUESTION_LEVELS, type QuestionLevel } from './questionBank';

export interface Tip {
  id: string;
  topicId: string;
  level: QuestionLevel;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceTitle: string;
  sourceUrl: string;
}
const tips = raw as Tip[];
export const tipsForPlanet = (id: PlanetId) => tips.filter(t => t.topicId === id)
  .sort((a, b) => QUESTION_LEVELS.indexOf(a.level) - QUESTION_LEVELS.indexOf(b.level));
export const tipLevelName: Record<QuestionLevel, string> = {
  newbie: 'Newbie', beginner: 'Beginner', advanced: 'Advanced', professional: 'Pro',
};
