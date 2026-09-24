export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
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
