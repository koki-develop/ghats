import * as fs from "node:fs";
import { register } from "node:module";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

export async function build(args: string[]) {
  register("@swc-node/register/esm", pathToFileURL("./"));

  const githubWorkflowsPath = path.resolve(process.cwd(), ".github/workflows");

  const workflowPaths: string[] = [];
  if (args.length > 0) {
    workflowPaths.push(...args.map((arg) => path.resolve(process.cwd(), arg)));
  } else {
    workflowPaths.push(
      ...fs
        .readdirSync(githubWorkflowsPath)
        .map((file) => path.join(githubWorkflowsPath, file))
        .filter((file) => {
          if (!file.endsWith(".ts")) return false;
          if (path.basename(file).startsWith("_")) return false;

          return true;
        }),
    );
  }

  for (const workflowPath of workflowPaths) {
    const module = await import(workflowPath);
    const workflowYml = JSON.stringify(module.default);

    const filenameWithoutExtension = path.basename(
      workflowPath,
      path.extname(workflowPath),
    );

    fs.mkdirSync(githubWorkflowsPath, { recursive: true });
    fs.writeFileSync(
      path.join(githubWorkflowsPath, `${filenameWithoutExtension}.yml`),
      [
        "# DO NOT EDIT THIS FILE",
        "# This file is automatically generated by ghats (https://www.npmjs.com/package/ghats)",
        `# Edit the workflow in .github/workflows/${filenameWithoutExtension}.ts instead, and run \`ghats build\` to update this file.`,
        workflowYml,
      ].join("\n"),
    );
  }
}
