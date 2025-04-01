import { describe, expect, test } from "bun:test";
import type { Env } from "../package/env";
import { envJSON } from "./env";

describe("envJSON", () => {
  test.each<[Env, ReturnType<typeof envJSON>]>([
    [{}, {}],
    [
      { HOGE: "hoge", FUGA: "fuga" },
      { HOGE: "hoge", FUGA: "fuga" },
    ],
  ])("envJSON(%j) returns %j", (input, expected) => {
    expect(envJSON(input)).toEqual(expected);
  });
});
