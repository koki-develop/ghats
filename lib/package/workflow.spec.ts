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
      new Workflow("with run-name", { runName: "Simple Workflow", on: "push" }),
      {
        name: "with run-name",
        "run-name": "Simple Workflow",
        on: "push",
        jobs: {},
      },
    ],
    [
      new Workflow("with permissions", {
        on: "push",
        permissions: { contents: "read" },
      }),
      {
        name: "with permissions",
        on: "push",
        permissions: { contents: "read" },
        jobs: {},
      },
    ],
    [
      new Workflow("with env", {
        on: "push",
        env: { FOO: "foo", BAR: "bar" },
      }),
      {
        name: "with env",
        on: "push",
        env: {
          FOO: "foo",
          BAR: "bar",
        },
        jobs: {},
      },
    ],
    [
      new Workflow("with concurrency", {
        on: "push",
        concurrency: { group: "group", cancelInProgress: true },
      }),
      {
        name: "with concurrency",
        on: "push",
        concurrency: {
          group: "group",
          "cancel-in-progress": true,
        },
        jobs: {},
      },
    ],
    [
      new Workflow("with defaults", {
        on: "push",
        defaults: { run: { shell: "bash" } },
      }),
      {
        name: "with defaults",
        on: "push",
        defaults: { run: { shell: "bash" } },
        jobs: {},
      },
    ],
    [
      (() => {
        const workflow = new Workflow("with job", { on: "push" });
        workflow.addJob(
          new Job("simple-job", {
            runsOn: "ubuntu-latest",
          }).run("echo 'Hello, world!'"),
        );
        return workflow;
      })(),
      {
        name: "with job",
        on: "push",
        jobs: {
          "simple-job": {
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
