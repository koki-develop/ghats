import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { getFileContent } from "../lib/github";

export type ActionYaml = {
  inputs?: Record<
    string,
    {
      description?: string;
      default?: string;
      required?: boolean;
      deprecationMessage?: string;
    }
  >;
};

type Cache = {
  actionYaml: string;
  cachedAt: number;
};

function _cacheDir(
  owner: string,
  repo: string,
  action: string | null,
  sha: string,
) {
  const segments = [
    "node_modules",
    ".cache",
    "ghats",
    "actions",
    owner,
    repo,
    ...(action ? [action] : []),
    sha,
  ];

  return path.resolve(process.cwd(), path.join(...segments));
}

function _cachePath(
  owner: string,
  repo: string,
  action: string | null,
  sha: string,
) {
  const cacheDir = _cacheDir(owner, repo, action, sha);
  return path.join(cacheDir, "cache.json");
}

function _loadCache(
  owner: string,
  repo: string,
  action: string | null,
  sha: string,
): Cache | null {
  const cachePath = _cachePath(owner, repo, action, sha);
  if (!fs.existsSync(cachePath)) return null;

  try {
    const cache: Cache = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    return cache;
  } catch {
    return null;
  }
}

function _saveCache(
  owner: string,
  repo: string,
  action: string | null,
  sha: string,
  cache: Cache,
) {
  const cacheDir = _cacheDir(owner, repo, action, sha);
  fs.mkdirSync(cacheDir, { recursive: true });

  const cachePath = _cachePath(owner, repo, action, sha);
  fs.writeFileSync(cachePath, JSON.stringify(cache));
}

export async function downloadActionYaml(
  owner: string,
  repo: string,
  action: string | null,
  sha: string,
): Promise<ActionYaml> {
  const cache = _loadCache(owner, repo, action, sha);
  if (cache != null) {
    try {
      return parseYaml(cache.actionYaml);
    } catch {
      // ignore
    }
  }

  const actionYamlRaw = await getFileContent(
    owner,
    repo,
    sha,
    path.join(...(action ? [action] : []), "action.yml"),
  ).catch(async (error) => {
    if (error.status !== 404) throw error;

    const actionYamlRaw = await getFileContent(
      owner,
      repo,
      sha,
      path.join(...(action ? [action] : []), "action.yaml"),
    );
    return actionYamlRaw;
  });

  _saveCache(owner, repo, action, sha, {
    actionYaml: actionYamlRaw,
    cachedAt: Date.now(),
  });

  return parseYaml(actionYamlRaw);
}
