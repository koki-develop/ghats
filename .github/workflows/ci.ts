import { Job, Workflow } from "../../lib";

const helloJob = new Job("hello", { runsOn: "ubuntu-latest" });
helloJob.run("echo 'Hello, world!'");

const workflow = new Workflow("CI", {});
workflow.job(helloJob);

export default workflow;
