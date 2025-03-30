import { type Concurrency, concurrencyJSON } from "./concurrency";
import { Job } from "./job";
import { type On, onJSON } from "./on";
import { type Permissions, permissionsJSON } from "./permission";

export type WorkflowConfig = {
  runName?: string;
  concurrency?: Concurrency;
  on: On;
  permissions?: Permissions;
};

export class Workflow {
  private readonly _name: string;
  private readonly _config: WorkflowConfig;
  private readonly _jobs: Record<string, Job> = {};

  public constructor(name: string, config: WorkflowConfig) {
    this._name = name;
    this._config = config;
  }

  public addJob(...jobs: Job[]): Workflow {
    for (const job of jobs) {
      this._jobs[job.id] = job;
    }
    return this;
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this._name,
      "run-name": this._config.runName,
      on: onJSON(this._config.on),
      permissions: permissionsJSON(this._config.permissions),

      // TODO: env

      // TODO: defaults

      concurrency: concurrencyJSON(this._config.concurrency),

      jobs: Object.fromEntries(
        Object.entries(this._jobs).map(([name, job]) => [name, job.toJSON()]),
      ),
    };
  }
}
