<template>
  <div :class="`adk-button-${type}`" ref="dom">
    <p>
      <slot> 押す </slot>
    </p>
    <span>
      <slot name="endesc"> osuttemite </slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
const props = defineProps({
  /**
   * 传入按钮类型 会改变按钮hover的样式 primary默认为蓝色
   */
  type: {
    type: String as PropType<'danger' | 'info' | 'success' | 'primary'>,
    default: 'primary'
  },
  /**
   * 按钮宽度 需要传入number属性为指定的rem像素值
   * 默认11rem
   */
  x: {
    type: Number,
    default: 11
  },
  /**
   * 按钮高度 需要传入number属性为指定的rem像素值
   * 默认4rem
   */
  y: {
    type: Number,
    default: 4
  },
  /**
   * 主体字符的中间间隔 需要传入number属性 默认为rem单位
   * 默认1.4rem
   */
  spacing: {
    type: Number,
    default: 1.4
  },
  mainTextsize: {
    type: Number,
    default: 1.5
  },
  subTextsize: {
    type: Number,
    default: 0.8
  }
});
onMounted(() => {
  dom.value.style.setProperty('--x', props.x.toString() + 'rem');
  dom.value.style.setProperty('--y', props.y.toString() + 'rem');
  dom.value.style.setProperty('--spcing', props.spacing.toString() + 'rem');
  dom.value.style.setProperty('--mainTextsize', props.mainTextsize.toString() + 'rem');
  dom.value.style.setProperty('--subTextsize', props.mainTextsize.toString() + 'rem');
});
let dom = ref<HTMLElement>();
</script>

<style lang="less" scoped>
@import url(./AdkButton.less);
</style>
