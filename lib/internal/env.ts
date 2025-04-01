import type { Env } from "../package/env";

export function envJSON(env: Env): Record<string, unknown> {
  return env;
}
