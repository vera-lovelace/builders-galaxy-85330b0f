import { expect, it } from 'vitest';
import { newRun } from './run';
import { exportResults } from './exportResults';
import { getQuestion, QUESTIONS } from '@/data/questionBank';
import { PLANETS } from '@/data/planets';
import { tipsForPlanet } from '@/data/tips';

it('exports every question, answers, source and active time without player identity', () => {
  const run = newRun({ nickname: 'Private name', experience: 'Newbie' });
  const id = run.plan['problem-framing'][0];
  if (!id) throw new Error('missing question');
  const q = getQuestion(id);
  if (!q) throw new Error('missing question');
  run.answers[id] = { choice: q.answerIndex, correct: true, xp: 100, ms: 5000 };
  const exported = exportResults(run);
  expect(exported.data.questions).toHaveLength(24);
  expect(exported.data.activeTimeMs).toBe(5000);
  expect(exported.data.questions[0]?.result).toBe('Correct');
  expect(exported.data.questions[0]?.source.url).toBe(q.sourceUrl);
  expect(exported.data.questions[0]?.yourAnswer).toBe(q.options[q.answerIndex]);
  expect(exported.markdown).not.toContain('Private name');
});

it('keeps all 93 tips separate from the 48 playable questions and ordered by level', () => {
  const tips = PLANETS.flatMap(p => tipsForPlanet(p.id));
  expect(tips).toHaveLength(93);
  expect(QUESTIONS).toHaveLength(48);
  expect(tips.some(tip => QUESTIONS.some(q => q.id === tip.id))).toBe(false);
  expect(tipsForPlanet('go-to-market')).toHaveLength(9);
  const order = ['newbie', 'beginner', 'advanced', 'professional'];
  for (const planet of PLANETS) {
    const levels = tipsForPlanet(planet.id).map(t => order.indexOf(t.level));
    expect(levels).toEqual([...levels].sort((a,b) => a-b));
  }
});
