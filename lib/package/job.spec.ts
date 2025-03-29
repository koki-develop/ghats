import { describe, expect, test } from "bun:test";
import { Job } from "./job";

describe("Job", () => {
  test("simple job", () => {
    const job = new Job("test", { runsOn: "ubuntu-latest" });
    job.run("echo 'Hello, world!'");
    expect(job.toJSON()).toEqual({
      "runs-on": "ubuntu-latest",
      steps: [{ run: "echo 'Hello, world!'" }],
    });
  });
});
