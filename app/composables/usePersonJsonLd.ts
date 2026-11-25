import { site, socials } from '#shared/site'

export function usePersonJsonLd() {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        key: 'person-jsonld',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: site.author,
          url: site.url,
          sameAs: socials.map((social) => social.url),
        }),
      },
    ],
  })
}
