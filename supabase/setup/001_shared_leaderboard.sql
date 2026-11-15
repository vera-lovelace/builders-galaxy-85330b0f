-- Builder's Galaxy: shared leaderboard (read-write secured).
-- Run once in the connected project's SQL editor (or move into supabase/migrations).
-- Requires: Authentication -> Providers -> Anonymous sign-ins ENABLED.
-- Security model: anyone may read scores; each (anonymous) user may insert/update/delete
-- only their own row per room; values are range-checked; xp/ms cannot be forged beyond limits.

create table public.leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  room text not null check (room ~ '^[A-Z0-9-]{3,16}$'),
  nickname text not null check (char_length(btrim(nickname)) between 1 and 24),
  level text not null check (level in ('Newbie','Beginner','Advanced','Pro')),
  xp integer not null check (xp between 0 and 2400 and xp % 100 = 0),
  ms integer not null check (ms between 0 and 86400000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (room, user_id)
);

grant select on public.leaderboard_entries to anon;
grant select, insert, update, delete on public.leaderboard_entries to authenticated;
grant all on public.leaderboard_entries to service_role;

alter table public.leaderboard_entries enable row level security;

create policy "Anyone can read scores"
  on public.leaderboard_entries for select to anon, authenticated using (true);

create policy "Players insert their own score"
  on public.leaderboard_entries for insert to authenticated
  with check (user_id = auth.uid());

create policy "Players update their own score"
  on public.leaderboard_entries for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Players delete their own score"
  on public.leaderboard_entries for delete to authenticated
  using (user_id = auth.uid());

create or replace function public.touch_leaderboard_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); new.user_id = old.user_id; return new; end $$;

create trigger leaderboard_touch before update on public.leaderboard_entries
  for each row execute function public.touch_leaderboard_updated_at();

create index leaderboard_room_rank on public.leaderboard_entries (room, xp desc, ms asc);
