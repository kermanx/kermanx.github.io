import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import './style.css'
import Layout from './Layout.vue'
import ExtLink from './components/ExtLink.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('ExtLink', ExtLink)

    const assignColorsToLinks = () => {
      const colors = [
        '#3498db', '#2ecc71', '#9b59b6', '#1abc9c',
        '#45b7d1', '#a29bfe'
      ].sort(() => Math.random() - 0.5)

      const indexPageLinks = document.querySelectorAll('.index-page .VPDoc a')
      indexPageLinks.forEach((link, index) => {
        const color = colors[index % colors.length]
          ; (link as HTMLElement).style.setProperty('--hover-color', color)
      })
    }

    // Add event listener when app is mounted
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        assignColorsToLinks()
        // Also reassign colors when DOM changes
        const observer = new MutationObserver(() => {
          setTimeout(assignColorsToLinks, 100)
        })
        observer.observe(document.body, { childList: true, subtree: true })
      }, 100)
    }

    const oldBeforeRouteChange = router.onBeforeRouteChange
    router.onBeforeRouteChange = to => {
      const matchTreeShaker = to.match(/^\/tree-shaker(\.html)?(.*)$/)
      if (matchTreeShaker) {
        window.location.href = 'https://kermanx.com/jsshaker' + matchTreeShaker[2]
        return false
      }
      oldBeforeRouteChange?.(to)
    }
  }
} satisfies Theme
