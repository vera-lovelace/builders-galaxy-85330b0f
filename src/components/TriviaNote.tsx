import { ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared disclaimer: this is a fun trivia game, not a skills assessment, and nothing is stored. */
export function TriviaNote({ className }: { className?: string }) {
  return (
    <aside aria-label="About this trivia" className={cn("rounded-2xl border border-border bg-surface p-4 text-left text-sm text-muted-foreground", className)}>
      <p className="flex gap-2"><Sparkles aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" /><span><strong className="text-foreground">Just for fun.</strong> Builder's Galaxy is a trivia game to motivate aspiring PMs, not a real skills assessment. Your score and builder type are a playful starting point, not a judgement.</span></p>
      <p className="mt-2 flex gap-2"><ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" /><span><strong className="text-foreground">Your data is secure.</strong> Nothing is stored: your answers stay in this browser tab and disappear when you close it.</span></p>
    </aside>
  );
}
