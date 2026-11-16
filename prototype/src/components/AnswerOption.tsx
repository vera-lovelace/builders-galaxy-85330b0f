import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

export type AnswerState = "idle" | "correct" | "wrong" | "reveal" | "dim";

interface AnswerOptionProps {
  letter: string;
  text: string;
  state: AnswerState;
  disabled?: boolean;
  onSelect?: () => void;
}

const styles: Record<AnswerState, string> = {
  idle: "border-border bg-surface hover:border-info/60 hover:bg-surface-raised",
  correct: "border-success bg-success/15",
  wrong: "border-danger bg-danger/15",
  reveal: "border-success/70 bg-surface",
  dim: "border-border/60 bg-surface/60 text-muted-foreground",
};

const stateLabel: Partial<Record<AnswerState, string>> = {
  correct: "Your answer, correct",
  wrong: "Your answer, incorrect",
  reveal: "Correct answer",
};

/** One of four answers. Feedback uses icon + label + colour, never colour alone. */
export function AnswerOption({ letter, text, state, disabled, onSelect }: AnswerOptionProps) {
  const badge =
    state === "correct" || state === "reveal" ? (
      <Check className="size-5" strokeWidth={3} />
    ) : state === "wrong" ? (
      <X className="size-5" strokeWidth={3} />
    ) : (
      letter
    );

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "group flex min-h-16 w-full items-center gap-4 rounded border-2 px-4 py-3 text-left",
        "transition-[background-color,border-color,color] duration-150 ease-out-expo disabled:cursor-default",
        styles[state],
      )}
    >
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-sm font-display text-base font-bold",
          state === "correct" || state === "reveal"
            ? "bg-success text-primary-foreground"
            : state === "wrong"
              ? "bg-danger text-primary-foreground"
              : "bg-muted text-foreground",
        )}
      >
        {badge}
      </span>
      <span className="text-base font-medium leading-snug sm:text-lg">{text}</span>
      {stateLabel[state] && <span className="sr-only">({stateLabel[state]})</span>}
    </button>
  );
}
