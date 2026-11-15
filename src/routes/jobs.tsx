import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ExternalLink, Search, TrendingUp } from "lucide-react";
import { useRun } from "@/game/runStore";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Shell } from "@/components/Shell";
import type { JobVoiceHandlers } from "@/components/JobsVoiceAgent";
import { KEYWORD_GROUPS } from "@/data/jobKeywords";
import { searchJobs, type Job } from "@/lib/jobs.functions";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";

const JobsVoiceAgent = lazy(() => import("@/components/JobsVoiceAgent"));

export const Route = createFileRoute("/jobs")({
  head: () => meta("Job search beta — Builder's Galaxy", "Search live job listings by the best-performing keywords, with an optional voice guide."),
  component: Jobs,
});

type Days = "all" | "today" | "3days" | "week" | "month";
const daysFor = (n?: number): Days => (!n ? "all" : n <= 1 ? "today" : n <= 3 ? "3days" : n <= 7 ? "week" : "month");
const STATS_KEY = "bg-job-keyword-stats";

function Jobs() {
  const run = useServerFn(searchJobs);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [datePosted, setDatePosted] = useState<Days>("all");
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [status, setStatus] = useState("");
  const hasRun = Boolean(useRun());

  useEffect(() => { try { setStats(JSON.parse(sessionStorage.getItem(STATS_KEY) ?? "{}")); } catch { /* ignore */ } }, []);

  const go = async (o: { q?: string | undefined; loc?: string | undefined; remote?: boolean | undefined; days?: Days | undefined; pg?: number | undefined } = {}) => {
    const q = (o.q ?? query).trim();
    if (q.length < 2) return { jobs: [] as Job[], error: "Enter at least two characters." };
    const opts = { query: q, location: (o.loc ?? location) || undefined, remoteOnly: o.remote ?? remoteOnly, datePosted: o.days ?? datePosted, page: o.pg ?? 1 };
    setQuery(q); setPage(opts.page); setLoading(true); setStatus("Searching…");
    const r = await run({ data: opts });
    setLoading(false); setJobs(r.jobs); setError(r.error); setSearched(q); setOpen(null);
    setStatus(r.error ?? `${r.jobs.length} jobs found for ${q}.`);
    if (!r.error && opts.page === 1) setStats((s) => { const n = { ...s, [q]: r.jobs.length }; sessionStorage.setItem(STATS_KEY, JSON.stringify(n)); return n; });
    return r;
  };

  const ranked = Object.entries(stats).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const say = (r: { jobs: Job[]; error: string | null }) => r.error ?? (r.jobs.length ? `${r.jobs.length} jobs. ` + r.jobs.slice(0, 5).map((j, i) => `${i + 1}: ${j.title} at ${j.company}, ${j.location}.`).join(" ") : "No jobs found.");

  const voice = useRef<JobVoiceHandlers>(null as unknown as JobVoiceHandlers);
  voice.current = {
    searchJobs: async (p) => { if (p.remoteOnly !== undefined) setRemoteOnly(p.remoteOnly); if (p.location !== undefined) setLocation(p.location); return say(await go({ q: p.keywords, loc: p.location, remote: p.remoteOnly })); },
    selectKeyword: async (k) => say(await go({ q: k })),
    describeJob: (i) => { const j = jobs[i - 1]; if (!j) return `There is no job ${i}.`; setOpen(j.id); return `${j.title} at ${j.company}, ${j.location}${j.remote ? ", remote" : ""}. ${j.salary ? `Salary ${j.salary}.` : "Salary not listed."} ${j.description.slice(0, 600)}`; },
    filterResults: async (p) => { const days = p.postedWithinDays !== undefined ? daysFor(p.postedWithinDays) : undefined; if (days) setDatePosted(days); if (p.remoteOnly !== undefined) setRemoteOnly(p.remoteOnly); return say(await go({ remote: p.remoteOnly, days })); },
    nextPage: async () => say(await go({ pg: page + 1 })),
  };
  const context = searched ? `Results for "${searched}", page ${page}: ` + jobs.slice(0, 10).map((j, i) => `${i + 1}. ${j.title} at ${j.company}`).join("; ") : "No search yet. Suggest keywords: " + KEYWORD_GROUPS.flatMap((g) => g.keywords).join(", ");

  return (
    <Shell wide className="max-w-5xl" right={<ClientOnly fallback={null}><Suspense fallback={null}><JobsVoiceAgent handlers={voice} context={context} /></Suspense></ClientOnly>}>
      {hasRun && <Button asChild variant="ghost" size="md" className="mb-4 self-start"><Link to="/results"><ArrowLeft aria-hidden /> Back to results</Link></Button>}
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Beta</p>
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Find your next mission</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Live listings from job boards via JSearch. Pick a keyword or type your own; keywords that return the most listings rise to the top. The voice guide runs up to 10 minutes per session.</p>
      <p className="sr-only" aria-live="polite">{status}</p>

      <form className="mt-6 grid gap-3 rounded-2xl bg-surface p-4 sm:grid-cols-[1fr_200px_auto]" onSubmit={(e) => { e.preventDefault(); go(); }}>
        <label className="grid gap-1 text-sm">Keywords<input value={query} onChange={(e) => setQuery(e.target.value)} className="h-12 rounded-lg border border-border bg-background px-3 text-base" placeholder="e.g. Product Manager" /></label>
        <label className="grid gap-1 text-sm">Location<input value={location} onChange={(e) => setLocation(e.target.value)} className="h-12 rounded-lg border border-border bg-background px-3 text-base" placeholder="Any" /></label>
        <Button type="submit" size="md" className="self-end" disabled={loading}><Search aria-hidden /> {loading ? "Searching…" : "Search"}</Button>
        <div className="flex flex-wrap gap-4 text-sm sm:col-span-3">
          <label className="flex min-h-12 items-center gap-2"><input type="checkbox" className="size-5" checked={remoteOnly} onChange={(e) => setRemoteOnly(e.target.checked)} /> Remote only</label>
          <label className="flex items-center gap-2">Posted
            <select value={datePosted} onChange={(e) => setDatePosted(e.target.value as Days)} className="h-12 rounded-lg border border-border bg-background px-2">
              <option value="all">Any time</option><option value="today">Today</option><option value="3days">Last 3 days</option><option value="week">Last week</option><option value="month">Last month</option>
            </select>
          </label>
        </div>
      </form>

      {ranked.length > 0 && <section className="mt-6" aria-labelledby="best-kw">
        <h2 id="best-kw" className="flex items-center gap-2 font-display text-xl font-bold"><TrendingUp aria-hidden className="size-5 text-primary" /> Best performing this session</h2>
        <ul className="mt-2 flex flex-wrap gap-2">{ranked.map(([k, n]) => <li key={k}><Button variant="secondary" size="md" onClick={() => go({ q: k })}>{k} <span className="text-sm text-muted-foreground">{n} listings</span></Button></li>)}</ul>
      </section>}

      <section className="mt-6 grid gap-4 sm:grid-cols-3" aria-label="Suggested keywords">
        {KEYWORD_GROUPS.map((g) => <div key={g.group}>
          <h2 className="font-display text-lg font-bold">{g.group}</h2>
          <ul className="mt-2 flex flex-wrap gap-2">{g.keywords.map((k) => <li key={k}><Button variant="ghost" size="md" className={cn("border border-border", searched === k && "border-primary text-foreground")} onClick={() => go({ q: k })}>{k}</Button></li>)}</ul>
        </div>)}
      </section>

      <section className="mt-8" aria-labelledby="results-h">
        <h2 id="results-h" className="font-display text-2xl font-bold">{searched ? `Results for “${searched}”` : "Results"}</h2>
        {error && <p role="alert" className="mt-3 rounded-lg border border-danger/70 bg-surface p-3 text-danger">{error}</p>}
        {!searched && !error && <p className="mt-2 text-muted-foreground">Pick a keyword to start.</p>}
        {searched && !error && !loading && jobs.length === 0 && <p className="mt-2 text-muted-foreground">No jobs found. Try a broader keyword.</p>}
        <ol className="mt-4 grid gap-3">
          {jobs.map((j, i) => <li key={j.id} className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold"><span className="text-muted-foreground">{i + 1}. </span>{j.title}</h3>
                <p className="text-sm text-muted-foreground">{j.company} · {j.location}{j.remote ? " · Remote" : ""}{j.type ? ` · ${j.type.toLowerCase()}` : ""}</p>
                {j.salary && <p className="mt-1 text-sm font-semibold">{j.salary}</p>}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="md" aria-expanded={open === j.id} onClick={() => setOpen(open === j.id ? null : j.id)}>{open === j.id ? "Hide details" : "Details"}</Button>
                {j.applyUrl && <Button asChild size="md"><a href={j.applyUrl} target="_blank" rel="noreferrer">Apply <ExternalLink aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a></Button>}
              </div>
            </div>
            {open === j.id && <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{j.description || "No description provided."}{j.publisher ? `\n\nListed on ${j.publisher}.` : ""}</p>}
          </li>)}
        </ol>
        {jobs.length > 0 && <div className="mt-4 flex gap-3">
          <Button variant="secondary" size="md" disabled={page <= 1 || loading} onClick={() => go({ pg: page - 1 })}>Previous page</Button>
          <Button variant="secondary" size="md" disabled={loading} onClick={() => go({ pg: page + 1 })}>Next page</Button>
        </div>}
      </section>
    </Shell>
  );
}
