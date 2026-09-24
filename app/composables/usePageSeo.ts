import { canonicalPath, site } from '#shared/site'

export function usePageSeo(options: {
  title: string
  description?: string
  publishedAt?: string
  tags?: string[]
}) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const canonical = new URL(canonicalPath(route.path), config.public.siteUrl).href
  const title = options.title === site.title ? site.title : `${options.title} — ${site.title}`
  const description = options.description || site.description

  useSeoMeta({
    title,
    description,
    author: site.author,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogType: options.publishedAt ? 'article' : 'website',
    ogSiteName: site.title,
    ogLocale: 'en_US',
    articlePublishedTime: options.publishedAt,
    articleAuthor: options.publishedAt ? [site.author] : undefined,
    articleTag: options.tags,
    twitterCard: 'summary',
    twitterTitle: title,
    twitterDescription: description,
  })
  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  })
}
