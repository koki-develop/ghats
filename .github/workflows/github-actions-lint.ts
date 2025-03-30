import { action, Workflow } from "ghats";
import { setupJob } from "./_helpers";

const workflow = new Workflow("GitHub Actions Lint", {
  permissions: {},
  on: {
    pullRequest: {
      paths: [".github/**"],
    },
    push: {
      branches: ["main"],
      paths: [".github/**"],
    },
  },
  concurrency: {
    group: "${{ github.workflow }}-${{ github.ref }}",
    cancelInProgress: true,
  },
});

workflow.addJob(
  setupJob("actionlint", {
    permissions: { contents: "read" },
    timeoutMinutes: 5,
  }).uses(action("koki-develop/github-actions-lint/actionlint")),
);

workflow.addJob(
  setupJob("ghalint", {
    permissions: { contents: "read" },
    timeoutMinutes: 5,
  }).uses(action("koki-develop/github-actions-lint/ghalint")),
);

workflow.addJob(
  setupJob("zizmor", {
    permissions: { contents: "read" },
    timeoutMinutes: 5,
  }).uses(
    action("koki-develop/github-actions-lint/zizmor", {
      with: {
        "github-token": "${{ github.token }}",
        persona: "auditor",
      },
    }),
  ),
);

export default workflow;
