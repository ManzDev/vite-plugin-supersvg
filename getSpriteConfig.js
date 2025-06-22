export const getSpriteConfig = (spriteName, options = {}) => ({
  mode: {
    css: false,
    defs: false,
    stack: false,
    symbol: {
      sprite: `${spriteName}.svg`,
    },
    view: false,
  },
  ...options
});
