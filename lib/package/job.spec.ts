import { describe, expect, test } from "bun:test";
import { Job } from "./job";

describe("Job", () => {
  describe("normal job", () => {
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
      [
        new Job("with-container", {
          runsOn: "ubuntu-latest",
          container: { image: "node:20" },
        }).run("echo 'Hello, world!'"),
        {
          "runs-on": "ubuntu-latest",
          container: { image: "node:20" },
          steps: [{ run: "echo 'Hello, world!'" }],
        },
      ],
      [
        new Job("with-services", {
          runsOn: "ubuntu-latest",
          services: { redis: { image: "redis:latest" } },
        }).run("echo 'Hello, world!'"),
        {
          "runs-on": "ubuntu-latest",
          services: { redis: { image: "redis:latest" } },
          steps: [{ run: "echo 'Hello, world!'" }],
        },
      ],
      [
        new Job("with-services", {
          runsOn: "ubuntu-latest",
          services: {
            redis: { image: "redis:latest" },
            postgres: { image: "postgres:latest" },
          },
        }).run("echo 'Hello, world!'"),
        {
          "runs-on": "ubuntu-latest",
          services: {
            redis: { image: "redis:latest" },
            postgres: { image: "postgres:latest" },
          },
          steps: [{ run: "echo 'Hello, world!'" }],
        },
      ],
    ])("job.toJSON(%j) -> %j", (job, expected) => {
      expect(job.toJSON()).toEqual(expected);
    });
  });

  describe("reusable workflow call job", () => {
    test.each<[Job, Record<string, unknown>]>([
      [
        new Job("simple-job", { uses: "./workflow.yml" }),
        { uses: "./workflow.yml" },
      ],
      [
        new Job("with-inputs", {
          uses: "./workflow.yml",
          with: {
            foo: "bar",
            bar: 1,
            baz: true,
          },
        }),
        { uses: "./workflow.yml", with: { foo: "bar", bar: 1, baz: true } },
      ],
      [
        new Job("with-permissions", {
          uses: "./workflow.yml",
          permissions: {
            contents: "read",
            pullRequests: "write",
          },
        }),
        {
          uses: "./workflow.yml",
          permissions: {
            contents: "read",
            "pull-requests": "write",
          },
        },
      ],
      [
        new Job("with-needs", { uses: "./workflow.yml", needs: "job-name" }),
        { uses: "./workflow.yml", needs: "job-name" },
      ],
      [
        new Job("with-if", { uses: "./workflow.yml", if: "always()" }),
        { uses: "./workflow.yml", if: "always()" },
      ],
      [
        new Job("with-concurrency", {
          uses: "./workflow.yml",
          concurrency: "group-name",
        }),
        { uses: "./workflow.yml", concurrency: "group-name" },
      ],
      [
        new Job("with-concurrency", {
          uses: "./workflow.yml",
          concurrency: { group: "group-name", cancelInProgress: true },
        }),
        {
          uses: "./workflow.yml",
          concurrency: { group: "group-name", "cancel-in-progress": true },
        },
      ],
      [
        new Job("with-strategy", {
          uses: "./workflow.yml",
          strategy: { matrix: { foo: ["bar", "baz"] } },
        }),
        {
          uses: "./workflow.yml",
          strategy: { matrix: { foo: ["bar", "baz"] } },
        },
      ],
    ])("job.toJSON(%j) -> %j", (job, expected) => {
      expect(job.toJSON()).toEqual(expected);
    });
  });
});
