import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, XCircle, Clock, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { AnswerOption, RouteProgress, TimerBar, XpReward, XpTotal, type OptionState } from "@/components/game";
import { Planet } from "@/components/Planet";
import { Shell } from "@/components/Shell";
import { PLANETS } from "@/data/planets";
import { getQuestion } from "@/data/questionBank";
import { summary } from "@/game/run";
import { runStore, useRun } from "@/game/runStore";
import { SECONDS_PER_QUESTION, xpFor } from "@/game/rules";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/play")({
  head: () => meta("Question — Builder's Galaxy", "Answer within 30 seconds to earn XP and keep the rocket flying."),
  component: QuestionScreen,
});

function QuestionScreen() {
  const run = useRun();
  const navigate = useNavigate();
  const planet = run ? PLANETS[Math.min(run.current, PLANETS.length - 1)] : null;
  const ids = run && planet ? run.plan[planet.id] : [];
  const [activeId, setActiveId] = useState<string | null>(null);
  const [left, setLeft] = useState(SECONDS_PER_QUESTION);
  const startRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const pauseRef = useRef<number | null>(null);
  const elapsedMs = () => (pauseRef.current ?? Date.now()) - startRef.current;
  const togglePause = () => {
    if (pauseRef.current !== null) {
      startRef.current += Date.now() - pauseRef.current;
      pauseRef.current = null;
      setPaused(false);
    } else {
      pauseRef.current = Date.now();
      setPaused(true);
    }
  };

  useEffect(() => {
    if (run === null) navigate({ to: "/join" });
    else if (run && run.current >= PLANETS.length) navigate({ to: "/results" });
  }, [run, navigate]);

  useEffect(() => {
    if (run && !activeId) setActiveId(ids.find((id) => !run.answers[id]) ?? ids[0] ?? null);
  }, [run, activeId, ids]);

  const answer = run && activeId ? run.answers[activeId] : undefined;
  const q = activeId ? getQuestion(activeId) : undefined;

  const record = useCallback(
    (choice: number | null) => {
      if (!q) return;
      const ms = Math.min(SECONDS_PER_QUESTION * 1000, elapsedMs());
      const correct = choice === q.answerIndex;
      const xp = xpFor(correct, SECONDS_PER_QUESTION - ms / 1000);
      runStore.update((r) => (r.answers[q.id] ? r : { ...r, answers: { ...r.answers, [q.id]: { choice, correct, xp, ms } } }));
    },
    [q],
  );

  // Timer per question.
  useEffect(() => {
    if (!q || answer) return;
    startRef.current = Date.now();
    pauseRef.current = null;
    setPaused(false);
    setLeft(SECONDS_PER_QUESTION);
    const t = setInterval(() => {
      if (pauseRef.current !== null) return;
      const l = SECONDS_PER_QUESTION - elapsedMs() / 1000;
      setLeft(Math.max(0, l));
      if (l <= 0) record(null);
    }, 100);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id, !!answer]);

  if (!run || !planet || !q) return <div className="min-h-dvh bg-space" />;

  const qi = ids.indexOf(q.id);
  const next = () => {
    const nextId = ids.find((id) => !run.answers[id]);
    if (nextId) return setActiveId(nextId);
    const finished = run.current + 1 >= PLANETS.length;
    runStore.update((r) => ({ ...r, current: r.current + 1, finishedAt: finished ? Date.now() : r.finishedAt }));
    navigate({ to: finished ? "/results" : "/galaxy" });
  };

  const stateFor = (i: number): OptionState => {
    if (!answer) return "idle";
    if (i === answer.choice) return answer.correct ? "correct" : "wrong";
    if (i === q.answerIndex) return "reveal";
    return "dim";
  };
  const timedOut = answer && answer.choice === null;
  const isLast = ids.every((id) => run.answers[id]);

  return (
    <Shell right={<XpTotal xp={summary(run).xp} />}>
      <RouteProgress current={run.current} />
      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-2 font-display font-semibold">
          <Planet color={planet.color} size={30} state="done" /> {planet.name}
        </span>
        <span className="text-sm text-muted-foreground">Question {qi + 1} of {ids.length}</span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1"><TimerBar seconds={answer ? SECONDS_PER_QUESTION - answer.ms / 1000 : left} /></div>
        {!answer && (
          <Button variant="secondary" size="md" onClick={togglePause} aria-pressed={paused} className="shrink-0">
            {paused ? <><Play /> Resume</> : <><Pause /> Pause</>}
          </Button>
        )}
      </div>
      {paused && !answer && <p className="mt-2 text-sm text-muted-foreground">Timer paused — take your time to read.</p>}

      <h1 className="mt-8 font-display text-2xl font-bold leading-snug sm:text-3xl">{q.prompt}</h1>
      <div className="mt-6 grid gap-3">
        {q.options.map((o, i) => (
          <AnswerOption key={i} index={i} text={o} state={stateFor(i)} disabled={!!answer} onClick={() => record(i)} />
        ))}
      </div>

      {answer && (
        <section
          aria-live="assertive"
          className={cn("mt-6 rounded-2xl border-2 bg-surface p-5", answer.correct ? "border-success/70" : "border-danger/70")}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex-1">
              <p className={cn("flex items-center gap-2 font-display text-2xl font-bold", answer.correct ? "text-success" : "text-danger")}>
                {answer.correct ? <CheckCircle2 className="size-6" /> : timedOut ? <Clock className="size-6" /> : <XCircle className="size-6" />}
                {answer.correct ? "Correct" : timedOut ? "Time's up" : "Not quite"}
                {answer.correct && <XpReward xp={answer.xp} />}
              </p>
              {q.explanation && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{q.explanation}</p>}
            </div>
            <Button onClick={next} className="w-full shrink-0 sm:w-auto">
              {isLast ? (run.current + 1 >= PLANETS.length ? "See results" : "Back to galaxy") : "Next question"} <ArrowRight />
            </Button>
          </div>
        </section>
      )}
    </Shell>
  );
}
