import { useState } from "react";
import { ExternalLink, Lightbulb } from "lucide-react";
import type { Planet } from "@/data/planets";
import { tipsFor } from "@/data/lennyTips";
import { levelLabel } from "@/game/rules";
import { Dialog } from "./Dialog";
import { cn } from "@/lib/cn";

/**
 * Opens a planet's Lenny's tips. `variant="icon"` is a 48px icon button for list rows;
 * its name stays in visually hidden text (not aria-label) so it is translated with the page.
 */
export function LennyTipsButton({
  planet,
  variant = "text",
  className,
}: {
  planet: Planet;
  variant?: "text" | "icon";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded font-display font-semibold text-foreground hover:bg-surface-raised",
          variant === "icon" ? "min-w-12" : "border border-border px-4",
          className,
        )}
      >
        <Lightbulb className="size-5 text-primary" aria-hidden />
        {variant === "icon" ? <span className="sr-only">Lenny's tips for {planet.name}</span> : <>Lenny's tips<span className="sr-only"> for {planet.name}</span></>}
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title={`Lenny's tips: ${planet.name}`}>
        <TipList planet={planet} />
      </Dialog>
    </>
  );
}

function TipList({ planet }: { planet: Planet }) {
  const tips = tipsFor(planet.id);
  return (
    <>
      <p className="text-sm text-muted-foreground">
        {tips.length} tips from Lenny's Newsletter and Podcast, easiest first.
      </p>
      <ol className="mt-4 flex flex-col gap-3">
        {tips.map((t) => (
          <li key={t.id} className="rounded border border-border bg-background/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{levelLabel(t.level)}</p>
            <p className="mt-1 font-semibold leading-snug">{t.question}</p>
            <p className="mt-2 leading-snug">{t.answer}</p>
            {t.why && (
              <details className="group mt-3">
                <summary className="inline-flex min-h-12 cursor-pointer items-center rounded font-display font-semibold text-info">
                  Why it matters
                </summary>
                <p className="mt-1 text-muted-foreground">{t.why}</p>
              </details>
            )}
            {t.source && <SourceLink source={t.source} className="mt-2" />}
          </li>
        ))}
      </ol>
    </>
  );
}

/** "Source: Title (opens in a new tab)". */
export function SourceLink({ source, className }: { source: { title: string; url: string }; className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      Source:{" "}
      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
      >
        {source.title}
        <ExternalLink className="ml-1 inline size-3.5 align-[-2px]" aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </p>
  );
}
