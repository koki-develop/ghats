/** biome-ignore-all lint/complexity/noBannedTypes: ok */

export type Events = {
  /**
   * Runs your workflow anytime the branch_protection_rule event occurs.
   * More than one activity type triggers this event.
   */
  branchProtectionRule: {
    types?: ("created" | "edited" | "deleted")[];
  };
  /**
   * Runs your workflow anytime the check_run event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/checks/runs.
   */
  checkRun: {
    types?: ("created" | "rerequested" | "completed" | "requested_action")[];
  };
  /**
   * Runs your workflow anytime the check_suite event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/checks/suites/
   */
  checkSuite: {
    types?: ("completed" | "requested" | "rerequested")[];
  };
  /**
   * Runs your workflow anytime someone creates a branch or tag, which triggers the create event.
   * @see https://developer.github.com/v3/git/refs/#create-a-reference
   */
  create: {};
  /**
   * Runs your workflow anytime someone deletes a branch or tag, which triggers the delete event.
   * @see https://developer.github.com/v3/git/refs/#delete-a-reference
   */
  delete: {};
  /**
   * Runs your workflow anytime someone creates a deployment, which triggers the deployment event.
   * Deployments created with a commit SHA may not have a Git ref.
   * @see https://developer.github.com/v3/repos/deployments/
   */
  deployment: {};
  /**
   * Runs your workflow anytime a third party provides a deployment status, which triggers the deployment_status event.
   * Deployments created with a commit SHA may not have a Git ref.
   * @see https://developer.github.com/v3/repos/deployments/#create-a-deployment-status
   */
  deploymentStatus: {};
  /**
   * Runs your workflow anytime the discussion event occurs.
   * More than one activity type triggers this event.
   * @see https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions
   */
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
  /**
   * Runs your workflow anytime the discussion_comment event occurs.
   * More than one activity type triggers this event.
   * @see https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions
   */
  discussionComment: {
    types?: ("created" | "edited" | "deleted")[];
  };
  /**
   * Runs your workflow anytime when someone forks a repository, which triggers the fork event.
   * @see https://developer.github.com/v3/repos/forks/#create-a-fork
   */
  fork: {};
  /**
   * Runs your workflow when someone creates or updates a Wiki page, which triggers the gollum event.
   */
  gollum: {};
  /**
   * Runs your workflow anytime the issue_comment event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/issues/comments/
   */
  issueComment: {
    types?: ("created" | "edited" | "deleted")[];
  };
  /**
   * Runs your workflow anytime the issues event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/issues
   */
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
  /**
   * Runs your workflow anytime the label event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/issues/labels/
   */
  label: {
    types?: ("created" | "edited" | "deleted")[];
  };
  /**
   * Runs your workflow when a pull request is added to a merge queue, which adds the pull request to a merge group.
   * @see https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request-with-a-merge-queue
   */
  mergeGroup: {
    types?: "checks_requested"[];
  };
  /**
   * Runs your workflow anytime the milestone event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/issues/milestones/
   */
  milestone: {
    types?: ("created" | "closed" | "opened" | "edited" | "deleted")[];
  };
  /**
   * Runs your workflow anytime someone pushes to a GitHub Pages-enabled branch, which triggers the page_build event.
   * @see https://developer.github.com/v3/repos/pages/
   */
  pageBuild: {};
  /**
   * Runs your workflow anytime the project event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/projects/
   */
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
  /**
   * Runs your workflow anytime the project_card event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/projects/cards
   */
  projectCard: {
    types?: ("created" | "moved" | "converted" | "edited" | "deleted")[];
  };
  /**
   * Runs your workflow anytime the project_column event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/projects/columns
   */
  projectColumn: {
    types?: ("created" | "updated" | "moved" | "deleted")[];
  };
  /**
   * Runs your workflow anytime someone makes a private repository public, which triggers the public event.
   * @see https://developer.github.com/v3/repos/#edit
   */
  public: {};
  /**
   * Runs your workflow anytime the pull_request event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/pulls
   *
   * NOTE: Workflows do not run on private base repositories when you open a pull request from a forked repository.
   * When you create a pull request from a forked repository to the base repository, GitHub sends the pull_request
   * event to the base repository and no pull request events occur on the forked repository.
   *
   * Workflows don't run on forked repositories by default.
   * You must enable GitHub Actions in the Actions tab of the forked repository.
   *
   * The permissions for the GITHUB_TOKEN in forked repositories is read-only.
   * @see https://help.github.com/en/articles/virtual-environments-for-github-actions
   */
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
  /**
   * Runs your workflow anytime the pull_request_review event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/pulls/reviews
   *
   * NOTE: Workflows do not run on private base repositories when you open a pull request from a forked repository.
   * When you create a pull request from a forked repository to the base repository, GitHub sends the pull_request
   * event to the base repository and no pull request events occur on the forked repository.
   *
   * Workflows don't run on forked repositories by default.
   * You must enable GitHub Actions in the Actions tab of the forked repository.
   *
   * The permissions for the GITHUB_TOKEN in forked repositories is read-only.
   * @see https://help.github.com/en/articles/virtual-environments-for-github-actions
   */
  pullRequestReview: {
    types?: ("submitted" | "edited" | "dismissed")[];
  };
  /**
   * Runs your workflow anytime a comment on a pull request's unified diff is modified, which triggers the pull_request_review_comment event.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/pulls/comments
   *
   * NOTE: Workflows do not run on private base repositories when you open a pull request from a forked repository.
   * When you create a pull request from a forked repository to the base repository, GitHub sends the pull_request
   * event to the base repository and no pull request events occur on the forked repository.
   *
   * Workflows don't run on forked repositories by default.
   * You must enable GitHub Actions in the Actions tab of the forked repository.
   *
   * The permissions for the GITHUB_TOKEN in forked repositories is read-only.
   * @see https://help.github.com/en/articles/virtual-environments-for-github-actions
   */
  pullRequestReviewComment: {
    types?: ("created" | "edited" | "deleted")[];
  };
  /**
   * This event is similar to pull_request, except that it runs in the context of the base repository of the pull request, rather than in the merge commit.
   * This means that you can more safely make your secrets available to the workflows triggered by the pull request, because only workflows defined in the commit on the base repository are run.
   * For example, this event allows you to create workflows that label and comment on pull requests, based on the contents of the event payload.
   */
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
  /**
   * Runs your workflow when someone pushes to a repository branch, which triggers the push event.
   * NOTE: The webhook payload available to GitHub Actions does not include the added, removed, and modified attributes in the commit object.
   * You can retrieve the full commit object using the REST API.
   * @see https://developer.github.com/v3/repos/commits/#get-a-single-commit.
   */
  push: {
    branches?: string[];
    branchesIgnore?: string[];
    tags?: string[];
    tagsIgnore?: string[];
    paths?: string[];
    pathsIgnore?: string[];
  };
  /**
   * Runs your workflow anytime a package is published or updated.
   * @see https://help.github.com/en/github/managing-packages-with-github-packages.
   */
  registryPackage: {
    types?: ("published" | "updated")[];
  };
  /**
   * Runs your workflow anytime the release event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/repos/releases/
   */
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
  /**
   * Runs your workflow anytime the status of a Git commit changes, which triggers the status event.
   * @see https://developer.github.com/v3/repos/statuses/
   */
  status: {};
  /**
   * Runs your workflow anytime the watch event occurs.
   * More than one activity type triggers this event.
   * @see https://developer.github.com/v3/activity/starring/
   */
  watch: {};
  /**
   * Allows workflows to be reused by other workflows.
   */
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
  /**
   * You can now create workflows that are manually triggered with the new workflow_dispatch event.
   * You will then see a 'Run workflow' button on the Actions tab, enabling you to easily trigger a run.
   */
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
  /**
   * This event occurs when a workflow run is requested or completed, and allows you to execute a workflow based on the finished result of another workflow.
   * For example, if your pull_request workflow generates build artifacts, you can create a new workflow that uses workflow_run to analyze the results and add a comment to the original pull request.
   */
  workflowRun: {
    types?: ("requested" | "completed" | "in_progress")[];
    workflows?: string[];
    branches?: string[];
    branchesIgnore?: string[];
  };
  /**
   * You can use the GitHub API to trigger a webhook event called repository_dispatch when you want to trigger a workflow for activity that happens outside of GitHub.
   * @see https://developer.github.com/v3/repos/#create-a-repository-dispatch-event.
   *
   * To trigger the custom repository_dispatch webhook event, you must send a POST request to a GitHub API endpoint and provide an event_type name to describe the activity type.
   * To trigger a workflow run, you must also configure your workflow to use the repository_dispatch event.
   */
  repositoryDispatch: {};
  /**
   * You can schedule a workflow to run at specific UTC times using POSIX cron syntax (https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07).
   * Scheduled workflows run on the latest commit on the default or base branch. The shortest interval you can run scheduled workflows is once every 5 minutes.
   *
   * NOTE: GitHub Actions does not support the non-standard syntax @yearly, @monthly, @weekly, @daily, @hourly, and @reboot.
   *
   * You can use crontab guru (https://crontab.guru/) to help generate your cron syntax and confirm what time it will run.
   * To help you get started, there is also a list of crontab guru examples (https://crontab.guru/examples.html).
   */
  schedule: { cron: string }[];
};

const EventNameMap: Record<keyof Events, string> = {
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

export type On =
  | (typeof EventNameMap)[keyof typeof EventNameMap]
  | (typeof EventNameMap)[keyof typeof EventNameMap][]
  | Partial<Events>;
