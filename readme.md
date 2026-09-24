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
