import { Job, Workflow } from "../../lib";

const workflow = new Workflow("CI", {
  on: "push",
  permissions: {},
});

workflow.addJob(
  new Job("test", {
    runsOn: "ubuntu-latest",
    permissions: { contents: "read" },
    timeoutMinutes: 5,
  })
    .uses("actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683", {
      with: { "persist-credentials": "false" },
    })
    .uses("jdx/mise-action@5083fe46898c414b2475087cc79da59e7da859e8")
    .run("bun install --frozen-lockfile")
    .run("bun test"),
);

export default workflow;
