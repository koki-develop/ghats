import { action, Job, JobConfig } from "ghats";

export type SetupJobConfig = Omit<JobConfig, "runsOn"> & {
  withoutCheckout?: boolean;
  withBun?: boolean;
};

export function setupJob(id: string, config: SetupJobConfig): Job {
  const job = new Job(id, { runsOn: "ubuntu-latest", ...config });

  if (!config.withoutCheckout) {
    job.uses(
      action("actions/checkout", { with: { "persist-credentials": "false" } }),
    );
  }

  if (config.withBun) {
    job.uses(action("jdx/mise-action")).run("bun install --frozen-lockfile");
  }

  return job;
}
