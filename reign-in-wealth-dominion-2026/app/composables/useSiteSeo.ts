export function useSiteSeo(options: {
  title?: string
  description?: string
  image?: string
  path?: string
  noindex?: boolean
}) {
  const config = useRuntimeConfig()

  const siteName = 'Reign in Wealth Conference'
  const defaultTitle = 'DOMINION — Reign in Wealth Conference 2026'

  const description =
    options.description ||
    'DOMINION — Reign in Wealth Conference 2026. Occupy. Build. Multiply. Reign.'

  const image =
    options.image ||
    '/images/kh.jpg'

  const siteUrl =
    config.public.siteUrl || 'https://reigninwealthconference.com'

  const canonicalPath = options.path || useRoute().path

  const canonicalUrl = new URL(
    canonicalPath,
    siteUrl
  ).toString()

  const imageUrl = new URL(
    image,
    siteUrl
  ).toString()

  const title = options.title
    ? `${options.title} — DOMINION 2026`
    : defaultTitle

  useSeoMeta({
    title,

    description,

    author: siteName,

    robots: options.noindex
      ? 'noindex, nofollow'
      : 'index, follow',

    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: canonicalUrl,
    ogSiteName: siteName,
    ogLocale: 'en_US',
    ogImage: imageUrl,
    ogImageAlt: 'Reign in Wealth Conference — DOMINION 2026',
    ogImageWidth: '1200',
    ogImageHeight: '630',

    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
    twitterImageAlt: 'Reign in Wealth Conference — DOMINION 2026',
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl,
      },
    ],
  })
}