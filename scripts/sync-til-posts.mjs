import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative } from 'node:path'
import { execFileSync } from 'node:child_process'

const tilDir = process.argv[2] ?? 'til'
const postsDir = process.argv[3] ?? 'content/posts'

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.')) return []
    const path = join(dir, entry.name)
    return entry.isDirectory() ? walk(path) : path
  })

const slugTag = (tag) =>
  tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const files = walk(tilDir)
  .filter((path) => path.endsWith('.md') && basename(path) !== 'README.md')
  .sort()

mkdirSync(postsDir, { recursive: true })

const imported = []
const skipped = []

for (const path of files) {
  const rel = relative(tilDir, path).split('\\').join('/')
  const slug = basename(rel, '.md')
  const file = `${slug}.md`
  if (existsSync(join(postsDir, file))) {
    skipped.push(rel)
    continue
  }

  const category = dirname(rel) === '.' ? '' : slugTag(basename(dirname(rel)))
  const lines = readFileSync(path, 'utf8').split('\n')
  const headingIndex = lines.findIndex((line) => /^# /.test(line))
  const title = "TIL: " +
    (headingIndex === -1
      ? slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
      : lines[headingIndex].slice(2).trim());
  const body = lines
    .filter((_, index) => index !== headingIndex)
    .join('\n')
    .replace(/^\n+/, '')

  const date = execFileSync(
    'git',
    ['-C', tilDir, 'log', '-1', '--format=%cI', '--', rel],
    { encoding: 'utf8' },
  ).trim()

  const tags = category ? [category, 'til'] : ['til']
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `date: '${date}'`,
    `tags: [ ${tags.map((tag) => `'${tag}'`).join(', ')} ]`,
    'draft: false',
    '---',
  ].join('\n')
  const markdown = body.endsWith('\n') ? body : `${body}\n`

  writeFileSync(join(postsDir, file), `${frontmatter}\n\n${markdown}`)
  imported.push(file)
}

if (imported.length) {
  console.log(`Imported ${imported.length} new post(s):`)
  for (const file of imported) console.log(`  content/posts/${file}`)
} else {
  console.log('No new posts to import.')
}
if (skipped.length) {
  console.log(`Skipped ${skipped.length} already-imported post(s).`)
}
