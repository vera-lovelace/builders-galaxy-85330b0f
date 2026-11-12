import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button";
import { Earth } from "@/components/Earth";
import { RankRow } from "@/components/game";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Rocket } from "@/components/Rocket";
import { DEFAULT_ROOM, getLeaderboard, type LeaderboardEntry } from "@/game/leaderboard";
import { summary } from "@/game/run";
import { useRun } from "@/game/runStore";
import { formatTime } from "@/game/rules";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leaderboard")({
  validateSearch: (s: Record<string, unknown>): { room?: string | undefined } => ({
    room: typeof s["room"] === "string" && s["room"] ? s["room"].slice(0, 20) : undefined,
  }),
  head: () => meta("Leaderboard — Builder's Galaxy", "See how your crew ranks in the room."),
  component: Leaderboard,
});

function Leaderboard() {
  const { room = DEFAULT_ROOM } = Route.useSearch();
  const run = useRun();
  const s = run ? summary(run) : null;
  const entries = getLeaderboard(
    room,
    run && s ? { nickname: run.player.nickname, xp: s.xp, level: s.level, ms: s.ms } : undefined,
  );
  const top = entries.slice(0, 3);
  const rest = entries.slice(3);
  const yourRank = entries.findIndex((e) => e.isYou) + 1;
  const you = entries.find((e) => e.isYou);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-space">
      <Earth className="top-[45%]" />
      <div className="relative z-10 mx-auto w-full max-w-xl px-4 pb-10 pt-5">
        <header className="flex items-center justify-between">
          <Button asChild variant="ghost" size="icon" aria-label="Back to results">
            <Link to="/results"><ArrowLeft /></Link>
          </Button>
          <div className="text-center">
            <h1 className="font-display text-3xl font-extrabold">Leaderboard</h1>
            <p className="text-sm text-muted-foreground">Room <b className="text-foreground">{room}</b></p>
          </div>
          <Link to="/" aria-label="Home" className="flex size-12 items-center justify-center"><Rocket size={12} flame={false} /></Link>
        </header>

        <div className="mt-8 grid grid-cols-3 items-end gap-2">
          {([top[1], top[0], top[2]] as (LeaderboardEntry | undefined)[]).map((e, i) => e && <Podium key={e.id} entry={e} rank={[2, 1, 3][i]!} />)}
        </div>

        <div className="rounded-b-2xl bg-background/80 backdrop-blur">
          {you && yourRank > 3 && (
            <div className="flex items-center justify-between border-y border-border px-1 py-3 font-display text-lg font-bold">
              <span>Your rank is <span className="text-primary">{yourRank}</span></span>
              <span>{you.xp.toLocaleString("en-US")}</span>
            </div>
          )}
          <ol>
            {rest.map((e, i) => (
              <RankRow key={e.id} rank={i + 4} nickname={e.nickname} sub={`${e.level} · ${formatTime(e.ms)}`} xp={e.xp} isYou={e.isYou} />
            ))}
          </ol>
        </div>

        <Button asChild variant="secondary" className="mt-6 w-full sm:w-auto">
          <Link to="/results"><ArrowLeft /> Back to my results</Link>
        </Button>
        <p className="mt-6 text-center text-xs text-muted-foreground">Sample players shown until the live room is connected.</p>
      </div>
    </main>
  );
}

function Podium({ entry, rank }: { entry: LeaderboardEntry; rank: number }) {
  return (
    <div className="flex flex-col items-center">
      <PlayerAvatar nickname={entry.nickname} size={rank === 1 ? 84 : 64} full cheer={rank === 1} className="-mb-3" />
      <div
        className={cn("flex w-full flex-col items-center rounded-t-xl bg-gradient-to-b from-earth-deep to-background/40 px-1 pt-3 text-center",
          rank === 1 ? "h-44" : rank === 2 ? "h-32" : "h-28", entry.isYou && "ring-2 ring-primary")}
      >
        <span className="font-display text-4xl font-extrabold">{rank}</span>
        <span className="w-full truncate text-sm">{entry.nickname}{entry.isYou && " (you)"}</span>
        <span className="text-sm text-muted-foreground">{entry.xp.toLocaleString("en-US")}</span>
      </div>
    </div>
  );
}
