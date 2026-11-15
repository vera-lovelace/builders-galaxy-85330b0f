import { Check, X, Pause, Clock, Sparkles } from "lucide-react";
import { PLANETS } from "@/data/planets";
import { cn } from "@/lib/utils";
import { SECONDS_PER_QUESTION, isLowTime } from "@/game/rules";
import { Button } from "./Button";
import { Planet } from "./Planet";
import { Rocket } from "./Rocket";
import { PlayerAvatar } from "./PlayerAvatar";

export type OptionState = "idle" | "correct" | "wrong" | "reveal" | "dim";
const LETTERS = ["A", "B", "C", "D"];

export function AnswerOption({ index, text, state, onClick, disabled }: { index: number; text: string; state: OptionState; onClick?: () => void; disabled?: boolean }) {
  return (
    <Button variant="secondary"
      type="button"
      onClick={onClick}
      disabled={disabled}

      className={cn(
        "flex h-auto min-h-16 justify-start font-normal shadow-none disabled:opacity-100 w-full items-center gap-4 rounded-lg border-2 bg-surface px-4 py-3 text-left font-sans text-base transition-colors",
        state === "idle" && "border-border/70 hover:border-info/60 hover:bg-surface-raised",
        (state === "correct" || state === "reveal") && "border-success/80 bg-success/15",
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
      <span>{text}<span className="sr-only">{state === "correct" || state === "reveal" ? " (correct answer)" : state === "wrong" ? " (your answer, wrong)" : ""}</span></span>
    </Button>
  );
}

export function RouteProgress({ current }: { current: number }) {
  return (
    <div className="relative flex items-center justify-between py-3" role="progressbar" aria-valuemin={1} aria-valuemax={PLANETS.length} aria-valuenow={Math.min(current + 1, PLANETS.length)} aria-valuetext={`Planet ${Math.min(current + 1, PLANETS.length)} of 12: ${PLANETS[Math.min(current, PLANETS.length - 1)]?.name}`} aria-label="Voyage progress">
      <svg className="absolute inset-x-0 top-1/2 h-1 w-full -translate-y-1/2" aria-hidden><line x1="0" y1="2" x2="100%" y2="2" className="stroke-border" strokeWidth="2" strokeDasharray="4 8" strokeLinecap="round" /></svg>
      <div className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-info" style={{ width: `${(current / (PLANETS.length - 1)) * 100}%` }} />
      {PLANETS.map((p, i) => (
        <span key={p.id} aria-hidden className="relative flex justify-center">
          <span className={cn("block rounded-full", i === current ? "size-3.5" : "size-2.5", i > current && "opacity-40")} style={{ backgroundColor: p.color }} />
          {i === current && <Rocket size={7} flame={false} className="absolute -top-6" />}
        </span>
      ))}
    </div>
  );
}

export function OrbitTimer({ seconds, paused, color, ring }: { seconds: number; paused: boolean; color: string; ring?: boolean | undefined }) {
  const low = isLowTime(seconds);
  const circumference = 2 * Math.PI * 88;
  return (
    <div className="relative pb-2 lg:pb-4">
      <div className="relative size-24 lg:size-52">
        <svg viewBox="0 0 208 208" className="absolute inset-0 size-full" aria-hidden>
          <circle cx="104" cy="104" r="88" fill="none" className="stroke-muted" strokeWidth="5" />
          <circle cx="104" cy="104" r="88" fill="none" className={low ? "stroke-danger" : "stroke-info"} strokeWidth="5"
            strokeLinecap="round" strokeDasharray={`${circumference * Math.max(0, seconds) / SECONDS_PER_QUESTION} ${circumference}`}
            transform="rotate(-90 104 104)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden><Planet color={color} ring={ring} size={ring ? 96 : 129} className="scale-[0.46] lg:scale-100 shrink-0" /></div>
      </div>
      <span className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 inline-flex min-h-6 lg:min-h-8 items-center gap-1 rounded-full border border-border bg-surface px-2 font-display text-sm lg:text-xl font-bold tabular-nums", low && "text-danger")}>
        {paused ? <Pause className="size-3 lg:size-4" aria-hidden /> : <Clock className="size-3 lg:size-4" aria-hidden />}
        <span aria-hidden>{Math.ceil(seconds)}</span>
        <span className="sr-only">{Math.ceil(seconds)} seconds left</span>
        {paused && <span className="hidden lg:inline" aria-hidden>Paused</span>}
      </span>
    </div>
  );
}

export function XpTotal({ xp }: { xp: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-display font-bold tabular-nums text-primary">
      <Sparkles className="size-4" aria-hidden /> {xp.toLocaleString("en-US")} XP
    </span>
  );
}

export function XpReward({ xp }: { xp: number }) {
  return <span className="rounded-full bg-primary/15 px-3 py-1 font-display text-sm font-bold text-primary">+{xp} XP</span>;
}

export function RankRow({ rank, nickname, sub, xp, isYou }: { rank: number; nickname: string; sub: string; xp: number; isYou?: boolean | undefined }) {
  return (
    <li className={cn("flex items-center gap-4 border-b border-border/50 px-4 py-3", isYou && "rounded-lg border-2 border-primary/70 bg-surface-raised")}>
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
