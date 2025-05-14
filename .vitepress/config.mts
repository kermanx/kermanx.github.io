import { withMermaid } from "vitepress-plugin-mermaid";

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
      // Font.vite({
      //   scanFiles: [
      //     ".vitepress/config.mts",
      //     ".vitepress/theme/**/*",
      //     "notes/**/*",
      //     "weekly/**/*",
      //     "index.md",
      //   ],
      // }),
    ],
  },
  markdown: {
    theme: "light-plus",
    math: true,
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
