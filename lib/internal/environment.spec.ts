import { describe, expect, test } from "bun:test";
import type { Environment } from "../package/environment";
import { environmentJSON } from "./environment";

describe("environmentJSON", () => {
  test.each<[Environment, Record<string, unknown> | string]>([
    ["production", "production"],
    [{ name: "production" }, { name: "production" }],
    [
      { name: "production", url: "https://example.com" },
      { name: "production", url: "https://example.com" },
    ],
  ])("environmentJSON(%j) -> %j", (environment, expected) => {
    expect(environmentJSON(environment)).toEqual(expected);
  });
});
