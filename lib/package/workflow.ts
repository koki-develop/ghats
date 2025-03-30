import { type Concurrency, concurrencyJSON } from "./concurrency";
import { Job } from "./job";
import { type On, onJSON } from "./on";
import type { Permissions } from "./permission";

export type WorkflowConfig = {
  name: string;
  runName?: string;
  concurrency?: Concurrency;
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

      "run-name": this._config.runName,

      on: onJSON(this._config.on),

      permissions: this._config.permissions,

      // TODO: env

      // TODO: defaults

      concurrency: concurrencyJSON(this._config.concurrency),

      jobs: Object.fromEntries(
        Object.entries(this._jobs).map(([name, job]) => [name, job.toJSON()]),
      ),
    };
  }
}
