// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  debug: true,
  css: [
    '@/styles/font-proxima-nova.scss',
    '@/styles/variables.scss',
    '@/styles/desktop1280.scss',
    '@/styles/desktop1024.scss',
    '@/styles/desktop768.scss',
    '@/styles/desktop375.scss',
    'material-design-icons-iconfont/dist/material-design-icons.css'
  ],
  runtimeConfig: {
    EVENTS_SERVICE_BASE_URL: process.env.EVENTS_SERVICE_INTERNAL_BASE_URL,
    EVENTS_SECURE_SERVICE_BASE_URL: process.env.EVENTS_SECURE_SERVICE_BASE_URL,
    DB_SERVICE_AUTH_KEY: process.env.DB_SERVICE_AUTH_KEY,

    public: {
      WEB_BASE_URL: process.env.WEB_BASE_URL,
      EVENTS_SERVICE_BASE_URL: process.env.EVENTS_SERVICE_BASE_URL,
      CONSOLA_LEVEL: process.env.CONSOLA_LEVEL || '-1',
      OMNITURE_SCRIPT: process.env.OMNITURE_SCRIPT,
      MEDSCAPE_ENV: process.env.ENV || 'development',
      PULSE_POINT_PIXEL_PID: process.env.PULSE_POINT_PIXEL_PID,
      MEDSCAPE_LIVE_APP_DOWNLOAD_QR_CODE: process.env.MEDSCAPE_LIVE_APP_DOWNLOAD_QR_CODE,
    }
  },

  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxt/test-utils/module'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  nitro: {
    preset: 'node',
    serveStatic: true,

  },
  // vuetify: {
  //   customVariables: ['~/assets/variables.scss'],
  //   treeShake: true
  // },
})
