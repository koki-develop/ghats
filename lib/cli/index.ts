import { mkdirSync, writeFileSync } from "node:fs";
import { register } from "node:module";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { Command } from "commander";

const program = new Command();

program
  .command("build")
  .argument("<path>", "build target path")
  .action(async (targetPath: string) => {
    register("@swc-node/register/esm", pathToFileURL("./"));

    const workflowPath = path.resolve(process.cwd(), targetPath);
    const module = await import(workflowPath);
    const workflow = module.default;
    const workflowYml = JSON.stringify(workflow);

    const filenameWithoutExtension = path.basename(
      workflowPath,
      path.extname(workflowPath),
    );

    const githubWorkflowsPath = path.resolve(
      process.cwd(),
      ".github/workflows",
    );
    mkdirSync(githubWorkflowsPath, { recursive: true });
    writeFileSync(
      path.join(githubWorkflowsPath, `${filenameWithoutExtension}.yml`),
      workflowYml,
    );
  });

program.parse(process.argv);
