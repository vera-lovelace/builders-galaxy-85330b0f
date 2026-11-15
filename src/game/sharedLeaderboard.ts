import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { rankEntries, type LeaderboardEntry } from "./leaderboard";

/**
 * Shared leaderboard adapter (inactive until a database is connected).
 * Activates only when VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY exist.
 * Writes use anonymous sign-in so players stay sign-up free; RLS in
 * supabase/setup/001_shared_leaderboard.sql limits each player to their own row.
 */
let client: SupabaseClient | null | undefined;

function getClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;
  client = url && key && typeof window !== "undefined" ? createClient(url, key) : null;
  return client;
}

export const isSharedLeaderboardEnabled = () => getClient() !== null;

async function ensureAnonymousUser(sb: SupabaseClient): Promise<string> {
  const { data } = await sb.auth.getUser();
  if (data.user) return data.user.id;
  const { data: signed, error } = await sb.auth.signInAnonymously();
  if (error || !signed.user) throw error ?? new Error("Anonymous sign-in failed");
  return signed.user.id;
}

export async function fetchSharedLeaderboard(room: string): Promise<LeaderboardEntry[] | null> {
  const sb = getClient();
  if (!sb) return null;
  const { data: me } = await sb.auth.getUser();
  const { data, error } = await sb
    .from("leaderboard_entries")
    .select("id, user_id, nickname, xp, level, ms")
    .eq("room", room).order("xp", { ascending: false }).order("ms").limit(100);
  if (error) throw error;
  return rankEntries(data.map((r) => ({
    id: r.id, nickname: r.nickname, xp: r.xp, level: r.level, ms: r.ms,
    isYou: !!me.user && r.user_id === me.user.id,
  })));
}

export async function submitSharedScore(room: string, entry: Omit<LeaderboardEntry, "id" | "isYou">) {
  const sb = getClient();
  if (!sb) return false;
  const userId = await ensureAnonymousUser(sb);
  const { error } = await sb.from("leaderboard_entries")
    .upsert({ room, user_id: userId, ...entry }, { onConflict: "room,user_id" });
  if (error) throw error;
  return true;
}
