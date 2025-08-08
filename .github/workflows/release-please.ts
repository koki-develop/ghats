import { action, Job, Workflow } from "ghats";
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

const releaseJob = setupJob("release", {
  withBun: true,
  timeoutMinutes: 10,
  needs: releasePleaseJob.id,
  if: `\${{ needs.${releasePleaseJob.id}.outputs.shouldRelease }}`,
  permissions: {
    contents: "read",
    idToken: "write",
  },
})
  .run("echo 'registry=https://registry.npmjs.org' > .npmrc")
  .run("npm publish");

workflow.addJob(releasePleaseJob, releaseJob);

export default workflow;
