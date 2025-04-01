import type { Step } from "../package/step";

export function stepJSON(step: Step): Record<string, unknown> {
  const base = {
    ...(step.id != null && { id: step.id }),
    ...(step.name != null && { name: step.name }),
    ...(step.env != null && { env: step.env }),
    ...(step.if != null && { if: step.if }),
    ...(step.continueOnError != null && {
      "continue-on-error": step.continueOnError,
    }),
    ...(step.timeoutMinutes != null && {
      "timeout-minutes": step.timeoutMinutes,
    }),
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
