import { action, Workflow } from "ghats";
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
  })
    .run("bun test --coverage --coverage-reporter=lcov")
    .uses(
      action("codecov/codecov-action", {
        with: {
          token: "${{ secrets.CODECOV_TOKEN }}",
          files: "coverage/lcov.info",
          disable_search: "true",
          verbose: "true",
        },
      }),
    ),
);

workflow.addJob(
  setupJob("build-workflow", {
    permissions: { contents: "read" },
    timeoutMinutes: 5,
    withBun: true,
  })
    .run(`
cat <<EOF > ./.github/workflows/example.ts
import { Workflow, Job } from "ghats";

const workflow = new Workflow("Hello", {
  on: "push",
});

workflow.addJob(
  new Job("hello", {
    runsOn: "ubuntu-latest",
  })
    .uses("actions/checkout@v4")
    .run("echo 'Hello, world!'"),
);

export default workflow;
EOF
`)
    .run("bun run ./lib/cli/index.ts install")
    .run("bun run ./lib/cli/index.ts build ./.github/workflows/example.ts")
    .run("cat ./.github/workflows/example.yml"),
);

export default workflow;
