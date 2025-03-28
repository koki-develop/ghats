import type { Step } from "./step";

export type JobConfig = {
  name: string;
  runsOn: string;
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

  public run(command: string): Job {
    this._steps.push({ command });
    return this;
  }

  public toJSON(): Record<string, unknown> {
    return {
      "runs-on": this._config.runsOn,
      steps: this._steps.map((step) => ({
        run: step.command,
      })),
    };
  }
}
