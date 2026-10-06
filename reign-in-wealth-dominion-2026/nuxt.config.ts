import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  devtools: {
    enabled: true,
  },

  css: [
    '~/assets/css/main.css',
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },

    head: {
      htmlAttrs: {
        lang: 'en',
      },

      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/logo.png',
        },
        {
          rel: 'apple-touch-icon',
          href: '/images/logo.png',
        },
      ],

      meta: [
        {
          name: 'theme-color',
          content: '#050605',
        },

        {
          name: 'description',
          content:
            'DOMINION — Reign in Wealth Conference 2026. A gathering for people ready to occupy, build, multiply and reign.',
        },

        {
          name: 'author',
          content: 'Reign in Wealth',
        },

        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large',
        },

        {
          name: 'googlebot',
          content: 'index, follow, max-image-preview:large',
        },

        // Open Graph defaults
        {
          property: 'og:type',
          content: 'website',
        },

        {
          property: 'og:site_name',
          content: 'DOMINION — Reign in Wealth Conference 2026',
        },

        {
          property: 'og:title',
          content: 'DOMINION | Reign in Wealth Conference 2026',
        },

        {
          property: 'og:description',
          content:
            'Occupy. Build. Multiply. Reign. Join DOMINION — Reign in Wealth Conference 2026.',
        },

        {
          property: 'og:image',
          content: '/images/logo.png',
        },

        {
          property: 'og:image:alt',
          content:
            'DOMINION — Reign in Wealth Conference 2026',
        },

        {
          property: 'og:image:type',
          content: 'image/png',
        },

        // Twitter / X
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },

        {
          name: 'twitter:title',
          content: 'DOMINION | Reign in Wealth Conference 2026',
        },

        {
          name: 'twitter:description',
          content:
            'Occupy. Build. Multiply. Reign. Join DOMINION — Reign in Wealth Conference 2026.',
        },

        {
          name: 'twitter:image',
          content: '/images/logo.png',
        },

        {
          name: 'twitter:image:alt',
          content:
            'DOMINION — Reign in Wealth Conference 2026',
        },
      ],
    },
  },

  runtimeConfig: {
    stripeSecretKey:
      process.env.STRIPE_SECRET_KEY,

    stripeWebhookSecret:
      process.env.STRIPE_WEBHOOK_SECRET,

    resendApiKey:
      process.env.RESEND_API_KEY,

    resendFromEmail:
      process.env.RESEND_FROM_EMAIL,

    dominionVenueName:
      process.env.DOMINION_VENUE_NAME,

    dominionVenueAddress:
      process.env.DOMINION_VENUE_ADDRESS,

    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL ||
        'http://localhost:3000',
    },
  },
})