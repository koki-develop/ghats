import * as fs from "node:fs";
import * as path from "node:path";
import {
  loadActionsJson,
  loadActionsLockJson,
  saveActionsJson,
  saveActionsLockJson,
} from "../../internal/actions";
import { getCommit, getLatestRelease } from "../../internal/git";
import { buildActionDts, buildActionJs } from "./type-def";

export async function install(actions: string[]) {
  const actionsJson = loadActionsJson();
  const actionsLockJson = loadActionsLockJson();

  for (const action of actions) {
    // if action is already installed, skip
    if (actionsJson[action]) continue;

    const [owner, repo] = action.split("/"); // TODO: use regex
    if (!owner || !repo) {
      throw new Error(`Invalid action format: ${action}`);
    }

    const latestRelease = await getLatestRelease(owner, repo);
    const version = latestRelease.tag_name;
    const commit = await getCommit(owner, repo, version);

    actionsJson[action] = version;
    actionsLockJson.actions[`${action}@${version}`] = commit.sha;
  }

  // ---

  const dir = path.resolve(process.cwd(), "node_modules/.ghats");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.resolve(dir, "action.js"), buildActionJs());
  fs.writeFileSync(
    path.resolve(dir, "action.d.ts"),
    await buildActionDts(actionsJson, actionsLockJson),
  );

  saveActionsJson(actionsJson);
  saveActionsLockJson(actionsLockJson);
}
