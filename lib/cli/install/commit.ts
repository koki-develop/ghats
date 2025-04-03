import * as fs from "node:fs";
import path from "node:path";
import { getCommit as getCommitFromGithub } from "../../internal/git";

type Cache = {
  commit: string;
  cachedAt: number;
};

const cacheTtl = 1000 * 60 * 60 * 24; // 1 day

function _cacheDir(owner: string, repo: string, tagName: string) {
  const segments = [
    "node_modules",
    ".cache",
    "ghats",
    "commits",
    owner,
    repo,
    tagName,
  ];

  return path.resolve(process.cwd(), path.join(...segments));
}

function _cachePath(owner: string, repo: string, tagName: string) {
  const cacheDir = _cacheDir(owner, repo, tagName);
  return path.join(cacheDir, "cache.json");
}

function _loadCache(
  owner: string,
  repo: string,
  tagName: string,
): Cache | null {
  const cachePath = _cachePath(owner, repo, tagName);
  if (!fs.existsSync(cachePath)) return null;

  const cache: Cache = JSON.parse(fs.readFileSync(cachePath, "utf8"));
  if (cache.cachedAt + cacheTtl < Date.now()) return null;

  return cache;
}

function _saveCache(
  owner: string,
  repo: string,
  tagName: string,
  cache: Cache,
) {
  const cacheDir = _cacheDir(owner, repo, tagName);
  fs.mkdirSync(cacheDir, { recursive: true });

  const cachePath = _cachePath(owner, repo, tagName);
  fs.writeFileSync(cachePath, JSON.stringify(cache));
}

export async function getCommit(
  owner: string,
  repo: string,
  tagName: string,
): Promise<string> {
  const cache = _loadCache(owner, repo, tagName);
  if (cache != null) return cache.commit;

  const commit = await getCommitFromGithub(owner, repo, tagName);
  _saveCache(owner, repo, tagName, {
    commit: commit.sha,
    cachedAt: Date.now(),
  });

  return commit.sha;
}
