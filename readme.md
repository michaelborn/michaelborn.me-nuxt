[![Netlify Status](https://api.netlify.com/api/v1/badges/f4eeb915-aefa-46c5-a24d-58311231bbcc/deploy-status)](https://app.netlify.com/sites/michaelborn/deploys)

# Developer Distinction

Live View @ [michaelborn.me](https://michaelborn.me/)

* Framework: [Nuxt](https://nuxt.com/)
* Content: [Nuxt Content](https://content.nuxt.com/)
* Hosted at [Netlify](https://netlify.com)

## Local development

```bash
npm install
npm run dev
```

Generate the static production output with `npm run generate`.
Run `npm run preview` to serve `.output/public` locally.
Use Node.js 22.18+ (verified with Node.js 24.20).

## Writing posts

Add a Markdown file under `content/posts/`. Its filename is its permanent URL slug.

```yaml
---
title: "My new post"
date: '2026-09-23T12:00:00-04:00'
tags: ['javascript']
draft: false
---
```

Tags use lowercase, hyphenated URL slugs. Dates require an explicit timezone.
Drafts and future-dated posts are excluded at build time, including from the
downloadable content database. Scheduled posts need a new build after their
publication time. Restart `npm run dev` after changing draft status or publication
dates so the collection's inclusion rules are recalculated.

## Local checks

```bash
npm run typecheck
npm run generate
npx playwright install chromium
npm run test:e2e
```

The generated-site check covers every post and tag, chronological listings,
internal links and anchors, code examples, image references, and the static 404.
Browser checks exercise navigation, hydration, a mobile viewport, and unknown URLs.
The same verification checks canonical/Open Graph metadata, XML validity,
sitemap coverage, robots, and the root, archive, and per-tag RSS feeds.

The same checks run in GitHub Actions on pushes and pull requests to `main`
(see `.github/workflows/build.yml`).

Two broken article links were corrected during migration: the relative Hibernate
article link in `redirecting-hibernate-logs.md` and the missing HTTPS scheme in
`localizing-dates-mssql.md`. Article prose is otherwise preserved.

Source assets belong in `static/`.

## Tips and gotchas

- Tailwind classes used on `<html>` or `<body>` should be declared in `app.vue`
  via `useHead()` (or in the CSS itself), not in `nuxt.config.ts` `app.head`.
  Tailwind v4 does not reliably scan `nuxt.config.ts`, so utilities such as
  `dark:bg-black` can be dropped from the production CSS if they only appear
  there.
- Dark mode is handled by `@nuxtjs/color-mode`, which adds the `.dark` class to
  `<html>`. The class-based variant is configured in
  `app/assets/css/main.css` with `@custom-variant dark (&:where(.dark, .dark *));`.
- The theme toggle is `app/components/App/ThemeToggle.vue`.
- Restart `npm run dev` after changing post draft status or publication dates so
  the Nuxt Content collection rules are recalculated.
- Always run `npm run generate` and `npm run test:e2e` before deploying; the
  static build catches broken internal links, missing images, and RSS/XML errors.

## SEO and feeds

Site identity is configured in `shared/site.ts`. Each page emits an absolute
canonical URL under `https://www.michaelborn.me`, with trailing slashes for content
pages. Post descriptions are derived from their Markdown by Nuxt Content.

`npm run generate` prerenders the server handlers to static files:

- `/sitemap.xml` and `/robots.txt`
- `/index.xml` and `/posts/index.xml`
- `/tags/index.xml` and `/tags/<tag>/index.xml`

Feeds contain published articles with summaries, stable permalink GUIDs, original
publication dates, and categories.