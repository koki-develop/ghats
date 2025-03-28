import * as path from "node:path";
import { Action } from "../../lib";

const action = new Action();
action.run("bun test");

action.build(path.join(__dirname, "test"));
