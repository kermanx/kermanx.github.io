import { withMermaid } from "vitepress-plugin-mermaid";
import UnoCSS from "unocss/vite";
import {
  presetIcons,
  presetWind3,
  presetAttributify,
  transformerDirectives,
} from "unocss";
import mslTmLanguage from "./syntaxes/msl.tmLanguage.json";
import typstTmLanguage from "./syntaxes/typst.tmLanguage.json";
import typstCodeTmLanguage from "./syntaxes/typst-code.tmLanguage.json";
import mlirTmLanguage from "./syntaxes/mlir.tmLanguage.json";
import tablegenTmLanguage from "./syntaxes/tablegen.tmLanguage.json"
import highlightInline from "./plugins/highlight-inline";

export default withMermaid({
  title: "_Kerman",
  description: "This is a random website.",
  themeConfig: {
    siteTitle: "_Kerman",
    sidebar: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Notes",
        link: "/notes/",
      },
      {
        text: "PL Exploration",
        link: "/PL/",
      },
      {
        text: "Projects",
        link: "/projects/",
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
    languages: [
      mslTmLanguage as any,
      {
        ...typstTmLanguage,
        "aliases": [
          "Typst",
          "typ"
        ],
        "tokenTypes": {
          "punctuation.definition.string.begin.math.typst": "other",
          "punctuation.definition.string.end.math.typst": "other"
        },
        "balancedBracketScopes": [
          "meta.expr",
          "meta.brace",
          "markup.math.typst"
        ],
        "unbalancedBracketScopes": [
          "markup.content.brace.typst",
          "markup.raw.block.typst",
          "markup.raw.inline.typst",
          "string.other.label.typst",
          "string.quoted.double.typst",
          "constant.other.symbol.typst",
          "constant.character.escape",
          "comment.block.typst",
          "comment.line.double-slash.typst"
        ]
      },
      {
        ...typstCodeTmLanguage,
        "aliases": [
          "Typst (Code Mode)",
          "typc"
        ],
        "tokenTypes": {
          "punctuation.definition.string.begin.math.typst": "other",
          "punctuation.definition.string.end.math.typst": "other"
        },
        "balancedBracketScopes": [
          "meta.expr",
          "meta.brace",
          "markup.math.typst"
        ],
        "unbalancedBracketScopes": [
          "markup.content.brace.typst",
          "markup.raw.block.typst",
          "markup.raw.inline.typst",
          "string.other.label.typst",
          "string.quoted.double.typst",
          "constant.other.symbol.typst",
          "constant.character.escape",
          "comment.block.typst",
          "comment.line.double-slash.typst"
        ]
      },
      {
        ...mlirTmLanguage,
        "id": "mlir",
        "aliases": [
          "mlir"
        ],
        "extensions": [
          ".mlir",
          ".mlirbc"
        ],
      },
      {
        ...tablegenTmLanguage,
        "aliases": [
          "tablegen"
        ],
      }
    ],
    config: (md) => {
      md.use(highlightInline);
    },
  },
  appearance: false,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.svg",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        href: "/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.svg",
        media: "(prefers-color-scheme: light)",
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
