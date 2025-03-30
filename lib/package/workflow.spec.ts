import { describe, expect, test } from "bun:test";
import { Workflow } from "./workflow";

describe("Workflow", () => {
  test("simple workflow", () => {
    const workflow = new Workflow("simple", {
      on: "push",
    });

    expect(workflow.toJSON()).toEqual({
      name: "simple",
      on: "push",
      jobs: {},
    });
  });

  test("workflow with env", () => {
    const workflow = new Workflow("simple", {
      on: "push",
      env: {
        FOO: "foo",
        BAR: "bar",
      },
    });

    expect(workflow.toJSON()).toEqual({
      name: "simple",
      on: "push",
      env: {
        FOO: "foo",
        BAR: "bar",
      },
      jobs: {},
    });
  });
});
