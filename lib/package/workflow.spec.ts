import { describe, expect, test } from "bun:test";
import { Job } from "./job";
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

  test("workflow with run-name", () => {
    const workflow = new Workflow("simple", {
      runName: "Simple Workflow",
      on: "push",
    });

    expect(workflow.toJSON()).toEqual({
      name: "simple",
      "run-name": "Simple Workflow",
      on: "push",
      jobs: {},
    });
  });

  test("workflow with permissions", () => {
    const workflow = new Workflow("simple", {
      on: "push",
      permissions: { contents: "read" },
    });

    expect(workflow.toJSON()).toEqual({
      name: "simple",
      on: "push",
      permissions: { contents: "read" },
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

  test("workflow with concurrency", () => {
    const workflow = new Workflow("simple", {
      on: "push",
      concurrency: {
        group: "group",
        cancelInProgress: true,
      },
    });

    expect(workflow.toJSON()).toEqual({
      name: "simple",
      on: "push",
      concurrency: {
        group: "group",
        "cancel-in-progress": true,
      },
      jobs: {},
    });
  });

  test("workflow with jobs", () => {
    const workflow = new Workflow("simple", {
      on: "push",
    });

    workflow.addJob(
      new Job("test", {
        runsOn: "ubuntu-latest",
      }).run("echo 'Hello, world!'"),
    );

    expect(workflow.toJSON()).toEqual({
      name: "simple",
      on: "push",
      jobs: {
        test: {
          "runs-on": "ubuntu-latest",
          steps: [{ run: "echo 'Hello, world!'" }],
        },
      },
    });
  });
});
