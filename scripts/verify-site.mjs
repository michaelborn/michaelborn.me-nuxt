import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { load } from 'cheerio'
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
const dump = readFileSync(new URL('__nuxt_content/posts/sql_dump.txt', output), 'utf8')
for (const post of allPosts.filter(post => !post.published)) {
  assert.ok(!existsSync(new URL(`.${post.path}index.html`, output)), `Unpublished page generated: ${post.path}`)
  assert.ok(!dump.includes(post.file), `Unpublished content leaked: ${post.file}`)
}
console.log(`Verified ${routes.length} routes, ${posts.length} posts, ${tags.length} tags, code examples, images, internal links, and 404 output.`)
