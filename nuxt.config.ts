// https://nuxt.com/docs/api/configuration/nuxt-config
import { visualizer } from 'rollup-plugin-visualizer';
import version from './version';

// ------------------------
const useVisualizer = false; // 使用打包分析
// ------------------------
// vite plugin 建置
const VitePlugins = () => {
  const arr = [];
  if (useVisualizer) {
    arr.push(
      visualizer({ // 打包分析 https://juejin.cn/post/7159410085460983839
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: 'test.html', // 析圖產生的檔案名
        open: true // 如果存在本地服務端口，將在打包後自動展示
      })
    );
  }
  return arr;
};
// ===============================================================================
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  // 模塊注入
  modules: [
    // '@nuxtjs/device', // https://github.com/nuxt-modules/stylelint
    '@nuxtjs/stylelint-module', // https://github.com/nuxt-modules/stylelint
    '@pinia/nuxt', // https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia-plugin-persistedstate/nuxt', // https://nuxt.com/modules/pinia-plugin-persistedstate#pinia-plugin-persistedstate
    '@nuxt/icon', // https://nuxt.com/modules/icon
    '@nuxtjs/i18n', // https://nuxt.com/modules/i18n
    '@nuxtjs/color-mode', // https://color-mode.nuxtjs.org/?utm_source=nuxt.com&utm_medium=aside-module&utm_campaign=nuxt.com
    '@nuxt/fonts' // https://fonts.nuxt.com/get-started/installation
  ],
  devServer: {
    port: Number(process.env.NUXT_PORT || 3001),
    host: process.env.NUXT_HOST || '0.0.0.0'
    // https: { // Nuxt3Https 模式
    //   key: './https/localhost.key',
    //   cert: './https/localhost.crt'
    // }
  },

  // colorMode 主題色 ---------------------------------------------------
  colorMode: {
    classSuffix: ''
  },
  // 多語系 -------------------------------------------------------------
  i18n: {
    strategy: 'prefix_except_default',
    langDir: 'locales',
    defaultLocale: 'zh',
    baseUrl: `${process.env.NUXT_DOMAIN_URL}`,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      redirectOn: 'root'
    },
    lazy: true,
    // // 對照表: https://zh.wikipedia.org/wiki/%E5%8C%BA%E5%9F%9F%E8%AE%BE%E7%BD%AE#%E5%88%97%E8%A1%A8
    locales: [
      {
        code: 'zh',
        language: 'zh-Hant-TW',
        file: 'zh.js',
        name: '繁體中文'
      },
      {
        code: 'cn',
        language: 'zh-Hans-CN',
        file: 'cn.js',
        name: '简体中文'
      },
      {
        code: 'en',
        language: 'en',
        file: 'en.js',
        name: 'English'
      },
      {
        code: 'ja',
        language: 'ja',
        file: 'ja.js',
        name: '日本語'
      }
    ]
  },
  // env 環境變數 -------------------------------------------------------
  runtimeConfig: {
    apiBase: '',
    domainUrl: '',
    aesKey: '',
    aesIv: '',
    public: {
      gtmId: '',
      clarityCode: ''
    }
  },
  // icon --------------------------------------------------------------
  icon: {
    componentName: 'NuxtIcon',
    customCollections: [
      {
        prefix: 'my-icon',
        dir: 'assets/icons'
      }
    ]
  },
  // font --------------------------------------------------------------
  // https://nuxt.dev.org.tw/modules/fonts
  fonts: { // 自動會抓不用設定
    families: [
      // { name: 'Noto Sans TC', provider: 'google' },
      // { name: 'Noto Sans', provider: 'google' },
      // { name: 'Sour Gummy', provider: 'google' }
    ]
  },
  // 組件配置 -----------------------------------------------------------
  components: {
    dirs: [
      {
        path: '~/components',
        global: true
      }
    ]
  },

  // 全局範圍設定 composables utils 為預設 --------------------------------
  imports: {
    dirs: [
      'stores' // pinia
    ]
  },

  // html params -------------------------------------------------------
  app: {
    // baseURL: '/',
    buildAssetsDir: '/static/',
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    // meta
    head: {
      bodyAttrs: {
        // id: 'Body'
      },
      htmlAttrs: {
        lang: 'zh-Hant-TW',
        // @ts-ignore
        // version: process.env.npm_package_version as string
        version
      },
      meta: [
        { name: 'format-detection', content: 'telephone=no,email=no,adress=no' } // 去除擾人自動偵測
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' }
      ]
    }
  },

  // style -------------------------------------------------------------
  css: ['@/assets/styles/css/index.css'],
  stylelint: {
    lintOnStart: false, // 專案啟動時不自動檢查所有相關檔案
    chokidar: true // 監聽文件異動進行檢核（文件未列出此選項）
  },

  // Nitro server ------------------------------------------------------
  nitro: {
    // experimental: {
    //   websocket: true
    // },
    compressPublicAssets: {
      gzip: true
      // brotli: true
    },
    plugins: [
      '@/server/index'
    ],
    // 開發模式戶端代理
    devProxy: {
      '/api': {
        target: `${process.env.NUXT_API_BASE as string}/api`, // 這裡是接口地址
        changeOrigin: true,
        prependPath: true
      }
    },
    // Nuxt route 路由設定 ------------
    // https://nuxt.com/docs/guide/concepts/rendering#route-rules
    routeRules: {
      // '/api/**': { // 自訂反向代理
      //   proxy: `${process.env.NUXT_API_BASE as string}/api/**`
      // }
      //   '/': { ssr: true },
      //   '/about/**': { isr: true }, // 內容將在CDN中持久存在，直到下一次部署
      //   '/service/**': { isr: true }, // 內容將在CDN中持久存在，直到下一次部署
      //   '/contact-us/**': { isr: true }, // 內容將在CDN中持久存在，直到下一次部署
      //   '/professional-advisers/**': { isr: true }, // 內容將在CDN中持久存在，直到下一次部署
      //   '/privacy/**': { isr: true } // 內容將在CDN中持久存在，直到下一次部署
      //   // { prerender: true }, // 每一次建構時，都重新預渲染頁面 (透過 Builder)
      //   // '/blog/**': { static: true }, // 接收到一個請求時，頁面依照需求重新渲染頁面 (透過 Lambda)
      //   // '/products/**': { swr: 600 }, // 接收到一個請求時，10 分鐘的快取緩衝過期後，將會再次的重新取得資料進行渲染 (透過 Lambda)
      //   // '/admin/**': { ssr: false }, // 僅在客戶端渲染
      //   // '/react/*': { redirect: '/vue' }, // 路由重新導向規則
      //   // '/api/**': { cors: true } // 添加 CORS Header
    }
  },

  // Vite ------------------------------------------------------------------
  vite: {
    css: {
      preprocessorOptions: {
        scss: { // scss 配置
          silenceDeprecations: ['legacy-js-api'],
          additionalData: `
            @use '@/assets/styles/scss/config.scss' as *;
            @use '@/assets/styles/scss/colors.scss' as *;
            @use '@/assets/styles/scss/fn.scss' as *;
            @use '@/assets/styles/scss/mixin.scss' as *;
            @use '@/assets/styles/scss/font-size.scss' as *;
            @use '@/assets/styles/scss/rwd.scss' as *;
          `,
          quietDeps: true // 關閉警告
        }
      }
    },
    plugins: VitePlugins()
  }
});
