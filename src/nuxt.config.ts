// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  features: {
    devLogs: false
  },

  // https://nuxt.com/docs/api/configuration/nuxt-config#srcdir
  srcDir: '',

  /**
   * SSR
   * https://nuxt.com/docs/api/configuration/nuxt-config#ssr
   */
  ssr: true,

  /**
   * App Config
   */
  app: {
    head: {
      title: `vergilistesi - Türkiye'deki vergiler, vergi türleri, vergi listesi`,
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'index,follow'
        },
        {
          hid: 'description',
          name: 'description',
          content: `Türkiye'deki vergiler, tüm vergi türleri, vergi listesi 🇹🇷💪`
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `vergi listesi, vergi türleri, türkiyedeki vergiler`
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `vergilistesi - Türkiye'deki vergiler 🇹🇷💪`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Türkiye'deki vergiler, tüm vergi türleri, vergi listesi`
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://vergilistesi.com'
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: `vergilistesi - Türkiye'deki vergiler 🇹🇷💪`
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: `Türkiye'deki vergiler, tüm vergi türleri, vergi listesi`
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: 'https://vergilistesi.com'
        },
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: '#040404'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/meta/icon/favicon.ico' },
        { rel: 'manifest', href: 'https://vergilistesi.com/meta/manifest.json' }
      ]
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  /**
   * Auto import components
   * https://nuxt.com/docs/api/configuration/nuxt-config#components
   */
  components: [
    {
      path: '@/components',
      pathPrefix: false,
      extensions: ['vue'],
      extendComponent(component) {
        /**
         * Remove 'Component' suffix for generated component names
         * e.g.
         *  components/Xyz.component.vue
         *    XyzComponent -> Xyz
         */
        component.pascalName = component.pascalName.replace('Component', '')
        component.kebabName = component.kebabName.replace('component', '')
      }
    }
  ],

  /**
   * Vite config
   */
  vite: {
    css: {
      preprocessorOptions: {
        /*
         ** Global Styles (Do not import actual styles)
         */
        scss: {
          additionalData: `
                /*
                  Vendor
                */

                // Bootstrap vendor
                @import "bootstrap/scss/_functions.scss";
                @import "bootstrap/scss/_variables.scss";
                @import "bootstrap/scss/_mixins.scss";

                /*
                  Overrides
                */

                // Bootstrap overrides
                @import "@/assets/style/scss/overrides/bootstrap/_dark-mode.override.scss";
                @import "@/assets/style/scss/overrides/bootstrap/_grid.override.scss";
                @import "@/assets/style/scss/overrides/bootstrap/_spacing.override.scss";

                /*
                  Functions
                */
                @import "@/assets/style/scss/functions/_center.scss";
                @import "@/assets/style/scss/functions/_triangle.scss";

                /*
                  Mixins
                */
                @import "@/assets/style/scss/mixins/_gradient.scss";
              `
        }
      }
    }
  },

  /*
   ** Global Styles (Actual styles)
   */
  css: [
    // Actual styles entry point
    '@/assets/style/scss/app.scss'
  ],

  /**
   * PostCSS config
   */
  postcss: {
    plugins: {
      autoprefixer: {
        grid: true
      }
    }
  },

  /**
   * Modules
   */
  modules: [
    // https://github.com/nuxt-community/eslint-module
    ['@nuxtjs/eslint-module', {}],
    // https://github.com/nuxt-community/stylelint-module
    [
      '@nuxtjs/stylelint-module',
      {
        include: './src/{assets/style,components,layouts,pages}/**/*.{css,sass,scss,less,stylus,vue}'
      }
    ],
    // https://pinia.vuejs.org
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ],
    // https://nuxt.com/modules/icon
    ['nuxt-icon', {}],
    // https://nuxt.com/modules/i18n
    [
      '@nuxtjs/i18n',
      {
        lazy: true,
        locales: [
          {
            name: 'Turkish',
            title: 'Türkçe',
            code: 'tr',
            iso: 'tr-TR',
            file: 'tr.ts'
          }
        ],
        langDir: 'locales/',
        defaultLocale: 'tr',
        customRoutes: 'config',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: false,
        parsePages: false,
        compilation: {
          strictMessage: false,
          escapeHtml: true
        },
        modifiers: {
          atSign: () => '@'
        },
        pages: {
          'Home/index': {
            tr: '/'
          },
          'Tax/index': {
            tr: '/vergi'
          }
        }
      }
    ]
  ],
  /**
   * Plugins
   */
  plugins: ['@/plugins/vuesax.ts'],

  /**
   * Build
   */
  build: {},

  /**
   * Hooks
   */
  hooks: {
    'pages:extend'(pages) {
      const vueOnlyPages = pages.filter(page => page.file?.endsWith('.vue'))

      pages.splice(0, pages.length, ...vueOnlyPages)
    }
  },

  imports: {
    dirs: ['stores/**/*']
  },

  /**
   * Experimental options
   */
  experimental: {
    typedPages: true
  }
})
