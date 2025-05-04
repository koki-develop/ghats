// https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/controlling-permissions-for-github_token#defining-access-for-the-github_token-permissions

export type Permission = "read" | "write" | "none";

/**
 * You can modify the default permissions granted to the GITHUB_TOKEN, adding or removing access as required, so that you only allow the minimum required access.
 */
export type Permissions =
  | "read-all"
  | "write-all"
  | {
      actions?: Permission;
      attestations?: Permission;
      checks?: Permission;
      contents?: Permission;
      deployments?: Permission;
      discussions?: Permission;
      idToken?: "write" | "none";
      issues?: Permission;
      models?: "read" | "none";
      packages?: Permission;
      pages?: Permission;
      pullRequests?: Permission;
      repositoryProjects?: Permission;
      securityEvents?: Permission;
      statuses?: Permission;
    };
