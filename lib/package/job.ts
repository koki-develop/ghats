import { type Permissions, permissionJSON } from "./permission";
import { type RunStep, type Step, stepJSON, type UsesStep } from "./step";

export type JobConfig = {
  id: string;
  runsOn: string;
  permissions?: Permissions;
  timeoutMinutes?: number;
  outputs?: Record<string, string>;
  needs?: string | string[];
  if?: string | boolean | number;
};

export class Job {
  private readonly _config: JobConfig;
  private readonly _steps: Step[] = [];

  public constructor(id: string, config: Omit<JobConfig, "id">) {
    this._config = { id, ...config };
  }

  public get id(): string {
    return this._config.id;
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
      permissions: permissionJSON(this._config.permissions),
      "timeout-minutes": this._config.timeoutMinutes,
      outputs: this._config.outputs,
      needs: this._config.needs,
      if: this._config.if,
      steps: this._steps.map((step) => stepJSON(step)),
    };
  }
}
