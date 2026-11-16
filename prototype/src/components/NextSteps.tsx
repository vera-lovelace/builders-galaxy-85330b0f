import { useEffect, useRef, useState, type FormEvent } from "react";
import { Copy, Download, Send, Share2 } from "lucide-react";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import type { GameState } from "@/game/GameContext";
import { downloadFile, resultsJson, resultsMarkdown, resultsSummary } from "@/game/exportResults";

/**
 * Ideas players can vote for. None are built; the dialog says so plainly
 * (a labelled "fake door" to learn which one to build next).
 */
const IDEAS = [
  { id: "own-trivia", label: "Build your own trivia", hint: "Upload your own questions and play them as a voyage." },
  { id: "job-tips", label: "PM job search tips", hint: "A voice chat with tips for finding PM roles." },
  { id: "ask-sources", label: "Ask the sources", hint: "Chat with the articles and podcasts behind the questions." },
  { id: "multiplayer", label: "Play live against the room", hint: "Everyone answers the same question at the same time." },
] as const;

const VOTES_KEY = "builders-galaxy:votes";

export function NextStepsDialog({ open, onClose, state }: { open: boolean; onClose: () => void; state: GameState }) {
  const [status, setStatus] = useState("");
  const [sent, setSent] = useState(false);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const canShare = typeof navigator !== "undefined" && "share" in navigator;

  useEffect(() => {
    if (sent) thanksRef.current?.focus();
  }, [sent]);

  async function share() {
    try {
      await navigator.share({ title: "Builder's Galaxy results", text: resultsSummary(state) });
    } catch {
      /* cancelled by the player */
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(resultsMarkdown(state));
      setStatus("Results copied.");
    } catch {
      setStatus("Copy didn't work here. Try a download instead.");
    }
  }

  function vote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return; // honeypot: people never fill it in
    const ideas = data.getAll("idea");
    // PROTOTYPE: votes stay in this browser. Lovable stores them in an insert-only table.
    try {
      sessionStorage.setItem(VOTES_KEY, JSON.stringify({ ideas, at: new Date().toISOString() }));
    } catch {
      /* storage unavailable */
    }
    setSent(true);
  }

  return (
    <Dialog open={open} onClose={onClose} title="What's next?">
      <section aria-labelledby="take-heading">
        <h3 id="take-heading" className="font-display text-lg font-bold">
          Take your results with you
        </h3>
        <p className="text-sm text-muted-foreground">
          Your score, every question and its source. Made on this device, nothing is uploaded.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {canShare && (
            <Button variant="secondary" onClick={share}>
              <Share2 className="size-5" aria-hidden />
              Share
            </Button>
          )}
          <Button variant="secondary" onClick={copy}>
            <Copy className="size-5" aria-hidden />
            Copy results
          </Button>
          <Button
            variant="secondary"
            onClick={() => downloadFile("builders-galaxy-results.md", resultsMarkdown(state), "text/markdown")}
          >
            <Download className="size-5" aria-hidden />
            Download (Markdown)
          </Button>
          <Button
            variant="secondary"
            onClick={() => downloadFile("builders-galaxy-results.json", resultsJson(state), "application/json")}
          >
            <Download className="size-5" aria-hidden />
            Download (JSON)
          </Button>
        </div>
        <p className="mt-2 min-h-5 text-sm text-success" role="status">
          {status}
        </p>
      </section>

      <section aria-labelledby="vote-heading" className="mt-6 border-t border-border pt-5">
        {sent ? (
          <>
            <h3 ref={thanksRef} id="vote-heading" tabIndex={-1} className="font-display text-lg font-bold focus:outline-none">
              Thanks, your vote is in
            </h3>
            <p className="text-muted-foreground">The most-wanted idea shapes what we build next.</p>
          </>
        ) : (
          <form onSubmit={vote}>
            <h3 id="vote-heading" className="font-display text-lg font-bold">
              What should we build next?
            </h3>
            <fieldset className="mt-2">
              <legend className="text-sm text-muted-foreground">
                None of these exist yet. Pick any you would use.
              </legend>
              <div className="mt-3 flex flex-col gap-2">
                {IDEAS.map((idea) => (
                  <label
                    key={idea.id}
                    className="flex min-h-12 cursor-pointer items-start gap-3 rounded border-2 border-border px-4 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                  >
                    <input type="checkbox" name="idea" value={idea.id} className="mt-1 size-5 shrink-0 accent-[hsl(var(--primary))]" />
                    <span>
                      <span className="block font-semibold">{idea.label}</span>
                      <span className="block text-sm text-muted-foreground">{idea.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            {/* Honeypot for bots: hidden from people and screen readers */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <Button type="submit" className="mt-4 w-full sm:w-auto">
              <Send className="size-5" aria-hidden />
              Send my vote
            </Button>
          </form>
        )}
      </section>
    </Dialog>
  );
}
