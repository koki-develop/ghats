import { mkdirSync, writeFileSync } from "node:fs";

export type Step = {
  command: string;
};

export class Action {
  private readonly _steps: Step[] = [];

  public run(command: string): Action {
    this._steps.push({ command });
    return this;
  }

  public toString(): string {
    const lines: string[] = [];

    lines.push("runs:");
    lines.push("  using: composite");

    lines.push("  steps:");
    for (const step of this._steps) {
      lines.push(`    - run: ${step.command}`);
      lines.push(`      shell: bash`);
    }

    return lines.join("\n") + "\n";
  }

  public build(output: string) {
    const actionYml = this.toString();
    mkdirSync(output, { recursive: true });
    writeFileSync(`${output}/action.yml`, actionYml);
  }
}
