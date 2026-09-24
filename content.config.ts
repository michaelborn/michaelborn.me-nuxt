import { defineCollection, defineContentConfig } from '@nuxt/content'
import { postSchema, readPosts } from './lib/content.mjs'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: {
        include: 'posts/*.md',
        prefix: '/posts',
        // Exclude unpublished bodies from the downloadable static content database too.
        exclude: readPosts().filter(post => !post.published).map(post => `posts/${post.file}`),
      },
      schema: postSchema,
    }),
  },
})
