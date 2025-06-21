# 🧪 vite-plugin-supersvg

> Because manually keeping your SVG sprites updated is painful.

This plugin for **Vite** watches for changes in your SVG icon folders and automatically regenerates sprites organized by folder, so they can be easily used in your projects—without needing JavaScript. Just plain HTML.

## 🧠 What does this plugin do?

- Watches folders in `src/icons/`
- Generates one `.svg` file (SVG sprite) per folder, combining all icons.
- Outputs the sprites to `public/assets/icons/` using the folder name.
- Regenerates when:
  - An SVG is added to `src/icons/`
  - An SVG is modified in `src/icons/`
  - An SVG is deleted from `src/icons/`

## 📦 Installation

```bash
npm install -D vite-plugin-supersvg
```

## ⚙️ Configuration

<details name="config" open>
  <summary>1️⃣ Vite</summary>

Add the plugin to your `vite.config.js` or `vite.config.ts`:

```js
import supersvgPlugin from 'vite-plugin-supersvg';

export default {
  plugins: [
    supersvgPlugin()
  ]
};
```

</details>
<details name="config">
  <summary>2️⃣ Astro</summary>

If you're using Astro, you can also use this plugin—Astro runs on Vite:

```js
import { defineConfig } from "astro/config";
import supersvgPlugin from 'vite-plugin-supersvg';

export default defineConfig({
  vite: {
    plugins: [
      supersvgPlugin()
    ]
  }
});
```
</details>

## 📁 Usage

```
src/
└── icons/
    ├── social/
    │   ├── twitter.svg
    │   └── github.svg
    └── ui/
        ├── close.svg
        └── menu.svg
```

This will generate:

```
public/
└── assets/
    └── icons/
        ├── social.svg (con twitter y github)
        └── ui.svg (con close y menu)
```

Each `.svg` file in `public/assets/icons` is a sprite ready to be used like this:

```html
<svg><use href="/assets/icons/social.svg#twitter" /></svg>
```

## 💡 Tips for using icons

- You can use [icones](https://icones.js.org/) to search and download icons.

- If you use `fill="currentColor"` or `stroke="currentColor"` in your SVGs, you can then control the icon color via the CSS `color` property.

- You can use [CSS variables](https://lenguajecss.com/css/variables-css/css-custom-properties/) in your SVG attributes to externally customize things like color, size, etc.

## 🛠 API

If you wish, you can customize the folders or configuration:

```js
import supersvgPlugin from 'vite-plugin-supersvg';

export default {
  plugins: [
    supersvgPlugin({
      srcDir: 'src/svgicons/',
      destDir: 'public/icons/',
      config: {
        shape: {
          spacing: { padding: 2 },
        },
      },
    })
  ]
};
```

You can check the options available in `config` in the [svg-sprite documentation](https://github.com/svg-sprite/svg-sprite?tab=readme-ov-file#configuration-basics).

## 📡 Dependencies

- [svg-sprite](https://github.com/svg-sprite/svg-sprite): The SVG sprite generator.
- [Node](https://nodejs.org/) >= 18
- [Vite](https://vite.dev/)

## 🧼 Things it doesn't do (yet)

- It doesn’t delete sprites if you remove an entire folder.
- It doesn’t give hugs.
