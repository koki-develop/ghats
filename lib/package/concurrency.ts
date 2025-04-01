import type { Expression } from "./expression";

export type Concurrency =
  | string
  | {
      group: string;
      cancelInProgress?: boolean | Expression;
    };
