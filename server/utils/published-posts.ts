import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'

export async function publishedPosts(event: H3Event) {
  // The collection source excludes unpublished posts, including their bodies.
  const posts = await queryCollection(event, 'posts')
    .select('path', 'title', 'description', 'date', 'tags')
    .all()
  return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.path.localeCompare(b.path))
}
