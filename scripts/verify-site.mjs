import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import { load } from 'cheerio'
import { XMLValidator } from 'fast-xml-parser'
import { readPosts } from '../lib/content.ts'

const output = new URL('../.output/public/', import.meta.url)
const allPosts = readPosts()
const posts = allPosts.filter(post => post.published)
const tags = [...new Set(posts.flatMap(post => post.tags))]
const routes = ['/', '/posts/', '/tags/', ...posts.map(post => post.path), ...tags.map(tag => `/tags/${tag}/`)]
const htmlAt = path => load(readFileSync(new URL(`.${path}index.html`, output), 'utf8'))
const postLinks = $ => $('.post-list a').map((_, link) => $(link).attr('href')).get()

for (const route of routes) {
  const $ = htmlAt(route)
  assert.equal($('main > section > h1, article > header > h1').length, 1, `${route}: missing page heading`)
  assert.equal($('link[rel="canonical"]').length, 1)
  assert.equal($('link[rel="canonical"]').attr('href'), `https://www.michaelborn.me${route}`)
  assert.equal($('meta[property="og:url"]').attr('content'), `https://www.michaelborn.me${route}`)
  assert.ok($('meta[name="description"]').attr('content')?.length)
  assert.equal($('meta[property="og:title"]').attr('content'), $('title').text())
  for (const element of $('a[href]').toArray()) {
    const target = new URL($(element).attr('href'), `https://www.michaelborn.me${route}`)
    if (target.origin !== 'https://www.michaelborn.me') continue
    const path = target.pathname
    const file = new URL(`.${path}${path.endsWith('/') ? 'index.html' : ''}`, output)
    assert.ok(existsSync(file), `${route}: broken link to ${path}`)
    if (target.hash && path.endsWith('/')) {
      const targetPage = path === route ? $ : htmlAt(path)
      const id = decodeURIComponent(target.hash.slice(1))
      assert.ok(targetPage('[id]').toArray().some(node => targetPage(node).attr('id') === id), `${route}: missing anchor ${target.href}`)
    }
  }
}

assert.deepEqual(postLinks(htmlAt('/')), posts.map(post => post.path), 'Homepage must include all posts, newest first')
assert.deepEqual(postLinks(htmlAt('/posts/')), posts.map(post => post.path), 'Archive must include all posts')
for (const tag of tags) {
  assert.deepEqual(postLinks(htmlAt(`/tags/${tag}/`)), posts.filter(post => post.tags.includes(tag)).map(post => post.path))
}
for (const post of posts) {
  const $ = htmlAt(post.path)
  assert.equal($('article > header > h1').text(), post.title)
  assert.equal($('title').text(), `${post.title} — Developer Distinction`)
  assert.equal($('meta[property="og:type"]').attr('content'), 'article')
  assert.equal($('meta[property="article:published_time"]').attr('content'), post.date)
  assert.equal($('article time').attr('datetime'), post.date)
  const codeBlocks = [...post.content.matchAll(/^```[^\n]*\n([\s\S]*?)^```/gm)]
  assert.equal($('pre code').length, codeBlocks.length, `${post.path}: missing code blocks`)
  codeBlocks.forEach((match, index) => {
    assert.equal($('pre code').eq(index).text().trimEnd(), match[1].trimEnd(), `${post.path}: altered code example`)
  })
  for (const [, alt, src] of post.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    const image = $('img').toArray().find(image => $(image).attr('src') === src)
    assert.ok(image, `${post.path}: missing image ${src}`)
    assert.equal($(image).attr('alt') ?? '', alt)
  }
}
assert.match(readFileSync(new URL('404.html', output), 'utf8'), /Page not found/)
const dump = gunzipSync(Buffer.from(readFileSync(new URL('__nuxt_content/posts/sql_dump.txt', output), 'utf8'), 'base64')).toString('utf8')
for (const post of posts) assert.ok(dump.includes(post.file), `Published post missing from content database: ${post.file}`)
for (const post of allPosts.filter(post => !post.published)) {
  assert.ok(!existsSync(new URL(`.${post.path}index.html`, output)), `Unpublished page generated: ${post.path}`)
  assert.ok(!dump.includes(post.file), `Unpublished content leaked: ${post.file}`)
}
const readXml = (path) => {
  const xml = readFileSync(new URL(path, output), 'utf8')
  assert.equal(XMLValidator.validate(xml), true, `${path}: invalid XML`)
  return load(xml, { xml: true })
}
const sitemap = readXml('sitemap.xml')
const sitemapUrls = sitemap('loc').map((_, node) => sitemap(node).text()).get()
assert.deepEqual(sitemapUrls.sort(), routes.map(route => `https://www.michaelborn.me${route}`).sort())
assert.match(readFileSync(new URL('robots.txt', output), 'utf8'), /Sitemap: https:\/\/www\.michaelborn\.me\/sitemap\.xml/)

for (const feed of ['index.xml', 'posts/index.xml', 'tags/index.xml', ...tags.map(tag => `tags/${tag}/index.xml`)]) {
  const $ = readXml(feed)
  const tag = feed.match(/^tags\/([^/]+)\/index.xml$/)?.[1]
  const expected = tag ? posts.filter(post => post.tags.includes(tag)) : posts
  assert.equal($('item').length, expected.length, `${feed}: incorrect post count`)
  assert.equal($('atom\\:link').attr('href'), `https://www.michaelborn.me/${feed}`)
  $('item').each((index, node) => {
    const post = expected[index]
    assert.equal($(node).find('title').text(), post.title)
    assert.equal($(node).find('link').text(), `https://www.michaelborn.me${post.path}`)
    assert.equal($(node).find('guid').text(), `https://www.michaelborn.me${post.path}`)
    assert.equal(Date.parse($(node).find('pubDate').text()), Date.parse(post.date))
    assert.ok($(node).find('description').text().length)
  })
}

// Optional comparison with an existing Hugo sitemap, e.g. the old ignored public/sitemap.xml.
if (process.argv[2]) {
  const oldSitemap = load(readFileSync(process.argv[2], 'utf8'), { xml: true })
  const oldUrls = oldSitemap('loc').map((_, node) => oldSitemap(node).text()).get()
  const relevantUrls = oldUrls.filter(url => /^\/(posts|tags)(\/|$)/.test(new URL(url).pathname))
  for (const url of relevantUrls) assert.ok(sitemapUrls.includes(url), `Missing Hugo URL: ${url}`)
  console.log(`Preserved all ${relevantUrls.length} post/archive/tag URLs from the Hugo sitemap.`)
  console.log(`New sitemap URLs: ${sitemapUrls.filter(url => !oldUrls.includes(url)).join(', ') || 'none'}`)
  console.log(`Other retired Hugo URLs: ${oldUrls.filter(url => !sitemapUrls.includes(url)).join(', ') || 'none'}`)
}

console.log(`Verified ${routes.length} routes, ${posts.length} posts, ${tags.length} tags, code examples, images, internal links, 404, SEO, sitemap, robots, and ${tags.length + 3} RSS feeds.`)
