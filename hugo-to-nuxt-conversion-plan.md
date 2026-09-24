# Hugo to Nuxt Conversion Plan

## Goal

Replace the Hugo site with a working statically generated Nuxt application while preserving the existing content, public URLs, SEO metadata, and feeds.

The initial Nuxt UI will intentionally be bare-bones: semantic HTML with black text on a white background and only enough CSS for readable content. Recreating or redesigning the Hugo theme is out of scope. UI design will happen later through review and iteration with the site owner.

## Working Rules

- Complete the steps in order.
- Create one Git commit after each implementation step that changes files.
- Run the relevant local checks before each commit.
- Do not configure the Netlify site, trigger a Netlify deployment, change production settings, or perform the production cutover.
- Do not begin UI design work without reviewing the functional Nuxt template with the site owner.
- Preserve unrelated worktree changes if any appear during the migration.

## 1. Create the Initial Commit

Establish the current Hugo site as the migration baseline before replacing anything.

- Add an appropriate `.gitignore` for Hugo and generated output.
- Exclude generated files and directories such as `public/`, `resources/`, and `.hugo_build.lock` from source control.
- Keep the Hugo source, configuration, content, theme reference, assets, current Netlify configuration, and this migration plan.
- Verify that the repository contains the files needed to reproduce the existing Hugo site.
- Create the initial Git commit.

Suggested commit message: `chore: capture Hugo site baseline`

## 2. Set Up the Nuxt Application

Replace the Hugo application structure with a minimal Nuxt application.

- Initialize Nuxt with TypeScript and a committed package-manager lockfile.
- Add Nuxt Content for file-based Markdown content.
- Configure static generation.
- Set the canonical site URL to `https://www.michaelborn.me` in application configuration.
- Add a minimal application shell using semantic HTML.
- Add only basic readable styles: black text, white background, sensible spacing, and responsive content width.
- Do not port the Hugo theme, navigation styling, dark mode, animations, fonts, or other visual design.
- Remove Hugo-specific application and theme files once their required behavior has been accounted for.
- Verify dependency installation, type checking if available, and a production static build.
- Commit the completed Nuxt setup.

Suggested commit message: `feat: initialize Nuxt application`

## 3. Migrate Existing Content

Move all existing blog posts into the Nuxt Content structure without rewriting their prose.

- Migrate all 23 Markdown posts from `content/posts/`.
- Convert TOML frontmatter to the frontmatter format supported by Nuxt Content.
- Preserve each post's filename-derived slug, title, publication date, tags, draft status, Markdown body, external links, images, and code blocks.
- Define and validate a consistent content schema for title, date, tags, and draft state.
- Ensure draft posts are excluded from public queries.
- Define explicit handling for future-dated posts and apply it consistently.
- Confirm Markdown rendering, syntax highlighting, headings, lists, links, and externally hosted images work in the generated site.
- Verify that every source post has a corresponding Nuxt content file.
- Run the production static build and commit the migration.

Suggested commit message: `feat: migrate Hugo posts to Nuxt Content`

## 4. Restore Public Routes and Functionality

Implement the functional page structure while preserving existing URL paths.

- `/` lists posts in reverse chronological order with no hard-coded five-post limit.
- `/posts/` lists all published posts, grouped by year if practical.
- `/posts/[slug]/` renders an individual article.
- `/tags/` lists the available tags.
- `/tags/[tag]/` lists all published posts with the selected tag.
- Add a functional custom 404 page.
- Preserve the existing `/posts/<slug>/` and `/tags/<tag>/` URL scheme, including trailing-slash behavior where static generation requires it.
- Generate every post and tag route during the static build.
- Add basic navigation links for home, posts, and tags without visual design work.
- Verify all expected routes build successfully and that internal links do not point to missing pages.
- Commit the route implementation.

Suggested commit message: `feat: restore blog and tag routes`

## 5. Restore SEO and Feeds

Restore machine-readable metadata and outputs required for continuity with the Hugo site.

- Add default site title and description metadata.
- Add per-post page titles, canonical URLs, descriptions or excerpts, publication dates, and Open Graph article metadata.
- Generate `sitemap.xml` containing the homepage, archive, post, and tag routes.
- Generate `robots.txt`.
- Generate the RSS feed at `/index.xml` so the existing feed URL remains valid.
- Preserve `https://www.michaelborn.me` as the canonical origin.
- Keep the existing non-`www` to `www` redirect declaration available for later Netlify use, but do not deploy or test it against production.
- Compare the generated post and tag URLs with the existing Hugo sitemap to identify accidental URL changes.
- Run the production static build and locally inspect the generated metadata, sitemap, robots file, and RSS feed.
- Commit the SEO and feed implementation.

Suggested commit message: `feat: restore SEO metadata and feeds`

## 6. Stop and Report Progress

After Step 5 is committed:

- Stop implementation work.
- Report the commits created, checks run, known limitations, and any URL or content discrepancies.
- Provide the local commands needed to run and inspect the Nuxt site.
- Review the bare-bones Nuxt page template with the site owner.
- Wait for explicit direction before iterating on the UI or performing any deployment-related work.

This reporting step should not create an empty commit.

## Manual-Only Follow-Up

The following work corresponds to the former deployment and cutover steps and must be performed by the site owner. The implementation agent must not attempt it.

### 7. Configure and Preview on Netlify

- Review and approve the Netlify build command, publish directory, and Node version.
- Update the Netlify site configuration.
- Push the migration commits to the connected remote and branch.
- Trigger and inspect a Netlify deploy preview.
- Confirm the non-`www` to `www` redirect in the hosted environment.

### 8. Verify and Perform the Production Cutover

- Review the deploy preview on desktop and mobile.
- Check all posts, tags, feeds, metadata, redirects, and representative external images.
- Compare important Hugo URLs with the preview and add redirects for any intentional changes.
- Approve the UI separately after functional review and iteration.
- Publish the production deployment and monitor for broken links or build failures.

Steps 7 and 8 are manual only. Do not execute them as part of the automated migration.

## Completion Criteria Before the Manual Follow-Up

- The Nuxt application installs and generates successfully locally.
- All 23 posts are represented in Nuxt Content.
- Published posts are available through their existing `/posts/<slug>/` paths.
- The homepage is not limited to five posts.
- Post archive and tag routes work in the generated output.
- Canonical metadata, sitemap, robots file, and RSS feed are generated.
- The UI remains deliberately minimal and ready for later collaborative design work.
- Steps 1 through 5 each have their own successful Git commit.
