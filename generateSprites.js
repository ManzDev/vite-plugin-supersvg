import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import SVGSpriter from "svg-sprite";

const getSpriteConfig = (spriteName, options = {}) => ({
  mode: {
    defs: false,
    css: false,
    view: false,
    stack: false,
    symbol: {
      sprite: `${spriteName}.svg`,
    },
  },
  ...options
});

const getIconFolders = async (baseDir) => {
  try {
    const entries = await readdir(baseDir, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory());
  } catch (err) {
    console.error(`[❌] Error reading ${baseDir}:`, err);
    return [];
  }
};

const getOrphanIcons = async (baseDir) => {
  try {
    const entries = await readdir(baseDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".svg"))
      .map((entry) => path.join(baseDir, entry.name));
  } catch (err) {
    console.error(`[❌] Error reading orphan icons in ${baseDir}:`, err);
    return [];
  }
};

const addSVGFilesToSpriter = async (spriter, folderPath) => {
  const files = await readdir(folderPath);
  const svgFiles = files.filter((f) => f.endsWith(".svg"));

  await Promise.all(svgFiles.map(async (file) => {
    const filePath = path.join(folderPath, file);
    const content = await readFile(filePath, "utf8");
    spriter.add(filePath, null, content);
  }));
};

const compileAndWriteSprite = async (spriter, spriteName, destDir) => {
  const { result } = await spriter.compileAsync();

  for (const mode of Object.values(result)) {
    for (const output of Object.values(mode)) {
      const outputPath = path.join(destDir, `${spriteName}.svg`);
      // eslint-disable-next-line no-await-in-loop
      await writeFile(outputPath, output.contents);
    }
  }
};

export const generateSprites = async (options) => {
  await mkdir(options.destDir, { recursive: true });

  // SVG Folders
  const folders = await getIconFolders(options.srcDir);

  await Promise.all(folders.map(async (folder) => {
    const folderPath = path.join(options.srcDir, folder.name);
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
