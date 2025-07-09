import Aura from "@primeuix/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module"],
  build: {
    transpile: ["primevue"],
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  css: ["primeicons/primeicons.css"],
});
