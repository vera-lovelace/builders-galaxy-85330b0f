import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Compass, Play } from "lucide-react";
import { Button } from "@/components/Button";
import { NextStepsDialog } from "@/components/NextSteps";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { RankRow, type RankEntry } from "@/components/RankRow";
import { Rocket } from "@/components/Rocket";
import { Earth } from "@/components/Scenery";
import { formatDuration, summarize, useGame } from "@/game/GameContext";
import { cn } from "@/lib/cn";

/** SAMPLE players until the live room backend exists (decided in Lovable). */
const SAMPLE_PLAYERS: RankEntry[] = [
  { nickname: "Nova (sample)", level: "Pro", xp: 2200, time: "9:42" },
  { nickname: "Orbit (sample)", level: "Advanced", xp: 1900, time: "11:05" },
  { nickname: "Comet (sample)", level: "Advanced", xp: 1900, time: "12:31" },
  { nickname: "Pulsar (sample)", level: "Beginner", xp: 1500, time: "10:12" },
  { nickname: "Quasar (sample)", level: "Beginner", xp: 1200, time: "13:58" },
  { nickname: "Meteor (sample)", level: "Newbie", xp: 800, time: "8:47" },
];

// Visual order on the podium: 2nd, 1st, 3rd.
const PODIUM = [
  { rank: 2, pedestal: "h-28 sm:h-32", avatar: 84 },
  { rank: 1, pedestal: "h-36 sm:h-44", avatar: 104 },
  { rank: 3, pedestal: "h-24 sm:h-28", avatar: 80 },
];

export default function Leaderboard() {
  const { state, isFinished } = useGame();
  const navigate = useNavigate();
  const [nextOpen, setNextOpen] = useState(false);

  const entries = [...SAMPLE_PLAYERS];
  if (isFinished) {
    const r = summarize(state);
    entries.push({ nickname: state.nickname, level: r.level, xp: r.xp, time: formatDuration(r.elapsedMs), isYou: true });
  }
  // Same XP: the faster run (paused time excluded) ranks higher.
  entries.sort((a, b) => b.xp - a.xp || seconds(a.time) - seconds(b.time));
  const youRank = entries.findIndex((e) => e.isYou) + 1;
  const you = entries[youRank - 1];
  const back = isFinished ? "/results" : state.nickname ? "/galaxy" : "/";

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      {/* Earth from orbit, fixed under the board */}
      <svg aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[46vh] w-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice">
        <Earth w={1200} y={400} rise={330} />
      </svg>

      <div className="mx-auto w-full max-w-xl px-4 pb-safe pt-4 sm:pt-6">
        <header className="grid grid-cols-[3rem_1fr_3rem] items-center">
          <button
            type="button"
            onClick={() => navigate(back)}
            aria-label="Back"
            className="grid size-12 place-items-center rounded-full text-foreground hover:bg-surface"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Leaderboard</h1>
            <p className="tabular text-sm text-muted-foreground">
              Room <span className="font-display font-bold tracking-wider text-foreground">{state.roomCode}</span>
            </p>
          </div>
          <Rocket size={18} className="justify-self-center" />
        </header>

        {/* Podium: astronauts on pedestals fading into the atmosphere */}
        <ol className="mt-8 grid grid-cols-3 items-end gap-2 sm:gap-3" aria-label="Top three">
          {PODIUM.map(({ rank, pedestal, avatar }) => {
            const e = entries[rank - 1];
            if (!e) return <li key={rank} />;
            return (
              <li key={rank} className="flex min-w-0 flex-col items-center">
                <PlayerAvatar
                  name={e.nickname}
                  size={avatar}
                  full
                  cheer={rank === 1}
                  className={cn("relative z-10 -mb-3", rank === 1 && "motion-safe:animate-[float_4s_ease-in-out_infinite]")}
                />
                <div
                  className={cn(
                    "flex w-full flex-col items-center rounded-t-lg px-1 pt-3 text-center",
                    pedestal,
                    e.isYou && "ring-2 ring-primary",
                  )}
                  style={{
                    background:
                      "linear-gradient(to bottom, hsl(var(--podium-top) / 0.85), hsl(var(--podium-bottom) / 0.45) 60%, transparent)",
                  }}
                >
                  <span className="tabular font-display text-3xl font-extrabold leading-none sm:text-4xl">
                    <span className="sr-only">Rank </span>
                    {rank}
                  </span>
                  <span className="mt-1 w-full truncate text-sm font-semibold">{e.nickname}</span>
                  <span className="tabular text-sm text-foreground/80">{e.xp.toLocaleString()}</span>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Your rank */}
        {you && (
          <p className="flex items-center justify-between border-y border-foreground/40 py-2.5 font-display text-lg font-extrabold">
            <span>
              Your rank is <span className="tabular text-primary">{youRank}</span>
            </span>
            <span className="tabular">{you.xp.toLocaleString()}</span>
          </p>
        )}

        <ol className="rounded-b-lg bg-surface px-3 pb-2" aria-label="Other players">
          {entries.slice(3).map((e, i) => (
            <RankRow key={e.nickname + i} rank={i + 4} entry={e} />
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-3 pb-6 sm:flex-row">
          {isFinished ? (
            <>
              <Button size="lg" onClick={() => setNextOpen(true)}>
                <Compass className="size-5" aria-hidden />
                What's next?
              </Button>
              <Button size="lg" variant="secondary" onClick={() => navigate("/results")}>
                <ArrowLeft className="size-5" aria-hidden />
                Back to my results
              </Button>
              <NextStepsDialog open={nextOpen} onClose={() => setNextOpen(false)} state={state} />
            </>
          ) : (
            <Button size="lg" onClick={() => navigate(state.nickname ? "/galaxy" : "/join")}>
              <Play className="size-5 fill-current" aria-hidden />
              {state.nickname ? "Continue my voyage" : "Join the game"}
            </Button>
          )}
        </div>
        <p className="pb-4 text-center text-xs text-muted-foreground">Sample players for comparison. Live rooms come later.</p>
      </div>
    </div>
  );
}

function seconds(time: string) {
  const [m, s] = time.split(":").map(Number);
  return m * 60 + s;
}
