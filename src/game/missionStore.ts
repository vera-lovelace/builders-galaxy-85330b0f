import { useSyncExternalStore } from "react";

/** Mission statement for this browser session only; swap the adapter later without touching screens. */
export interface Mission { archetype: string; keywords: string[]; statement: string }
const KEY = "builders-galaxy:mission";
let cache: Mission | null | undefined;
const listeners = new Set<() => void>();
function read(): Mission | null {
  if (cache !== undefined) return cache;
  try { const raw = sessionStorage.getItem(KEY); cache = raw ? (JSON.parse(raw) as Mission) : null; } catch { cache = null; }
  return cache;
}
export const missionStore = {
  get: read,
  set(m: Mission | null) {
    cache = m;
    try { if (m) sessionStorage.setItem(KEY, JSON.stringify(m)); else sessionStorage.removeItem(KEY); } catch { /* unavailable */ }
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); },
};
export const useMission = () => useSyncExternalStore(missionStore.subscribe, read, () => undefined);
