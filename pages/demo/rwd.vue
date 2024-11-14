<script setup lang="ts">
// PageDemoRWD 請填寫功能描述👈
</script>

<template lang="pug">
.PageDemoRWD
  p PageDemoRWD
  .box-item
</template>

<style lang="scss" scoped>
// 佈局 ----
.PageDemoRWD {
  // TODO
}

// 組件 ----
.box-item {
  @include wh(100px);
  @include rwd-pc-big {
    background-color: #aaa;
  }
  @include rwd-pc {
    background-color: #999;
  }
  @include rwd-mobile {
    background-color: #333;
  }
}
</style>
