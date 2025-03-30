import { Workflow } from "ghats";
import { setupJob } from "./_helpers";

const workflow = new Workflow("CI", {
  on: {
    pullRequest: { branches: ["main"] },
    push: { branches: ["main"] },
  },
  permissions: {},
});

workflow.addJob(
  setupJob("test", {
    permissions: { contents: "read" },
    timeoutMinutes: 5,
    withBun: true,
  }).run("bun test"),
);

export default workflow;
