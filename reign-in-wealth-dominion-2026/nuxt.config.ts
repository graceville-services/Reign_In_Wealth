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

      meta: [
        {
          name: 'theme-color',
          content: '#050605',
        },

        {
          name: 'description',
          content:
            'DOMINION — Reign in Wealth Conference 2026. Occupy. Build. Multiply. Reign.',
        },

        {
          name: 'author',
          content: 'Reign in Wealth',
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