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
    
    // Persistent color assignment for each link
    const colors = [
      '#3498db', '#2ecc71', '#9b59b6', '#1abc9c', 
      '#4ecdc4', '#45b7d1', '#96ceb4', '#a29bfe'
    ]
    
    const assignColorsToLinks = () => {
      const indexPageLinks = document.querySelectorAll('.index-page a')
      indexPageLinks.forEach((link, index) => {
        const color = colors[index % colors.length]
        ;(link as HTMLElement).style.setProperty('--hover-color', color)
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
  }
} satisfies Theme
