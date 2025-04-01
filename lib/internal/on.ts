import type { On } from "../package/on";

export function onJSON(on: On): string | string[] | Record<string, unknown> {
  if (typeof on === "string") return on;
  if (Array.isArray(on)) return on;

  return {
    ...(on.branchProtectionRule != null && {
      branch_protection_rule: {
        ...(on.branchProtectionRule.types != null && {
          types: on.branchProtectionRule.types,
        }),
      },
    }),

    ...(on.checkRun != null && {
      check_run: {
        ...(on.checkRun.types != null && {
          types: on.checkRun.types,
        }),
      },
    }),

    ...(on.checkSuite != null && {
      check_suite: {
        ...(on.checkSuite.types != null && {
          types: on.checkSuite.types,
        }),
      },
    }),

    ...(on.create != null && {
      create: {},
    }),

    ...(on.delete != null && {
      delete: {},
    }),

    ...(on.deployment != null && {
      deployment: {},
    }),

    ...(on.deploymentStatus != null && {
      deployment_status: {},
    }),

    ...(on.discussion != null && {
      discussion: {
        ...(on.discussion.types != null && {
          types: on.discussion.types,
        }),
      },
    }),

    ...(on.discussionComment != null && {
      discussion_comment: {
        ...(on.discussionComment.types != null && {
          types: on.discussionComment.types,
        }),
      },
    }),

    ...(on.fork != null && {
      fork: {},
    }),

    ...(on.gollum != null && {
      gollum: {},
    }),

    ...(on.issueComment != null && {
      issue_comment: {
        ...(on.issueComment.types != null && {
          types: on.issueComment.types,
        }),
      },
    }),

    ...(on.issues != null && {
      issues: {
        ...(on.issues.types != null && {
          types: on.issues.types,
        }),
      },
    }),

    ...(on.label != null && {
      label: {
        ...(on.label.types != null && {
          types: on.label.types,
        }),
      },
    }),

    ...(on.mergeGroup != null && {
      merge_group: {
        ...(on.mergeGroup.types != null && {
          types: on.mergeGroup.types,
        }),
      },
    }),

    ...(on.milestone != null && {
      milestone: {
        ...(on.milestone.types != null && {
          types: on.milestone.types,
        }),
      },
    }),

    ...(on.pageBuild != null && {
      page_build: {},
    }),

    ...(on.project != null && {
      project: {
        ...(on.project.types != null && {
          types: on.project.types,
        }),
      },
    }),

    ...(on.projectCard != null && {
      project_card: {
        ...(on.projectCard.types != null && {
          types: on.projectCard.types,
        }),
      },
    }),

    ...(on.projectColumn != null && {
      project_column: {
        ...(on.projectColumn.types != null && {
          types: on.projectColumn.types,
        }),
      },
    }),

    ...(on.public != null && {
      public: {},
    }),

    ...(on.pullRequest != null && {
      pull_request: {
        ...(on.pullRequest.types != null && {
          types: on.pullRequest.types,
        }),
        ...(on.pullRequest.branches != null && {
          branches: on.pullRequest.branches,
        }),
        ...(on.pullRequest.branchesIgnore != null && {
          "branches-ignore": on.pullRequest.branchesIgnore,
        }),
        ...(on.pullRequest.tags != null && {
          tags: on.pullRequest.tags,
        }),
        ...(on.pullRequest.tagsIgnore != null && {
          "tags-ignore": on.pullRequest.tagsIgnore,
        }),
        ...(on.pullRequest.paths != null && {
          paths: on.pullRequest.paths,
        }),
        ...(on.pullRequest.pathsIgnore != null && {
          "paths-ignore": on.pullRequest.pathsIgnore,
        }),
      },
    }),

    ...(on.pullRequestReview != null && {
      pull_request_review: {
        ...(on.pullRequestReview.types != null && {
          types: on.pullRequestReview.types,
        }),
      },
    }),

    ...(on.pullRequestReviewComment != null && {
      pull_request_review_comment: {
        ...(on.pullRequestReviewComment.types != null && {
          types: on.pullRequestReviewComment.types,
        }),
      },
    }),

    ...(on.pullRequestTarget != null && {
      pull_request_target: {
        ...(on.pullRequestTarget.types != null && {
          types: on.pullRequestTarget.types,
        }),
        ...(on.pullRequestTarget.branches != null && {
          branches: on.pullRequestTarget.branches,
        }),
        ...(on.pullRequestTarget.branchesIgnore != null && {
          "branches-ignore": on.pullRequestTarget.branchesIgnore,
        }),
        ...(on.pullRequestTarget.tags != null && {
          tags: on.pullRequestTarget.tags,
        }),
        ...(on.pullRequestTarget.tagsIgnore != null && {
          "tags-ignore": on.pullRequestTarget.tagsIgnore,
        }),
        ...(on.pullRequestTarget.paths != null && {
          paths: on.pullRequestTarget.paths,
        }),
        ...(on.pullRequestTarget.pathsIgnore != null && {
          "paths-ignore": on.pullRequestTarget.pathsIgnore,
        }),
      },
    }),

    ...(on.push != null && {
      push: {
        ...(on.push.branches != null && {
          branches: on.push.branches,
        }),
        ...(on.push.branchesIgnore != null && {
          "branches-ignore": on.push.branchesIgnore,
        }),
        ...(on.push.tags != null && {
          tags: on.push.tags,
        }),
        ...(on.push.tagsIgnore != null && {
          "tags-ignore": on.push.tagsIgnore,
        }),
        ...(on.push.paths != null && {
          paths: on.push.paths,
        }),
        ...(on.push.pathsIgnore != null && {
          "paths-ignore": on.push.pathsIgnore,
        }),
      },
    }),

    ...(on.registryPackage != null && {
      registry_package: {
        ...(on.registryPackage.types != null && {
          types: on.registryPackage.types,
        }),
      },
    }),

    ...(on.release != null && {
      release: {
        ...(on.release.types != null && {
          types: on.release.types,
        }),
      },
    }),

    ...(on.status != null && {
      status: {},
    }),

    ...(on.watch != null && {
      watch: {},
    }),

    ...(on.workflowCall != null && {
      workflow_call: {
        ...(on.workflowCall.inputs != null && {
          inputs: Object.fromEntries(
            Object.entries(on.workflowCall.inputs).map(([key, value]) => [
              key,
              {
                type: value.type,
                ...(value.description != null && {
                  description: value.description,
                }),
                ...(value.required != null && {
                  required: value.required,
                }),
                ...(value.default != null && {
                  default: value.default,
                }),
              },
            ]),
          ),
        }),
        ...(on.workflowCall.secrets != null && {
          secrets: Object.fromEntries(
            Object.entries(on.workflowCall.secrets).map(([key, value]) => [
              key,
              {
                required: value.required,
                ...(value.description != null && {
                  description: value.description,
                }),
              },
            ]),
          ),
        }),
      },
    }),

    ...(on.workflowDispatch != null && {
      workflow_dispatch: {
        ...(on.workflowDispatch.inputs != null && {
          inputs: Object.fromEntries(
            Object.entries(on.workflowDispatch.inputs).map(([key, value]) => [
              key,
              (() => {
                const base = {
                  type: value.type,
                  description: value.description,
                  ...(value.deprecationMessage != null && {
                    deprecationMessage: value.deprecationMessage,
                  }),
                  ...(value.required != null && {
                    required: value.required,
                  }),
                  ...(value.default != null && {
                    default: value.default,
                  }),
                };
                switch (value.type) {
                  case "string":
                  case "boolean":
                  case "number":
                  case "environment":
                    return base;
                  case "choice":
                    return {
                      ...base,
                      options: value.options,
                    };
                }
              })(),
            ]),
          ),
        }),
      },
    }),

    ...(on.workflowRun != null && {
      workflow_run: {
        ...(on.workflowRun.types != null && {
          types: on.workflowRun.types,
        }),
        ...(on.workflowRun.workflows != null && {
          workflows: on.workflowRun.workflows,
        }),
        ...(on.workflowRun.branches != null && {
          branches: on.workflowRun.branches,
        }),
        ...(on.workflowRun.branchesIgnore != null && {
          "branches-ignore": on.workflowRun.branchesIgnore,
        }),
      },
    }),

    ...(on.repositoryDispatch != null && {
      repository_dispatch: {},
    }),

    ...(on.schedule != null && {
      schedule: on.schedule.map((schedule) => ({
        cron: schedule.cron,
      })),
    }),
  };
}
