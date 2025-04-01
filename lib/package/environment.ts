export type Environment =
  | string
  | {
      name: string;
      url?: string;
    };
