import type { Matrix } from "./matrix";

export type Strategy = {
  matrix: Matrix;
  /**
   * When set to true, GitHub cancels all in-progress jobs if any matrix job fails.
   * @default true
   */
  failFast?: string | boolean;
  /**
   * The maximum number of jobs that can run simultaneously when using a matrix job strategy.
   * By default, GitHub will maximize the number of jobs run in parallel depending on the available runners on GitHub-hosted virtual machines.
   */
  maxParallel?: string | number;
};
