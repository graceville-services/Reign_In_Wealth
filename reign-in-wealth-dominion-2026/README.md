# Reign in Wealth Conference 2026 — DOMINION

A lighter, page-based Nuxt 4 conference experience for **Reign in Wealth Conference 2026: DOMINION — Occupy. Build. Multiply. Reign.**

## What changed

- Split the previous single long page into focused routes:
  - `/` — cinematic home
  - `/experience` — pillars, schedule and hotel
  - `/people` — founder and speakers
  - `/stories` — testimonials and visual archive
  - `/tickets` — admission + checkout drawer
  - `/faq` — FAQs
- Primary brand color: `#45A23B`.
- Warm cream / onion-white background instead of black.
- Cinematic local video loop and poster treatment.
- Reveal-on-scroll, page transitions, hover movement and reduced-motion support.
- `node_modules`, `.nuxt` and `.output` are intentionally excluded from the deliverable.
- Dependencies are declared in `package.json` so a fresh `npm install` is enough.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For production:

```bash
npm run build
npm run preview
```

## Environment

Copy `.env.example` to `.env` if you need Stripe/Resend integration. Never commit `.env`.

## Content

Conference content is centralized in `app/data/site.ts`.

Replace the placeholder speaker, founder, gallery and sponsor media when the final assets are available. The local cinematic assets are in `public/cinematic/`.
