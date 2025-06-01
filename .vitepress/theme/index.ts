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
  }
} satisfies Theme
