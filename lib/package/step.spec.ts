import { describe, expect, test } from "bun:test";
import { type Step, stepJSON } from "./step";

describe("stepJSON", () => {
  describe("run step", () => {
    test.each<[Step, ReturnType<typeof stepJSON>]>([
      [
        { kind: "run", command: "echo 'Hello, world!'" },
        { run: "echo 'Hello, world!'" },
      ],
      [
        { kind: "run", id: "1", command: "echo 'Hello, world!'" },
        { id: "1", run: "echo 'Hello, world!'" },
      ],
      [
        { kind: "run", env: { TEST: "test" }, command: "echo 'Hello, world!'" },
        { env: { TEST: "test" }, run: "echo 'Hello, world!'" },
      ],
      [
        { kind: "run", name: "test", command: "echo 'Hello, world!'" },
        { name: "test", run: "echo 'Hello, world!'" },
      ],
      [
        {
          kind: "run",
          workingDirectory: "./foo/bar",
          command: "echo 'Hello, world!'",
        },
        { "working-directory": "./foo/bar", run: "echo 'Hello, world!'" },
      ],
      [
        { kind: "run", shell: "bash", command: "echo 'Hello, world!'" },
        { shell: "bash", run: "echo 'Hello, world!'" },
      ],
    ])("stepJSON(%j) -> %j", (input, expected) => {
      expect(stepJSON(input)).toEqual(expected);
    });
  });

  describe("uses step", () => {
    test.each<[Step, ReturnType<typeof stepJSON>]>([
      [
        { kind: "uses", action: "actions/checkout@v4" },
        { uses: "actions/checkout@v4" },
      ],
      [
        { kind: "uses", id: "1", action: "actions/checkout@v4" },
        { id: "1", uses: "actions/checkout@v4" },
      ],
      [
        { kind: "uses", name: "test", action: "actions/checkout@v4" },
        { name: "test", uses: "actions/checkout@v4" },
      ],
      [
        { kind: "uses", action: "actions/checkout@v4" },
        { uses: "actions/checkout@v4" },
      ],
      [
        { kind: "uses", env: { TEST: "test" }, action: "actions/checkout@v4" },
        { env: { TEST: "test" }, uses: "actions/checkout@v4" },
      ],
      [
        { kind: "uses", name: "test", action: "actions/checkout@v4" },
        { name: "test", uses: "actions/checkout@v4" },
      ],
    ])("stepJSON(%j) -> %j", (input, expected) => {
      expect(stepJSON(input)).toEqual(expected);
    });
  });
});
