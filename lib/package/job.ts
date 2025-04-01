import { concurrencyJSON } from "../internal/concurrency";
import { defaultsJSON } from "../internal/defaults";
import { envJSON } from "../internal/env";
import { environmentJSON } from "../internal/environment";
import { permissionsJSON } from "../internal/permissions";
import { stepJSON } from "../internal/step";
import { strategyJSON } from "../internal/strategy";
import { type Concurrency } from "./concurrency";
import type { Defaults } from "./defaults";
import type { Env } from "./env";
import type { Environment } from "./environment";
import type { Expression } from "./expression";
import { type Permissions } from "./permissions";
import { type RunStep, type Step, type UsesStep } from "./step";
import type { Strategy } from "./strategy";

export type JobConfig = {
  runsOn: string;
  permissions?: Permissions;
  timeoutMinutes?: number | Expression;
  outputs?: Record<string, string>;
  needs?: string | string[];
  if?: string | boolean;
  environment?: Environment;
  concurrency?: Concurrency;
  env?: Env;
  defaults?: Defaults;
  strategy?: Strategy;
  continueOnError?: boolean | Expression;
  // TODO: container
  // TODO: services
  // TODO: uses
  // TODO: with
  // TODO: secrets
};

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

      steps: this._steps.map((step) => stepJSON(step)),
    };
  }
}
