export type Permission = "read" | "write" | "none";

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
