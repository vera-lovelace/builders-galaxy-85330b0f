import { describe, expect, it } from "vitest";
import { groupSources, questionCount, tipCount, questionSources, tipSources } from "./sources";

describe("about sources", () => {
  it("counts items from the data files", () => {
    expect(questionCount).toBe(48);
    expect(tipCount).toBe(93);
    expect(questionSources.length).toBe(2);
    expect(tipSources.length).toBe(30);
  });
  it("sorts by most used, then alphabetically", () => {
    const r = groupSources([{ sourceTitle: "B" }, { sourceTitle: "A" }, { sourceTitle: "C" }, { sourceTitle: "C" }]);
    expect(r.map((e) => e.title)).toEqual(["C", "A", "B"]);
  });
});
