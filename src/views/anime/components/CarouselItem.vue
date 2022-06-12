<template>
  <div class="content">
    <div class="content-info">
      <div>
        <h3 class="content-info__title">
          {{ animeInfo.name_cn ? animeInfo.name_cn : animeInfo.name }}
        </h3>
        <small class="content-info__subtitle">{{ animeInfo.name_cn ? animeInfo.name : "" }}</small>
        <p class="content-info__summary">
          {{ animeInfo.summary }}
        </p>
      </div>
      <div>
        <div class="content-info-bottom">
          <p class="content-info-bottom__detail">
            总集数:{{ animeInfo.eps ? animeInfo.eps : "暂无数据" }} 评分:{{
                animeInfo.rating && animeInfo.rating.score
            }}
          </p>
        </div>
        <div class="content-info-tag">
          <el-tag v-for="tag, index in tagsInfoThree" :key="index" type="warning" class="content-info-tag__text">
            {{ tag.name }}
          </el-tag>
        </div>
        <div class="content-info-bottom-button" @click="$router.push(`/index/animedetail/${animeInfo.id}`)">
          查看更多
        </div>

      </div>
    </div>
    <MyElimage :img="animeInfo.images.large" :isLazy="false" class="content-img" />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

const props = defineProps({
  animeInfo: {
    type: Object as PropType<Bangumi.SubjectInfoSmall>,
    default: {},
  },
});

const tagsInfoThree = computed(() => {
  let tags = [];
  if (props.animeInfo.tags.length > 3) {
    for (let i = 0; i < 3; i++) {
      tags.push(props.animeInfo.tags[i]);
    }
  } else {
    return props.animeInfo.tags;
  }
  return tags;
});
</script>

<style lang="less" scoped>
@import url(../styles/CarouselItem.less);
</style>