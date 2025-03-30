export type StepBase = {
  id?: string;
  name?: string;
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
  const base = { id: step.id, name: step.name, env: step.env };

  switch (step.kind) {
    case "run":
      return { ...base, run: step.command };
    case "uses":
      return { ...base, uses: step.action, with: step.with };
  }
}
