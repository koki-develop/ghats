import { describe, expect, test } from "bun:test";
import { type Permissions, permissionsJSON } from "./permissions";

describe("permissionsJSON", () => {
  test.each<[Permissions, Record<string, unknown>]>([
    [{}, {}],
    [{ actions: "read" }, { actions: "read" }],
    [
      { actions: "read", attestations: "write", checks: "none" },
      { actions: "read", attestations: "write", checks: "none" },
    ],
    [
      {
        actions: "read",
        attestations: "write",
        checks: "none",
        contents: "read",
        deployments: "write",
        discussions: "read",
        idToken: "write",
        issues: "read",
        packages: "read",
        pages: "read",
        pullRequests: "write",
        repositoryProjects: "read",
        securityEvents: "write",
        statuses: "read",
      },
      {
        actions: "read",
        attestations: "write",
        checks: "none",
        contents: "read",
        deployments: "write",
        discussions: "read",
        "id-token": "write",
        issues: "read",
        packages: "read",
        pages: "read",
        "pull-requests": "write",
        "repository-projects": "read",
        "security-events": "write",
        statuses: "read",
      },
    ],
  ])("permissionsJSON(%j) returns %j", (input, expected) => {
    expect(permissionsJSON(input)).toEqual(expected);
  });
});
