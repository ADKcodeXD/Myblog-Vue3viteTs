<template>
  <div class="tab">
    <div class="tw-flex tw-items-center tw-justify-between">
      <p class="tw-text-2xl">
        <slot name="title"> </slot>
      </p>
      <span>
        <slot name="total"> </slot>
      </span>
    </div>
    <ElDivider />
    <div v-if="articles">
      <div v-for="item in articles" :key="item.id">
        <div class="tw-flex">
          <ArticleItem :articleItem="item" class="tw-flex-1" />
          <div class="operate" @click="tabFn(item.id)">
            <slot name="caozuo"></slot>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <AdkEmpty />
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
const props = defineProps({
  articles: {
    type: Object as PropType<ArticleItemInfo[]>,
    default: () => {
      return {};
    }
  },
  fn: {
    type: Function,
    default: () => {
      return {};
    }
  }
});
const emit = defineEmits(['changeTab']);
const tabFn = async (id: string) => {
  await props.fn(id);
  emit('changeTab');
};
</script>
<style lang="less" scoped>
@import url(../styles/MyTab.less);
</style>
