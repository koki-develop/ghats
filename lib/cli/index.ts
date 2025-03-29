import { Command } from "commander";
import { build } from "./build";

const program = new Command();

program.command("build [workflows...]").action(build);

program.parse(process.argv);
