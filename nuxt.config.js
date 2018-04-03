module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | chatta',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      { src: 'https://use.fontawesome.com/releases/v5.0.6/js/all.js', defer: true }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/css/bulma-all.sass', lang: 'sass' },
    { src: '~/assets/css/base.scss', lang: 'scss' }
  ],
  plugins: [
    '~/plugins/vue-moment',
    '~/plugins/vue-socket-io'
  ],
  modules: [
    '~/modules/socket-io.js'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'moment', 'vue-moment', 'marked', 'vue-socket.io'],
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
