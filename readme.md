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

Run `npm run verify:content` to compare the migrated posts with the original Hugo
baseline. This migration-only check is expected to change once articles are edited.

## Local checks

```bash
npm run typecheck
npm run verify:content
npm run generate
npm run verify:site
npx playwright install chromium
npm run test:e2e
```

The generated-site check covers every post and tag, chronological listings,
internal links and anchors, code examples, image references, and the static 404.
Browser checks exercise navigation, hydration, a mobile viewport, and unknown URLs.
The same verification checks canonical/Open Graph metadata, XML validity,
sitemap coverage, robots, and the root, archive, and per-tag RSS feeds.
If an old Hugo sitemap is available, compare URLs with
`npm run verify:site -- public/sitemap.xml` (the sitemap is not needed for normal builds).

Two broken article links were corrected during migration: the relative Hibernate
article link in `redirecting-hibernate-logs.md` and the missing HTTPS scheme in
`localizing-dates-mssql.md`. Article prose is otherwise preserved.

Source assets belong in `static/`. The old ignored Hugo `public/` directory is not
used by Nuxt. The former theme checkout may remain locally under ignored `themes/`,
but the application no longer depends on it or on Git submodules.

## SEO and feeds

Site identity is configured in `shared/site.ts`. Each page emits an absolute
canonical URL under `https://www.michaelborn.me`, with trailing slashes for content
pages. Post descriptions are derived from their Markdown by Nuxt Content.

`npm run generate` prerenders the server handlers to static files:

- `/sitemap.xml` and `/robots.txt`
- `/index.xml` and `/posts/index.xml`
- `/tags/index.xml` and `/tags/<tag>/index.xml`

Feeds contain published articles with summaries, stable permalink GUIDs, original
publication dates, and categories. No running application server is needed to serve
the generated output.

## Migration handoff

Implementation stops after the content, routes, SEO, and feeds are functional.
The next step is a human review of the minimal black-on-white template and then
collaborative UI iteration.

All 45 post/archive/tag URLs from the old local Hugo sitemap are preserved.
The TypeScript post and its `javascript` and `typescript` tag pages are now included.
Hugo's empty `/categories/` page is not carried over. External images retain their
existing remote URLs; the local checks verify references, not remote availability.

Netlify configuration and deployment are manual-only follow-ups. `netlify.toml`
still contains the original Hugo build settings and non-`www` to `www` redirect.
The site owner will need to update the build command to `npm run generate`, publish
directory to `.output/public`, and select a compatible Node version during Step 7.
No commits have been pushed and no hosted deployment or cutover has been performed.
