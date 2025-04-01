import type { Matrix } from "../package/matrix";

export function matrixJSON(matrix: Matrix): Record<string, unknown> | string {
  return matrix;
}
