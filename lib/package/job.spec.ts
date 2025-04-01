import { describe, expect, test } from "bun:test";
import { Job } from "./job";

describe("Job", () => {
  test.each<[Job, Record<string, unknown>]>([
    [
      new Job("simple-job", { runsOn: "ubuntu-latest" }).run(
        "echo 'Hello, world!'",
      ),
      {
        "runs-on": "ubuntu-latest",
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("with-permissions", {
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
      new Job("with-timeout-minutes", {
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
      new Job("with-timeout-minutes", {
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
      new Job("with-outputs", {
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
      new Job("with-needs", {
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
      new Job("with-if", {
        runsOn: "ubuntu-latest",
        if: "always()",
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        if: "always()",
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("with-environment", {
        runsOn: "ubuntu-latest",
        environment: "production",
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        environment: "production",
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("with-concurrency", {
        runsOn: "ubuntu-latest",
        concurrency: "group-name",
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        concurrency: "group-name",
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("with-concurrency", {
        runsOn: "ubuntu-latest",
        concurrency: { group: "group-name", cancelInProgress: true },
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        concurrency: { group: "group-name", "cancel-in-progress": true },
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("with-env", {
        runsOn: "ubuntu-latest",
        env: { HOGE: "hoge", FUGA: "fuga" },
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        env: { HOGE: "hoge", FUGA: "fuga" },
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("with-defaults", {
        runsOn: "ubuntu-latest",
        defaults: { run: { shell: "bash" } },
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        defaults: { run: { shell: "bash" } },
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("with-strategy", {
        runsOn: "ubuntu-latest",
        strategy: { matrix: { foo: ["bar", "baz"] } },
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        strategy: { matrix: { foo: ["bar", "baz"] } },
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("with-continue-on-error", {
        runsOn: "ubuntu-latest",
        continueOnError: true,
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        "continue-on-error": true,
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
    [
      new Job("with-continue-on-error", {
        runsOn: "ubuntu-latest",
        continueOnError: "${{ foo }}",
      }).run("echo 'Hello, world!'"),
      {
        "runs-on": "ubuntu-latest",
        "continue-on-error": "${{ foo }}",
        steps: [{ run: "echo 'Hello, world!'" }],
      },
    ],
  ])("job.toJSON(%j) -> %j", (job, expected) => {
    expect(job.toJSON()).toEqual(expected);
  });
});
