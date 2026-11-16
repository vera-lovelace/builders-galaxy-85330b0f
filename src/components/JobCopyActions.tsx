import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Copy, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import type { Job } from "@/lib/jobs.functions";
import { copyText } from "@/lib/clipboard";
import { writePitch } from "@/lib/mission.functions";
import { AiLabel } from "@/components/AiLabel";

export function JobCopyActions({ job, mission }: { job: Job; mission: string | null }) {
  const write = useServerFn(writePitch);
  const [pitch, setPitch] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const say = (ok: boolean, what: string) => setStatus(ok ? `${what} copied.` : "Copy failed.");
  const summaryText = `${job.title} — ${job.company}\n${job.location}${job.remote ? " (remote)" : ""}${job.salary ? `\n${job.salary}` : ""}${job.applyUrl ? `\n${job.applyUrl}` : ""}`;
  const makePitch = async () => {
    if (!mission) return;
    setBusy(true); setStatus("Writing your pitch…");
    const r = await write({ data: { mission, title: job.title, company: job.company, description: job.description.slice(0, 4000) } }).catch(() => ({ text: null, error: "Writing is unavailable right now." }));
    setBusy(false); if (r.text) { setPitch(r.text); setStatus("Pitch ready. Edit it before copying."); } else setStatus(r.error ?? "");
  };
  return (
    <div className="mt-4 grid gap-3 border-t border-border pt-4">
      {mission ? <>
         <AiLabel />
        {pitch && <label className="grid gap-1 text-sm">Your pitch (editable)
          <textarea value={pitch} onChange={(e) => setPitch(e.target.value)} rows={4} className="rounded-lg border border-border bg-background p-3 text-base" />
        </label>}
        <div className="flex flex-wrap gap-2">
          <Button size="md" variant="secondary" disabled={busy} onClick={pitch ? async () => say(await copyText(pitch), "Pitch") : makePitch}>
            {pitch ? <><Copy aria-hidden /> Copy pitch</> : <><Sparkles aria-hidden /> {busy ? "Writing…" : "Write a pitch for this job"}</>}
          </Button>
          <Button size="md" variant="ghost" onClick={async () => say(await copyText(mission), "Mission statement")}><Copy aria-hidden /> Copy mission statement</Button>
          <Button size="md" variant="ghost" onClick={async () => say(await copyText(summaryText), "Job summary")}><Copy aria-hidden /> Copy job summary</Button>
           {job.applyUrl && <Button size="md" onClick={async () => { if (pitch) say(await copyText(pitch), "Pitch"); if (job.applyUrl) window.open(job.applyUrl, "_blank", "noopener"); }}>
            {pitch ? "Copy pitch and apply" : "Apply"} <ExternalLink aria-hidden /><span className="sr-only"> (opens in a new tab)</span></Button>}
        </div>
      </> : <div className="flex flex-wrap items-center gap-2">
        <Button size="md" variant="ghost" onClick={async () => say(await copyText(summaryText), "Job summary")}><Copy aria-hidden /> Copy job summary</Button>
        <span className="text-sm text-muted-foreground">Finish a voyage to get a mission statement and tailored pitches.</span>
      </div>}
      <p className="text-sm text-muted-foreground" aria-live="polite">{status}</p>
    </div>
  );
}
