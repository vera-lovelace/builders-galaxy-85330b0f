import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { play } from "@/game/sound";
import { ArrowRight, CheckCircle2, XCircle, Clock, Pause, Play } from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import type { VoiceHandlers } from "@/components/VoiceAgent";
const VoiceAgent = lazy(() => import("@/components/VoiceAgent"));
import { Button } from "@/components/Button";
import { AnswerOption, RouteProgress, OrbitTimer, XpReward, XpTotal, type OptionState } from "@/components/game";
import { LennyTips } from "@/components/LennyTips";
import { Source } from "@/components/Source";
import { QuestionClock, answerKey } from "@/game/clock";
import { Shell } from "@/components/Shell";
import { PLANETS } from "@/data/planets";
import { getQuestion } from "@/data/questionBank";
import { summary } from "@/game/run";
import { runStore, useRun } from "@/game/runStore";
import { SECONDS_PER_QUESTION, LOW_TIME_SECONDS, xpFor } from "@/game/rules";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/play")({
  head: () => meta("Question — Builder's Galaxy", "Answer within 60 seconds to earn XP and keep the rocket flying."),
  component: QuestionScreen,
});

function QuestionScreen() {
  const run = useRun();
  const navigate = useNavigate();
  const planet = run ? PLANETS[Math.min(run.current, PLANETS.length - 1)] : null;
  const ids = run && planet ? run.plan[planet.id] : [];
  const [activeId, setActiveId] = useState<string | null>(null);
  const [left, setLeft] = useState(SECONDS_PER_QUESTION);
  const clock = useRef(new QuestionClock());
  const nextRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const warnedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const voice = useRef<VoiceHandlers>({ selectOption: () => "", repeatQuestion: () => "", nextQuestion: () => "", pauseTimer: () => "", resumeTimer: () => "" });
  const togglePause = () => {
    if (clock.current.paused) {
      clock.current.resume(Date.now());
      setPaused(false);
      setAnnouncement("Timer resumed"); play("resume");
    } else {
      clock.current.pause(Date.now());
      setPaused(true);
      setAnnouncement("Timer paused"); play("pause");
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
      const ms = Math.min(SECONDS_PER_QUESTION * 1000, clock.current.elapsed(Date.now()));
      const correct = choice === q.answerIndex;
      const xp = xpFor(correct);
      play(correct ? "correct" : "wrong");
      if (clock.current.paused) {
        clock.current.resume(Date.now());
        setPaused(false);
        setAnnouncement("Timer resumed");
      }
      runStore.update((r) => (r.answers[q.id] ? r : { ...r, answers: { ...r.answers, [q.id]: { choice, correct, xp, ms } } }));
    },
    [q],
  );

  // Timer per question.
  useEffect(() => {
    if (!q || answer) return;
    clock.current.reset(Date.now());
    warnedRef.current = false;
    setAnnouncement("");
    headingRef.current?.focus();
    setPaused(false);
    setLeft(SECONDS_PER_QUESTION);
    const t = setInterval(() => {
      if (clock.current.paused) return;
      const l = SECONDS_PER_QUESTION - clock.current.elapsed(Date.now()) / 1000;
      setLeft(Math.max(0, l));
      if (l <= LOW_TIME_SECONDS && !warnedRef.current) {
        warnedRef.current = true;
        setAnnouncement("10 seconds left"); play("warning");
      }
      if (l <= 0) record(null);
    }, 100);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id, !!answer]);

  useEffect(() => { if (answer) nextRef.current?.focus(); }, [answer]);

  if (!run || !planet || !q) return <div className="min-h-dvh bg-space" />;

  const qi = ids.indexOf(q.id);
  const next = () => {
    const nextId = ids.find((id) => !run.answers[id]);
    if (nextId) return setActiveId(nextId);
    const finished = run.current + 1 >= PLANETS.length;
    runStore.update((r) => ({ ...r, current: r.current + 1, finishedAt: finished ? Date.now() : r.finishedAt }));
    if (!finished) play("flight");
    navigate({ to: finished ? "/results" : "/galaxy" });
  };

  const questionText = `${planet.name}, question ${qi + 1} of ${ids.length}: ${q.prompt} ` + q.options.map((o, i) => `Option ${i + 1}: ${o}.`).join(" ");
  voice.current = {
    selectOption: (n) => {
      if (answer) return "Already answered. Call nextQuestion to continue.";
      if (!(n >= 1 && n <= q.options.length)) return "Choose an option from 1 to 4.";
      const correct = n - 1 === q.answerIndex;
      record(n - 1);
      return `${correct ? "Correct" : "Not quite"}. The correct answer is option ${q.answerIndex + 1}: ${q.options[q.answerIndex]}. ${q.explanation ?? ""} Source: ${q.sourceTitle ?? ""}`;
    },
    repeatQuestion: () => questionText,
    nextQuestion: () => { if (!answer) return "Answer the current question first."; next(); return "Moving on."; },
    pauseTimer: () => { if (answer || clock.current.paused) return "Timer is not running."; togglePause(); return "Timer paused."; },
    resumeTimer: () => { if (!clock.current.paused) return "Timer is already running."; togglePause(); return "Timer resumed."; },
  };
  const voiceContext = answer ? `The player has answered. Correct: ${answer.correct}. Call nextQuestion when they are ready.` : `New question. Read it aloud: ${questionText}`;
  const stateFor = (i: number): OptionState => {
    if (!answer) return "idle";
    if (i === answer.choice) return answer.correct ? "correct" : "wrong";
    if (i === q.answerIndex) return "reveal";
    return "dim";
  };
  const timedOut = answer && answer.choice === null;
  const isLast = ids.every((id) => run.answers[id]);

  return (
    <Shell wide className="max-w-4xl" right={<XpTotal xp={summary(run).xp} />}>
      <RouteProgress current={run.current} />
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-x-14">
        <div className="flex items-center gap-2 lg:gap-3 lg:flex-col lg:text-center lg:row-span-2">
          <OrbitTimer seconds={answer ? SECONDS_PER_QUESTION - answer.ms / 1000 : left} paused={paused} color={planet.color} ring={planet.ring} />
          <div className="min-w-0 flex-1 lg:flex-none">
            <p className="font-display text-xl font-bold">{planet.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">Stop {run.current + 1} · Question {qi + 1} of {ids.length}</p>
            {answer && <div className="mt-3"><LennyTips planet={planet} /></div>}
          </div>
          <div className="flex shrink-0 flex-col gap-2">
          {!answer && <Button variant="secondary" size="md" className="shrink-0 px-2 lg:px-5" onClick={togglePause}>
            {paused ? <><Play aria-hidden /> Resume</> : <><Pause aria-hidden /> Pause</>}
          </Button>}
          <ClientOnly fallback={null}><Suspense fallback={null}><VoiceAgent handlers={voice} context={voiceContext} /></Suspense></ClientOnly>
          </div>
        </div>
        <div role="group" aria-labelledby="question-heading" onKeyDown={event => {
          if (answer || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
          if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
          const choice = answerKey(event.key);
          if (choice === null) return;
          event.preventDefault();
          record(choice);
        }}>
          <h1 ref={headingRef} id="question-heading" tabIndex={-1} className="font-display text-2xl font-bold leading-snug focus:outline-3 focus:outline-primary focus:outline-offset-3">{q.prompt}</h1>
          <p className="mt-3 hidden text-sm text-muted-foreground sm:block">Press 1–4 or A–D to answer.</p>
          <div className="mt-5 grid gap-3">
            {q.options.map((o, i) => <AnswerOption key={i} index={i} text={o} state={stateFor(i)} disabled={!!answer} onClick={() => record(i)} />)}
          </div>
        </div>

      {answer && (
        <section
          role="status" aria-live="polite" aria-atomic="true"
          className={cn("lg:col-start-2 rounded-2xl border-2 bg-surface p-5 shadow-raised", answer.correct ? "border-success/70" : "border-danger/70")}
        >
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <p className={cn("flex items-center gap-2 font-display text-2xl font-bold", answer.correct ? "text-success" : "text-danger")}>
                {answer.correct ? <CheckCircle2 className="size-6" /> : timedOut ? <Clock className="size-6" /> : <XCircle className="size-6" />}
                {answer.correct ? "Correct" : timedOut ? "Time's up" : "Not quite"}
                {answer.correct && <XpReward xp={answer.xp} />}
              </p>
              {q.explanation && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{q.explanation}</p>}
              <Source title={q.sourceTitle} url={q.sourceUrl} />

            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <Button ref={nextRef} onClick={next} className="w-full shrink-0 sm:w-auto">
              {isLast ? (run.current + 1 >= PLANETS.length ? "See results" : "Back to galaxy") : "Next question"} <ArrowRight />
            </Button>
            </div>
          </div>
        </section>
      )}
      </div>
    </Shell>
  );
}
