/** Tiny Web Audio cues; off by default, preference kept on this device. */
const KEY = "builders-galaxy:sound";
let ctx: AudioContext | null = null;
export const soundEnabled = () => { try { return localStorage.getItem(KEY) === "on"; } catch { return false; } };
export const setSoundEnabled = (on: boolean) => { try { localStorage.setItem(KEY, on ? "on" : "off"); } catch { /* ignore */ } };
const CUES = { select: [660], correct: [523, 784], wrong: [330, 247], warning: [880, 880], pause: [440], resume: [440, 660], flight: [220, 440, 880], finish: [523, 659, 784, 1047] } as const;
export function play(cue: keyof typeof CUES) {
  if (typeof window === "undefined" || !soundEnabled()) return;
  try {
    ctx ??= new AudioContext();
    CUES[cue].forEach((f, i) => {
      const o = ctx!.createOscillator(), g = ctx!.createGain(), t = ctx!.currentTime + i * 0.12;
      o.frequency.value = f; o.type = "sine";
      g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      o.connect(g).connect(ctx!.destination); o.start(t); o.stop(t + 0.2);
    });
  } catch { /* audio unavailable */ }
}
