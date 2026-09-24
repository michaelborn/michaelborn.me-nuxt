import { readPosts } from './lib/content'

const publishedPosts = readPosts().filter(post => post.published)
const tags = [...new Set(publishedPosts.flatMap(post => post.tags))].sort()

export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  // Hugo's ignored public/ folder contains old HTML, not source assets.
  dir: { public: 'static' },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-light',
          langs: ['js', 'ts', 'html', 'bash', 'sh', 'sql', 'json', 'xml'],
        },
      },
    },
  },
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en-US' },
      title: 'Developer Distinction',
      meta: [
        {
          name: 'description',
          content: 'Articles by full-stack software engineer Michael Born.',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://www.michaelborn.me',
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
      ],
    },
  },
  compatibilityDate: '2026-09-23',
})
