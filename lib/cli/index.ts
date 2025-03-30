import { Command } from "commander";
import { build } from "./build";
import { install } from "./install";

const program = new Command();

program
  .command("install [actions...]")
  .description("install actions to use in workflows")
  .action(install);
program
  .command("build [workflows...]")
  .description("build github actions workflows")
  .action(build);

program.parse(process.argv);
