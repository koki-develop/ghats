import type { Defaults } from "../package/defaults";

export function defaultsJSON(defaults: Defaults): Record<string, unknown> {
  return {
    ...(defaults.run != null && {
      run: {
        ...(defaults.run.shell != null && {
          shell: defaults.run.shell,
        }),
        ...(defaults.run.workingDirectory != null && {
          "working-directory": defaults.run.workingDirectory,
        }),
      },
    }),
  };
}
