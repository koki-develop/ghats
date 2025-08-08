import { describe, expect, test } from "bun:test";
import { concurrencyJSON } from "../internal/concurrency";
import type { Concurrency } from "../package/concurrency";

describe("concurrencyJSON", () => {
  test.each<[Concurrency, ReturnType<typeof concurrencyJSON>]>([
    ["group", "group"],
    [
      { group: "group", cancelInProgress: true },
      { group: "group", "cancel-in-progress": true },
    ],
    [
      { group: "group", cancelInProgress: false },
      { group: "group", "cancel-in-progress": false },
    ],
    [
      { group: "group", cancelInProgress: "${{ foo }}" },
      { group: "group", "cancel-in-progress": "${{ foo }}" },
    ],
  ])("concurrencyJSON(%j) returns %j", (input, expected) => {
    expect(concurrencyJSON(input)).toEqual(expected);
  });
});
