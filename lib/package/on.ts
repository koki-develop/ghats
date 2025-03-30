// https://github.com/SchemaStore/schemastore/blob/master/src/schemas/json/github-workflow.json
export type Events = {
  branch_protection_rule: {
    types?: ("created" | "edited" | "deleted")[];
  };
  check_run: {
    types?: ("created" | "rerequested" | "completed" | "requested_action")[];
  };
  check_suite: {
    types?: ("completed" | "requested" | "rerequested")[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  create: {};
  // biome-ignore lint/complexity/noBannedTypes:
  delete: {};
  // biome-ignore lint/complexity/noBannedTypes:
  deployment: {};
  // biome-ignore lint/complexity/noBannedTypes:
  deployment_status: {};
  discussion: {
    types?: (
      | "created"
      | "edited"
      | "deleted"
      | "transferred"
      | "pinned"
      | "unpinned"
      | "labeled"
      | "unlabeled"
      | "locked"
      | "unlocked"
      | "category_changed"
      | "answered"
      | "unanswered"
    )[];
  };
  discussion_comment: {
    types?: ("created" | "edited" | "deleted")[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  fork: {};
  // biome-ignore lint/complexity/noBannedTypes:
  gollum: {};
  issue_comment: {
    types?: ("created" | "edited" | "deleted")[];
  };
  issues: {
    types?: (
      | "opened"
      | "edited"
      | "deleted"
      | "transferred"
      | "pinned"
      | "unpinned"
      | "closed"
      | "reopened"
      | "assigned"
      | "unassigned"
      | "labeled"
      | "unlabeled"
      | "locked"
      | "unlocked"
      | "milestoned"
      | "demilestoned"
    )[];
  };
  label: {
    types?: ("created" | "edited" | "deleted")[];
  };
  merge_group: {
    types?: "checks_requested"[];
  };
  milestone: {
    types?: ("created" | "closed" | "opened" | "edited" | "deleted")[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  page_build: {};
  project: {
    types?: (
      | "created"
      | "updated"
      | "closed"
      | "reopened"
      | "edited"
      | "deleted"
    )[];
  };
  project_card: {
    types?: ("created" | "moved" | "converted" | "edited" | "deleted")[];
  };
  project_column: {
    types?: ("created" | "updated" | "moved" | "deleted")[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  public: {};
  pull_request: {
    types?: (
      | "assigned"
      | "unassigned"
      | "labeled"
      | "unlabeled"
      | "opened"
      | "edited"
      | "closed"
      | "reopened"
      | "synchronize"
      | "converted_to_draft"
      | "ready_for_review"
      | "locked"
      | "unlocked"
      | "milestoned"
      | "demilestoned"
      | "review_requested"
      | "review_request_removed"
      | "auto_merge_enabled"
      | "auto_merge_disabled"
      | "enqueued"
      | "dequeued"
    )[];
    branches?: string[];
    "branches-ignore"?: string[];
    tags?: string[];
    "tags-ignore"?: string[];
    paths?: string[];
    "paths-ignore"?: string[];
  };
  pull_request_review: {
    types?: ("submitted" | "edited" | "dismissed")[];
  };
  pull_request_review_comment: {
    types?: ("created" | "edited" | "deleted")[];
  };
  pull_request_target: {
    types?: (
      | "assigned"
      | "unassigned"
      | "labeled"
      | "unlabeled"
      | "opened"
      | "edited"
      | "closed"
      | "reopened"
      | "synchronize"
      | "converted_to_draft"
      | "ready_for_review"
      | "locked"
      | "unlocked"
      | "review_requested"
      | "review_request_removed"
      | "auto_merge_enabled"
      | "auto_merge_disabled"
    )[];
    branches?: string[];
    "branches-ignore"?: string[];
    tags?: string[];
    "tags-ignore"?: string[];
    paths?: string[];
    "paths-ignore"?: string[];
  };
  push: {
    branches?: string[];
    "branches-ignore"?: string[];
    tags?: string[];
    "tags-ignore"?: string[];
    paths?: string[];
    "paths-ignore"?: string[];
  };
  registry_package: {
    types?: ("published" | "updated")[];
  };
  release: {
    types?: (
      | "published"
      | "unpublished"
      | "created"
      | "edited"
      | "deleted"
      | "prereleased"
      | "released"
    )[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  status: {};
  // biome-ignore lint/complexity/noBannedTypes:
  watch: {};
  workflow_call: {
    inputs?: {
      [key: string]: {
        description?: string;
        required?: boolean;
        type: "string" | "number" | "boolean";
        default?: string | number | boolean;
      };
    };
    secrets?: {
      [key: string]: {
        description?: string;
        required: boolean;
      };
    };
  };
  workflow_dispatch: {
    inputs?: {
      [key: string]: {
        description: string;
        deprecationMessage?: string;
        required?: boolean;
      } & (
        | { type: "string"; default?: string }
        | { type: "boolean"; default?: boolean }
        | { type: "number"; default?: number }
        | { type: "choice"; options: string[]; default?: string }
        | { type: "environment"; default?: string }
      );
    };
  };
  workflow_run: {
    types?: ("requested" | "completed" | "in_progress")[];
    workflows?: string[];
    branches?: string[];
    "branches-ignore"?: string[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  repository_dispatch: {};
  schedule: {
    cron: string;
  }[];
};

export type EventName = keyof Events;
export type EventType<T extends EventName> = Events[T];
export type On = EventName | EventName[] | { [K in EventName]?: EventType<K> };
