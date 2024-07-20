// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ["@/assets/scss/global.scss"],
  modules: ['@pinia/nuxt', ["@nuxtjs/google-fonts", {
    families: {
      Inter:  '200..900',
    }
  }]],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_vars.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    apiBase: "http://localhost:3000"
  }
})


