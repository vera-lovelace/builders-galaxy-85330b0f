import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Coffee, ExternalLink, Play } from "lucide-react";
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
        <p className="mt-3 font-display text-xl font-semibold text-foreground">Play your way through the product universe.</p>
        <p className="mt-3 text-lg text-muted-foreground">What kind of product builder are you? Take off on a fun trivia adventure across 12 planets, explore the world of product management, and discover your own builder identity.</p>
        <p className="mt-3 text-muted-foreground">Play a fun product trivia game across 12 planets. Leave with your builder type, a mission statement in your own voice, and job pitches ready to paste.</p>
        <p className="mt-3 text-muted-foreground">No account. No sign-up. Just play, explore, and discover.</p>

        <Section title="Your mission: explore 12 planets">
          <p>Each planet represents a different part of building great products — from understanding users and solving problems to strategy, collaboration, experimentation, and delivery.</p>
          <p>Your rocket takes you from planet to planet, with two trivia questions waiting at each stop.</p>
          <p>There are {questionCount} questions across four difficulty levels, so you can test what you know, discover new ideas, and have fun along the way.</p>
          <p><strong className="text-foreground">This isn't an exam or a formal assessment.</strong> There are no pass or fail results. It's a playful way to explore product thinking and see which areas resonate with you.</p>
        </Section>

        <Section title="Discover your builder type">
          <p>Once you've explored the galaxy, your planet scores help reveal your <strong className="text-foreground">builder type</strong> — a snapshot of the strengths and interests that emerged during your journey.</p>
          <p>You'll also get an AI-generated mission statement, written in your own voice, that brings your product identity together.</p>
          <p>Copy it, download it, or share it. It's yours to use and make your own.</p>
        </Section>

        <Section title="Turn your results into career-ready words">
          <p>Your mission statement is more than a fun souvenir. You can use it as a starting point for your next career move.</p>
          <p>Builder's Galaxy also includes:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-foreground">Job search:</strong> Explore product roles with filters to help narrow down your search.</li>
            <li><strong className="text-foreground">Ready-to-use job pitches:</strong> Turn your mission statement into tailored pitches for specific roles — ready to copy and adapt.</li>
            <li><strong className="text-foreground">Product tips:</strong> Practise with bite-sized flashcards, starting with the planets where you have the most room to grow.</li>
          </ul>
          <p>Some features are still evolving, but the goal is simple: help you turn what you've discovered into words and actions you can use.</p>
        </Section>

        <Section title="Made for curious builders">
          <p>Builder's Galaxy was created for aspiring product managers and curious builders, with a little help from the SheBuilds community and workshops.</p>
          <p>Whether you're exploring product management for the first time, figuring out how to describe your strengths, or getting ready to apply for a role, this is a space to experiment without pressure.</p>
          <p>You don't need to know everything before you start. Curiosity is enough.</p>
        </Section>

        <Section title="Open, accessible, and privacy-conscious">
          <p>Builder's Galaxy is free to play and open source. You can explore without creating an account.</p>
          <p>Accessibility matters. The experience is designed with keyboard navigation, screen-reader support, reduced-motion preferences, and other accessibility considerations in mind. We're continuing to improve it and welcome feedback.</p>
          <p>Some optional features use external services:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>AI-generated results use the information you choose to submit.</li>
            <li>Voice guidance is sent to a voice service only when you opt in.</li>
            <li>Job searches send search terms and filters to the job-search provider.</li>
          </ul>
          <p>You can play the trivia game without using these optional features. See the Privacy section for more detail about what each feature sends and how it is handled.</p>
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
            <a href="https://buymeacoffee.com/caldaily" target="_blank" rel="noopener noreferrer">
              <Coffee aria-hidden /> Buy the developers a coffee<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </Section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6 text-center">
          <h2 className="font-display text-2xl font-bold">Ready for launch?</h2>
          <p className="mt-2 text-muted-foreground">Your next product adventure is waiting.</p>
          <p className="mt-2 font-semibold text-foreground">Explore 12 planets. Discover your builder type. Find the words to tell your story.</p>
          <Button asChild className="mt-4 w-full max-w-xs">
            <Link to="/join"><Play className="fill-current" /> Start playing Builder's Galaxy</Link>
          </Button>
        </section>
      </div>
    </Shell>
  );
}
