<template>
  <router-link class="card-main" :to="`/index/animedetail/${item.id}`" v-if="item">
    <div class="card-main-img">
      <div v-if="item.rank" class="card-main-img-rank">
        <p class="tw-text-2xl tw-font-bold tw-shrink-0 tw-text-orange-50">#{{ item.rank }}</p>
      </div>
      <MyElimage :img="item.imageUrl" />
    </div>
    <div class="card-main-info">
      <div class="card-main-info__title">
        <div class="tw-flex tw-flex-col tw-flex-1">
          <p class="name">
            {{ item.nameCn ? item.nameCn : item.name }}
          </p>
          <p class="tip">
            {{ item.infoTip }}
          </p>
        </div>
      </div>
      <div class="card-main-info__raiting">
        <small class="tw-flex-shrink-0"
          >{{ item.count && item.count > 10 ? item.count : '少于10' }}人评分
        </small>
        <el-rate
          v-if="item.score"
          v-model="score"
          disabled
          size="small"
          show-score
          text-color="#ff9900"
          :score-template="item.score.toString()"
        />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
  item: {
    type: Object as PropType<Bangumi.BroswerResult>,
    default: () => {
      return {};
    }
  }
});

const score = computed(() => {
  return props.item.score ? props.item.score / 2 : 0;
});
</script>

<style lang="less" scoped>
@import url(../styles/AnimeCard.less);
</style>
