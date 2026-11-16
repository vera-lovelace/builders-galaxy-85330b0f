import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, CircleCheck, CircleX, Hourglass, Pause, Play } from "lucide-react";
import { PLANETS } from "@/data/planets";
import { questionsFor, type Question } from "@/data/questionBank";
import { AnswerOption, type AnswerState } from "@/components/AnswerOption";
import { Button } from "@/components/Button";
import { LennyTipsButton, SourceLink } from "@/components/LennyTips";
import { RouteProgress } from "@/components/RouteProgress";
import { Shell } from "@/components/Shell";
import { OrbitTimer } from "@/components/OrbitTimer";
import { XpReward, XpTotal } from "@/components/XpReward";
import { useGame } from "@/game/GameContext";
import { LOW_TIME_SECONDS, SECONDS_PER_QUESTION, xpForAnswer } from "@/game/rules";
import { cn } from "@/lib/cn";

const LETTERS = ["A", "B", "C", "D"];

function useIsDesktop() {
  const query = "(min-width: 1024px)";
  const [on, setOn] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setOn(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return on;
}

export default function QuestionScreen() {
  const { currentQuestion, isFinished } = useGame();
  if (isFinished) return <Navigate to="/results" replace />;
  if (!currentQuestion) return <Navigate to="/galaxy" replace />;
  // Keyed so the timer and selection reset for every question.
  return <QuestionRound key={currentQuestion.id} question={currentQuestion} />;
}

function QuestionRound({ question }: { question: Question }) {
  const { state, dispatch, currentPlanet, totalXp } = useGame();
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const [chosen, setChosen] = useState<number | null | undefined>(undefined); // undefined = unanswered
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [timerNote, setTimerNote] = useState("");
  const promptRef = useRef<HTMLHeadingElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);
  const desktop = useIsDesktop();

  const paused = pausedAt !== null;
  const answered = chosen !== undefined;
  const correct = chosen === question.answerIndex;
  const xp = answered ? xpForAnswer(correct) : 0;
  const planetQs = questionsFor(currentPlanet.id, state.experience);
  const lastInPlanet = state.questionIndex === planetQs.length - 1;
  const lastOverall = lastInPlanet && state.planetIndex === PLANETS.length - 1;

  const resume = useCallback(() => {
    if (pausedAt === null) return;
    dispatch({ type: "paused", ms: Date.now() - pausedAt });
    setPausedAt(null);
  }, [pausedAt, dispatch]);

  const answer = useCallback(
    (index: number | null) => {
      if (chosen !== undefined) return;
      resume();
      setChosen(index);
      const isCorrect = index === question.answerIndex;
      dispatch({
        type: "answer",
        record: { questionId: question.id, planetId: question.planetId, chosen: index, correct: isCorrect, xp: xpForAnswer(isCorrect) },
      });
    },
    [chosen, question, dispatch, resume],
  );

  // Screen readers start on the question, not at the top of the page.
  useEffect(() => promptRef.current?.focus(), []);

  // Countdown (stops while paused)
  useEffect(() => {
    if (answered || paused) return;
    if (secondsLeft <= 0) {
      answer(null);
      return;
    }
    if (secondsLeft === LOW_TIME_SECONDS) setTimerNote(`${LOW_TIME_SECONDS} seconds left`);
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [secondsLeft, answered, paused, answer]);

  useEffect(() => {
    if (answered) continueRef.current?.focus();
  }, [answered]);

  function togglePause() {
    if (paused) {
      resume();
      setTimerNote("Timer resumed");
    } else {
      setPausedAt(Date.now());
      setTimerNote("Timer paused");
    }
  }

  // 1–4 or A–D answer, but only while focus is inside the question, so the keys
  // never fire while someone is typing or using screen reader commands elsewhere.
  function onQuestionKey(e: KeyboardEvent) {
    if (answered || e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key.toUpperCase();
    const i = "1234".includes(k) ? Number(k) - 1 : LETTERS.indexOf(k);
    if (k.length === 1 && i >= 0 && i < 4) {
      e.preventDefault();
      answer(i);
    }
  }

  function next() {
    dispatch({ type: "advance" });
    if (lastOverall) navigate("/results");
    else if (lastInPlanet) navigate("/galaxy");
  }

  function optionState(i: number): AnswerState {
    if (!answered) return "idle";
    if (i === chosen) return correct ? "correct" : "wrong";
    if (i === question.answerIndex) return "reveal";
    return "dim";
  }

  const verdict = !answered
    ? null
    : chosen === null
      ? { icon: Hourglass, title: "Time's up", tone: "text-danger" }
      : correct
        ? { icon: CircleCheck, title: "Correct!", tone: "text-success" }
        : { icon: CircleX, title: "Not quite", tone: "text-danger" };

  return (
    <Shell width="lg" aside={<XpTotal xp={totalXp} />}>
      <RouteProgress planetIndex={state.planetIndex} className="mt-4" />

      <div className="mt-6 grid gap-6 lg:mt-12 lg:grid-cols-[15rem_1fr] lg:gap-14">
        {/* The planet is the stage: the countdown orbits it */}
        <div className="flex items-center gap-4 lg:sticky lg:top-10 lg:flex-col lg:self-start lg:text-center">
          <OrbitTimer
            planet={currentPlanet}
            secondsLeft={secondsLeft}
            total={SECONDS_PER_QUESTION}
            size={desktop ? 216 : 84}
            paused={paused}
          />
          <div className="min-w-0 flex-1 lg:mt-4">
            <p className="font-display text-xl font-bold leading-tight lg:text-2xl">{currentPlanet.name}</p>
            <p className="tabular text-sm text-muted-foreground">
              Stop {state.planetIndex + 1} · Question {state.questionIndex + 1} of {planetQs.length}
            </p>
          </div>
          {!answered && (
            <button
              type="button"
              onClick={togglePause}
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded border border-border px-3 font-display sm:px-4 font-semibold hover:bg-surface-raised lg:mt-1"
            >
              {paused ? <Play className="size-5 fill-current" aria-hidden /> : <Pause className="size-5" aria-hidden />}
              {paused ? "Resume" : "Pause"}
              <span className="sr-only"> timer</span>
            </button>
          )}
          <p className="sr-only" aria-live="polite">
            {timerNote}
          </p>
        </div>

        <div onKeyDown={onQuestionKey}>
          <h1 ref={promptRef} tabIndex={-1} className="text-2xl font-bold leading-tight focus:outline-none sm:text-3xl">
            {question.prompt}
          </h1>
          {!answered && <p className="mt-2 hidden text-sm text-muted-foreground sm:block">Press 1–4 or A–D to answer.</p>}

          <div className="mt-6 grid gap-3" role="group" aria-label="Answers">
            {question.options.map((text, i) => (
              <AnswerOption
                key={i}
                letter={LETTERS[i]}
                text={text}
                state={optionState(i)}
                disabled={answered}
                onSelect={() => answer(i)}
              />
            ))}
          </div>

          <div aria-live="polite" className="mt-6">
            {verdict && (
              <section
                className={cn(
                  "flex flex-col gap-4 rounded-lg border-2 bg-surface p-5 shadow-raised sm:flex-row sm:items-end sm:justify-between",
                  correct ? "border-success/60" : "border-danger/60",
                )}
              >
                <div className="flex flex-col gap-2">
                  <p className={cn("flex items-center gap-2 font-display text-2xl font-bold", verdict.tone)}>
                    <verdict.icon className="size-7" aria-hidden />
                    {verdict.title}
                    {xp > 0 && <XpReward xp={xp} className="ml-1 text-base" />}
                  </p>
                  {question.explanation && <p className="max-w-prose text-muted-foreground">{question.explanation}</p>}
                  {question.source && <SourceLink source={question.source} />}
                  <LennyTipsButton planet={currentPlanet} className="mt-1 self-start" />
                </div>
                <Button ref={continueRef} size="lg" onClick={next} className="shrink-0">
                  {lastOverall
                    ? "See results"
                    : lastInPlanet
                      ? `Fly to ${PLANETS[state.planetIndex + 1].name}`
                      : "Next question"}
                  <ArrowRight className="size-5" aria-hidden />
                </Button>
              </section>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
