import { type Concurrency, concurrencyJSON } from "./concurrency";
import { type Env, envJSON } from "./env";
import { Job } from "./job";
import { type On, onJSON } from "./on";
import { type Permissions, permissionsJSON } from "./permissions";

export type WorkflowConfig = {
  runName?: string;
  concurrency?: Concurrency;
  on: On;
  permissions?: Permissions;
  env?: Env;
};

export class Workflow {
  private readonly _name: string;
  private readonly _config: WorkflowConfig;
  private readonly _jobs: Job[] = [];

  public constructor(name: string, config: WorkflowConfig) {
    this._name = name;
    this._config = config;
  }

  public addJob(...jobs: Job[]): Workflow {
    this._jobs.push(...jobs);
    return this;
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this._name,

      ...(this._config.runName && { "run-name": this._config.runName }),

      on: onJSON(this._config.on),

      ...(this._config.permissions && {
        permissions: permissionsJSON(this._config.permissions),
      }),

      ...(this._config.env && { env: envJSON(this._config.env) }),

      // TODO: defaults

      concurrency: concurrencyJSON(this._config.concurrency),

      jobs: this._jobs.reduce<Record<string, unknown>>((acc, job) => {
        acc[job.id] = job.toJSON();
        return acc;
      }, {}),
    };
  }
}
