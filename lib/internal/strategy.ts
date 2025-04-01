import type { Strategy } from "../package/strategy";
import { matrixJSON } from "./matrix";

export function strategyJSON(strategy: Strategy): Record<string, unknown> {
  return {
    matrix: matrixJSON(strategy.matrix),
    ...(strategy.failFast != null && { "fail-fast": strategy.failFast }),
    ...(strategy.maxParallel != null && {
      "max-parallel": strategy.maxParallel,
    }),
  };
}
