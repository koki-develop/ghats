// https://github.com/SchemaStore/schemastore/blob/master/src/schemas/json/github-workflow.json
export type Events = {
  branchProtectionRule: {
    types?: ("created" | "edited" | "deleted")[];
  };
  checkRun: {
    types?: ("created" | "rerequested" | "completed" | "requested_action")[];
  };
  checkSuite: {
    types?: ("completed" | "requested" | "rerequested")[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  create: {};
  // biome-ignore lint/complexity/noBannedTypes:
  delete: {};
  // biome-ignore lint/complexity/noBannedTypes:
  deployment: {};
  // biome-ignore lint/complexity/noBannedTypes:
  deploymentStatus: {};
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
  discussionComment: {
    types?: ("created" | "edited" | "deleted")[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  fork: {};
  // biome-ignore lint/complexity/noBannedTypes:
  gollum: {};
  issueComment: {
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
  mergeGroup: {
    types?: "checks_requested"[];
  };
  milestone: {
    types?: ("created" | "closed" | "opened" | "edited" | "deleted")[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  pageBuild: {};
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
  projectCard: {
    types?: ("created" | "moved" | "converted" | "edited" | "deleted")[];
  };
  projectColumn: {
    types?: ("created" | "updated" | "moved" | "deleted")[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  public: {};
  pullRequest: {
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
    branchesIgnore?: string[];
    tags?: string[];
    tagsIgnore?: string[];
    paths?: string[];
    pathsIgnore?: string[];
  };
  pullRequestReview: {
    types?: ("submitted" | "edited" | "dismissed")[];
  };
  pullRequestReviewComment: {
    types?: ("created" | "edited" | "deleted")[];
  };
  pullRequestTarget: {
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
    branchesIgnore?: string[];
    tags?: string[];
    tagsIgnore?: string[];
    paths?: string[];
    pathsIgnore?: string[];
  };
  push: {
    branches?: string[];
    branchesIgnore?: string[];
    tags?: string[];
    tagsIgnore?: string[];
    paths?: string[];
    pathsIgnore?: string[];
  };
  registryPackage: {
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
  workflowCall: {
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
  workflowDispatch: {
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
  workflowRun: {
    types?: ("requested" | "completed" | "in_progress")[];
    workflows?: string[];
    branches?: string[];
    branchesIgnore?: string[];
  };
  // biome-ignore lint/complexity/noBannedTypes:
  repositoryDispatch: {};
  schedule: {
    cron: string;
  }[];
};

const EventNameMap = {
  branchProtectionRule: "branch_protection_rule",
  checkRun: "check_run",
  checkSuite: "check_suite",
  create: "create",
  delete: "delete",
  deployment: "deployment",
  deploymentStatus: "deployment_status",
  discussion: "discussion",
  discussionComment: "discussion_comment",
  fork: "fork",
  gollum: "gollum",
  issueComment: "issue_comment",
  issues: "issues",
  label: "label",
  mergeGroup: "merge_group",
  milestone: "milestone",
  pageBuild: "page_build",
  project: "project",
  projectCard: "project_card",
  projectColumn: "project_column",
  public: "public",
  pullRequest: "pull_request",
  pullRequestReview: "pull_request_review",
  pullRequestReviewComment: "pull_request_review_comment",
  pullRequestTarget: "pull_request_target",
  push: "push",
  registryPackage: "registry_package",
  release: "release",
  status: "status",
  watch: "watch",
  workflowCall: "workflow_call",
  workflowDispatch: "workflow_dispatch",
  workflowRun: "workflow_run",
  repositoryDispatch: "repository_dispatch",
  schedule: "schedule",
} as const;

export type EventName = keyof Events;
export type EventType<T extends EventName> = Events[T];
export type On =
  | (typeof EventNameMap)[keyof typeof EventNameMap]
  | (typeof EventNameMap)[keyof typeof EventNameMap][]
  | { [K in EventName]?: EventType<K> };
