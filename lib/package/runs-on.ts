export type RunsOn =
  | string
  | string[]
  | {
      group: string;
      labels?: string | string[];
    };
