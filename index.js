import { join, resolve } from "node:path";
import { cwd } from "node:process";

import { generateSprites, hasSVGIcons } from "./generateSprites.js";

const DEFAULT_SRC_DIR = "/src/icons/";
const DEFAULT_DEST_DIR = "/public/assets/icons/";

const supersvgPlugin = (initialOptions = {}) => {
  const options = {
    srcDir: join(cwd(), initialOptions.srcDir ?? DEFAULT_SRC_DIR),
    destDir: join(cwd(), initialOptions.destDir ?? DEFAULT_DEST_DIR),
    config: initialOptions.config ?? {},
    lazy: initialOptions.lazy ?? false
  }

  return {
    name: "supersvg-plugin",
    async configureServer(server) {
      console.log("[🧪] Plugin supersvg enabled");
      const iconsPath = resolve(options.srcDir);
      server.watcher.add(iconsPath);

      if (!options.lazy) {
        if (await hasSVGIcons(options.srcDir)) {
          console.log(`[🎨] Icons generated`);
          generateSprites(options);
        } else {
          console.log(`[❌] No icons found in: ${iconsPath}`);
        }
      }

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

export default supersvgPlugin;
