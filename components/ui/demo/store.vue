<script setup lang="ts">
// UiDemoStore 請填寫功能描述👈
const storeDemo = StoreDemo();
</script>

<template lang="pug">
.UiDemoStore
  p UiDemoStore
  ElButton(@click="storeDemo.Add") Add
  p {{ storeDemo.count }}
  p {{ storeDemo.doubleCount }}
</template>

<style lang="scss" scoped>
// 佈局 ----
.UiDemoStore {
  // TODO
  background-color: #aaa;
}

// 組件 ----
</style>
