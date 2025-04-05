import { Command } from "commander";
import { build } from "./commands/build";
import { clearCache } from "./commands/cache/clear";
import { install } from "./commands/install";

const program = new Command();

program
  .command("install [actions...]")
  .description("install actions to use in workflows")
  .action(install);

program
  .command("build [workflows...]")
  .description("build github actions workflows")
  .action(build);

program
  .command("cache")
  .description("manage cache")
  .command("clear")
  .description("clear cache")
  .action(clearCache);

program.parse(process.argv);
