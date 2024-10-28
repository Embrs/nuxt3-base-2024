// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  // 模塊注入
  modules: [// https://nuxt.com.cn/modules/element-plus
  // https://color-mode.nuxtjs.org/
    '@nuxtjs/stylelint-module', // const {} = useDevice(); // https://nuxt.com/modules/device
    '@pinia/nuxt', // https://pinia.vuejs.org/ssr/nuxt.html
    '@nuxt/icon' // https://google-fonts.nuxtjs.org/getting-started/setup
  // '@element-plus/nuxt', // https://ithelp.ithome.com.tw/articles/10302381
  // '@nuxtjs/device', // https://github.com/nuxt-modules/stylelint
  // '@nuxtjs/color-mode', // https://nuxt.com/modules/icon
  // '@nuxtjs/google-fonts', // https://nuxt.com/modules/unocss
  // '@unocss/nuxt',
  // '@nuxt/image'
  ],
  devServer: {
    port: Number(process.env.NUXT_PORT || 3001),
    host: process.env.NUXT_HOST || '0.0.0.0'
    // https: { // Nuxt3Https 模式
    //   key: './https/localhost.key',
    //   cert: './https/localhost.crt'
    // }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    }
  }
});
