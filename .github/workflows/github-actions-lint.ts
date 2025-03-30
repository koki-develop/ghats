import { action, Job, Workflow } from "ghats";

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
  new Job("actionlint", {
    runsOn: "ubuntu-latest",
    permissions: {
      contents: "read",
    },
    timeoutMinutes: 5,
  })
    .uses(
      action("actions/checkout", { with: { "persist-credentials": "false" } }),
    )
    .uses(action("koki-develop/github-actions-lint/actionlint")),
);

workflow.addJob(
  new Job("ghalint", {
    runsOn: "ubuntu-latest",
    permissions: {
      contents: "read",
    },
    timeoutMinutes: 5,
  })
    .uses(
      action("actions/checkout", { with: { "persist-credentials": "false" } }),
    )
    .uses(
      action("koki-develop/github-actions-lint/ghalint", {
        with: {
          "action-path": "./.github/actions/**/action.yml",
        },
      }),
    ),
);

workflow.addJob(
  new Job("zizmor", {
    runsOn: "ubuntu-latest",
    permissions: {
      contents: "read",
    },
    timeoutMinutes: 5,
  })
    .uses(
      action("actions/checkout", { with: { "persist-credentials": "false" } }),
    )
    .uses(
      action("koki-develop/github-actions-lint/zizmor", {
        with: {
          "github-token": "${{ github.token }}",
          persona: "auditor",
        },
      }),
    ),
);

export default workflow;
