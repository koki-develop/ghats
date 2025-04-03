import { concurrencyJSON } from "../internal/concurrency";
import { defaultsJSON } from "../internal/defaults";
import { envJSON } from "../internal/env";
import { onJSON } from "../internal/on";
import { permissionsJSON } from "../internal/permissions";
import { type Concurrency } from "./concurrency";
import type { Defaults } from "./defaults";
import { type Env } from "./env";
import { Job } from "./job";
import { type On } from "./on";
import { type Permissions } from "./permissions";

export type WorkflowConfig = {
  /**
   * The name for workflow runs generated from the workflow.
   * GitHub displays the workflow run name in the list of workflow runs on your repository's 'Actions' tab.
   */
  runName?: string;
  /**
   * Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time.
   * A concurrency group can be any string or expression.
   * The expression can use any context except for the secrets context.
   * You can also specify concurrency at the workflow level.
   * When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending.
   * Any previously pending job or workflow in the concurrency group will be canceled.
   * To also cancel any currently running job or workflow in the same concurrency group, specify cancel-in-progress: true.
   */
  concurrency?: Concurrency;
  /**
   * The name of the GitHub event that triggers the workflow.
   * You can provide a single event string, array of events, array of event types, or an event configuration map that schedules a workflow or restricts the execution of a workflow to specific files, tags, or branch changes.
   * @see https://help.github.com/en/github/automating-your-workflow-with-github-actions/events-that-trigger-workflows.
   */
  on: On;
  permissions?: Permissions;
  /**
   * A map of environment variables that are available to all jobs and steps in the workflow.
   */
  env?: Env;
  /**
   * A map of default settings that will apply to all jobs in the workflow.
   */
  defaults?: Defaults;
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

      ...(this._config.concurrency && {
        concurrency: concurrencyJSON(this._config.concurrency),
      }),

      ...(this._config.defaults && {
        defaults: defaultsJSON(this._config.defaults),
      }),

      jobs: this._jobs.reduce<Record<string, unknown>>((acc, job) => {
        acc[job.id] = job.toJSON();
        return acc;
      }, {}),
    };
  }
}
