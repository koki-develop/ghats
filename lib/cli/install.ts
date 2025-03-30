import * as fs from "node:fs";
import * as path from "node:path";
import { parse as parseYaml } from "yaml";
import {
  loadActionsJson,
  loadActionsLockJson,
  saveActionsJson,
  saveActionsLockJson,
} from "../util/actions";
import { getCommit, getFileContent, getLatestRelease } from "../util/git";
import { toUpperCamelCase } from "../util/util";

export async function install(actions: string[]) {
  const actionJs = `import * as fs from "node:fs";
import * as path from "node:path";

function action(name, params) {
  const githubDir = path.resolve(process.cwd(), ".github");
  const actionsJsonPath = path.resolve(githubDir, "actions.json");
  const actionsLockJsonPath = path.resolve(githubDir, "actions-lock.json");
  const actionsJson = JSON.parse(fs.readFileSync(actionsJsonPath, "utf8"));
  const actionsLockJson = JSON.parse(fs.readFileSync(actionsLockJsonPath, "utf8"));

  const targetActionVersion = actionsJson[name];
  if (!targetActionVersion) throw new Error(\`\${name} is not installed\`);

  const targetActionCommit = actionsLockJson.actions[\`\${name}@\${targetActionVersion}\`];
  if (!targetActionCommit) throw new Error(\`\${name} is not installed\`);

  return { name: \`\${name}@\${targetActionCommit}\`, params };
}

export { action };
`;

  const actionDtsLines: string[] = [
    `import type { UsesStep } from "ghats";

export declare function action<T extends InstalledAction>(
  name: T,
  params?: InstalledActionParams<T>,
): {
  name: string;
  params?: Omit<UsesStep, "kind" | "action">;
};

export type InstalledActionParams<T extends InstalledAction> = Omit<
  UsesStep,
  "kind" | "action" | "with"
> & { with: InstalledActionInputs<T> };
`,
  ];

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

    // TODO: cache action.yml
    const actionYamlRaw = await getFileContent(
      owner,
      repo,
      commit.sha,
      "action.yml",
    );
    const actionYaml = parseYaml(actionYamlRaw);
    const inputsDefinition = buildInputsTypeDefinition(
      action,
      actionYaml.inputs,
    );
    actionDtsLines.push(inputsDefinition);

    actionsJson[action] = version;
    actionsLockJson.actions[`${owner}/${repo}@${version}`] = commit.sha;
  }

  saveActionsJson(actionsJson);
  saveActionsLockJson(actionsLockJson);

  actionDtsLines.push(
    `export type InstalledAction = ${Object.keys(actionsJson)
      .map((action) => JSON.stringify(action))
      .join(" | ")};`,
  );

  actionDtsLines.push(
    `export type InstalledActionInputs<T extends InstalledAction> = {`,
    Object.keys(actionsJson)
      .map((action) => {
        return `  ${JSON.stringify(action)}: InstalledActionInputs${toUpperCamelCase(action)};`;
      })
      .join("\n"),
    `}[T];`,
  );

  const dir = path.resolve(process.cwd(), "node_modules/.ghats");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.resolve(dir, "action.d.ts"),
    actionDtsLines.join("\n") + "\n",
  );
  fs.writeFileSync(path.resolve(dir, "action.js"), actionJs);
}

function buildInputsTypeDefinition(
  action: string,
  inputs: Record<
    string,
    {
      description?: string;
      default?: string;
      required?: boolean;
    }
  >,
) {
  const lines: string[] = [];
  lines.push(
    `export type InstalledActionInputs${toUpperCamelCase(action)} = {`,
  );

  for (const [key, value] of Object.entries(inputs)) {
    lines.push("  /**");
    if (value.description) {
      lines.push(`  ${value.description}`);
    }
    if (value.default) {
      lines.push(`  @default ${JSON.stringify(value.default)}`);
    }
    lines.push("  */");
    lines.push(`  ${JSON.stringify(key)}${value.required ? "" : "?"}: string;`);
  }

  lines.push("};");

  return lines.join("\n") + "\n";
}
