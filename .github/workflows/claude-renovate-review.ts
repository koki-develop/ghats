import { action, Workflow } from "ghats";
import { setupJob } from "./_helpers";

const workflow = new Workflow("Claude Renovate Review", {
  on: {
    pullRequest: { types: ["opened", "edited"] },
  },
  permissions: {},
  concurrency: {
    group: "${{ github.workflow }}-${{ github.ref }}",
    cancelInProgress: true,
  },
});

workflow.addJob(
  setupJob("claude-code-review", {
    if: "github.event.pull_request.user.login == 'mend[bot]'",
    timeoutMinutes: 30,
    permissions: {
      contents: "read",
      pullRequests: "write",
    },
  }).uses(
    action("koki-develop/claude-renovate-review", {
      with: {
        "claude-code-oauth-token": "${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}",
        "allowed-tools": [
          "WebFetch(domain:github.com)",
          "WebFetch(domain:raw.githubusercontent.com)",
          "WebFetch(domain:www.npmjs.com)",
        ].join("\n"),
      },
    }),
  ),
);

export default workflow;
