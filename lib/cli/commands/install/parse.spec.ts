import { describe, expect, test } from "bun:test";
import { parseAction } from "./parse";

describe("parseAction", () => {
  test.each<[string, ReturnType<typeof parseAction>]>([
    [
      "owner/repo",
      {
        fullName: "owner/repo",
        owner: "owner",
        repo: "repo",
        action: null,
        version: null,
      },
    ],
    [
      "owner/repo@v1.0.0",
      {
        fullName: "owner/repo",
        owner: "owner",
        repo: "repo",
        action: null,
        version: "v1.0.0",
      },
    ],
    [
      "owner/repo/foo",
      {
        fullName: "owner/repo/foo",
        owner: "owner",
        repo: "repo",
        action: "foo",
        version: null,
      },
    ],
    [
      "owner/repo/foo@v1.0.0",
      {
        fullName: "owner/repo/foo",
        owner: "owner",
        repo: "repo",
        action: "foo",
        version: "v1.0.0",
      },
    ],
    [
      "owner/repo/foo/bar",
      {
        fullName: "owner/repo/foo/bar",
        owner: "owner",
        repo: "repo",
        action: "foo/bar",
        version: null,
      },
    ],
    [
      "owner/repo/foo/bar@v1.0.0",
      {
        fullName: "owner/repo/foo/bar",
        owner: "owner",
        repo: "repo",
        action: "foo/bar",
        version: "v1.0.0",
      },
    ],
  ])("parseAction(%j) -> %j", (arg, expected) => {
    expect(parseAction(arg)).toEqual(expected);
  });
});
