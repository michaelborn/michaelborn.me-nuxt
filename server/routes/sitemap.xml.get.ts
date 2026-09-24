import { canonicalPath } from '#shared/site'
import { publishedPosts } from '../utils/published-posts'
import { escapeXml } from '../utils/xml'

export default defineEventHandler(async (event) => {
  const posts = await publishedPosts(event)
  const tags = [...new Set(posts.flatMap(post => post.tags))].sort()
  const paths = ['/', '/posts/', '/tags/', ...posts.map(post => canonicalPath(post.path)), ...tags.map(tag => `/tags/${tag}/`)]
  const origin = useRuntimeConfig(event).public.siteUrl
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(path => `  <url><loc>${escapeXml(new URL(path, origin).href)}</loc></url>`).join('\n')}
</urlset>`
})
