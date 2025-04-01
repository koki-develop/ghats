import type { Expression } from "./expression";
import type { Shell } from "./shell";

export type StepBase = {
  id?: string;
  name?: string;
  env?: Record<string, string>;
  if?: string | boolean | number;
  continueOnError?: boolean | Expression;
  timeoutMinutes?: number | Expression;
};

export type RunStep = StepBase & {
  kind: "run";
  command: string;
  workingDirectory?: string;
  shell?: Shell;
};

export type UsesStep = StepBase & {
  kind: "uses";
  action: string;
  with?: Record<string, string>;
};

export type Step = RunStep | UsesStep;
