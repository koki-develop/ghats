import { Job } from "./job";
import type { On } from "./on";
import type { Permissions } from "./permission";

export type WorkflowConfig = {
  name: string;
  on: On;
  permissions?: Permissions;
};

export class Workflow {
  private readonly _config: WorkflowConfig;
  private readonly _jobs: Record<string, Job> = {};

  public constructor(name: string, config: Omit<WorkflowConfig, "name">) {
    this._config = { name, ...config };
  }

  public addJob(job: Job): Workflow {
    this._jobs[job.name] = job;
    return this;
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this._config.name,
      permissions: this._config.permissions,
      on: this._config.on,
      jobs: Object.fromEntries(
        Object.entries(this._jobs).map(([name, job]) => [name, job.toJSON()]),
      ),
    };
  }
}
