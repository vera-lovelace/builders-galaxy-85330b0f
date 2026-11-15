import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { suggestJobSearch, type JobSuggestion } from "@/lib/jobSuggest.functions";

type Apply = { keyword: string; location: string; remoteOnly: boolean; datePosted: JobSuggestion["datePosted"] };
const DAYS: Record<JobSuggestion["datePosted"], string> = { all: "Any time", today: "Today", "3days": "Last 3 days", week: "Last week", month: "Last month" };

export function RoleMatcher({ onApply }: { onApply: (a: Apply) => void }) {
  const suggest = useServerFn(suggestJobSearch);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [s, setS] = useState<JobSuggestion | null>(null);

  const submit = async () => {
    if (text.trim().length < 10) { setError("Describe your target role in a sentence or two."); return; }
    setBusy(true); setError(null);
    try { const r = await suggest({ data: { text } }); setS(r.suggestion); setError(r.error); }
    catch { setError("Suggestions are unavailable right now."); }
    finally { setBusy(false); }
  };

  return (
    <section aria-labelledby="matcher-h" className="mt-6 rounded-2xl bg-surface p-4">
      <h2 id="matcher-h" className="flex items-center gap-2 font-display text-xl font-bold"><Sparkles aria-hidden className="size-5 text-primary" /> Describe what you're looking for</h2>
      <p className="mt-1 text-sm text-muted-foreground">Write your target role, location and preferences in your own words. AI suggests search keywords and filters; nothing is saved.</p>
      <form className="mt-3 grid gap-3" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <label className="sr-only" htmlFor="matcher-text">Your target role and preferences</label>
        <textarea id="matcher-text" value={text} maxLength={1000} onChange={(e) => setText(e.target.value)} rows={3}
          className="rounded-lg border border-border bg-background p-3 text-base"
          placeholder="e.g. Senior product designer in Berlin or remote, fintech, posted this week" />
        <Button type="submit" size="md" className="justify-self-start" disabled={busy}>{busy ? "Thinking…" : "Suggest searches"}</Button>
      </form>
      <div aria-live="polite">
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        {s && !error && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">{s.reason}</p>
            <p className="mt-2 text-sm">Filters: {s.location || "Any location"} · {s.remoteOnly ? "Remote only" : "Remote or on-site"} · {DAYS[s.datePosted]}</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Suggested keywords">
              {s.keywords.map((k) => (
                <li key={k}><Button type="button" variant="ghost" size="md" onClick={() => onApply({ keyword: k, location: s.location, remoteOnly: s.remoteOnly, datePosted: s.datePosted })}>Search “{k}”</Button></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
