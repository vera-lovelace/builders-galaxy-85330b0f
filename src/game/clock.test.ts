import { describe, it, expect } from 'vitest';
import { QuestionClock, answerKey } from './clock';

describe('question clock', () => {
  it('excludes all paused time from the Time result', () => {
    const clock = new QuestionClock();
    clock.reset(1000); clock.pause(6000);
    expect(clock.elapsed(26000)).toBe(5000);
    clock.resume(26000);
    expect(clock.elapsed(30000)).toBe(9000);
  });
  it('answering while paused resumes without counting the pause', () => {
    const clock = new QuestionClock();
    clock.reset(0); clock.pause(4000); clock.resume(44000);
    expect(clock.paused).toBe(false);
    expect(clock.elapsed(44000)).toBe(4000);
  });
  it('maps only 1–4 and A–D to answers', () => {
    expect(['1','2','3','4','A','b','C','d'].map(answerKey)).toEqual([0,1,2,3,0,1,2,3]);
    expect(answerKey('R')).toBe(null);
    expect(answerKey('')).toBe(null);
  });
});
