import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readPosts } from '../lib/content.mjs'

// Verify migration fidelity against the original Hugo snapshot, not a second copy.
const baseline = '4cc0dbe'
const files = execFileSync('git', ['ls-tree', '-r', '--name-only', baseline, 'content/posts'], { encoding: 'utf8' })
  .trim().split('\n')
const posts = readPosts()
assert.equal(posts.length, files.length)

for (const file of files) {
  const original = execFileSync('git', ['show', `${baseline}:${file}`], { encoding: 'utf8' })
  const [, frontmatter, body] = original.match(/^\+\+\+\n([\s\S]*?)\n\+\+\+\n([\s\S]*)$/)
  const post = posts.find(post => `content/posts/${post.file}` === file)
  assert.ok(post, `Missing migrated post: ${file}`)
  // Text patches normalize the final newline; the article itself must be identical.
  assert.equal(post.content.replace(/\n$/, ''), body.replace(/\n$/, ''), `Markdown changed: ${file}`)
  // Original frontmatter contains simple quoted strings, arrays and booleans.
  for (const key of ['title', 'date', 'tags', 'draft']) {
    const value = frontmatter.match(new RegExp(`^${key} = (.+)$`, 'm'))[1]
    const expected = key === 'draft' ? value === 'true'
      : key === 'tags' ? [...value.matchAll(/'([^']*)'/g)].map(match => match[1])
        : value.slice(1, -1)
    assert.deepEqual(post[key], expected, `${key} changed: ${file}`)
  }
}

console.log(`Verified ${posts.length} posts: original filenames, metadata, and Markdown bodies preserved.`)
