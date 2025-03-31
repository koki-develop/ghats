import { describe, expect, test } from "bun:test";
import { Job } from "./job";
import { Workflow } from "./workflow";

describe("Workflow", () => {
  test.each<[Workflow, Record<string, unknown>]>([
    [
      new Workflow("simple", { on: "push" }),
      { name: "simple", on: "push", jobs: {} },
    ],
    [
      new Workflow("simple", { runName: "Simple Workflow", on: "push" }),
      { name: "simple", "run-name": "Simple Workflow", on: "push", jobs: {} },
    ],
    [
      new Workflow("simple", { on: "push", permissions: { contents: "read" } }),
      {
        name: "simple",
        on: "push",
        permissions: { contents: "read" },
        jobs: {},
      },
    ],
    [
      new Workflow("simple", { on: "push", env: { FOO: "foo", BAR: "bar" } }),
      {
        name: "simple",
        on: "push",
        env: {
          FOO: "foo",
          BAR: "bar",
        },
        jobs: {},
      },
    ],
    [
      new Workflow("simple", {
        on: "push",
        concurrency: { group: "group", cancelInProgress: true },
      }),
      {
        name: "simple",
        on: "push",
        concurrency: {
          group: "group",
          "cancel-in-progress": true,
        },
        jobs: {},
      },
    ],
    [
      (() => {
        const workflow = new Workflow("simple", { on: "push" });
        workflow.addJob(
          new Job("test", {
            runsOn: "ubuntu-latest",
          }).run("echo 'Hello, world!'"),
        );
        return workflow;
      })(),
      {
        name: "simple",
        on: "push",
        jobs: {
          test: {
            "runs-on": "ubuntu-latest",
            steps: [{ run: "echo 'Hello, world!'" }],
          },
        },
      },
    ],
  ])("workflow.toJSON() -> %j", (workflow, expected) => {
    expect(workflow.toJSON()).toEqual(expected);
  });
});
