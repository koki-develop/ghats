import * as fs from "node:fs";
import * as path from "node:path";
import { parse as parseYaml } from "yaml";
import type { ActionsJson, ActionsLockJson } from "../../internal/actions";
import { getFileContent } from "../../internal/git";
import { toUpperCamelCase } from "../../internal/util";

const actionJs = `import * as fs from "node:fs";
import * as path from "node:path";

function action(name, params) {
  const githubDir = path.resolve(process.cwd(), ".github/workflows");
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

export function buildActionJs() {
  return actionJs;
}

export async function buildActionDts(
  actionsJson: ActionsJson,
  actionsLockJson: ActionsLockJson,
): Promise<string> {
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
> & { with?: InstalledActionInputs<T> };
`,
  ];

  for (const [actionWithVersion, sha] of Object.entries(
    actionsLockJson.actions,
  )) {
    const [action] = actionWithVersion.split("@") as [string];

    const actionYamlRaw = await _downloadActionYaml(action, sha);
    const actionYaml = parseYaml(actionYamlRaw);
    const inputsDefinition = _buildInputsTypeDefinition(
      action,
      actionYaml.inputs,
    );
    actionDtsLines.push(inputsDefinition);
  }

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

  return actionDtsLines.join("\n") + "\n";
}

function _buildInputsTypeDefinition(
  action: string,
  inputs: Record<
    string,
    {
      description?: string;
      default?: string;
      required?: boolean;
      deprecationMessage?: string;
    }
  > | null,
) {
  const lines: string[] = [];
  lines.push(
    `export type InstalledActionInputs${toUpperCamelCase(action)} = {`,
  );

  if (inputs) {
    for (const [key, value] of Object.entries(inputs)) {
      lines.push("  /**");
      if (value.description) {
        lines.push(`  * ${value.description}`);
      }
      if (value.default) {
        lines.push(`  * @default ${JSON.stringify(value.default)}`);
      }
      if (value.deprecationMessage) {
        lines.push(`  * @deprecated ${value.deprecationMessage}`);
      }
      lines.push("  */");
      lines.push(
        `  ${JSON.stringify(key)}${value.required ? "" : "?"}: string;`,
      );
    }
  }

  lines.push("};");

  return lines.join("\n") + "\n";
}

async function _downloadActionYaml(
  action: string,
  sha: string,
): Promise<string> {
  const cacheDir = path.resolve(
    process.cwd(),
    path.join("node_modules", ".cache", "ghats", "actions", action, sha),
  );
  const cachedActionYamlPath = path.join(cacheDir, "action.yml");
  if (fs.existsSync(cachedActionYamlPath)) {
    return fs.readFileSync(cachedActionYamlPath, "utf8");
  }

  const [owner, repo, ...rest] = action.split("/");
  if (!owner || !repo)
    throw new Error("Failed to parse action name: " + action);

  const actionYamlRaw = await getFileContent(
    owner,
    repo,
    sha,
    path.join(...rest, "action.yml"),
  ).catch(async (error) => {
    if (error.status !== 404) throw error;

    const actionYamlRaw = await getFileContent(
      owner,
      repo,
      sha,
      path.join(...rest, "action.yaml"),
    );
    return actionYamlRaw;
  });
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(cachedActionYamlPath, actionYamlRaw);

  return actionYamlRaw;
}
