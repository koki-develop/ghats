import type { BunPlugin } from "bun";
import { isolatedDeclaration } from "oxc-transform";

await Bun.$`rm -rf ./dist`;

// https://github.com/oven-sh/bun/issues/5141#issuecomment-2595032410
function getDtsBunPlugin(): BunPlugin {
  const wroteTrack = new Set<string>();
  return {
    name: "oxc-transform-dts",
    setup(builder) {
      if (builder.config.root && builder.config.outdir) {
        const rootPath = Bun.pathToFileURL(builder.config.root).pathname;
        const outPath = Bun.pathToFileURL(builder.config.outdir).pathname;
        builder.onStart(() => wroteTrack.clear());
        builder.onLoad({ filter: /\.ts$/ }, async (args) => {
          if (args.path.startsWith(rootPath) && !wroteTrack.has(args.path)) {
            wroteTrack.add(args.path);
            const { code } = isolatedDeclaration(
              args.path,
              await Bun.file(args.path).text(),
            );
            await Bun.write(
              args.path
                .replace(new RegExp(`^${rootPath}`), outPath)
                .replace(/\.ts$/, ".d.ts"),
              code,
            );
          }
          return undefined;
        });
      }
    },
  };
}

// cli
await Bun.build({
  banner: "#!/usr/bin/env node",
  entrypoints: ["./lib/cli/index.ts"],
  outdir: "./dist/cli",
  target: "node",
  packages: "external",
});

// lib
await Bun.build({
  entrypoints: ["./lib/index.ts"],
  root: "lib",
  outdir: "./dist/lib",
  plugins: [getDtsBunPlugin()],
  packages: "external",
});
