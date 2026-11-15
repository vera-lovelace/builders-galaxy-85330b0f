import type { Level } from "./rules";

export interface LeaderboardEntry { id: string; nickname: string; xp: number; level: Level; ms: number; isYou?: boolean | undefined }

export const DEFAULT_ROOM = "DEMO-42";

/** Mock room data. Replace with a shared, live provider later. */
const SAMPLE: LeaderboardEntry[] = [
  { id: "s1", nickname: "Nova (sample)", xp: 2400, level: "Pro", ms: 210000 },
  { id: "s2", nickname: "Orbit (sample)", xp: 2200, level: "Advanced", ms: 225000 },
  { id: "s3", nickname: "Comet (sample)", xp: 2000, level: "Advanced", ms: 238000 },
  { id: "s4", nickname: "Pulsar (sample)", xp: 1800, level: "Beginner", ms: 252000 },
  { id: "s5", nickname: "Quasar (sample)", xp: 1500, level: "Beginner", ms: 298000 },
  { id: "s6", nickname: "Meteor (sample)", xp: 900, level: "Newbie", ms: 287000 },
];

export function rankEntries(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => b.xp - a.xp || a.ms - b.ms);
}

export function getLeaderboard(_room: string, you?: Omit<LeaderboardEntry, "id" | "isYou">) {
  const all = you ? [...SAMPLE, { ...you, id: "you", isYou: true }] : SAMPLE;
  return rankEntries(all);
}
