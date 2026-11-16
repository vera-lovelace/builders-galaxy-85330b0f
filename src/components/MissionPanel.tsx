import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Copy, Pencil } from "lucide-react";
import { Button } from "@/components/Button";
import { missionStore, type Mission } from "@/game/missionStore";
import { copyText } from "@/lib/clipboard";
import { AiLabel } from "@/components/AiLabel";

export function MissionPanel({ mission }: { mission: Mission | null | undefined }) {
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState("");
  if (mission === undefined) return null;
  if (!mission) return <p className="mt-4 text-sm text-muted-foreground"><Link to="/play" className="underline">Play a voyage</Link> to get your mission statement and tailored pitches for each job.</p>;
  return (
    <section aria-labelledby="mp-h" className="mt-6 rounded-2xl border border-primary/50 bg-surface p-4">
      <h2 id="mp-h" className="font-display text-xl font-bold">Your mission statement · {mission.archetype}</h2>
      <div className="mt-2"><AiLabel /></div>
      {edit ? <textarea aria-label="Mission statement" defaultValue={mission.statement} rows={4} className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-base"
        onBlur={(e) => { missionStore.set({ ...mission, statement: e.target.value.trim() || mission.statement }); setEdit(false); setStatus("Saved for this session."); }} autoFocus />
        : <p className="mt-2 leading-relaxed">{mission.statement}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="md" variant="secondary" onClick={async () => setStatus((await copyText(mission.statement)) ? "Copied." : "Copy failed.")}><Copy aria-hidden /> Copy</Button>
        <Button size="md" variant="ghost" onClick={() => setEdit(true)}><Pencil aria-hidden /> Edit</Button>
      </div>
      <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">{status}</p>
    </section>
  );
}
