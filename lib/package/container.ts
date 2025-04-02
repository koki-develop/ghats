import type { Env } from "./env";

export type Container = {
  image: string;
  credentials?: {
    username?: string;
    password?: string;
  };
  env?: Env;
  ports?: (number | string)[];
  volumes?: string[];
  options?: string;
};
