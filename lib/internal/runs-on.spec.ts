import { describe, expect, test } from "bun:test";
import type { RunsOn } from "../package/runs-on";
import { runsOnJSON } from "./runs-on";

describe("runsOnJSON", () => {
  test.each<[RunsOn, ReturnType<typeof runsOnJSON>]>([
    ["ubuntu-latest", "ubuntu-latest"],
    [
      ["ubuntu-latest", "macos-latest"],
      ["ubuntu-latest", "macos-latest"],
    ],
    [{ group: "group" }, { group: "group" }],
    [
      { group: "group", labels: ["label1", "label2"] },
      { group: "group", labels: ["label1", "label2"] },
    ],
  ])("runsOnJSON(%j) -> %j", (runsOn, expected) => {
    expect(runsOnJSON(runsOn)).toEqual(expected);
  });
});
