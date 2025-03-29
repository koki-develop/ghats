import type { Permissions } from "./permission";
import type { RunStep, Step, UsesStep } from "./step";

export type JobConfig = {
  name: string;
  runsOn: string;
  permissions?: Permissions;
};

export class Job {
  private readonly _config: JobConfig;
  private readonly _steps: Step[] = [];

  public constructor(name: string, config: Omit<JobConfig, "name">) {
    this._config = { name, ...config };
  }

  public get name(): string {
    return this._config.name;
  }

  public run(command: string, params?: Omit<RunStep, "kind" | "command">): Job {
    this._steps.push({ kind: "run", command, ...params });
    return this;
  }

  public uses(action: string, params?: Omit<UsesStep, "kind" | "action">): Job {
    this._steps.push({ kind: "uses", action, ...params });
    return this;
  }

  public toJSON(): Record<string, unknown> {
    return {
      "runs-on": this._config.runsOn,
      permissions: this._config.permissions,
      steps: this._steps.map((step) => {
        switch (step.kind) {
          case "run":
            return { run: step.command, env: step.env };
          case "uses":
            return { uses: step.action, with: step.with };
        }
      }),
    };
  }
}
