export const useSeo = ({
  title,
  description,
  path = '/',
  image = '/images/og-image.png',
}: {
  title: string
  description: string
  path?: string
  image?: string
}) => {
  const config = useRuntimeConfig()

  const siteUrl = config.public.siteUrl.replace(/\/$/, '')

  const fullUrl = `${siteUrl}${path}`

  const fullImage = image.startsWith('http')
    ? image
    : `${siteUrl}${image}`

  useSeoMeta({
    title,

    description,

    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: 'DOMINION — Reign in Wealth Conference 2026',
    ogUrl: fullUrl,
    ogImage: fullImage,
    ogImageAlt: title,

    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: fullImage,
    twitterImageAlt: title,

    robots: 'index, follow, max-image-preview:large',
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: fullUrl,
      },
    ],
  })
}