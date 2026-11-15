import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Coffee, ExternalLink } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { Shell } from "@/components/Shell";
import { questionCount, questionSources, tipCount, tipSources, type SourceEntry } from "@/data/sources";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/about")({
  head: () => meta("About · Builder's Galaxy", "Licences, content sources, accessibility and privacy for Builder's Galaxy, a free open-source PM learning game."),
  component: About,
});

function NewTab({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:text-info">
      {children}<ExternalLink className="ml-1 inline size-3.5 align-[-2px]" aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function SourceList({ summary, sub, entries, unit }: { summary: string; sub: string; entries: SourceEntry[]; unit: string }) {
  return (
    <details className="mt-3 rounded-2xl border border-border bg-surface">
      <summary className="flex min-h-12 cursor-pointer flex-col justify-center rounded-2xl px-4 py-2 font-display font-semibold focus-visible:outline-3 focus-visible:outline-ring">
        <span>{summary}</span>
        <span className="text-sm font-normal text-muted-foreground">{sub}</span>
      </summary>
      <ul className="space-y-2 px-4 pb-4 text-sm">
        {entries.map((e) => (
          <li key={e.title} className="break-words">
            {e.url ? <NewTab href={e.url}>{e.title}</NewTab> : <>{e.title} <span className="text-muted-foreground">(no public link)</span></>}
            <span className="text-muted-foreground"> · {e.count} {e.count === 1 ? unit : `${unit}s`}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-6 mt-6">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}

function About() {
  const router = useRouter();
  const h1 = useRef<HTMLHeadingElement>(null);
  useEffect(() => { h1.current?.focus(); }, []);
  const back = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
    else router.navigate({ to: "/" });
  };
  return (
    <Shell>
      <div className="mx-auto w-full max-w-xl">
        <Button variant="ghost" size="md" className="-ml-3" onClick={back}><ArrowLeft /> Back</Button>
        <h1 ref={h1} tabIndex={-1} className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">About Builder's Galaxy</h1>
        <p className="mt-3 text-lg text-muted-foreground">A free, open-source game for learning product management, made for SheBuilds workshops.</p>

        <Section title="What it is">
          <p>A rocket flies through 12 planets, one for each product skill, from problem framing to pitch. You answer 2 questions on each planet, see where you shine, and leave with three places to learn next. There is no account and no sign-up.</p>
        </Section>

        <Section title="Job search beta">
          <p>After your voyage, the job search beta finds live product, engineering and design roles from JSearch on RapidAPI. Pick a suggested keyword or type your own, filter by location, remote work and date posted, and open each job's own Apply link.</p>
          <p className="mt-3">"Best performing" keywords are ranked by how many live results they return in your session, not by invented statistics. An optional voice search guide can run searches and read jobs aloud for up to 10 minutes per session. It is a beta: searches only work once the job search key is set up.</p>
        </Section>

        <Section title="Your builder card and practice">
          <p>Results show your builder type, worked out from your planet scores, and a short AI-written mission statement you can copy, download as a card or share on social. In the job search, each job can get a tailored pitch from your mission statement, ready to copy before you apply. The tips drill turns Lenny's tips into flashcards, starting with your weakest planets. Sound effects are off until you turn them on.</p>
        </Section>

        <Section title="Open source">
          <dl className="space-y-3">
            <div><dt className="font-semibold text-foreground">Code</dt><dd>MIT licence: use, change and share it freely, including commercially.</dd></div>
            <div><dt className="font-semibold text-foreground">Questions and tips</dt><dd>The wording of the questions, explanations and tips is licensed <NewTab href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</NewTab>: share and adapt it with credit, not for commercial use. The ideas come from the sources below, whose owners keep all rights.</dd></div>
            <div><dt className="font-semibold text-foreground">Source code</dt><dd>The repository will be linked here when it is public.</dd></div>
            <div><dt className="font-semibold text-foreground">Contribute</dt><dd>Questions, scenarios, translations and accessibility feedback are welcome once the repository is public.</dd></div>
          </dl>
        </Section>

        <Section title="The content">
          <p>{questionCount} questions at four levels (Newbie, Beginner, Advanced, Pro) and {tipCount} tips. Everything is written in our own words, not copied from the sources, and every item links to its source where it has one. Tips are never asked as quiz questions. AI helped draft the content; people review it before release.</p>
          <SourceList summary="Question sources" sub={`${questionSources.length} sources`} entries={questionSources} unit="question" />
          <SourceList summary="Lenny's tips sources" sub={`${tipSources.length} episodes and articles from Lenny's Newsletter and Podcast`} entries={tipSources} unit="tip" />
          <p className="text-sm">Builder's Galaxy is independent and is not affiliated with or endorsed by Lenny's Newsletter, Lenny's Podcast or Pragmatic Institute.</p>
        </Section>

        <Section title="Accessibility">
          <p>We aim for WCAG 2.2 level AA and design with disabled players, not just for them.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Every control works with a keyboard and has a touch target of at least 48 pixels.</li>
            <li>Right and wrong answers always show an icon and words, never colour alone.</li>
            <li>Built to work with the NVDA (Windows) and VoiceOver (Mac, iPhone and iPad) screen readers: clear headings, labelled buttons, and focus moves to each new question and dialog.</li>
            <li>The 60-second timer can be paused. Screen readers announce it only at 10 seconds left, and when you pause or resume it.</li>
            <li>Answer keys (1 to 4, A to D) work only while you are in the question.</li>
            <li>Reduced-motion settings are respected.</li>
            <li>The voice guide is opt-in and available for up to 10 minutes per session.</li>
            <li>Your data, your space, nothing stored: the mission statement, pitches and background matcher need no account. Only your planet scores, or the text you type, go to the AI to write a reply; nothing is kept after this browser session.</li>
            <li>Job searches send only your keywords and filters to JSearch (RapidAPI) through our server; nothing about you is stored.</li>
          </ul>
          <p><strong className="text-foreground">Known gaps:</strong> the game has been checked with automated and keyboard tests, but not yet by people using NVDA or VoiceOver, so some parts may still be hard to use. It is available in English only. To report a problem, tell your workshop facilitator; once the repository is public you can also open an issue there.</p>
        </Section>

        <Section title="Privacy">
          <ul className="list-disc space-y-1 pl-5">
            <li>Your nickname and answers stay in this browser tab and are cleared when you close it.</li>
            <li>Downloads and copies of your results are made on your device; nothing is uploaded.</li>
            <li>Feature voting is not switched on yet, so nothing you pick is sent or stored.</li>
            <li>The voice guide sends your voice to ElevenLabs only after you start it, only while it is on, and for up to 10 minutes per session.</li>
            <li>Your data, your space, nothing stored: the mission statement, pitches and background matcher need no account. Only your planet scores, or the text you type, go to the AI to write a reply; nothing is kept after this browser session.</li>
            <li>Job searches send only your keywords and filters to JSearch (RapidAPI) through our server; nothing about you is stored.</li>
          </ul>
        </Section>

        <Section title="Credits">
          <p>Fonts: Bricolage Grotesque and Figtree (SIL Open Font License). Icons: Lucide (ISC licence). Built with React, Vite and Tailwind, and in Lovable.</p>
          <Button asChild variant="secondary" size="md" className="mt-2">
            <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer">
              <Coffee aria-hidden /> Buy the developers a coffee<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </Section>
      </div>
    </Shell>
  );
}
