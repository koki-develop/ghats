import * as fs from "node:fs";
import * as path from "node:path";
import {
  loadActionsJson,
  loadActionsLockJson,
  saveActionsJson,
  saveActionsLockJson,
} from "../../internal/actions";
import { getLatestRelease } from "../../internal/git";
import { success } from "../ui/Message";
import { progress } from "../ui/Progress";
import { type ActionYaml, downloadActionYaml } from "./action-yaml";
import { getCommit } from "./commit";
import { type ParsedAction, parseAction } from "./parse";
import { buildActionDts, buildActionJs } from "./type-def";

export async function install(args: string[]) {
  const actionsJson = loadActionsJson();
  const actionsLockJson = loadActionsLockJson();
  const targetActions: Record<string, ParsedAction> = {};
  const actionYamls: Record<string, ActionYaml> = {};

  if (args.length === 0) {
    for (const [action, version] of Object.entries(actionsJson)) {
      const parsedAction = parseAction(action);
      targetActions[action] = { ...parsedAction, version };
    }
  } else {
    const parsedActions = args.map(parseAction);
    for (const parsedAction of parsedActions) {
      // If version is explicitly specified
      if (parsedAction.version != null) {
        targetActions[parsedAction.fullName] = {
          ...parsedAction,
          version: parsedAction.version,
        };
        continue;
      }

      // If version is not explicitly specified
      const installedVersion = actionsJson[parsedAction.fullName];
      if (installedVersion != null) {
        // If the action is already installed, use the installed version
        parsedAction.version = installedVersion;
      } else {
        // If the action is not installed, use the latest version
        parsedAction.version = "latest";
      }
      targetActions[parsedAction.fullName] = parsedAction;
    }
  }

  const { inProgress, fail, done, clear, unmount } = progress();
  try {
    for (const parsedAction of Object.values(targetActions)) {
      await inProgress(
        `Installing ${parsedAction.fullName}@${parsedAction.version}`,
      );

      try {
        // get tag name
        const tagName = await (async () => {
          if (
            parsedAction.version == null ||
            parsedAction.version === "latest"
          ) {
            const latestRelease = await getLatestRelease(
              parsedAction.owner,
              parsedAction.repo,
            );
            return latestRelease.tag_name;
          }
          return parsedAction.version;
        })();

        // get commit by tag name
        const sha = await (async () => {
          const lockedSha =
            actionsLockJson.actions[`${parsedAction.fullName}@${tagName}`];
          if (lockedSha != null) return lockedSha;
          return await getCommit(
            parsedAction.owner,
            parsedAction.repo,
            tagName,
          );
        })();

        // update actions.json and actions-lock.json
        actionsJson[parsedAction.fullName] = tagName;
        actionsLockJson.actions[`${parsedAction.fullName}@${tagName}`] = sha;

        // download action.yml
        const actionYaml = await downloadActionYaml(
          parsedAction.owner,
          parsedAction.repo,
          parsedAction.action,
          sha,
        );
        actionYamls[parsedAction.fullName] = actionYaml;

        await done(`${parsedAction.fullName}@${tagName}`);
      } catch (error) {
        await fail(`${parsedAction.fullName}@${parsedAction.version}`);
        throw error;
      }
    }

    await inProgress("Building type definitions...");

    // download action.yml for actions that are not installed
    for (const [actionFullNameWithVersion, sha] of Object.entries(
      actionsLockJson.actions,
    )) {
      const parsedAction = parseAction(actionFullNameWithVersion);
      if (parsedAction.fullName in actionYamls) continue;

      const actionYaml = await downloadActionYaml(
        parsedAction.owner,
        parsedAction.repo,
        parsedAction.action,
        sha,
      );
      actionYamls[parsedAction.fullName] = actionYaml;
    }

    // build action.js and action.d.ts
    const ghatsDir = path.resolve(process.cwd(), "node_modules/.ghats");
    fs.mkdirSync(ghatsDir, { recursive: true });
    fs.writeFileSync(path.resolve(ghatsDir, "action.js"), buildActionJs());
    fs.writeFileSync(
      path.resolve(ghatsDir, "action.d.ts"),
      await buildActionDts(actionYamls),
    );

    // clear building type definitions message
    await clear();

    // save actions.json and actions-lock.json
    saveActionsJson(actionsJson);
    saveActionsLockJson(actionsLockJson);
  } finally {
    unmount();
  }

  success("Installed all actions successfully!");
}
