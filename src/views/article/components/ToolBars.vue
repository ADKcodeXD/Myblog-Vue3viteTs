<template>
  <div class="toolbars">
    <ul>
      <li @click="likeEvent" :class="{ active: article.isLiked }">
        <i class="iconfont icon-good"></i>
      </li>
      <li @click="collectEvent" :class="{ active: article.isCollected }">
        <i class="iconfont icon-changyonggongneng"></i>
      </li>
      <li @click="toComment"><i class="iconfont icon-pinglun"></i></li>
      <li @click="top"><i class="iconfont icon-huidaodingbu"></i></li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  article: {
    type: Object as PropType<ArticleItemInfo>,
    default: () => {
      return {};
    }
  }
});
const emit = defineEmits(['likeArticle', 'collectArticle', 'toComment']);
const likeEvent = () => {
  emit('likeArticle');
};
const collectEvent = () => {
  emit('collectArticle');
};
const top = () => {
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
};
const toComment = () => {
  emit('toComment');
};
</script>
<style lang="less" scoped>
@import url(../styles/ToolBars.less);
</style>
