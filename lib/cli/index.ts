import * as fs from "node:fs";
import { register } from "node:module";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { Command } from "commander";

const program = new Command();

program.command("build").action(async () => {
  register("@swc-node/register/esm", pathToFileURL("./"));

  const githubWorkflowsPath = path.resolve(process.cwd(), ".github/workflows");
  const workflowPaths = fs
    .readdirSync(githubWorkflowsPath)
    .map((file) => path.join(githubWorkflowsPath, file))
    .filter((file) => file.endsWith(".ts"));

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
      workflowYml,
    );
  }
});

program.parse(process.argv);
