/**
 * Results export, built in the browser (nothing is sent anywhere). The same facts
 * as the Results screen, as Markdown for people and notes apps and JSON for tools
 * and agents.
 */
import { planetById } from "@/data/planets";
import { questionById } from "@/data/questionBank";
import { formatDuration, summarize, type GameState } from "./GameContext";

const LETTERS = ["A", "B", "C", "D"];

function rows(state: GameState) {
  return state.answers.map((a) => {
    const q = questionById(a.questionId)!;
    return {
      planet: planetById(a.planetId).name,
      question: q.prompt,
      yourAnswer: a.chosen === null ? null : `${LETTERS[a.chosen]}. ${q.options[a.chosen]}`,
      correctAnswer: `${LETTERS[q.answerIndex]}. ${q.options[q.answerIndex]}`,
      result: a.chosen === null ? "Time's up" : a.correct ? "Correct" : "Incorrect",
      explanation: q.explanation ?? null,
      source: q.source ?? null,
    };
  });
}

export function resultsSummary(state: GameState): string {
  const r = summarize(state);
  const next = r.recommendations.map((id) => planetById(id).name).join(", ");
  return `I scored ${r.correct} of ${r.total} on Builder's Galaxy (assessed level: ${r.level}). Planets to explore next: ${next}.`;
}

export function resultsJson(state: GameState): string {
  const r = summarize(state);
  return JSON.stringify(
    {
      game: "Builder's Galaxy",
      exportedAt: new Date().toISOString(),
      score: { correct: r.correct, total: r.total, percent: Math.round(r.accuracy * 100) },
      xp: r.xp,
      time: formatDuration(r.elapsedMs),
      pickedLevel: state.experience,
      assessedLevel: r.level,
      exploreNext: r.recommendations.map((id) => planetById(id).name),
      planets: r.scores.map((s) => ({ planet: planetById(s.planetId).name, correct: s.correct, total: s.total })),
      questions: rows(state),
    },
    null,
    2,
  );
}

export function resultsMarkdown(state: GameState): string {
  const r = summarize(state);
  const lines = [
    "# Builder's Galaxy results",
    "",
    `- Score: ${r.correct} of ${r.total} correct (${Math.round(r.accuracy * 100)}%)`,
    `- XP: ${r.xp}`,
    `- Time: ${formatDuration(r.elapsedMs)}`,
    `- Assessed level: ${r.level}${state.experience ? ` (picked ${state.experience})` : ""}`,
    `- Explore next: ${r.recommendations.map((id) => planetById(id).name).join(", ")}`,
    "",
    "## Planet by planet",
    "",
    "| Planet | Correct |",
    "|---|---|",
    ...r.scores.map((s) => `| ${planetById(s.planetId).name} | ${s.correct} of ${s.total} |`),
    "",
    "## Questions",
  ];
  rows(state).forEach((q, i) => {
    lines.push(
      "",
      `### ${i + 1}. ${q.planet}`,
      "",
      q.question,
      "",
      `- Your answer: ${q.yourAnswer ?? "none (time's up)"}`,
      `- Correct answer: ${q.correctAnswer}`,
      `- Result: ${q.result}`,
    );
    if (q.explanation) lines.push(`- Why: ${q.explanation}`);
    if (q.source) lines.push(`- Source: [${q.source.title}](${q.source.url})`);
  });
  return lines.join("\n") + "\n";
}

export function downloadFile(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = Object.assign(document.createElement("a"), { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
