import * as fs from "node:fs";
import * as path from "node:path";

export function clearCache() {
  const cacheDir = path.resolve(process.cwd(), "node_modules/.cache/ghats");
  if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true });
  }
}
