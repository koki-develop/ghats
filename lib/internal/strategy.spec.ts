import { describe, expect, test } from "bun:test";
import type { Strategy } from "../package/strategy";
import { strategyJSON } from "./strategy";

describe("strategyJSON", () => {
  test.each<[Strategy, Record<string, unknown>]>([
    [{ matrix: { foo: ["bar", "baz"] } }, { matrix: { foo: ["bar", "baz"] } }],
    [
      { matrix: { foo: ["bar", "baz"] }, failFast: true },
      { matrix: { foo: ["bar", "baz"] }, "fail-fast": true },
    ],
    [
      { matrix: { foo: ["bar", "baz"] }, maxParallel: 10 },
      { matrix: { foo: ["bar", "baz"] }, "max-parallel": 10 },
    ],
    [
      {
        matrix: { foo: ["bar", "baz"] },
        failFast: true,
        maxParallel: 10,
      },
      {
        matrix: { foo: ["bar", "baz"] },
        "fail-fast": true,
        "max-parallel": 10,
      },
    ],
  ])("strategyJSON(%j) -> %j", (strategy, expected) => {
    expect(strategyJSON(strategy)).toEqual(expected);
  });
});
