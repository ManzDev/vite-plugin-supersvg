import type { Config as SvgSpriteConfig } from "@types/svg-sprite";

/**
 * Options for the vite-plugin-supersvg plugin.
 * @property srcDir Source directory for SVG icons.
 * @property destDir Destination directory for generated sprites.
 * @property config Additional options for svg-sprite.
 */
export interface SupersvgPluginOptions {
  /** Source directory for SVG icons. */
  srcDir?: string;
  /** Destination directory for generated sprites. */
  destDir?: string;
  /** Whether to generate sprites lazily (on demand). */
  lazy?: boolean;
  /** Additional options for svg-sprite. */
  config?: SvgSpriteConfig;
}

/**
 * Creates sprites for your SVG icon files.
 * @param options Options for the plugin.
 */
declare function supersvgPlugin(options?: SupersvgPluginOptions);

export default supersvgPlugin;
