import type { Environment } from "../package/environment";

export function environmentJSON(
  environment: Environment,
): Record<string, unknown> | string {
  if (typeof environment === "string") return environment;

  return {
    name: environment.name,
    ...(environment.url && { url: environment.url }),
  };
}
