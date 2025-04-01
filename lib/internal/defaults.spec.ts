import { describe, expect, test } from "bun:test";
import type { Defaults } from "../package/defaults";
import { defaultsJSON } from "./defaults";

describe("defaultsJSON", () => {
  test.each<[Defaults, ReturnType<typeof defaultsJSON>]>([
    [{}, {}],
    [{ run: {} }, { run: {} }],
    [{ run: { shell: "bash" } }, { run: { shell: "bash" } }],
    [
      { run: { workingDirectory: "src" } },
      { run: { "working-directory": "src" } },
    ],
    [
      { run: { shell: "bash", workingDirectory: "src" } },
      { run: { shell: "bash", "working-directory": "src" } },
    ],
  ])("defaultsJSON(%j) -> %j", (defaults, expected) => {
    expect(defaultsJSON(defaults)).toEqual(expected);
  });
});
