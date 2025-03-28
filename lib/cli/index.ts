import * as path from "node:path";
import { Command } from "commander";
import { Action } from "../action";
import { mkdirSync, writeFileSync } from "node:fs";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

const program = new Command();

program
  .command("build")
  .argument("<path>", "build target path")
  .action(async (targetPath: string) => {
    register("@swc-node/register/esm", pathToFileURL("./"));

    const actionPath = path.resolve(process.cwd(), targetPath);
    const module = await import(actionPath);
    const action = module.default;

    if (!(action instanceof Action)) {
      throw new Error(
        `Action class is not exported as default from ${actionPath}`
      );
    }

    const actionYml = action.toString();

    const actionPathWithoutExtension = path.join(
      path.dirname(actionPath),
      path.basename(actionPath, path.extname(actionPath))
    );

    mkdirSync(actionPathWithoutExtension, { recursive: true });
    writeFileSync(
      path.join(actionPathWithoutExtension, "action.yml"),
      actionYml
    );
  });

program.parse(process.argv);
