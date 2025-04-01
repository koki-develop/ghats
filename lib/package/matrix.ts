import type { Expression } from "./expression";

export type Matrix =
  | Expression
  | { [key: string]: Expression | Configuration[] }
  | {
      include?: Expression | { [key: string]: Expression | Configuration[] }[];
      exclude?: Expression | { [key: string]: Expression | Configuration[] }[];
    };

type Configuration =
  | string
  | number
  | boolean
  | {
      [key: string]: Configuration;
    }
  | Configuration[];
