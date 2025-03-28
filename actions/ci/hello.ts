import * as path from "node:path";
import { Action } from "../../lib";

const action = new Action();
action.run("echo 'Hello, world!'");

action.build(path.join(__dirname, "hello"));
