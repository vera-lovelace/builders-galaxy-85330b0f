import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Circle, ExternalLink } from "lucide-react";
import { Button } from "@/components/Button";
import { Shell } from "@/components/Shell";
import { ELEVENLABS_AGENT_ID } from "@/components/VoiceAgent";
import { jobSearchStatus } from "@/lib/jobs.functions";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/jobs-setup")({
  head: () => meta("Job search setup — Builder's Galaxy", "Connect live job listings and the voice search guide for the job search beta."),
  loader: () => jobSearchStatus(),
  component: Setup,
});

const TOOLS = [
  { name: "searchJobs", params: "keywords (string), location (string, optional), remoteOnly (boolean, optional)", does: "Runs a new search and reads back the top five jobs." },
  { name: "selectKeyword", params: "keyword (string)", does: "Searches one of the suggested keywords." },
  { name: "describeJob", params: "index (number, 1-based)", does: "Opens job N and reads its title, company, salary and description." },
  { name: "filterResults", params: "remoteOnly (boolean, optional), postedWithinDays (number, optional)", does: "Narrows the current search." },
  { name: "nextPage", params: "none", does: "Loads the next page of results." },
];

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4">
    {label} <ExternalLink aria-hidden className="size-4" /><span className="sr-only"> (opens in a new tab)</span>
  </a>
);

function Step({ n, title, done, children }: { n: number; title: string; done?: boolean; children: React.ReactNode }) {
  return (
    <li className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="flex items-center gap-2 font-display text-xl font-bold">
        {done ? <CheckCircle2 aria-hidden className="size-6 text-success" /> : <Circle aria-hidden className="size-6 text-muted-foreground" />}
        Step {n}: {title}{done !== undefined && <span className="sr-only">{done ? " (done)" : " (not done yet)"}</span>}
      </h2>
      <div className="mt-3 space-y-2 text-muted-foreground">{children}</div>
    </li>
  );
}

function Setup() {
  const status = Route.useLoaderData();
  return (
    <Shell wide className="max-w-3xl">
      <Button asChild variant="ghost" size="md" className="self-start"><Link to="/jobs"><ArrowLeft aria-hidden /> Back to job search</Link></Button>
      <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Job search setup</h1>
      <p className="mt-2 text-muted-foreground">Two things power the beta: live listings from JSearch on RapidAPI, and your ElevenLabs voice agent.</p>
      <ol className="mt-6 grid gap-4">
        <Step n={1} title="Get a JSearch key" done={status.rapidApiKey}>
          <p>Sign up on {ext("https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch", "RapidAPI → JSearch")}, choose a plan (there is a free tier with a monthly request limit), then copy your <strong className="text-foreground">X-RapidAPI-Key</strong>.</p>
          <p>Ask in chat to “add my RapidAPI key”. A secure form opens; the key is stored on the server and never shown in the app.</p>
          <p className="font-semibold text-foreground">{status.rapidApiKey ? "Key connected — live search is on." : "Not connected yet — searches will show a setup message."}</p>
        </Step>
        <Step n={2} title="Make the voice agent public">
          <p>In {ext("https://elevenlabs.io/app/agents", "ElevenLabs Agents")}, open agent <code className="text-foreground">{ELEVENLABS_AGENT_ID}</code> and keep authentication off so the browser can connect directly.</p>
        </Step>
        <Step n={3} title="Add the five search actions">
          <p>Under Tools, add each as a <strong className="text-foreground">client tool</strong> with “Wait for response” turned on, using these exact names:</p>
          <div className="overflow-x-auto">
            <table className="mt-2 w-full text-left text-sm">
              <thead><tr className="border-b border-border text-foreground"><th scope="col" className="py-2 pr-3">Name</th><th scope="col" className="py-2 pr-3">Settings</th><th scope="col" className="py-2">What it does</th></tr></thead>
              <tbody>{TOOLS.map((t) => <tr key={t.name} className="border-b border-border align-top"><th scope="row" className="py-2 pr-3 font-mono text-foreground">{t.name}</th><td className="py-2 pr-3">{t.params}</td><td className="py-2">{t.does}</td></tr>)}</tbody>
            </table>
          </div>
        </Step>
        <Step n={4} title="Update the agent's instructions">
          <p>Add a line such as: “On the job search page, help the user pick keywords, call searchJobs or selectKeyword, and summarise each job in under three sentences. Call describeJob for details.”</p>
          <p>Voice sessions stop automatically after 10 minutes.</p>
        </Step>
        <Step n={5} title="Try it">
          <p>Open the job search, press a keyword, then press <strong className="text-foreground">Voice search guide</strong> and allow the microphone.</p>
          <Button asChild size="md" className="mt-2"><Link to="/jobs">Open job search</Link></Button>
        </Step>
      </ol>
    </Shell>
  );
}
