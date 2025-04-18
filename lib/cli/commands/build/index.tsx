import * as fs from "node:fs";
import { register } from "node:module";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { success } from "../../ui/Message";
import { progress } from "../../ui/Progress";

export async function build(args: string[]) {
  const ghatsDir = path.resolve(process.cwd(), "node_modules/.ghats");
  const actionJsPath = path.join(ghatsDir, "action.js");
  if (!fs.existsSync(actionJsPath)) {
    fs.mkdirSync(ghatsDir, { recursive: true });
    fs.writeFileSync(actionJsPath, "export {}");
  }

  register("@swc-node/register/esm", pathToFileURL("./"));

  const workflowPaths: string[] = [];
  if (args.length > 0) {
    workflowPaths.push(...args);
  } else {
    const githubWorkflowsPath = ".github/workflows";
    workflowPaths.push(
      ...fs
        .readdirSync(githubWorkflowsPath)
        .filter((file) => {
          if (!file.endsWith(".ts")) return false;
          if (path.basename(file).startsWith("_")) return false;

          return true;
        })
        .map((file) => path.join(githubWorkflowsPath, file)),
    );
  }

  const { inProgress, done, fail, unmount } = progress();
  try {
    for (const workflowPath of workflowPaths) {
      try {
        await inProgress(`Building ${workflowPath}`);
        await _buildWorkflow(workflowPath);
        await done(getBuildTargetPath(workflowPath));
      } catch (error) {
        await fail(workflowPath);
        throw error;
      }
    }
  } finally {
    unmount();
  }

  success("All workflows built successfully!");
}

async function _buildWorkflow(workflowPath: string) {
  const module = await import(path.resolve(process.cwd(), workflowPath));
  if (!module.default) {
    throw new Error(`${workflowPath} does not have a default export`);
  }

  const workflowYml = JSON.stringify(module.default);

  const dirname = path.dirname(workflowPath);
  const filenameWithoutExtension = path.basename(
    workflowPath,
    path.extname(workflowPath),
  );

  fs.mkdirSync(dirname, { recursive: true });
  fs.writeFileSync(
    getBuildTargetPath(workflowPath),
    [
      "# DO NOT EDIT THIS FILE",
      "# This file is automatically generated by ghats (https://www.npmjs.com/package/ghats)",
      `# Edit the workflow in .github/workflows/${filenameWithoutExtension}.ts instead, and run \`ghats build\` to update this file.`,
      workflowYml,
    ].join("\n"),
  );
}

export function getBuildTargetPath(workflowPath: string) {
  const dirname = path.dirname(workflowPath);
  const filenameWithoutExtension = path.basename(
    workflowPath,
    path.extname(workflowPath),
  );

  return path.join(dirname, `${filenameWithoutExtension}.yml`);
}
