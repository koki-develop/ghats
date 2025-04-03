import { concurrencyJSON } from "../internal/concurrency";
import { containerJSON } from "../internal/container";
import { defaultsJSON } from "../internal/defaults";
import { envJSON } from "../internal/env";
import { environmentJSON } from "../internal/environment";
import { permissionsJSON } from "../internal/permissions";
import { stepJSON } from "../internal/step";
import { strategyJSON } from "../internal/strategy";
import { type Concurrency } from "./concurrency";
import type { Container } from "./container";
import type { Defaults } from "./defaults";
import type { Env } from "./env";
import type { Environment } from "./environment";
import type { Expression } from "./expression";
import { type Permissions } from "./permissions";
import type { RunsOn } from "./runs-on";
import { type RunStep, type Step, type UsesStep } from "./step";
import type { Strategy } from "./strategy";

type JobConfigBase = {
  /**
   * The name of the job displayed on GitHub.
   */
  name?: string;
  /**
   * Identifies any jobs that must complete successfully before this job will run.
   * It can be a string or array of strings.
   * If a job fails, all jobs that need it are skipped unless the jobs use a conditional statement that causes the job to continue.
   */
  needs?: string | string[];
  permissions?: Permissions;
  /**
   * You can use the if conditional to prevent a job from running unless a condition is met.
   * You can use any supported context and expression to create a conditional.
   * Expressions in an if conditional do not require the ${{ }} syntax.
   * @see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.
   */
  if?: string | boolean;
  /**
   * A strategy creates a build matrix for your jobs.
   * You can define different variations of an environment to run each job in.
   */
  strategy?: Strategy;
  /**
   * Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time.
   * A concurrency group can be any string or expression.
   * The expression can use any context except for the secrets context.
   * You can also specify concurrency at the workflow level.
   * When a concurrent job or workflow is queued, if another job or workflow using the same concurrency group in the repository is in progress, the queued job or workflow will be pending.
   * Any previously pending job or workflow in the concurrency group will be canceled.
   * To also cancel any currently running job or workflow in the same concurrency group, specify `cancelInProgress: true`.
   */
  concurrency?: Concurrency;
};

export type NormalJobConfig = JobConfigBase & {
  /**
   * The type of machine to run the job on.
   * The machine can be either a GitHub-hosted runner, or a self-hosted runner.
   */
  runsOn: RunsOn;
  /**
   * The environment that the job references.
   */
  environment?: Environment;
  /**
   * A map of outputs for a job.
   * Job outputs are available to all downstream jobs that depend on this job.
   */
  outputs?: Record<string, string>;
  /**
   * A map of environment variables that are available to all steps in the job.
   */
  env?: Env;
  /**
   * A map of default settings that will apply to all steps in the job.
   */
  defaults?: Defaults;
  /**
   * The maximum number of minutes to let a workflow run before GitHub automatically cancels it.
   * @default 360
   */
  timeoutMinutes?: number | Expression;
  /**
   * Prevents a workflow run from failing when a job fails.
   * Set to true to allow a workflow run to pass when this job fails.
   */
  continueOnError?: boolean | Expression;
  /**
   * A container to run any steps in a job that don't already specify a container.
   * If you have steps that use both script and container actions, the container actions will run as sibling containers on the same network with the same volume mounts.
   * If you do not set a container, all steps will run directly on the host specified by runs-on unless a step refers to an action configured to run in a container.
   */
  container?: Container;
  /**
   * Additional containers to host services for a job in a workflow.
   * These are useful for creating databases or cache services like redis.
   * The runner on the virtual machine will automatically create a network and manage the life cycle of the service containers.
   * When you use a service container for a job or your step uses container actions, you don't need to set port information to access the service.
   * Docker automatically exposes all ports between containers on the same network.
   * When both the job and the action run in a container, you can directly reference the container by its hostname.
   * The hostname is automatically mapped to the service name.
   * When a step does not use a container action, you must access the service using localhost and bind the ports.
   */
  services?: Record<string, Container>;
};

export type ReusableWorkflowCallJobConfig = JobConfigBase & {
  uses: string;
  with?: Record<string, string>;
  secrets?: "inherit" | Record<string, string>;
};

export type JobConfig = NormalJobConfig | ReusableWorkflowCallJobConfig;

export class Job {
  private readonly _id: string;
  private readonly _config: JobConfig;
  private readonly _steps: Step[] = [];

  public constructor(id: string, config: JobConfig) {
    this._id = id;
    this._config = config;
  }

  public get id(): string {
    return this._id;
  }

  public run(command: string, params?: Omit<RunStep, "kind" | "command">): Job {
    this._steps.push({ kind: "run", command, ...params });
    return this;
  }

  public uses(action: {
    name: string;
    params?: Omit<UsesStep, "kind" | "action">;
  }): Job;
  public uses(action: string, params?: Omit<UsesStep, "kind" | "action">): Job;
  public uses(
    action:
      | string
      | { name: string; params?: Omit<UsesStep, "kind" | "action"> },
    params?: Omit<UsesStep, "kind" | "action">,
  ): Job {
    if (typeof action === "string") {
      this._steps.push({ kind: "uses", action, ...params });
    } else {
      this._steps.push({ kind: "uses", action: action.name, ...action.params });
    }
    return this;
  }

  public toJSON(): Record<string, unknown> {
    if ("runsOn" in this._config) {
      // normal job
      return {
        "runs-on": this._config.runsOn,

        ...(this._config.permissions != null && {
          permissions: permissionsJSON(this._config.permissions),
        }),

        ...(this._config.timeoutMinutes != null && {
          "timeout-minutes": this._config.timeoutMinutes,
        }),

        ...(this._config.outputs != null && { outputs: this._config.outputs }),

        ...(this._config.needs != null && { needs: this._config.needs }),

        ...(this._config.if != null && { if: this._config.if }),

        ...(this._config.environment != null && {
          environment: environmentJSON(this._config.environment),
        }),

        ...(this._config.concurrency != null && {
          concurrency: concurrencyJSON(this._config.concurrency),
        }),

        ...(this._config.env != null && { env: envJSON(this._config.env) }),

        ...(this._config.defaults != null && {
          defaults: defaultsJSON(this._config.defaults),
        }),

        ...(this._config.strategy != null && {
          strategy: strategyJSON(this._config.strategy),
        }),

        ...(this._config.continueOnError != null && {
          "continue-on-error": this._config.continueOnError,
        }),

        ...(this._config.container != null && {
          container: containerJSON(this._config.container),
        }),

        ...(this._config.services != null && {
          services: Object.fromEntries(
            Object.entries(this._config.services).map(([name, service]) => [
              name,
              containerJSON(service),
            ]),
          ),
        }),

        steps: this._steps.map((step) => stepJSON(step)),
      };
    } else {
      // reusable workflow call job
      return {
        ...(this._config.permissions != null && {
          permissions: permissionsJSON(this._config.permissions),
        }),

        ...(this._config.needs != null && { needs: this._config.needs }),

        ...(this._config.if != null && { if: this._config.if }),

        ...(this._config.concurrency != null && {
          concurrency: concurrencyJSON(this._config.concurrency),
        }),

        ...(this._config.strategy != null && {
          strategy: strategyJSON(this._config.strategy),
        }),

        uses: this._config.uses,
        ...(this._config.with != null && { with: this._config.with }),
        ...(this._config.secrets != null && { secrets: this._config.secrets }),
      };
    }
  }
}
