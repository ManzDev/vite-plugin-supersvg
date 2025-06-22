import { SVGSpriter, addSVGFilesToSpriter, compileAndWriteSprite } from "./SVGSpriter.js";
import { mkdir, readFile, readdir } from "node:fs/promises";

import { getIconFolders } from "./getIconFolders.js";
import { getOrphanIcons } from "./getOrphanIcons.js";
import { getSpriteConfig } from "./getSpriteConfig.js";

import { join } from "node:path";

export const hasSVGIcons = async (srcDir) => {
  try {
    const folders = await getIconFolders(srcDir);

    const results = await Promise.all(
      folders.map(async (folder) => {
        const files = await readdir(join(srcDir, folder.name));
        return files.some(f => f.endsWith('.svg'));
      })
    );

    return results.includes(true);
  } catch (error) {
    console.error(`[❌] Error reading SVG icons in ${srcDir}:`, error);
    return false;
  }
};

export const generateSprites = async (options) => {
  await mkdir(options.destDir, { recursive: true });

  // SVG Folders
  let folders = await getIconFolders(options.srcDir);

  // No se permite la carpeta "default" (es para "orphan icons")
  folders = folders.filter((folder) => {
    if (folder.name === "default") {
      console.error(`[❌] Folder named 'default' is reserved and will be ignored.`);
      return false;
    }
    return true;
  });

  await Promise.all(folders.map(async (folder) => {
    const folderPath = join(options.srcDir, folder.name);
    const config = getSpriteConfig(folder.name, options.config);
    const spriter = new SVGSpriter(config);

    await addSVGFilesToSpriter(spriter, folderPath);
    await compileAndWriteSprite(spriter, folder.name, options.destDir);
  }));

  // SVG Orphans (edge case)
  const orphanIcons = await getOrphanIcons(options.srcDir);

  if (orphanIcons.length > 0) {
    const spriter = new SVGSpriter(getSpriteConfig("default", options.config));

    await Promise.all(orphanIcons.map(async (filePath) => {
      const content = await readFile(filePath, "utf8");
      spriter.add(filePath, null, content);
    }));

    await compileAndWriteSprite(spriter, "default", options.destDir);
  }

  console.log("[✅] Sprites regenerated.");
};
