# Agent Notes

This is the source for [michaelborn.me](https://michaelborn.me), a static Nuxt 4 blog.

## Tech stack

- Nuxt 4.5.2 with Nitro static preset
- Nuxt Content 3 for Markdown posts
- Tailwind CSS 4 with `@tailwindcss/vite`
- `@nuxtjs/color-mode` for dark mode
- `@nuxt/icon` for icons
- `@nuxt/fonts` for Inter
- Playwright for end-to-end tests

## Project layout

- `app/` — Nuxt app root
  - `app.vue` — root component; global `useHead()` for `<html>`/`<body>` classes
  - `assets/css/main.css` — Tailwind entry, theme, and custom variants
  - `components/` — Vue components
  - `composables/` — shared Vue composables
  - `pages/` — file-based routes
- `content/posts/` — Markdown posts; filename becomes the URL slug
- `static/` — static assets (the `public/` directory is remapped here)
- `lib/` — shared Node/server utilities (e.g., `readPosts`)
- `shared/site.ts` — site identity (title, url, description)
- `server/routes/` — prerendered server handlers (RSS, sitemap, robots)
- `.github/workflows/build.yml` — CI checks

## Common commands

```bash
npm install
npm run dev          # dev server
npm run generate     # static production build into .output/public
npm run preview      # serve .output/public
npm run typecheck    # Vue/TypeScript type checking
npm run test:e2e     # Playwright tests (requires chromium)
```

Use Node.js 22.18+.

## Conventions

- Posts are Markdown with YAML front matter (`title`, `date`, `tags`, `draft`).
- Tags must be lowercase and hyphenated.
- Dates require an explicit timezone offset.
- Draft and future-dated posts are excluded from the build and the content DB.
- Source assets go in `static/`, not `public/` (remapped via `dir.public`).
- Components use PascalCase under `app/components/`.
- Tailwind theme colors are defined in `app/assets/css/main.css` with semantic
  names mapped to Tailwind's default palette (e.g., `--color-primary-*` to teal).

## Known gotchas

- Do **not** put Tailwind classes in `nuxt.config.ts` `app.head`. Tailwind v4
  does not reliably scan `nuxt.config.ts`, so utilities like `bg-gray-50` or
  `dark:bg-black` can be omitted from the production CSS. Declare them in
  `app.vue` via `useHead()` or apply them in CSS.
- Dark mode relies on `@nuxtjs/color-mode` adding `.dark` to `<html>`. The
  variant is configured in `main.css`:
  `@custom-variant dark (&:where(.dark, .dark *));`.
- Shiki's dual-theme variables are injected inline per code block by Nuxt
  Content, not in `main.css`. The light variable is `--shiki-default` (named
  after the theme key in `nuxt.config.ts`), not `--shiki-light`. The variables
  only exist on `.shiki` elements — never apply them to `html` or `body`.
- After changing a post's `draft` status or publication `date`, restart the dev
  server so Nuxt Content recalculates collection inclusion.
- `npm run generate` prerenders server routes including RSS and sitemap XML;
  always run it (and `npm run test:e2e`) before deploying.
