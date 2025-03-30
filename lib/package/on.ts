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

export function onJSON(on: On): string | string[] | Record<string, unknown> {
  if (typeof on === "string") return on;
  if (Array.isArray(on)) return on;

  const result: Record<string, unknown> = {};

  if (on.branch_protection_rule) {
    result.branch_protection_rule = {
      types: on.branch_protection_rule.types,
    };
  }

  if (on.check_run) {
    result.check_run = {
      types: on.check_run.types,
    };
  }

  if (on.check_suite) {
    result.check_suite = {
      types: on.check_suite.types,
    };
  }

  if (on.create) {
    result.create = {};
  }

  if (on.delete) {
    result.delete = {};
  }

  if (on.deployment) {
    result.deployment = {};
  }

  if (on.deployment_status) {
    result.deployment_status = {};
  }

  if (on.discussion) {
    result.discussion = {
      types: on.discussion.types,
    };
  }

  if (on.discussion_comment) {
    result.discussion_comment = {
      types: on.discussion_comment.types,
    };
  }

  if (on.fork) {
    result.fork = {};
  }

  if (on.gollum) {
    result.gollum = {};
  }

  if (on.issue_comment) {
    result.issue_comment = {
      types: on.issue_comment.types,
    };
  }

  if (on.issues) {
    result.issues = {
      types: on.issues.types,
    };
  }

  if (on.label) {
    result.label = {
      types: on.label.types,
    };
  }

  if (on.merge_group) {
    result.merge_group = {
      types: on.merge_group.types,
    };
  }

  if (on.milestone) {
    result.milestone = {
      types: on.milestone.types,
    };
  }

  if (on.page_build) {
    result.page_build = {};
  }

  if (on.project) {
    result.project = {
      types: on.project.types,
    };
  }

  if (on.project_card) {
    result.project_card = {
      types: on.project_card.types,
    };
  }

  if (on.project_column) {
    result.project_column = {
      types: on.project_column.types,
    };
  }

  if (on.public) {
    result.public = {};
  }

  if (on.pull_request) {
    result.pull_request = {
      types: on.pull_request.types,
      branches: on.pull_request.branches,
      "branches-ignore": on.pull_request["branches-ignore"],
      tags: on.pull_request.tags,
      "tags-ignore": on.pull_request["tags-ignore"],
      paths: on.pull_request.paths,
      "paths-ignore": on.pull_request["paths-ignore"],
    };
  }

  if (on.pull_request_review) {
    result.pull_request_review = {
      types: on.pull_request_review.types,
    };
  }

  if (on.pull_request_review_comment) {
    result.pull_request_review_comment = {
      types: on.pull_request_review_comment.types,
    };
  }

  if (on.pull_request_target) {
    result.pull_request_target = {
      types: on.pull_request_target.types,
      branches: on.pull_request_target.branches,
      "branches-ignore": on.pull_request_target["branches-ignore"],
      tags: on.pull_request_target.tags,
      "tags-ignore": on.pull_request_target["tags-ignore"],
      paths: on.pull_request_target.paths,
      "paths-ignore": on.pull_request_target["paths-ignore"],
    };
  }

  if (on.push) {
    result.push = {
      branches: on.push.branches,
      "branches-ignore": on.push["branches-ignore"],
      tags: on.push.tags,
      "tags-ignore": on.push["tags-ignore"],
      paths: on.push.paths,
      "paths-ignore": on.push["paths-ignore"],
    };
  }

  if (on.registry_package) {
    result.registry_package = {
      types: on.registry_package.types,
    };
  }

  if (on.release) {
    result.release = {
      types: on.release.types,
    };
  }

  if (on.status) {
    result.status = {};
  }

  if (on.watch) {
    result.watch = {};
  }

  if (on.workflow_call) {
    result.workflow_call = {
      inputs:
        on.workflow_call.inputs &&
        Object.fromEntries(
          Object.entries(on.workflow_call.inputs).map(([key, value]) => [
            key,
            {
              description: value.description,
              required: value.required,
              type: value.type,
              default: value.default,
            },
          ]),
        ),
      secrets:
        on.workflow_call.secrets &&
        Object.fromEntries(
          Object.entries(on.workflow_call.secrets).map(([key, value]) => [
            key,
            {
              description: value.description,
              required: value.required,
            },
          ]),
        ),
    };
  }

  if (on.workflow_dispatch) {
    result.workflow_dispatch = {
      inputs:
        on.workflow_dispatch.inputs &&
        Object.fromEntries(
          Object.entries(on.workflow_dispatch.inputs).map(([key, value]) => [
            key,
            (() => {
              switch (value.type) {
                case "string":
                case "boolean":
                case "number":
                case "environment":
                  return {
                    type: value.type,
                    description: value.description,
                    deprecationMessage: value.deprecationMessage,
                    required: value.required,
                    default: value.default,
                  };
                case "choice":
                  return {
                    type: value.type,
                    description: value.description,
                    deprecationMessage: value.deprecationMessage,
                    required: value.required,
                    default: value.default,
                    options: value.options,
                  };
              }
            })(),
          ]),
        ),
    };
  }

  if (on.workflow_run) {
    result.workflow_run = {
      types: on.workflow_run.types,
      workflows: on.workflow_run.workflows,
      branches: on.workflow_run.branches,
      "branches-ignore": on.workflow_run["branches-ignore"],
    };
  }

  if (on.repository_dispatch) {
    result.repository_dispatch = {};
  }

  if (on.schedule) {
    result.schedule = on.schedule.map((schedule) => ({
      cron: schedule.cron,
    }));
  }

  return result;
}
