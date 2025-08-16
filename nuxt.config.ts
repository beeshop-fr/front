// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  nitro: {
    devProxy: {
      '/api': { target: 'http://localhost:7123', changeOrigin: true }
    }
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],


  plugins: ['~/plugins/persistedstate.client'],


  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    },
  },

  pinia: {
    storesDirs: ['stores'],
    autoImports: ['defineStore'],
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
      apiAuthUrl: process.env.API_AUTH_URL,
    },
  },
})
