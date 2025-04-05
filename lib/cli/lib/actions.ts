import * as fs from "node:fs";
import * as path from "node:path";

function _prepareGitHubDir() {
  const actionsDir = path.resolve(process.cwd(), ".github");
  if (!fs.existsSync(actionsDir)) {
    fs.mkdirSync(actionsDir, { recursive: true });
  }
}

function _actionsJsonPath() {
  return path.resolve(process.cwd(), ".github/workflows/actions.json");
}

function _actionsLockJsonPath() {
  return path.resolve(process.cwd(), ".github/workflows/actions-lock.json");
}

export type ActionsJson = Record<string, string>;
export type ActionsLockJson = { actions: Record<string, string> };

export function loadActionsJson(): ActionsJson {
  const actionsJsonPath = _actionsJsonPath();
  if (!fs.existsSync(actionsJsonPath)) {
    return {};
  }

  const actionsJson = fs.readFileSync(actionsJsonPath, "utf8");
  return JSON.parse(actionsJson);
}

export function saveActionsJson(actionsJson: ActionsJson) {
  // sort by key
  const sortedActionsJson = Object.fromEntries(
    Object.entries(actionsJson).sort(([a], [b]) => a.localeCompare(b)),
  );

  _prepareGitHubDir();
  fs.writeFileSync(
    _actionsJsonPath(),
    JSON.stringify(sortedActionsJson, null, 2) + "\n",
  );
}

export function loadActionsLockJson(): ActionsLockJson {
  const actionsLockJsonPath = _actionsLockJsonPath();
  if (!fs.existsSync(actionsLockJsonPath)) {
    return { actions: {} };
  }

  const actionsLockJson = fs.readFileSync(actionsLockJsonPath, "utf8");
  return JSON.parse(actionsLockJson);
}

export function saveActionsLockJson(actionsLockJson: ActionsLockJson) {
  const sortedActionsLockJson = {
    actions: Object.fromEntries(
      Object.entries(actionsLockJson.actions).sort(([a], [b]) =>
        a.localeCompare(b),
      ),
    ),
  };

  _prepareGitHubDir();
  fs.writeFileSync(
    _actionsLockJsonPath(),
    JSON.stringify(sortedActionsLockJson, null, 2) + "\n",
  );
}
