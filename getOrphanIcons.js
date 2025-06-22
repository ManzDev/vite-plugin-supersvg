import { readdir } from "node:fs/promises";

export const getOrphanIcons = async (baseDir) => {
  try {
    const entries = await readdir(baseDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".svg"))
      .map((entry) => path.join(baseDir, entry.name));
  } catch (error) {
    console.error(`[❌] Error reading orphan icons in ${baseDir}:`, error);
    return [];
  }
};
