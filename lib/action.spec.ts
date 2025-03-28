import { describe, expect, test } from "bun:test";
import { Action } from "./action";

describe("Action", () => {
  test("simple action", () => {
    const action = new Action();
    action.run("echo 'Hello, world!'");

    expect(action.toString()).toEqual(
      `runs:
  using: composite
  steps:
    - run: echo 'Hello, world!'
      shell: bash
`,
    );
  });
});
