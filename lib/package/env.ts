export type Env = {
  [key: string]: string;
};

export function envJSON(env: Env): Record<string, unknown> {
  return env;
}
