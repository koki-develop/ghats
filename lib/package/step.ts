import type { Shell } from "./shell";

export type StepBase = {
  id?: string;
  name?: string;
  env?: Record<string, string>;
  if?: string | boolean | number;
  // TODO: continue-on-error
  // TODO: timeout-minutes
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

export function stepJSON(step: Step): Record<string, unknown> {
  const base = {
    ...(step.id != null && { id: step.id }),
    ...(step.name != null && { name: step.name }),
    ...(step.env != null && { env: step.env }),
    ...(step.if != null && { if: step.if }),
  };

  switch (step.kind) {
    case "run":
      return {
        ...base,
        ...(step.workingDirectory != null && {
          "working-directory": step.workingDirectory,
        }),
        ...(step.shell != null && { shell: step.shell }),
        run: step.command,
      };
    case "uses":
      return {
        ...base,
        ...(step.with != null && { with: step.with }),
        uses: step.action,
      };
  }
}
