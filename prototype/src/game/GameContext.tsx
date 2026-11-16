import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { PLANETS, type PlanetId } from "@/data/planets";
import { questionsFor, type Question } from "@/data/questionBank";
import { assessLevel, recommend, type ExperienceLevel, type PlanetScore } from "./rules";

export interface AnswerRecord {
  questionId: string;
  planetId: PlanetId;
  /** null when the timer ran out. */
  chosen: number | null;
  correct: boolean;
  xp: number;
}

export interface GameState {
  nickname: string;
  experience: ExperienceLevel | null;
  roomCode: string;
  planetIndex: number;
  questionIndex: number;
  answers: AnswerRecord[];
  startedAt: number | null;
  finishedAt: number | null;
  /** Time spent paused, left out of the run time. */
  pausedMs: number;
  /** Planet index the rocket should fly from on the next Galaxy visit. */
  flyFrom: number | null;
  /** False until the rocket has left the launchpad. */
  launched: boolean;
}

type Action =
  | { type: "join"; nickname: string; experience: ExperienceLevel }
  | { type: "answer"; record: AnswerRecord }
  | { type: "advance" }
  | { type: "landed" }
  | { type: "liftoff" }
  | { type: "paused"; ms: number }
  | { type: "reset" };

const DEFAULT_ROOM = "DEMO-42";

const initial: GameState = {
  nickname: "",
  experience: null,
  roomCode: DEFAULT_ROOM,
  planetIndex: 0,
  questionIndex: 0,
  answers: [],
  startedAt: null,
  finishedAt: null,
  pausedMs: 0,
  flyFrom: null,
  launched: false,
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "join":
      return { ...initial, roomCode: state.roomCode, nickname: action.nickname, experience: action.experience };
    case "answer":
      if (state.answers.some((a) => a.questionId === action.record.questionId)) return state;
      return { ...state, startedAt: state.startedAt ?? Date.now(), answers: [...state.answers, action.record] };
    case "advance": {
      const planetQs = questionsFor(PLANETS[state.planetIndex].id, state.experience);
      if (state.questionIndex + 1 < planetQs.length) return { ...state, questionIndex: state.questionIndex + 1 };
      const next = state.planetIndex + 1;
      if (next >= PLANETS.length) return { ...state, finishedAt: Date.now() };
      return { ...state, planetIndex: next, questionIndex: 0, flyFrom: state.planetIndex };
    }
    case "landed":
      return { ...state, flyFrom: null };
    case "liftoff":
      return { ...state, launched: true, startedAt: state.startedAt ?? Date.now() };
    case "paused":
      return { ...state, pausedMs: state.pausedMs + action.ms };
    case "reset":
      return { ...initial, roomCode: state.roomCode };
  }
}

const STORAGE_KEY = "builders-galaxy:game";

function load(): GameState {
  try {
    const params = new URLSearchParams(window.location.search);
    const saved = sessionStorage.getItem(STORAGE_KEY);
    const state = saved ? { ...initial, ...JSON.parse(saved) } : initial;
    const room = params.get("room");
    return room ? { ...state, roomCode: room.toUpperCase().slice(0, 12) } : state;
  } catch {
    return initial;
  }
}

interface GameApi {
  state: GameState;
  dispatch: React.Dispatch<Action>;
  currentPlanet: (typeof PLANETS)[number];
  currentQuestion: Question | undefined;
  totalXp: number;
  isFinished: boolean;
}

const Ctx = createContext<GameApi | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable: the run still works in memory */
    }
  }, [state]);

  const api = useMemo<GameApi>(() => {
    const currentPlanet = PLANETS[state.planetIndex];
    return {
      state,
      dispatch,
      currentPlanet,
      currentQuestion: questionsFor(currentPlanet.id, state.experience)[state.questionIndex],
      totalXp: state.answers.reduce((sum, a) => sum + a.xp, 0),
      isFinished: state.finishedAt !== null,
    };
  }, [state]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useGame() {
  const api = useContext(Ctx);
  if (!api) throw new Error("useGame must be used inside <GameProvider>");
  return api;
}

/** Derived results for the Results and Leaderboard screens. */
export function summarize(state: GameState) {
  const scores: PlanetScore[] = PLANETS.map((p) => {
    const answers = state.answers.filter((a) => a.planetId === p.id);
    return {
      planetId: p.id,
      correct: answers.filter((a) => a.correct).length,
      total: questionsFor(p.id, state.experience).length,
    };
  });
  const correct = state.answers.filter((a) => a.correct).length;
  const total = scores.reduce((s, x) => s + x.total, 0);
  const accuracy = total ? correct / total : 0;
  const elapsedMs =
    state.startedAt && state.finishedAt ? Math.max(0, state.finishedAt - state.startedAt - state.pausedMs) : 0;
  return {
    scores,
    correct,
    total,
    accuracy,
    xp: state.answers.reduce((s, a) => s + a.xp, 0),
    level: assessLevel(accuracy),
    recommendations: recommend(scores),
    elapsedMs,
  };
}

export function formatDuration(ms: number) {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
