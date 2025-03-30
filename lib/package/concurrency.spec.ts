import { describe, expect, test } from "bun:test";
import { type Concurrency, concurrencyJSON } from "./concurrency";

describe("concurrencyJSON", () => {
  test.each<[Concurrency, ReturnType<typeof concurrencyJSON>]>([
    ["group", "group"],
    [
      { group: "group", cancelInProgress: true },
      { group: "group", "cancel-in-progress": true },
    ],
  ])("concurrencyJSON(%j) returns %j", (input, expected) => {
    expect(concurrencyJSON(input)).toEqual(expected);
  });
});
