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
      idToken?: Permission;
      issues?: Permission;
      packages?: Permission;
      pages?: Permission;
      pullRequests?: Permission;
      repositoryProjects?: Permission;
      securityEvents?: Permission;
      statuses?: Permission;
    };
