import { action, Workflow } from "ghats";
import { setupJob } from "./_helpers";

const workflow = new Workflow("Build Workflows", {
  on: {
    pullRequest: {
      paths: [".github/workflows/**"],
    },
  },
  permissions: {},
});

workflow.addJob(
  setupJob("build", {
    permissions: {
      contents: "write",
      pullRequests: "write",
    },
    timeoutMinutes: 5,
    withBun: true,
  })
    .run("bun run gha:build")
    .run(
      `
      git add ./.github/workflows
      if ! git diff --quiet --exit-code --staged ./.github/workflows; then
        echo "Workflows are not built"
        exit 1
      fi
    `,
      { id: "check" },
    )
    .uses(
      action("peter-evans/create-pull-request", {
        if: "${{ failure() && steps.check.outcome == 'failure' }}",
        with: {
          token: "${{ github.token }}",
          title: "chore: Build Workflows",
          "commit-message": "chore: Build Workflows",
          body: "Created from #${{ github.event.pull_request.number }}.",
          base: "${{ github.head_ref }}",
          branch: "build-workflows/${{ github.head_ref }}",
        },
      }),
    ),
);

export default workflow;
