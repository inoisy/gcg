export default () => {
  const envs = {
    API_URL: process.env.API_URL,
    MAP_API_KEY: process.env.MAP_API_KEY,
  };
  console.log('🚀 ~ file: nuxt.config.js ~ line 5 ~ envs', envs);
  return {
    // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',
    publicRuntimeConfig: envs,
    envs,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'gcg',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap' },
      ],
      script: [{
        // src: 'https://api-maps.yandex.ru/3.0/?apikey=9e19261d-a9e9-4b6f-9c07-143229b3718b&lang=ru_RU',
        // defer: true,
        // <script src="https://api-maps.yandex.ru/3.0/?apikey=<ваш API-ключ>&lang=ru_RU"></script>
      }],
    },
    server: {
      port: process.env.APP_PORT,
      host: process.env.APP_HOST,
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
      '~/assets/scss/common.scss',
    ],
    eslint: {
      cache: false,
    },
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
      '~/directives/index.js',
      '~/plugins/graphql.js',
      '~/plugins/breakpoint.js',
      '~/plugins/floating.js',
      { src: '~/plugins/swiper.js', mode: 'client' },
      // { src: '~/plugins/ymapPlugin.js', mode: 'client' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
    styleResources: {
      scss: '~/assets/scss/shared/*.scss',
    },
    svgSprite: {
      input: '~/assets/sprite/svg',
    },
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/stylelint
      '@nuxtjs/stylelint-module',
      // https://github.com/nuxt-community/svg-sprite-module
      '@nuxtjs/svg-sprite',
      // https://github.com/nuxt-community/style-resources-module
      '@nuxtjs/style-resources',
      'nuxt-animejs',
      '@nuxtjs/device',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      'vue-scrollto/nuxt',
      '@nuxtjs/axios',
      '@nuxt/content',
      'nuxt-clipboard',
      '@nuxt/image',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
      baseURL: '/',
    },
    router: {
      scrollBehavior(to, from, savedPosition) {
        console.log('🚀 ~ file: nuxt.config.js ~ line 85 ~ scrollBehavior ~ to', to);
        // always scroll to top
        return { top: 0 };
      },
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },
  };
};
