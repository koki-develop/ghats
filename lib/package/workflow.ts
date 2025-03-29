import { Job } from "./job";

export type WorkflowConfig = {
  name: string;
};

export class Workflow {
  private readonly _config: WorkflowConfig;
  private readonly _jobs: Record<string, Job> = {};

  public constructor(name: string, config?: Omit<WorkflowConfig, "name">) {
    this._config = { name, ...config };
  }

  public addJob(job: Job): Workflow {
    this._jobs[job.name] = job;
    return this;
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this._config.name,
      on: { push: {} }, // TODO: from config
      jobs: Object.fromEntries(
        Object.entries(this._jobs).map(([name, job]) => [name, job.toJSON()]),
      ),
    };
  }
}
