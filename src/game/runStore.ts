import { useSyncExternalStore } from "react";
import type { Run } from "./run";

/**
 * Run persistence. sessionStorage for now; swap this adapter for a backend later
 * without touching screens.
 */
const KEY = "builders-galaxy:run";
let cache: Run | null | undefined;
const listeners = new Set<() => void>();

function read(): Run | null {
  if (cache !== undefined) return cache;
  try {
    const raw = sessionStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Run) : null;
  } catch {
    cache = null;
  }
  return cache;
}

export const runStore = {
  get: read,
  set(run: Run | null) {
    cache = run;
    try {
      if (run) sessionStorage.setItem(KEY, JSON.stringify(run));
      else sessionStorage.removeItem(KEY);
    } catch { /* storage unavailable */ }
    listeners.forEach((l) => l());
  },
  update(fn: (r: Run) => Run) {
    const r = read();
    if (r) runStore.set(fn(r));
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

/** undefined while hydrating (server), null when no run exists. */
export function useRun(): Run | null | undefined {
  return useSyncExternalStore(runStore.subscribe, read, () => undefined);
}
