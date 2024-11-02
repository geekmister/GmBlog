import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh-CN/index'
    },
    en: {
      label: 'English',
      lang: 'en', // 可选，将作为 `lang` 属性添加到 `html` 标签中
      link: '/en/index' // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
    }
  },
  title: "Geekmister",
  description: "Blog of Geekmister...",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '专栏', 
        items: [
          { text: '前端', link: '/zh-CN/front-end' },
          { text: '后端', link: '/zh-CN/back-end' }
        ]
      },
      { text: '书', link: '/markdown-examples' },
      { text: '小册子', link: '/api-examples' },
      { text: '关于', link: '/zh-CN/ops' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/geekmister' },
      { icon: 'x', link: 'https://github.com/geekmister' },
    ]
  }
})
