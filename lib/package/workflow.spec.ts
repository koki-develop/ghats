import { describe, expect, test } from "bun:test";
import { Job } from "./job";
import { Workflow } from "./workflow";

describe("Workflow", () => {
  describe("toJSON", () => {
    test.each<[Workflow, Record<string, unknown>]>([
      [
        new Workflow("simple", { on: "push" }),
        { name: "simple", on: "push", jobs: {} },
      ],
      [
        new Workflow("with run-name", {
          runName: "Simple Workflow",
          on: "push",
        }),
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
            new Job("simple-job-1", {
              runsOn: "ubuntu-latest",
            }).run("echo 'Hello, 1!'"),
          );
          workflow.addJob(
            new Job("simple-job-2", {
              runsOn: "ubuntu-latest",
            }).run("echo 'Hello, 2!'"),
          );
          return workflow;
        })(),
        {
          name: "with job",
          on: "push",
          jobs: {
            "simple-job-1": {
              "runs-on": "ubuntu-latest",
              steps: [{ run: "echo 'Hello, 1!'" }],
            },
            "simple-job-2": {
              "runs-on": "ubuntu-latest",
              steps: [{ run: "echo 'Hello, 2!'" }],
            },
          },
        },
      ],
    ])("workflow.toJSON() -> %j", (workflow, expected) => {
      expect(workflow.toJSON()).toEqual(expected);
    });
  });

  describe("addJob", () => {
    test("should throw an error if a job with the same id already exists (1)", () => {
      const workflow = new Workflow("simple", { on: "push" });
      workflow.addJob(new Job("simple-job", { runsOn: "ubuntu-latest" }));
      expect(() =>
        workflow.addJob(new Job("simple-job", { runsOn: "ubuntu-latest" })),
      ).toThrow();
    });

    test("should throw an error if a job with the same id already exists (2)", () => {
      const workflow = new Workflow("simple", { on: "push" });
      expect(() =>
        workflow.addJob(
          new Job("simple-job", { runsOn: "ubuntu-latest" }),
          new Job("simple-job", { runsOn: "ubuntu-latest" }),
        ),
      ).toThrow();
    });
  });
});
