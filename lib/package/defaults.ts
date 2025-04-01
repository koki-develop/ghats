import type { Shell } from "./shell";

export type Defaults = {
  run?: {
    shell?: Shell;
    workingDirectory?: string;
  };
};
