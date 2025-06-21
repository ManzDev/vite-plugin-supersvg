# 🧪 vite-plugin-supersvg

> Porque mantener tus sprites SVG actualizados manualmente es doloroso.

Este plugin para **Vite** se encarga de observar cambios en tu carpeta de íconos SVG y regenerar automáticamente sprites organizados por carpetas, de modo que sean fácilmente utilizables en tus proyectos, sin necesidad de Javascript. Directamente con HTML.

## 🧠 ¿Qué hace este plugin?

- Observa las carpetas en `src/icons/`
- Genera un archivo `.svg` con múltiples iconos (sprite svg) por cada carpeta.
- Genera los sprites en `public/assets/icons/` con el nombre de la carpeta.
- Vuelve a generar cuando:
  - Se añade un SVG a `src/icons/`
  - Se modifica un SVG de `src/icons/`
  - Se elimina un SVG de `src/icons/`

## 📦 Instalación

```bash
npm install -D @manzdev/vite-plugin-supersvg
```

## ⚙️ Configuración

<details name="config" open>
  <summary>1️⃣ Vite</summary>

Agrega el plugin en tu `vite.config.js` o `vite.config.ts`:

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

Si estás usando Astro, también puedes usarlo, ya que Astro usa Vite:

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

## 📁 Uso

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

Esto generará:

```
public/
└── assets/
    └── icons/
        ├── social.svg (con twitter y github)
        └── ui.svg (con close y menu)
```

Cada archivo `.svg` en `public/assets/icons` es un sprite listo para usar con:

```html
<svg><use href="/assets/icons/social.svg#twitter" /></svg>
```

## 💡 Consejos al usar iconos

- Puedes utilizar [icones](https://icones.js.org/) para buscar y descargar iconos.

- Si usas `fill="currentColor"` o `stroke="currentColor"` en tus iconos SVG, luego podrás usar la propiedad `color` de CSS para dar color a tus iconos SVG.

- Puedes utilizar [variables CSS](https://lenguajecss.com/css/variables-css/css-custom-properties/) en tus atributos SVG para personalizar desde fuera aspectos como colores, tamaños, etc.

## 🛠 API

Si lo deseas, puedes personalizar las carpetas o configuración:

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

Puedes ver las opciones que puedes pasar a `config` en la documentación de [svg-sprite](https://github.com/svg-sprite/svg-sprite?tab=readme-ov-file#configuration-basics).

## 📡 Dependencias

- [svg-sprite](https://github.com/svg-sprite/svg-sprite): El generador de sprites SVG.
- [Node](https://nodejs.org/) >= 18
- [Vite](https://vite.dev/)

## 🧼 Cosas que no hace (todavía)

- No borra los sprites si eliminas una carpeta entera.
- No da abrazos.

