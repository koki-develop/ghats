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

    const actionPath = path.resolve(process.cwd(), targetPath);
    const module = await import(actionPath);
    const action = module.default;
    const actionYml = action.toString();

    const actionPathWithoutExtension = path.join(
      path.dirname(actionPath),
      path.basename(actionPath, path.extname(actionPath)),
    );

    mkdirSync(actionPathWithoutExtension, { recursive: true });
    writeFileSync(
      path.join(actionPathWithoutExtension, "action.yml"),
      actionYml,
    );
  });

program.parse(process.argv);
