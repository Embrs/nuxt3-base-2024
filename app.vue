<script setup lang="ts">
import { UseInitMeta } from './composables/init/use-init-meta';
import { UseInitWindow } from './composables/init/use-init-window';

const storeEnv = StoreEnv(); // 快取環境變數
const $defer = UseDefer(); // 延遲渲染
UseInitMeta(); // meta 資訊
UseInitWindow();

storeEnv.Init();
onMounted(() => {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event);
  });
}
);
</script>

<template lang="pug">
div
  NuxtLoadingIndicator(color="#86D4A187")
  LoadingPage
  NuxtLayout
    NuxtPage
  ClientOnly
    OpenGroup(v-if="$defer.IsDefer(100)")
</template>

<style lang="scss" scoped>
// 佈局 ----
html {
  // color: $text;
  // background-color: $bg;
}
</style>
