import { Check, X, Timer, Sparkles } from "lucide-react";
import { PLANETS } from "@/data/planets";
import { cn } from "@/lib/utils";
import { SECONDS_PER_QUESTION } from "@/game/rules";
import { Rocket } from "./Rocket";
import { PlayerAvatar } from "./PlayerAvatar";

export type OptionState = "idle" | "correct" | "wrong" | "reveal" | "dim";
const LETTERS = ["A", "B", "C", "D"];

export function AnswerOption({ index, text, state, onClick, disabled }: { index: number; text: string; state: OptionState; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${LETTERS[index]}: ${text}${state === "correct" || state === "reveal" ? " (correct answer)" : state === "wrong" ? " (your answer, wrong)" : ""}`}
      className={cn(
        "flex min-h-14 w-full items-center gap-4 rounded-lg border-2 bg-surface px-4 py-3 text-left font-sans text-base transition-colors",
        state === "idle" && "border-border/70 hover:border-primary/70 hover:bg-surface-raised",
        (state === "correct" || state === "reveal") && "border-success/80",
        state === "wrong" && "border-danger bg-danger/15",
        state === "dim" && "border-border/50 text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md font-display text-sm font-bold",
          state === "correct" || state === "reveal" ? "bg-success text-primary-foreground" : state === "wrong" ? "bg-danger text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
        {state === "correct" || state === "reveal" ? <Check className="size-5" /> : state === "wrong" ? <X className="size-5" /> : LETTERS[index]}
      </span>
      <span>{text}</span>
    </button>
  );
}

export function RouteProgress({ current }: { current: number }) {
  return (
    <div className="relative flex items-center justify-between py-3" aria-label={`Stop ${current + 1} of ${PLANETS.length}`}>
      <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 border-t-2 border-dotted border-muted" />
      <div className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-info" style={{ width: `${(current / (PLANETS.length - 1)) * 100}%` }} />
      {PLANETS.map((p, i) => (
        <span key={p.id} className="relative flex justify-center">
          <span className={cn("block rounded-full", i === current ? "size-3.5" : "size-2.5", i > current && "opacity-40")} style={{ backgroundColor: p.color }} />
          {i === current && <Rocket size={7} flame={false} className="absolute -top-6" />}
        </span>
      ))}
    </div>
  );
}

export function TimerBar({ seconds }: { seconds: number }) {
  const low = seconds <= 5;
  return (
    <div className="flex items-center gap-3" role="timer" aria-label={`${Math.ceil(seconds)} seconds left`}>
      <Timer className={cn("size-5", low ? "text-danger" : "text-info")} aria-hidden />
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full transition-[width] duration-200 ease-linear", low ? "bg-danger" : "bg-info")} style={{ width: `${(seconds / SECONDS_PER_QUESTION) * 100}%` }} />
      </div>
      <span className={cn("w-7 text-right font-display text-lg font-bold tabular-nums", low && "text-danger")}>{Math.ceil(seconds)}</span>
    </div>
  );
}

export function XpTotal({ xp }: { xp: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-display font-bold text-primary">
      <Sparkles className="size-4" aria-hidden /> {xp.toLocaleString("en-US")} XP
    </span>
  );
}

export function XpReward({ xp }: { xp: number }) {
  return <span className="rounded-full bg-primary/15 px-3 py-1 font-display text-sm font-bold text-primary">+{xp} XP</span>;
}

export function RankRow({ rank, nickname, sub, xp, isYou }: { rank: number; nickname: string; sub: string; xp: number; isYou?: boolean | undefined }) {
  return (
    <li className={cn("flex items-center gap-4 border-b border-border/50 px-4 py-3", isYou && "rounded-lg border-2 border-primary/70 bg-primary/10")}>
      <span className="relative">
        <PlayerAvatar nickname={nickname} size={40} />
        <span className="absolute -bottom-1 -right-2 flex size-6 items-center justify-center rounded-full border border-border bg-background font-display text-xs font-bold">{rank}</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display font-semibold">
          {nickname} {isYou && <span className="ml-1 font-sans text-sm font-normal text-primary">you</span>}
        </span>
        <span className="block text-sm text-muted-foreground">{sub}</span>
      </span>
      <span className="font-display text-lg font-bold tabular-nums">{xp.toLocaleString("en-US")}</span>
    </li>
  );
}
