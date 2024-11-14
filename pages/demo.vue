<script setup lang="ts">
// PageDemo 請填寫功能描述👈
const localePath = useLocalePath();

const pageList = [
  'store',
  'env',
  'icon',
  'safety',
  'i18n',
  'color',
  'font',
  'open',
  'rwd',
  'element-plus'
];
</script>

<template lang="pug">
.PageDemo
  p PageDemo
  NuxtLink(to="/")
    ElButton to Home
  .btn-list
    NuxtLink(
      v-for="page of pageList" :key="page"
      :to="localePath(`/demo/${page}`)"
    )
      ElButton to {{ tool.FirstUpper(page) }}
  NuxtPage
</template>

<style lang="scss" scoped>
// 佈局 ----
.PageDemo {
  // TODO
}

// 組件 ----
.btn-list {
  @include row-wrap(10px);
}
</style>
