import { describe, expect, test } from "bun:test";
import { envJSON } from "./env";

describe("envJSON", () => {
  test("should return undefined if env is undefined", () => {
    expect(envJSON()).toBeUndefined();
  });

  test("should return env as a record", () => {
    expect(
      envJSON({
        HOGE: "hoge",
        FUGA: "fuga",
      }),
    ).toEqual({
      HOGE: "hoge",
      FUGA: "fuga",
    });
  });
});
