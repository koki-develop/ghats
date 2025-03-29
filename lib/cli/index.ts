import { Command } from "commander";
import { build } from "./build";
import { install } from "./install";

const program = new Command();

program.command("install [actions...]").action(install);
program.command("build [workflows...]").action(build);

program.parse(process.argv);
