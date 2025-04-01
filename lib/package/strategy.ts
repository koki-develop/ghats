import type { Matrix } from "./matrix";

export type Strategy = {
  matrix: Matrix;
  failFast?: string | boolean;
  maxParallel?: string | number;
};
