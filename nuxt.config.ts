// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  bridge: {
    meta: true
  },  
  typescript: {
    shim: false,
    strict: true
  },
  css: [
    'vuetify/styles'
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
    server: {
      port: 3001,
      hmr: {
        // protocol: 'ws',
        // host: 'localhost',
        port: 3001,
      }
    },
  },

  imports: {
    dirs: [
      'composables/**'
    ]
  },


  runtimeConfig: {
    public: {
      homeUrl: process.env.HOME_URL,
      title: process.env.TITLE,
      apiKey: process.env.API_KEY,
      baseURL: process.env.SHEET_URL
    },
  },

})
