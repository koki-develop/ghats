import { describe, expect, test } from "bun:test";
import { type On, onJSON } from "./on";

describe("onJSON", () => {
  test.each<[On, ReturnType<typeof onJSON>]>([
    ["push", "push"],
    [
      ["push", "pullRequest"],
      ["push", "pull_request"],
    ],
    [
      [
        "branchProtectionRule",
        "checkRun",
        "checkSuite",
        "create",
        "delete",
        "deployment",
        "deploymentStatus",
        "discussion",
        "discussionComment",
        "fork",
        "gollum",
        "issueComment",
        "issues",
        "label",
        "mergeGroup",
        "milestone",
        "pageBuild",
        "project",
        "projectCard",
        "projectColumn",
        "public",
        "pullRequest",
        "pullRequestReview",
        "pullRequestReviewComment",
        "pullRequestTarget",
        "push",
        "registryPackage",
        "release",
        "status",
        "watch",
        "workflowCall",
        "workflowDispatch",
        "workflowRun",
        "repositoryDispatch",
        "schedule",
      ],
      [
        "branch_protection_rule",
        "check_run",
        "check_suite",
        "create",
        "delete",
        "deployment",
        "deployment_status",
        "discussion",
        "discussion_comment",
        "fork",
        "gollum",
        "issue_comment",
        "issues",
        "label",
        "merge_group",
        "milestone",
        "page_build",
        "project",
        "project_card",
        "project_column",
        "public",
        "pull_request",
        "pull_request_review",
        "pull_request_review_comment",
        "pull_request_target",
        "push",
        "registry_package",
        "release",
        "status",
        "watch",
        "workflow_call",
        "workflow_dispatch",
        "workflow_run",
        "repository_dispatch",
        "schedule",
      ],
    ],
    [{ branchProtectionRule: {} }, { branch_protection_rule: {} }],
    [
      { branchProtectionRule: { types: ["created", "edited", "deleted"] } },
      { branch_protection_rule: { types: ["created", "edited", "deleted"] } },
    ],
    [{ checkRun: {} }, { check_run: {} }],
    [
      {
        checkRun: {
          types: ["created", "rerequested", "completed", "requested_action"],
        },
      },
      {
        check_run: {
          types: ["created", "rerequested", "completed", "requested_action"],
        },
      },
    ],
    [{ checkSuite: {} }, { check_suite: {} }],
    [
      { checkSuite: { types: ["completed", "requested", "rerequested"] } },
      { check_suite: { types: ["completed", "requested", "rerequested"] } },
    ],
    [{ create: {} }, { create: {} }],
    [{ delete: {} }, { delete: {} }],
    [{ deployment: {} }, { deployment: {} }],
    [{ deploymentStatus: {} }, { deployment_status: {} }],
    [{ discussion: {} }, { discussion: {} }],
    [
      { discussion: { types: ["created", "edited", "deleted"] } },
      { discussion: { types: ["created", "edited", "deleted"] } },
    ],
    [{ discussionComment: {} }, { discussion_comment: {} }],
    [
      { discussionComment: { types: ["created", "edited", "deleted"] } },
      { discussion_comment: { types: ["created", "edited", "deleted"] } },
    ],
    [{ fork: {} }, { fork: {} }],
    [{ gollum: {} }, { gollum: {} }],
    [{ issueComment: {} }, { issue_comment: {} }],
    [
      { issueComment: { types: ["created", "edited", "deleted"] } },
      { issue_comment: { types: ["created", "edited", "deleted"] } },
    ],
    [{ issues: {} }, { issues: {} }],
    [
      { issues: { types: ["opened", "edited"] } },
      { issues: { types: ["opened", "edited"] } },
    ],
    [{ label: {} }, { label: {} }],
    [
      { label: { types: ["created", "edited", "deleted"] } },
      { label: { types: ["created", "edited", "deleted"] } },
    ],
    [{ mergeGroup: {} }, { merge_group: {} }],
    [
      { mergeGroup: { types: ["checks_requested"] } },
      { merge_group: { types: ["checks_requested"] } },
    ],
    [{ milestone: {} }, { milestone: {} }],
    [
      {
        milestone: {
          types: ["created", "closed", "opened", "edited", "deleted"],
        },
      },
      {
        milestone: {
          types: ["created", "closed", "opened", "edited", "deleted"],
        },
      },
    ],
    [{ pageBuild: {} }, { page_build: {} }],
    [{ project: {} }, { project: {} }],
    [
      {
        project: {
          types: [
            "created",
            "updated",
            "closed",
            "reopened",
            "edited",
            "deleted",
          ],
        },
      },
      {
        project: {
          types: [
            "created",
            "updated",
            "closed",
            "reopened",
            "edited",
            "deleted",
          ],
        },
      },
    ],
    [{ projectCard: {} }, { project_card: {} }],
    [
      {
        projectCard: {
          types: ["created", "moved", "converted", "edited", "deleted"],
        },
      },
      {
        project_card: {
          types: ["created", "moved", "converted", "edited", "deleted"],
        },
      },
    ],
    [{ projectColumn: {} }, { project_column: {} }],
    [
      { projectColumn: { types: ["created", "updated", "moved", "deleted"] } },
      { project_column: { types: ["created", "updated", "moved", "deleted"] } },
    ],
    [{ public: {} }, { public: {} }],
    [{ pullRequest: {} }, { pull_request: {} }],
    [
      {
        pullRequest: {
          types: ["opened", "edited"],
          branches: ["main"],
          branchesIgnore: ["dev"],
          tags: ["v1"],
          tagsIgnore: ["beta"],
          paths: ["src/**"],
          pathsIgnore: ["docs/**"],
        },
      },
      {
        pull_request: {
          types: ["opened", "edited"],
          branches: ["main"],
          "branches-ignore": ["dev"],
          tags: ["v1"],
          "tags-ignore": ["beta"],
          paths: ["src/**"],
          "paths-ignore": ["docs/**"],
        },
      },
    ],
    [{ pullRequestReview: {} }, { pull_request_review: {} }],
    [
      { pullRequestReview: { types: ["submitted", "edited", "dismissed"] } },
      { pull_request_review: { types: ["submitted", "edited", "dismissed"] } },
    ],
    [{ pullRequestReviewComment: {} }, { pull_request_review_comment: {} }],
    [
      { pullRequestReviewComment: { types: ["created", "edited", "deleted"] } },
      {
        pull_request_review_comment: {
          types: ["created", "edited", "deleted"],
        },
      },
    ],
    [{ pullRequestTarget: {} }, { pull_request_target: {} }],
    [
      {
        pullRequestTarget: {
          types: ["assigned", "unassigned"],
          branches: ["main"],
          branchesIgnore: ["dev"],
          tags: ["v1"],
          tagsIgnore: ["beta"],
          paths: ["src/**"],
          pathsIgnore: ["docs/**"],
        },
      },
      {
        pull_request_target: {
          types: ["assigned", "unassigned"],
          branches: ["main"],
          "branches-ignore": ["dev"],
          tags: ["v1"],
          "tags-ignore": ["beta"],
          paths: ["src/**"],
          "paths-ignore": ["docs/**"],
        },
      },
    ],
    [{ push: {} }, { push: {} }],
    [
      {
        push: {
          branches: ["main"],
          branchesIgnore: ["dev"],
          tags: ["v1"],
          tagsIgnore: ["beta"],
          paths: ["src/**"],
          pathsIgnore: ["docs/**"],
        },
      },
      {
        push: {
          branches: ["main"],
          "branches-ignore": ["dev"],
          tags: ["v1"],
          "tags-ignore": ["beta"],
          paths: ["src/**"],
          "paths-ignore": ["docs/**"],
        },
      },
    ],
    [{ registryPackage: {} }, { registry_package: {} }],
    [
      { registryPackage: { types: ["published", "updated"] } },
      { registry_package: { types: ["published", "updated"] } },
    ],
    [{ release: {} }, { release: {} }],
    [
      {
        release: {
          types: ["published", "unpublished", "created", "edited", "deleted"],
        },
      },
      {
        release: {
          types: ["published", "unpublished", "created", "edited", "deleted"],
        },
      },
    ],
    [{ status: {} }, { status: {} }],
    [{ watch: {} }, { watch: {} }],
    [
      {
        workflowCall: {
          inputs: {
            test: {
              type: "string",
              description: "test input",
              required: true,
              default: "test",
            },
          },
          secrets: {
            test: {
              description: "test secret",
              required: true,
            },
          },
        },
      },
      {
        workflow_call: {
          inputs: {
            test: {
              type: "string",
              description: "test input",
              required: true,
              default: "test",
            },
          },
          secrets: {
            test: {
              description: "test secret",
              required: true,
            },
          },
        },
      },
    ],
    [
      {
        workflowDispatch: {
          inputs: {
            string: {
              type: "string",
              description: "string input",
              deprecationMessage: "deprecated",
              required: true,
              default: "test",
            },
            boolean: {
              type: "boolean",
              description: "boolean input",
              deprecationMessage: "deprecated",
              required: true,
              default: true,
            },
            number: {
              type: "number",
              description: "number input",
              deprecationMessage: "deprecated",
              required: true,
              default: 1,
            },
            environment: {
              type: "environment",
              description: "environment input",
              deprecationMessage: "deprecated",
              required: true,
              default: "prod",
            },
            choice: {
              type: "choice",
              description: "choice input",
              deprecationMessage: "deprecated",
              required: true,
              default: "a",
              options: ["a", "b", "c"],
            },
          },
        },
      },
      {
        workflow_dispatch: {
          inputs: {
            string: {
              type: "string",
              description: "string input",
              deprecationMessage: "deprecated",
              required: true,
              default: "test",
            },
            boolean: {
              type: "boolean",
              description: "boolean input",
              deprecationMessage: "deprecated",
              required: true,
              default: true,
            },
            number: {
              type: "number",
              description: "number input",
              deprecationMessage: "deprecated",
              required: true,
              default: 1,
            },
            environment: {
              type: "environment",
              description: "environment input",
              deprecationMessage: "deprecated",
              required: true,
              default: "prod",
            },
            choice: {
              type: "choice",
              description: "choice input",
              deprecationMessage: "deprecated",
              required: true,
              default: "a",
              options: ["a", "b", "c"],
            },
          },
        },
      },
    ],
    [
      {
        workflowRun: {
          types: ["requested", "completed"],
          workflows: ["CI"],
          branches: ["main"],
          branchesIgnore: ["dev"],
        },
      },
      {
        workflow_run: {
          types: ["requested", "completed"],
          workflows: ["CI"],
          branches: ["main"],
          "branches-ignore": ["dev"],
        },
      },
    ],
    [{ repositoryDispatch: {} }, { repository_dispatch: {} }],
    [
      { schedule: [{ cron: "0 0 * * *" }] },
      { schedule: [{ cron: "0 0 * * *" }] },
    ],
  ])("onJSON(%j) -> %j", (input, expected) => {
    expect(onJSON(input)).toEqual(expected);
  });
});
