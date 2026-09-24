export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  const origin = useRuntimeConfig(event).public.siteUrl
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', origin).href}\n`
})
