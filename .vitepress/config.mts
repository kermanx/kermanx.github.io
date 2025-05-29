import { withMermaid } from "vitepress-plugin-mermaid";
import UnoCSS from "unocss/vite";
import {
  presetIcons,
  presetWind3,
  presetAttributify,
  transformerDirectives,
} from "unocss";
import mslTmLanguage from "./syntaxes/msl.tmLanguage.json";

export default withMermaid({
  title: "_Kerman",
  description: "",
  themeConfig: {
    siteTitle: "_Kerman",
    sidebar: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "PL",
        link: "/PL/",
      }
      // {
      //   text: "Notes",
      //   items: [
      //     {
      //       text: "Static Program Analysis",
      //       link: "/notes/spa",
      //     },
      //   ],
      // },
      // {
      //   text: "Weekly",
      //   items: fg.sync("weekly/*.md").map((path) => {
      //     const name = basename(path, ".md");
      //     return { text: name, link: `/weekly/${name}` };
      //   }),
      // },
    ],
  },
  vite: {
    plugins: [
      UnoCSS({
        inspector: false,
        presets: [presetWind3(), presetAttributify(), presetIcons()],
        transformers: [transformerDirectives()],
      }),
    ],
  },
  markdown: {
    theme: "light-plus",
    math: true,
    languages: [mslTmLanguage as any],
  },
  appearance: false,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc@5.1.1/index.min.css",
      },
    ],
  ],
});
