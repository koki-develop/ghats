export type StepBase = {
  id?: string;
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

export function stepJSON(step: Step): Record<string, unknown> {
  switch (step.kind) {
    case "run":
      return { id: step.id, run: step.command, env: step.env };
    case "uses":
      return { id: step.id, uses: step.action, with: step.with };
  }
}
