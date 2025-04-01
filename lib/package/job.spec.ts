import { describe, expect, test } from "bun:test";
import { Job } from "./job";

describe("Job", () => {
  test.each<[Job, Record<string, unknown>]>([
    [
      new Job("test", { runsOn: "ubuntu-latest" }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("test", {
        runsOn: "ubuntu-latest",
        permissions: {
          contents: "read",
          pullRequests: "write",
        },
      }),
      {
        "runs-on": "ubuntu-latest",
        permissions: {
          contents: "read",
          "pull-requests": "write",
        },
        steps: [],
      },
    ],
    [
      new Job("test", {
        runsOn: "ubuntu-latest",
        timeoutMinutes: 10,
      }),
      {
        "runs-on": "ubuntu-latest",
        "timeout-minutes": 10,
        steps: [],
      },
    ],
    [
      new Job("test", {
        runsOn: "ubuntu-latest",
        timeoutMinutes: "${{ foo }}",
      }),
      {
        "runs-on": "ubuntu-latest",
        "timeout-minutes": "${{ foo }}",
        steps: [],
      },
    ],
    [
      new Job("test", {
        runsOn: "ubuntu-latest",
        outputs: {
          "output-name": "output-value",
        },
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        outputs: { "output-name": "output-value" },
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("test", {
        runsOn: "ubuntu-latest",
        needs: "job-name",
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        needs: "job-name",
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("test", {
        runsOn: "ubuntu-latest",
        if: "always()",
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        if: "always()",
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
  ])("job.toJSON(%j) -> %j", (job, expected) => {
    expect(job.toJSON()).toEqual(expected);
  });
});
