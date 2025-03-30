export type Permission = "read" | "write" | "none";

export type Permissions = {
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

export function permissionJSON(
  permissions?: Permissions,
): Record<string, unknown> | undefined {
  if (permissions == null) return undefined;

  return {
    actions: permissions.actions,
    attestations: permissions.attestations,
    checks: permissions.checks,
    contents: permissions.contents,
    deployments: permissions.deployments,
    discussions: permissions.discussions,
    "id-token": permissions.idToken,
    issues: permissions.issues,
    packages: permissions.packages,
    pages: permissions.pages,
    "pull-requests": permissions.pullRequests,
    "repository-projects": permissions.repositoryProjects,
    "security-events": permissions.securityEvents,
    statuses: permissions.statuses,
  };
}
