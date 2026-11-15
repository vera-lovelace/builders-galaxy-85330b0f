import { PLANETS } from '@/data/planets';
import { getQuestion } from '@/data/questionBank';
import { summary, type Run } from './run';
import { formatTime, weakestPlanets } from './rules';

export function exportResults(run: Run) {
  const s = summary(run);
  const explore = weakestPlanets(s.scores).map(p => p.planet.name);
  const planets = s.scores.map(p => ({ planet: p.planet.name, correct: p.correct, total: p.total, xp: p.xp }));
  const questions = PLANETS.flatMap(planet => run.plan[planet.id].map(id => {
    const q = getQuestion(id);
    if (!q) return null;
    const a = run.answers[id];
    return {
      planet: planet.name, question: q.prompt,
      yourAnswer: a?.choice != null ? q.options[a.choice] : null,
      correctAnswer: q.options[q.answerIndex],
      result: !a ? 'Not answered' : a.correct ? 'Correct' : a.choice === null ? "Time's up" : 'Incorrect',
      explanation: q.explanation ?? '', source: { title: q.sourceTitle ?? '', url: q.sourceUrl ?? '' },
    };
  })).filter(q => q !== null);
  const data = { score: { correct: s.correct, total: s.total }, xp: s.xp, time: formatTime(s.ms), activeTimeMs: s.ms,
    pickedLevel: run.player.experience, assessedLevel: s.level, exploreNext: explore, planets, questions };
  const markdown = ["# Builder's Galaxy results", '',
    `Score: ${s.correct} of ${s.total}`, `XP: ${s.xp}`, `Time: ${data.time}`,
    `Picked level: ${data.pickedLevel}`, `Trivia level: ${data.assessedLevel}`,
    '', '## Explore next', ...explore.map(p => `- ${p}`), '', '## Planet by planet',
    ...planets.map(p => `- ${p.planet}: ${p.correct} of ${p.total} correct · ${p.xp} XP`), '', '## Questions',
    ...questions.flatMap(q => [`### ${q.planet}: ${q.question}`, `Your answer: ${q.yourAnswer ?? "No answer"}`,
      `Correct answer: ${q.correctAnswer}`, `Result: ${q.result}`, '', q.explanation,
      q.source.title ? `Source: ${q.source.title}${q.source.url ? ` (${q.source.url})` : ''}` : '', '']),
  ].join('\n');
  return { data, markdown, shareText: `Builder's Galaxy: ${s.correct} of ${s.total} correct, ${s.level}. Explore next: ${explore.join(', ')}.` };
}

export function downloadResults(contents: string, format: 'md' | 'json') {
  const blob = new Blob([contents], { type: format === 'json' ? 'application/json;charset=utf-8' : 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `builders-galaxy-results.${format}`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
