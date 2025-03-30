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

export type EventName = keyof Events;
export type EventType<T extends EventName> = Events[T];
export type On = EventName | EventName[] | { [K in EventName]?: EventType<K> };

export function onJSON(on: On): string | string[] | Record<string, unknown> {
  if (typeof on === "string") return on;
  if (Array.isArray(on)) return on;

  const result: Record<string, unknown> = {};

  if (on.branchProtectionRule) {
    result.branch_protection_rule = {
      types: on.branchProtectionRule.types,
    };
  }

  if (on.checkRun) {
    result.check_run = {
      types: on.checkRun.types,
    };
  }

  if (on.checkSuite) {
    result.check_suite = {
      types: on.checkSuite.types,
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

  if (on.deploymentStatus) {
    result.deployment_status = {};
  }

  if (on.discussion) {
    result.discussion = {
      types: on.discussion.types,
    };
  }

  if (on.discussionComment) {
    result.discussion_comment = {
      types: on.discussionComment.types,
    };
  }

  if (on.fork) {
    result.fork = {};
  }

  if (on.gollum) {
    result.gollum = {};
  }

  if (on.issueComment) {
    result.issue_comment = {
      types: on.issueComment.types,
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

  if (on.mergeGroup) {
    result.merge_group = {
      types: on.mergeGroup.types,
    };
  }

  if (on.milestone) {
    result.milestone = {
      types: on.milestone.types,
    };
  }

  if (on.pageBuild) {
    result.page_build = {};
  }

  if (on.project) {
    result.project = {
      types: on.project.types,
    };
  }

  if (on.projectCard) {
    result.project_card = {
      types: on.projectCard.types,
    };
  }

  if (on.projectColumn) {
    result.project_column = {
      types: on.projectColumn.types,
    };
  }

  if (on.public) {
    result.public = {};
  }

  if (on.pullRequest) {
    result.pull_request = {
      types: on.pullRequest.types,
      branches: on.pullRequest.branches,
      "branches-ignore": on.pullRequest.branchesIgnore,
      tags: on.pullRequest.tags,
      "tags-ignore": on.pullRequest.tagsIgnore,
      paths: on.pullRequest.paths,
      "paths-ignore": on.pullRequest.pathsIgnore,
    };
  }

  if (on.pullRequestReview) {
    result.pull_request_review = {
      types: on.pullRequestReview.types,
    };
  }

  if (on.pullRequestReviewComment) {
    result.pull_request_review_comment = {
      types: on.pullRequestReviewComment.types,
    };
  }

  if (on.pullRequestTarget) {
    result.pull_request_target = {
      types: on.pullRequestTarget.types,
      branches: on.pullRequestTarget.branches,
      "branches-ignore": on.pullRequestTarget.branchesIgnore,
      tags: on.pullRequestTarget.tags,
      "tags-ignore": on.pullRequestTarget.tagsIgnore,
      paths: on.pullRequestTarget.paths,
      "paths-ignore": on.pullRequestTarget.pathsIgnore,
    };
  }

  if (on.push) {
    result.push = {
      branches: on.push.branches,
      "branches-ignore": on.push.branchesIgnore,
      tags: on.push.tags,
      "tags-ignore": on.push.tagsIgnore,
      paths: on.push.paths,
      "paths-ignore": on.push.pathsIgnore,
    };
  }

  if (on.registryPackage) {
    result.registry_package = {
      types: on.registryPackage.types,
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

  if (on.workflowCall) {
    result.workflow_call = {
      inputs:
        on.workflowCall.inputs &&
        Object.fromEntries(
          Object.entries(on.workflowCall.inputs).map(([key, value]) => [
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
        on.workflowCall.secrets &&
        Object.fromEntries(
          Object.entries(on.workflowCall.secrets).map(([key, value]) => [
            key,
            {
              description: value.description,
              required: value.required,
            },
          ]),
        ),
    };
  }

  if (on.workflowDispatch) {
    result.workflow_dispatch = {
      inputs:
        on.workflowDispatch.inputs &&
        Object.fromEntries(
          Object.entries(on.workflowDispatch.inputs).map(([key, value]) => [
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

  if (on.workflowRun) {
    result.workflow_run = {
      types: on.workflowRun.types,
      workflows: on.workflowRun.workflows,
      branches: on.workflowRun.branches,
      "branches-ignore": on.workflowRun.branchesIgnore,
    };
  }

  if (on.repositoryDispatch) {
    result.repository_dispatch = {};
  }

  if (on.schedule) {
    result.schedule = on.schedule.map((schedule) => ({
      cron: schedule.cron,
    }));
  }

  return result;
}
