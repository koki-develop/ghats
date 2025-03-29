export type StepBase = {
  env?: Record<string, string>;
};

export type RunStep = StepBase & {
  kind: "run";
  command: string;
};

export type UsesStep = StepBase & {
  kind: "uses";
  action: string;
  with?: Record<string, string>;
};

export type Step = RunStep | UsesStep;
