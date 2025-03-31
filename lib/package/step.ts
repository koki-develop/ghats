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
  const base = {
    ...(step.id != null && { id: step.id }),
    ...(step.name != null && { name: step.name }),
    ...(step.env != null && { env: step.env }),
  };

  switch (step.kind) {
    case "run":
      return { ...base, run: step.command };
    case "uses":
      return {
        ...base,
        ...(step.with != null && { with: step.with }),
        uses: step.action,
      };
  }
}
