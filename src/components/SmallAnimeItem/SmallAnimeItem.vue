<template>
  <div class="card-little" @click="$router.push(`/index/animedetail/${item.id}`)">
    <div class="card-little-img tw-w-2/5">
      <MyElimage :img="item.images.common" :not-found-type="'3:4'" />
    </div>
    <div class="card-little-info">
      <div>
        <p class="card-little-info__title">
          {{ item.name_cn ? item.name_cn : item.name }}
        </p>
        <p class="card-little-info__tip">
          综合评分{{ item.rating.score }}({{item.rating.total}}条评价)
        </p>
      </div>
      <div>
        <p class="card-little-info__rank">排名:{{item.rank}}</p>
        <p class="card-little-info__miru">{{ item.collection.doing }}人在看</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  item: {
    type: Object as PropType<Bangumi.AnimeItemInfo>,
    default: {},
  },
});
</script>

<style lang="less" scoped>
@import url(./styles/SmallAnimeItem.less);
</style>