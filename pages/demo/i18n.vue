<script setup lang="ts">
// PageDemoI18n 請填寫功能描述👈
const localePath = useLocalePath();
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

</script>

<template lang="pug">
.PageDemoI18n
  p PageDemoI18n
  NuxtLink(:to="localePath('/')")
    ElButton {{ $t('backHome') }}
  .row-item
    NuxtLink(
      v-for="localeItem in availableLocales" :key="localeItem.code" :to="switchLocalePath(localeItem.code)"
    )
      ElButton {{ localeItem.name }}
  .row-item
    p {{ $t('about.title') }}
    a(href="https://clairechang.tw/2023/08/29/nuxt3/nuxt-v3-i18n/" target="_blank") 教學連結
  ElDatePicker
  p {{ locale }}

</template>

<style lang="scss" scoped>
// 佈局 ----
.PageDemoI18n {
  // TODO
}

// 組件 ----
.row-item {
  @include row(10px);
}
</style>
