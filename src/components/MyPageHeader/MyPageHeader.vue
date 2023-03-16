<template>
  <section class="header">
    <div class="back-btn" @click="backFn">
      <i class="iconfont icon-left"></i>
      Back
    </div>
    <p class="page-title">
      <slot> </slot>
    </p>
  </section>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    backFn?: (payload: MouseEvent) => void
  }>(),
  {
    backFn: function () {
      window.history.back()
    }
  }
)
</script>
<style lang="less" scoped>
.header {
  margin-top: @margin-general;
  display: flex;
  align-items: center;
  .back-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: @bgColor;
    padding: 0.5rem @padding-general;
    cursor: pointer;
    .border-normal();

    &:hover {
      background-color: @hoverColor;
      color: @hoverTextColor;
    }
  }
  .page-title {
    margin-left: 2rem;
    font-size: @big-text;
  }
}
</style>
