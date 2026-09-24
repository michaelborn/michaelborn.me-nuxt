import { readFileSync, readdirSync } from 'node:fs'
import matter from 'gray-matter'
import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1),
  date: z.iso.datetime({ offset: true }),
  tags: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).default([]),
  draft: z.boolean().default(false),
})

export function readPosts(now = new Date()) {
  const directory = new URL('../content/posts/', import.meta.url)
  return readdirSync(directory)
    .filter(file => file.endsWith('.md'))
    .map((file) => {
      const { data, content } = matter(readFileSync(new URL(file, directory), 'utf8'))
      const result = postSchema.safeParse(data)
      if (!result.success) {
        throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`)
      }
      const metadata = result.data
      return {
        ...metadata,
        file,
        content,
        path: `/posts/${file.slice(0, -3)}/`,
        published: !metadata.draft && new Date(metadata.date) <= now,
      }
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.path.localeCompare(b.path))
}
