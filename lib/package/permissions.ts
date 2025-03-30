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

export function permissionsJSON(
  permissions: Permissions,
): Record<string, unknown> {
  return {
    ...(permissions.actions && { actions: permissions.actions }),
    ...(permissions.attestations && { attestations: permissions.attestations }),
    ...(permissions.checks && { checks: permissions.checks }),
    ...(permissions.contents && { contents: permissions.contents }),
    ...(permissions.deployments && { deployments: permissions.deployments }),
    ...(permissions.discussions && { discussions: permissions.discussions }),
    ...(permissions.idToken && { "id-token": permissions.idToken }),
    ...(permissions.issues && { issues: permissions.issues }),
    ...(permissions.packages && { packages: permissions.packages }),
    ...(permissions.pages && { pages: permissions.pages }),
    ...(permissions.pullRequests && {
      "pull-requests": permissions.pullRequests,
    }),
    ...(permissions.repositoryProjects && {
      "repository-projects": permissions.repositoryProjects,
    }),
    ...(permissions.securityEvents && {
      "security-events": permissions.securityEvents,
    }),
    ...(permissions.statuses && { statuses: permissions.statuses }),
  };
}
