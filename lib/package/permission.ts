export type Permission = "read" | "write";

export type Permissions = {
  actions?: Permission;
  attestations?: Permission;
  checks?: Permission;
  contents?: Permission;
  deployments?: Permission;
  discussions?: Permission;
  "id-token"?: Permission;
  issues?: Permission;
  packages?: Permission;
  pages?: Permission;
  "pull-requests"?: Permission;
  "repository-projects"?: Permission;
  "security-events"?: Permission;
  statuses?: Permission;
};
