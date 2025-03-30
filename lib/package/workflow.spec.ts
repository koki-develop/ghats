import { describe, expect, test } from "bun:test";
import { Workflow } from "./workflow";

describe("Workflow", () => {
  test("simple workflow", () => {
    const workflow = new Workflow("simple", {
      on: "push",
    });

    expect(workflow.toJSON()).toEqual({
      name: "simple",
      "run-name": undefined,
      on: "push",
      permissions: undefined,
      jobs: {},
    });
  });
});
