# Site Update Plan — professionalism & hireability pass

Goal: make michaelborn.me read better to recruiters, hiring managers, and senior engineers
who land here from a post, a resume link, or a search result.

Guardrails (per Michael):

- No redesign. The current minimal Tailwind look stays.
- No content overhaul. Existing posts stay as they are (except a small proofread pass, below).
- Suggestions only — nothing below has been applied.

Ranked by hiring impact, not effort.

---

## 1. Add an About page (highest impact)

There is no About page. Recruiters who click through from a resume or LinkedIn look for
one within seconds; its absence is the single biggest gap right now.

- New file: `app/pages/about.vue` (matches existing page style, no new design).
- Short bio: who you are, what you work in (CFML/Lucee, JavaScript, SQL, Elasticsearch),
  what this blog is (notes from real production work), and a contact line.
- Add an `About` item to `App/Navbar.vue` `items` (icon: `solar:user-outline` or similar).
- Add `/about/` to the `nitro.prerender.routes` list in `nuxt.config.ts`.
- The Playwright nav tests target links by name, so an extra nav item won't break them.

Keep it to one screen of text. Personality allowed — one sentence, not a hobby section.

## 2. Rewrite the home intro (your idea)

`app/components/Home/Intro.vue` currently ends with "...I can be found pedaling furiously
along a winding country road." Swap for something that states what you do and what the
site is. Draft options:

- A. Straight professional:
  "Michael Born — fullstack software engineer. I write about CFML, JavaScript, and the
  lessons I learn building and maintaining software in production."
- B. More academic:
  "I'm Michael Born, a fullstack software engineer. This site is where I document what
  I learn about CFML, JavaScript, and software development — from query design to
  cluster tuning."
- C. Professional with a trace of personality (recommended):
  "Michael Born — fullstack software engineer writing about CFML, JavaScript, and the
  craft of software development. Away from the keyboard, I'm usually on a bike."

Also consider updating `shared/site.ts` `description` to match the new framing, e.g.:
"Articles on CFML, JavaScript, Elasticsearch, and software development by fullstack
engineer Michael Born." (Mentioning Elasticsearch is now earned — see suggestion 5.)

## 3. AI policy note (your idea)

Good instinct — reviewers increasingly ask "is this AI slop?" A short, matter-of-fact
note preempts it. Two placements:

- Footer one-liner (in `app.vue` footer, above or below `FooterCopyright`):
  - "All posts are written by me. I use AI tools for research and proofreading — not
    to write."
  - or: "Every word here is mine. AI helps me research; it doesn't ghostwrite."
- Fuller paragraph on the About page:
  "I write every post myself. I use AI assistants while researching — to find primary
    sources, check syntax, and pressure-test claims before I publish. The final wording,
    code, and opinions are always my own."

Keep it to one or two sentences; over-explaining reads as defensive.

## 4. Add `description` front matter to posts

`ArticleCard.vue` and `usePageSeo()` already support a `description`, but no post has
one — so every post's meta/OG description falls back to the generic site description,
and the home and archive lists show title-only cards.

- Add a 1–2 sentence `description` to front matter, at minimum for recent and
  high-traffic posts (Elasticsearch, `why-cf`, `cf-legacy`, `cfscript-gotchas`).
- Zero code changes; improves link previews, SEO, and list scannability.

## 5. Accuracy pass on the Elasticsearch post

This post will surface in Elasticsearch searches and be read by ES engineers — errors
there hurt more than no post at all. Specific items in
`content/posts/elasticsearch-performance.md`:

- "Adjust `indices.fielddata.cache.size` to allow unbounded field cache growth" —
  backwards; the setting exists to *bound* the fielddata cache.
- "Ensure `search.allow_expensive_queries` is enabled" — backwards; you *disable*
  expensive queries to block the features listed earlier in the post.
- "node heap size - it should be at least 50% of available RAM" — Elastic's guidance is
  heap *at most* ~50% of RAM (and leave room for OS caches); "at least 50%" reads wrong.
- Typos: "longterm" → "long-term"; the final sentence is missing a period.

Suggest a quick self-review of any other recent post before it's shared around.

## 6. Favicon (small polish, noticeable absence)

`static/` contains only `404.html` — the site has no favicon, so browsers and search
results show a generic blank tab. Add a simple SVG favicon (e.g. teal rounded square
with "MB", matching `primary-600`) as `static/favicon.svg` plus a `<link rel="icon">`.
Declare it in `app.vue` via `useHead()` — not `nuxt.config.ts` `app.head`, per the
known Tailwind/head gotcha in AGENTS.md (that one is about Tailwind classes, but
keeping head config in `app.vue` is the established pattern here).

Optional companion: a default `og.png` (1200x630, site title + name) so link previews
on LinkedIn/X aren't bare. LinkedIn is where recruiters will paste this URL.

## 7. Surface an email link

`michaelborn@duck.com` exists in `shared/site.ts` but appears nowhere on the page.
Add an email icon (mdi:email) to `FooterSocialLinks.vue`, or just put the address in
text on the About page. A recruiter should never have to view-source to contact you.

## 8. Optional / low priority

- JSON-LD author markup (`Person` with `sameAs` GitHub/LinkedIn) on the home page and
  `Article` schema on posts — helps Google attribute authorship; invisible, no design.
- Consider whether "Developer Distinction" should remain the `<title>` brand on the
  home page vs. leading with your name (e.g. "Michael Born — Developer Distinction").
  A recruiter's tab strip should show the name; this is a one-line change in
  `usePageSeo`/`index.vue` if wanted.

---

## Suggested order

1. About page + nav item (1)
2. Intro rewrite + `site.ts` description (2)
3. AI policy line (3) — cheap, do it alongside (2)
4. Favicon (6) and email link (7) — five minutes each
5. Post descriptions (4) — start with new posts, backfill when bored
6. Elasticsearch accuracy pass (5) before that post gets shared anywhere
7. JSON-LD / title tweak (8) only if the mood strikes

Before deploying any of the above: restart the dev server after front-matter changes,
run `npm run generate` and `npm run test:e2e` (per AGENTS.md), and add any new route
to the prerender list in `nuxt.config.ts`.
