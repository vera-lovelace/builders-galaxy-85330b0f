/** Active answering time only; pauses never count towards results. */
export class QuestionClock {
  private startedAt = 0;
  private pausedAt: number | null = null;
  private pausedMs = 0;
  reset(now: number) { this.startedAt = now; this.pausedAt = null; this.pausedMs = 0; }
  get paused() { return this.pausedAt !== null; }
  pause(now: number) { if (this.pausedAt === null) this.pausedAt = now; }
  resume(now: number) {
    if (this.pausedAt === null) return;
    this.pausedMs += now - this.pausedAt;
    this.pausedAt = null;
  }
  elapsed(now: number) { return Math.max(0, (this.pausedAt ?? now) - this.startedAt - this.pausedMs); }
}

/** Called only by the focused question area's key handler. */
export function answerKey(key: string): number | null {
  const i = "1234".indexOf(key);
  if (i >= 0 && key.length === 1) return i;
  const letter = "abcd".indexOf(key.toLowerCase());
  return key.length === 1 && letter >= 0 ? letter : null;
}
