import { type Permissions, permissionsJSON } from "./permissions";
import { type RunStep, type Step, stepJSON, type UsesStep } from "./step";

export type JobConfig = {
  runsOn: string;
  permissions?: Permissions;
  timeoutMinutes?: number;
  outputs?: Record<string, string>;
  needs?: string | string[];
  if?: string | boolean | number;
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

      ...(this._config.permissions && {
        permissions: permissionsJSON(this._config.permissions),
      }),

      ...(this._config.timeoutMinutes && {
        "timeout-minutes": this._config.timeoutMinutes,
      }),

      ...(this._config.outputs && { outputs: this._config.outputs }),

      ...(this._config.needs && { needs: this._config.needs }),

      ...(this._config.if && { if: this._config.if }),

      steps: this._steps.map((step) => stepJSON(step)),
    };
  }
}
