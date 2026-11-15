import { useEffect, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Shell } from "@/components/Shell";
import { PLANETS } from "@/data/planets";
import { QUESTION_COUNT, QUESTION_SOURCES, TIP_COUNT, TIP_SOURCES, type SourceEntry } from "@/data/sources";

/**
 * About: what the game is, its open-source licences, where the content comes from,
 * the accessibility statement and privacy. Reached only from an "About" link.
 */
export default function About() {
  const navigate = useNavigate();
  const h1 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const previous = document.title;
    document.title = "About · Builder's Galaxy";
    h1.current?.focus();
    return () => {
      document.title = previous;
    };
  }, []);

  // Back to wherever the player came from; straight to Welcome if they landed here.
  const back = () => ((window.history.state?.idx ?? 0) > 0 ? navigate(-1) : navigate("/"));

  return (
    <Shell width="md">
      <button
        type="button"
        onClick={back}
        className="-ml-3 inline-flex min-h-12 items-center gap-2 self-start rounded px-3 font-display font-semibold text-muted-foreground hover:bg-surface hover:text-foreground"
      >
        <ArrowLeft className="size-5" aria-hidden />
        Back
      </button>

      <h1 ref={h1} tabIndex={-1} className="mt-4 text-4xl font-extrabold focus:outline-none sm:text-5xl">
        About Builder's Galaxy
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        A free, open-source game for learning product management, made for SheBuilds workshops.
      </p>

      <Section id="what" title="What it is">
        <p>
          A rocket flies through {PLANETS.length} planets, one for each product skill, from problem framing to pitch.
          You answer 2 questions on each planet, see where you shine, and leave with three places to learn next. There
          is no account and no sign-up.
        </p>
      </Section>

      <Section id="open-source" title="Open source">
        <dl className="grid gap-3">
          <Fact term="Code">MIT licence: use, change and share it freely, including commercially.</Fact>
          <Fact term="Questions and tips">
            The wording of the questions, explanations and tips is licensed{" "}
            <ExtLink href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</ExtLink>: share and adapt it
            with credit, not for commercial use. The ideas come from the sources below, whose owners keep all rights.
          </Fact>
          <Fact term="Source code">The repository will be linked here when it is public.</Fact>
          <Fact term="Contribute">
            Questions, scenarios, translations and accessibility feedback are welcome once the repository is public.
          </Fact>
        </dl>
      </Section>

      <Section id="content" title="The content">
        <p>
          {QUESTION_COUNT} questions at four levels (Newbie, Beginner, Advanced, Pro) and {TIP_COUNT} tips. Everything
          is written in our own words, not copied from the sources, and every item links to its source where it has
          one. Tips are never asked as quiz questions. AI helped draft the content; people review it before release.
        </p>
        <SourceList
          title="Question sources"
          summary={`${QUESTION_SOURCES.length} sources`}
          entries={QUESTION_SOURCES}
          unit="question"
        />
        <SourceList
          title="Lenny's tips sources"
          summary={`${TIP_SOURCES.length} episodes and articles from Lenny's Newsletter and Podcast`}
          entries={TIP_SOURCES}
          unit="tip"
        />
        <p className="text-sm text-muted-foreground">
          Builder's Galaxy is independent and is not affiliated with or endorsed by Lenny's Newsletter, Lenny's Podcast
          or Pragmatic Institute.
        </p>
      </Section>

      <Section id="accessibility" title="Accessibility">
        <p>We aim for WCAG 2.2 level AA and design with disabled players, not just for them.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Every control works with a keyboard and has a touch target of at least 48 pixels.</li>
          <li>Right and wrong answers always show an icon and words, never colour alone.</li>
          <li>The 60-second timer can be paused. Screen readers hear it only at 10 seconds left.</li>
          <li>Answer keys (1 to 4, A to D) work only while you are in the question.</li>
          <li>Reduced-motion settings are respected.</li>
          <li>Voice mode, in development, is opt-in, untimed and shows everything it says as text.</li>
        </ul>
        <p>
          <strong className="font-semibold">Known gaps:</strong> the game has not yet been tested with screen reader
          users, and it is available in English only. To report a problem, tell your workshop facilitator; once the
          repository is public you can also open an issue there.
        </p>
      </Section>

      <Section id="privacy" title="Privacy">
        <ul className="list-disc space-y-1 pl-5">
          <li>Your nickname and answers stay in this browser tab and are cleared when you close it.</li>
          <li>Downloads and copies of your results are made on your device; nothing is uploaded.</li>
          <li>Feature votes are anonymous: only the ideas you pick are stored.</li>
          <li>Voice mode sends your voice to ElevenLabs while it is on, and only after you start it.</li>
        </ul>
      </Section>

      <Section id="credits" title="Credits">
        <p>
          Fonts: Bricolage Grotesque and Figtree (SIL Open Font License). Icons: Lucide (ISC licence). Built with
          React, Vite and Tailwind, and in Lovable.
        </p>
      </Section>

      <div className="h-10" />
    </Shell>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-10 flex flex-col gap-3 border-t border-border pt-6 leading-relaxed">
      <h2 id={id} className="text-2xl font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Fact({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-semibold">{term}</dt>
      <dd className="text-muted-foreground">{children}</dd>
    </div>
  );
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
    >
      {children}
      <ExternalLink className="ml-1 inline size-3.5 align-[-2px]" aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function SourceList({
  title,
  summary,
  entries,
  unit,
}: {
  title: string;
  summary: string;
  entries: SourceEntry[];
  unit: string;
}) {
  return (
    <details className="rounded border border-border bg-surface px-4">
      <summary className="min-h-12 cursor-pointer py-3 font-display font-semibold">
        {title}
        <span className="block pl-4 font-sans text-sm font-normal text-muted-foreground">{summary}</span>
      </summary>
      <ol className="flex flex-col gap-2 pb-4 pt-1">
        {entries.map((e) => (
          <li key={e.title} className="text-sm leading-snug">
            {e.url ? <ExtLink href={e.url}>{e.title}</ExtLink> : <span>{e.title} (no public link)</span>}
            <span className="text-muted-foreground">
              {" "}
              · {e.count} {e.count === 1 ? unit : `${unit}s`}
            </span>
          </li>
        ))}
      </ol>
    </details>
  );
}
