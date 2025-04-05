import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  throttle: { enabled: false },
});

export async function getLatestRelease(owner: string, repo: string) {
  const { data: latestRelease } = await octokit.rest.repos.getLatestRelease({
    owner,
    repo,
  });
  return latestRelease;
}

export async function getCommit(owner: string, repo: string, ref: string) {
  const { data: commit } = await octokit.rest.repos.getCommit({
    owner,
    repo,
    ref,
  });
  return commit;
}

export async function getFileContent(
  owner: string,
  repo: string,
  ref: string,
  path: string,
) {
  const { data: content } = await octokit.rest.repos.getContent({
    owner,
    repo,
    ref,
    path,
  });

  if (Array.isArray(content)) {
    throw new Error("Expected a single file, got a directory");
  }

  if (content.type !== "file") {
    throw new Error(`Expected a file, got a ${content.type}`);
  }

  if (content.encoding !== "base64") {
    throw new Error(`Expected base64 encoding, got ${content.encoding}`);
  }

  return Buffer.from(content.content, "base64").toString("utf-8");
}
