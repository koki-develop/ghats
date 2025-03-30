import { action, Job, Workflow } from "ghats";

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

const releasePleaseJob = new Job("releasePlease", {
  runsOn: "ubuntu-latest",
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

const releaseJob = new Job("release", {
  runsOn: "ubuntu-latest",
  timeoutMinutes: 10,
  needs: releasePleaseJob.id,
  if: `\${{ needs.${releasePleaseJob.id}.outputs.shouldRelease }}`,
  permissions: {
    contents: "read",
  },
})
  .uses(
    action("actions/checkout", { with: { "persist-credentials": "false" } }),
  )
  .uses(action("jdx/mise-action"))
  .run("bun install --frozen-lockfile")
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
