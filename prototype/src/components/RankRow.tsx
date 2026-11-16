import { PlayerAvatar } from "./PlayerAvatar";
import { cn } from "@/lib/cn";

export interface RankEntry {
  nickname: string;
  level: string;
  xp: number;
  time: string;
  isYou?: boolean;
}

/** One leaderboard row below the podium: helmet with rank badge, name, XP. */
export function RankRow({ rank, entry }: { rank: number; entry: RankEntry }) {
  return (
    <li
      className={cn(
        "flex items-center gap-5 border-b border-foreground/15 py-3",
        entry.isYou && "-mx-3 rounded-lg border-transparent bg-surface-raised px-3 ring-2 ring-primary/60",
      )}
      aria-current={entry.isYou ? "true" : undefined}
    >
      <span className="relative shrink-0">
        <PlayerAvatar name={entry.nickname} size={48} />
        <span className="tabular absolute -bottom-1.5 -right-3.5 grid size-6 place-items-center rounded-full bg-background font-display text-xs font-bold ring-2 ring-foreground/80">
          <span className="sr-only">Rank </span>
          {rank}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">
          {entry.nickname}
          {entry.isYou && <span className="ml-2 text-sm font-normal text-primary">you</span>}
        </span>
        <span className="tabular block text-sm text-muted-foreground">
          {entry.level} · {entry.time}
        </span>
      </span>
      <span className="tabular font-display text-lg font-extrabold">{entry.xp.toLocaleString()}</span>
    </li>
  );
}
