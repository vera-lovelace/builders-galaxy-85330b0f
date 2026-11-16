import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, Copy, Download, Search, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { archetypeFor } from "@/game/archetype";
import { missionStore, useMission } from "@/game/missionStore";
import { copyText } from "@/lib/clipboard";
import { writeMission } from "@/lib/mission.functions";
import { AiLabel } from "@/components/AiLabel";

type Score = { planetId: string; correct: number; total: number; planet: { name: string } };
const SITE = "https://builders-galaxy.lovable.app";

function drawCard(name: string, archetype: string, statement: string, pct: number): HTMLCanvasElement {
  const c = document.createElement("canvas"); c.width = 1200; c.height = 630;
   const g = c.getContext("2d");
   if (!g) return c;
  const css = getComputedStyle(document.documentElement);
  const v = (n: string, f: string) => css.getPropertyValue(n).trim() || f;
  g.fillStyle = v("--background", "#0b1020"); g.fillRect(0, 0, 1200, 630);
  g.fillStyle = v("--primary", "#f5c542"); g.font = "700 34px sans-serif"; g.fillText("BUILDER'S GALAXY", 70, 100);
  g.fillStyle = v("--foreground", "#ffffff"); g.font = "800 72px sans-serif"; g.fillText(archetype, 70, 200);
  g.font = "400 30px sans-serif"; g.fillText(`${name} · ${pct}% correct across 12 planets`, 70, 255);
  g.font = "400 28px sans-serif";
  const words = statement.split(" "); let line = "", y = 340;
  for (const w of words) { if (g.measureText(line + w).width > 1060) { g.fillText(line, 70, y); line = ""; y += 42; if (y > 560) break; } line += w + " "; }
  if (y <= 560) g.fillText(line, 70, y);
   g.fillStyle = v("--primary", "#f5c542"); g.font = "600 24px sans-serif"; g.fillText(`${SITE.replace("https://", "")} · AI-generated mission text`, 70, 600);
  return c;
}

export function MissionCard({ nickname, level, pct, scores, weak }: { nickname: string; level: string; pct: number; scores: Score[]; weak: Score[] }) {
  const write = useServerFn(writeMission);
  const mission = useMission();
  const a = archetypeFor(scores);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const started = useRef(false);

  const generate = async () => {
    setBusy(true); setStatus("Writing your mission statement…");
    const r = await write({ data: { archetype: a.name, level, strengths: scores.filter((s) => s.correct === s.total).map((s) => s.planet.name), growth: weak.map((w) => w.planet.name) } }).catch(() => ({ text: null, error: "Writing is unavailable right now." }));
    setBusy(false);
    if (r.text) { missionStore.set({ archetype: a.name, keywords: a.keywords, statement: r.text }); setStatus("Mission statement ready."); }
    else setStatus(r.error ?? "");
  };
  useEffect(() => { if (mission === null && !started.current) { started.current = true; generate(); } /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [mission]);

  const text = mission?.statement ?? "";
   const shareText = `I'm a ${a.name} in Builder's Galaxy. AI-generated mission: ${text}`.slice(0, 260);
  const pngBlob = () => new Promise<Blob | null>((res) => drawCard(nickname, a.name, text, pct).toBlob(res, "image/png"));
  const download = async () => { const b = await pngBlob(); if (!b) return; const u = URL.createObjectURL(b); const l = document.createElement("a"); l.href = u; l.download = "builder-card.png"; l.click(); URL.revokeObjectURL(u); setStatus("Card downloaded."); };
  const share = async () => {
    const b = await pngBlob();
    const file = b ? new File([b], "builder-card.png", { type: "image/png" }) : null;
    try {
      if (file && navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], title: a.name, text: shareText, url: SITE });
      else if (navigator.share) await navigator.share({ title: a.name, text: shareText, url: SITE });
      else { await copyText(`${shareText} ${SITE}`); setStatus("Share text copied."); }
    } catch { /* user closed share sheet */ }
  };
  const enc = encodeURIComponent;

  return (
    <section aria-labelledby="mission-h" className="mt-8 rounded-2xl border border-border bg-surface p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Your builder type</p>
      <h2 id="mission-h" className="font-display text-3xl font-extrabold">{a.name}</h2>
      <h3 className="mt-4 flex items-center gap-2 font-display text-lg font-bold"><Sparkles aria-hidden className="size-5 text-primary" /> Mission statement</h3>
       <div className="mt-2"><AiLabel /></div>
      <p className="mt-1 leading-relaxed">{text || (busy ? "Writing…" : "Not written yet.")}</p>
      <p className="mt-1 text-xs text-muted-foreground">Written by AI from your planet scores only. No name or personal details are sent.</p>
      <p className="sr-only" aria-live="polite">{status}</p>
      {!busy && !text && status && <p className="mt-2 text-sm text-danger">{status}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {text ? <>
          <Button size="md" asChild><Link to="/jobs" search={{ from: "mission" }}><Search aria-hidden /> Find matching jobs</Link></Button>
          <Button size="md" variant="secondary" onClick={async () => setStatus((await copyText(text)) ? "Mission statement copied." : "Copy failed.")}><Copy aria-hidden /> Copy statement</Button>
          <Button size="md" variant="secondary" onClick={share}><Share2 aria-hidden /> Share card</Button>
          <Button size="md" variant="ghost" asChild><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(SITE)}`} target="_blank" rel="noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a></Button>
          <Button size="md" variant="ghost" asChild><a href={`https://x.com/intent/post?text=${enc(shareText)}&url=${enc(SITE)}`} target="_blank" rel="noreferrer">X<span className="sr-only"> (opens in a new tab)</span></a></Button>
          <Button size="md" variant="ghost" onClick={download}><Download aria-hidden /> Download card</Button>
        </> : <Button size="md" disabled={busy} onClick={generate}>{busy ? "Writing…" : "Write my mission statement"}</Button>}
        <Button size="md" variant="ghost" asChild><Link to="/drill"><BookOpen aria-hidden /> Practise weak areas</Link></Button>
      </div>
      {text && <p className="mt-2 text-xs text-muted-foreground">On LinkedIn, attach the downloaded card image to your post.</p>}
    </section>
  );
}
