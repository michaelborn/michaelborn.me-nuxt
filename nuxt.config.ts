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
  },
  compatibilityDate: '2026-09-23',
})
