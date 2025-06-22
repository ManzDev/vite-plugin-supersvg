import { readFile, readdir, writeFile } from "node:fs/promises";
import SVGSpriter from "svg-sprite";
import { join } from "node:path";

const addSVGFilesToSpriter = async (spriter, folderPath) => {
  const files = await readdir(folderPath);
  const svgFiles = files.filter((f) => f.endsWith(".svg"));

  await Promise.all(svgFiles.map(async (file) => {
    const filePath = join(folderPath, file);
    const content = await readFile(filePath, "utf8");
    spriter.add(filePath, null, content);
  }));
};

const compileAndWriteSprite = async (spriter, spriteName, destDir) => {
  const { result } = await spriter.compileAsync();

  for (const mode of Object.values(result)) {
    for (const output of Object.values(mode)) {
      const outputPath = join(destDir, `${spriteName}.svg`);
      // oxlint-disable-next-line no-await-in-loop
      await writeFile(outputPath, output.contents);
    }
  }
};

export {
  addSVGFilesToSpriter,
  compileAndWriteSprite,
  SVGSpriter
}
