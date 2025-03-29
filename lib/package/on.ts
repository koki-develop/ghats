export type EventName = "push" | "pull_request" | "workflow_dispatch";

export type On =
  | EventName
  | EventName[]
  // TODO: implement
  | {
      push: {
        branches?: string[];
      };
    };
