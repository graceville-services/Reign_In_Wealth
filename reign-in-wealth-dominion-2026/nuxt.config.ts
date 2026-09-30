import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: { meta: [
      { name: "theme-color", content: "#f6f0e5" },
      { name: "description", content: "DOMINION — Reign in Wealth Conference 2026. Occupy. Build. Multiply. Reign." }
    ] }
  }
})
