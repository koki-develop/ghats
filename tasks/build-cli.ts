await Bun.build({
  banner: "#!/usr/bin/env node",
  entrypoints: ["./lib/cli/index.ts"],
  outdir: "./dist",
  target: "node",
  packages: "external",
});
