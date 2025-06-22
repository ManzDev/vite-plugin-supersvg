import { readdir } from "node:fs/promises";

export const getIconFolders = async (baseDir) => {
  try {
    const entries = await readdir(baseDir, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory());
  } catch (error) {
    console.error(`[❌] Error reading ${baseDir}:`, error);
    return [];
  }
};
