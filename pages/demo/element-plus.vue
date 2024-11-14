<script setup lang="ts">
// PageDemoElementPlus 請填寫功能描述👈
const date = ref();
</script>

<template lang="pug">
.PageDemoElementPlus
  p PageDemoElementPlus
  ElDatePicker(v-model="date")
  pe {{ date }}
</template>

<style lang="scss" scoped>
// 佈局 ----
.PageDemoElementPlus {
  // TODO
}

// 組件 ----
</style>
