require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s — СЮП',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#1989fa', height: '2px' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/buefy.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/app',
    '~/plugins/buefy',
    '~/plugins/lodash',
    '~/plugins/vmask',
    '~/plugins/fontawesome'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    prefix: '/api'
  },
  proxy: {
    '/api': isProduction ? '176.126.164.131' : 'http://localhost:4000'
  },
  auth: {
    redirect: {
      login: '/',
      home: '/appeals'
    },
    localStorage: {
      prefix: 'legal_help.'
    },
    cookie: {
      prefix: 'legal_help.',
      options: {
        sameSite: true
      }
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/auth/user', method: 'get', propertyName: false }
        },
        tokenType: ''
      }
    },
    plugins: [
      '~/plugins/axios'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['lodash-es'],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
