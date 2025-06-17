// Credit: https://www.npmjs.com/package/markdown-it-highlightjs

import type MarkdownIt from 'markdown-it'
import type { Options } from 'markdown-it'
import type Renderer from 'markdown-it/lib/renderer.mts'
import type StateCore from 'markdown-it/lib/rules_core/state_core.mts'
import type Token from 'markdown-it/lib/token.mts'



function inlineCodeLanguageRule(state: StateCore): void {
  for (const parentToken of state.tokens) {
    if (parentToken.type !== 'inline') {
      continue
    }

    if (parentToken.children == null) {
      continue
    }

    for (const token of parentToken.children) {
      if (token.type !== 'code_inline') {
        continue
      }

      if (token.attrs == null) {
        continue
      }

      const langIndex = token.attrs.findIndex(attr => attr[0].startsWith(':.'))
      if (langIndex === -1) {
        continue
      }
      const lang = token.attrs[langIndex][0].slice(2)
      token.meta = { ...token.meta, highlightLanguage: lang }
      token.attrs.splice(langIndex, 1)
    }
  }
}

export default function (md: MarkdownIt): void {
  md.core.ruler.before('linkify', 'inline_code_language', inlineCodeLanguageRule)

  md.renderer.rules.code_inline = inlineCodeRenderer

  function inlineCodeRenderer(tokens: Token[], idx: number, options: Options, env: any, slf: Renderer): string {
    const token = tokens[idx]

    if (options.highlight == null) {
      throw new Error('`options.highlight` was null, this is not supposed to happen')
    }

    const highlighted = options.highlight(token.content, token.meta?.highlightLanguage ?? '', '')

    const start = highlighted.indexOf('<span class="line">') + '<span class="line">'.length
    const end = highlighted.lastIndexOf('</span></code>')
    const content = highlighted.slice(start, end)

    return `<code${slf.renderAttrs(token)}>${content}</code>`
  }
}
