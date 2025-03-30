import { action, Workflow } from "ghats";
import { setupJob } from "./_helpers";

const workflow = new Workflow("Release Please", {
  permissions: {},
  on: {
    push: { branches: ["main"] },
  },
  concurrency: {
    group: "${{ github.workflow }}-${{ github.ref }}",
    cancelInProgress: false,
  },
});

const releasePleaseJob = setupJob("releasePlease", {
  withoutCheckout: true,
  timeoutMinutes: 10,
  permissions: {
    contents: "write",
    pullRequests: "write",
  },
  outputs: {
    shouldRelease: "${{ steps.releasePlease.outputs.release_created }}",
  },
}).uses(
  action("googleapis/release-please-action", {
    id: "releasePlease",
    with: { "release-type": "node" },
  }),
);

const releaseJob = setupJob("release", {
  withBun: true,
  timeoutMinutes: 10,
  needs: releasePleaseJob.id,
  if: `\${{ needs.${releasePleaseJob.id}.outputs.shouldRelease }}`,
  permissions: {
    contents: "read",
  },
})
  .run("bun run build:package")
  .run(
    `
(
  # shellcheck disable=SC2016
  echo '//registry.npmjs.org/:_authToken=\${NODE_AUTH_TOKEN}'
  echo 'registry=https://registry.npmjs.org'
) > .npmrc
`,
  )
  .run("npm publish", {
    env: {
      NODE_AUTH_TOKEN: "${{ secrets.NPM_TOKEN }}",
    },
  });

workflow.addJob(releasePleaseJob, releaseJob);

export default workflow;
