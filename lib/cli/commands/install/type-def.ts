import { toUpperCamelCase } from "../../lib/util";
import type { ActionYaml } from "./action-yaml";

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
  actionYamls: Record<string, ActionYaml>,
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

  for (const [actionFullName, actionYaml] of Object.entries(actionYamls)) {
    const inputsDefinition = _buildInputsTypeDefinition(
      actionFullName,
      actionYaml,
    );
    actionDtsLines.push(inputsDefinition);
  }

  actionDtsLines.push(
    `export type InstalledAction = ${Object.keys(actionYamls)
      .map((action) => JSON.stringify(action))
      .join(" | ")};`,
  );

  actionDtsLines.push(
    `export type InstalledActionInputs<T extends InstalledAction> = {`,
    Object.keys(actionYamls)
      .map((action) => {
        return `  ${JSON.stringify(action)}: InstalledActionInputs${toUpperCamelCase(action)};`;
      })
      .join("\n"),
    `}[T];`,
  );

  return `${actionDtsLines.join("\n")}\n`;
}

function _buildInputsTypeDefinition(action: string, actionYaml: ActionYaml) {
  const lines: string[] = [];
  lines.push(
    `export type InstalledActionInputs${toUpperCamelCase(action)} = {`,
  );

  if (actionYaml.inputs) {
    for (const [key, value] of Object.entries(actionYaml.inputs)) {
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

  return `${lines.join("\n")}\n`;
}
