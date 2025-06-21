import { join, resolve } from "node:path";
import { cwd } from "node:process";

import { generateSprites } from "./generateSprites.js";

const DEFAULT_SRC_DIR = "/src/icons/";
const DEFAULT_DEST_DIR = "/public/assets/icons/";

const watchSpritesPlugin = (initialOptions) => {
  const options = {
    srcDir: join(cwd(), initialOptions.srcDir ?? DEFAULT_SRC_DIR),
    destDir: join(cwd(), initialOptions.destDir ?? DEFAULT_DEST_DIR),
    config: initialOptions.config ?? {}
  }

  return {
    name: "watch-sprites",
    configureServer(server) {
      if (import.meta.env.PROD) return;

      console.log("[🧪] Plugin watch-sprites enabled");
      const iconsPath = resolve(options.srcDir);
      server.watcher.add(iconsPath);

      server.watcher.on("change", (filePath) => {
        if (filePath.startsWith(iconsPath)) {
          console.log(`[🎨] Icon modified: ${filePath}`);
          generateSprites(options);
        }
      });

      server.watcher.on("add", (filePath) => {
        if (filePath.startsWith(iconsPath)) {
          console.log(`[➕] Icon added: ${filePath}`);
          generateSprites(options);
        }
      });

      server.watcher.on("unlink", (filePath) => {
        if (filePath.startsWith(iconsPath)) {
          console.log(`[❌] Icon removed: ${filePath}`);
          generateSprites(options);
        }
      });
    },
  }
}

export default watchSpritesPlugin;
