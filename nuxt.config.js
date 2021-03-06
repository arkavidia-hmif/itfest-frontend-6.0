import colors from 'vuetify/es5/util/colors';

require('dotenv').config({ path: getDotEnvFilename() });
export default {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - IT Fest Arkavidia 6.0',
    title: 'IT Fest Arkavidia 6.0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/logo.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Raleway:400,700' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Baloo+Da|Raleway&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/definitions',
    './plugins/api-auth',
    './plugins/persisted-state'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { filename: getDotEnvFilename() }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['./assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    treeShake: true,
    breakpoint: {
      thresholds: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 600,
        xl: 50000
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
  },
  router: {
    middleware: 'auth'
  }
};

function getDotEnvFilename() {
  if (process.env.NODE_ENV === 'production') {
    return (process.env.BUILD_ENV === 'staging') ? '.env.staging' : '.env.production';
  }
  return '.env.development';
}
