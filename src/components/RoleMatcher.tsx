import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { suggestJobSearch, type JobSuggestion } from "@/lib/jobSuggest.functions";
import { AiLabel } from "@/components/AiLabel";

type Apply = { keyword: string; location: string; remoteOnly: boolean; datePosted: JobSuggestion["datePosted"] };
const DAYS: Record<JobSuggestion["datePosted"], string> = { all: "Any time", today: "Today", "3days": "Last 3 days", week: "Last week", month: "Last month" };

export function RoleMatcher({ onApply, mission }: { onApply: (a: Apply) => void; mission: string | null }) {
  const [mode, setMode] = useState<"role" | "background">("role");
  const suggest = useServerFn(suggestJobSearch);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [s, setS] = useState<JobSuggestion | null>(null);

  const submit = async () => {
    if (text.trim().length < 10) { setError("Describe your target role in a sentence or two."); return; }
    setBusy(true); setError(null);
    try { const r = await suggest({ data: { text: mode === "background" ? `Background (CV summary or headline): ${text}` : text } }); setS(r.suggestion); setError(r.error); }
    catch { setError("Suggestions are unavailable right now."); }
    finally { setBusy(false); }
  };

  return (
    <section aria-labelledby="matcher-h" className="mt-6 rounded-2xl bg-surface p-4">
      <h2 id="matcher-h" className="flex items-center gap-2 font-display text-xl font-bold"><Sparkles aria-hidden className="size-5 text-primary" /> Describe what you're looking for</h2>
      <div className="mt-2"><AiLabel /></div>
      <div role="group" aria-label="What to describe" className="mt-3 flex flex-wrap gap-2">
        <Button type="button" size="md" variant={mode === "role" ? "secondary" : "ghost"} aria-pressed={mode === "role"} onClick={() => setMode("role")}>Target role</Button>
        <Button type="button" size="md" variant={mode === "background" ? "secondary" : "ghost"} aria-pressed={mode === "background"} onClick={() => setMode("background")}>My background</Button>
        {mission && <Button type="button" size="md" variant="ghost" onClick={() => setText(mission)}>Use my mission statement</Button>}
      </div>
      <p className="mt-3 flex items-start gap-2 rounded-lg border border-success/60 bg-background p-3 text-sm"><ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-success" /><span><strong>Your data, your space, nothing stored.</strong> No sign-up and no account. Your text is used once to suggest keywords and filters, then forgotten. Leave out your name and contact details.</span></p>
      <p className="mt-2 text-sm text-muted-foreground">{mode === "role" ? "Write your target role, location and preferences in your own words." : "Paste a CV summary or LinkedIn headline. Remove names, emails and phone numbers first."}</p>
      <form className="mt-3 grid gap-3" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <label className="sr-only" htmlFor="matcher-text">{mode === "role" ? "Your target role and preferences" : "Your background"}</label>
        <textarea id="matcher-text" value={text} maxLength={1000} autoComplete="off" onChange={(e) => setText(e.target.value)} rows={3}
          className="rounded-lg border border-border bg-background p-3 text-base"
          placeholder="e.g. Senior product designer in Berlin or remote, fintech, posted this week" />
        <Button type="submit" size="md" className="justify-self-start" disabled={busy}>{busy ? "Thinking…" : "Suggest searches"}</Button>
      </form>
      <div aria-live="polite">
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        {s && !error && (
          <div className="mt-4">
            <AiLabel />
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
