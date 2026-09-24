import type { H3Event } from 'h3'
import { canonicalPath, site } from '#shared/site'
import { publishedPosts } from './published-posts'
import { escapeXml } from './xml'

export async function renderRss(event: H3Event, tag?: string) {
  const allPosts = await publishedPosts(event)
  const posts = tag ? allPosts.filter(post => post.tags.includes(tag)) : allPosts
  if (tag && !posts.length) {
    throw createError({ statusCode: 404, statusMessage: 'Tag not found' })
  }
  const origin = useRuntimeConfig(event).public.siteUrl
  const url = (path: string) => escapeXml(new URL(path, origin).href)
  const feedPath = getRequestURL(event).pathname
  const title = tag ? `${tag} — ${site.title}` : site.title
  const items = posts.map(post => `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${url(canonicalPath(post.path))}</link>
      <guid isPermaLink="true">${url(canonicalPath(post.path))}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(`${site.email} (${site.author})`)}</author>
      <description>${escapeXml(post.description || post.title)}</description>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`).join('\n    ')

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${url(tag ? `/tags/${tag}/` : '/')}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    <atom:link href="${url(feedPath)}" rel="self" type="application/rss+xml" />
    ${posts[0] ? `<lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>` : ''}
    ${items}
  </channel>
</rss>`
}
