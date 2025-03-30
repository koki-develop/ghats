import { action, Job, Workflow } from "ghats";

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
    .uses(
      action("actions/checkout", { with: { "persist-credentials": "false" } }),
    )
    .uses(action("jdx/mise-action"))
    .run("bun install --frozen-lockfile")
    .run("bun test"),
);

export default workflow;
