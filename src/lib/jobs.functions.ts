import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface Job {
  id: string; title: string; company: string; location: string; remote: boolean;
  type: string | null; salary: string | null; posted: string | null; publisher: string | null;
  applyUrl: string | null; description: string;
}

const Input = z.object({
  query: z.string().trim().min(2).max(120),
  location: z.string().trim().max(80).optional(),
  remoteOnly: z.boolean().optional(),
  datePosted: z.enum(["all", "today", "3days", "week", "month"]).optional(),
  page: z.number().int().min(1).max(10).optional(),
});

const cache = new Map<string, { at: number; value: { jobs: Job[]; error: string | null } }>();

export const searchJobs = createServerFn({ method: "POST" })
  .inputValidator((d) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["RAPIDAPI_KEY"];
    if (!key) return { jobs: [] as Job[], error: "Job search is not set up yet (missing RapidAPI key)." };
    const query = data.location ? `${data.query} in ${data.location}` : data.query;
    const params = new URLSearchParams({ query, page: String(data.page ?? 1), num_pages: "1", date_posted: data.datePosted ?? "all" });
    if (data.remoteOnly) params.set("remote_jobs_only", "true");
    const ck = params.toString();
    const hit = cache.get(ck);
    if (hit && Date.now() - hit.at < 15 * 60_000) return hit.value;
    const res = await fetch(`https://jsearch.p.rapidapi.com/search?${ck}`, {
      headers: { "x-rapidapi-key": key, "x-rapidapi-host": "jsearch.p.rapidapi.com" },
    });
    if (!res.ok) {
      console.error(`JSearch failed [${res.status}]: ${await res.text()}`);
      return { jobs: [] as Job[], error: res.status === 429 ? "Search limit reached. Try again later." : `Job search failed (${res.status}).` };
    }
    const body = (await res.json()) as { data?: Record<string, unknown>[] };
    const s = (v: unknown) => (typeof v === "string" && v ? v : null);
    const jobs: Job[] = (body.data ?? []).map((j) => {
      const min = j.job_min_salary as number | null, max = j.job_max_salary as number | null;
      const cur = s(j.job_salary_currency) ?? "";
      const per = s(j.job_salary_period);
      const salary = min || max ? `${cur} ${[min, max].filter(Boolean).map((n) => Number(n).toLocaleString("en-US")).join("–")}${per ? ` / ${per.toLowerCase()}` : ""}`.trim() : null;
      return {
        id: String(j.job_id), title: s(j.job_title) ?? "Untitled role", company: s(j.employer_name) ?? "Unknown company",
        location: [s(j.job_city), s(j.job_state), s(j.job_country)].filter(Boolean).join(", ") || "Location not given",
        remote: Boolean(j.job_is_remote), type: s(j.job_employment_type), salary, posted: s(j.job_posted_at_datetime_utc),
        publisher: s(j.job_publisher), applyUrl: s(j.job_apply_link), description: (s(j.job_description) ?? "").slice(0, 2000),
      };
    });
    const value = { jobs, error: null };
    cache.set(ck, { at: Date.now(), value });
    return value;
  });
