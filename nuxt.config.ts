import tailwindcss from '@tailwindcss/vite'
import { readPosts } from './lib/content'
import { site } from './shared/site'

const publishedPosts = readPosts().filter(post => post.published)
const tags = [...new Set(publishedPosts.flatMap(post => post.tags))].sort()

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/color-mode', '@nuxt/icon', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  // Hugo's ignored public/ folder contains old HTML, not source assets.
  dir: { public: 'static' },
  vite: {
    plugins: [tailwindcss()],
  },
  colorMode: {
    classSuffix: '',
  },
  icon: {
    serverBundle: { collections: ['solar', 'mdi', 'simple-icons'] },
    clientBundle: {
      scan: true,
      // Bound dynamically via shared/site.ts, so they can't be scan-detected.
      icons: ['mdi:github', 'mdi:linkedin', 'simple-icons:x'],
    },
  },
  fonts: {
    families: [{ name: 'Inter', provider: 'google', weights: [400, 500, 600, 700, 800, 900] }],
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: { default: 'github-light', dark: 'github-dark' },
          langs: ['js', 'ts', 'html', 'bash', 'sh', 'sql', 'json', 'xml'],
        },
      },
    },
  },
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en-US' },
      title: site.title,
      meta: [
        {
          name: 'description',
          content: site.description,
        },
      ],
      link: [{ rel: 'alternate', type: 'application/rss+xml', title: site.title, href: '/index.xml' }],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: site.url,
    },
  },
  nitro: {
    preset: 'static',
    prerender: {
      failOnError: true,
      routes: [
        '/', '/posts/', '/tags/',
        ...publishedPosts.map(post => post.path),
        ...tags.map(tag => `/tags/${tag}/`),
        '/index.xml', '/posts/index.xml', '/tags/index.xml',
        '/sitemap.xml', '/robots.txt',
        ...tags.map(tag => `/tags/${tag}/index.xml`),
      ],
    },
  },
  compatibilityDate: '2026-09-23',
})
