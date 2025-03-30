export type Env = {
  [key: string]: string;
};

export function envJSON(env?: Env): Record<string, unknown> | undefined {
  if (env == null) return undefined;
  return env;
}
