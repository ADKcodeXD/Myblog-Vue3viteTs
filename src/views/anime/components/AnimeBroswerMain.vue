<template>
  <div class="broswer">
    <div class="broswer-title">
      <p v-if="mainParams.sort == 'rank'">排行榜</p>
      <p v-if="mainParams.sort == 'date'">按时间排序</p>
      <p v-if="mainParams.sort == 'title'">按字母顺序</p>
      <p>
        <span v-if="mainParams.type">/{{ mainParams.type }}</span>
        <span v-if="mainParams.airtime">/{{ mainParams.airtime }}</span>
      </p>
      <small class="broswer-title__tip">看看哪一部动画你最喜欢</small>
    </div>
    <AnimeOrderMenu @changeParams="changeParams" />
    <div class="broswer-inner" v-loading="cardLoading">
      <AnimeBroswerCard v-for="item in animeInfoList" :key="item.id" :item="item" />
      <AdkEmpty v-if="!animeInfoList || animeInfoList.length == 0" desc="找不到动漫数据啦" />
    </div>
    <div
      v-if="page > 1 && !isNextPageLoading"
      class="tw-text-xl tw-self-center tw-mt-5 tw-cursor-pointer tw-text-blue-500"
      @click="nextPage"
    >
      加载更多
    </div>
    <div v-if="isNextPageLoading" class="broswer-loading">
      <LoadingAnime />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AnimeBroswerCard from './AnimeBroswerCard.vue';
import AnimeOrderMenu from './AnimeOrderMenu.vue';
import { useBroswer } from '@/hooks/Bangumi';
import { SortRole } from '@/interface/EnumExport';

let animeInfoList = ref<Array<Bangumi.BroswerResult>>([]);
let page = ref(0);
let cardLoading = ref(false);
let mainParams = reactive<Bangumi.BroswerParams>({
  page: 1,
  sort: SortRole.rank
});
let isNextPageLoading = ref(false);
const { getBroswer } = useBroswer(cardLoading, animeInfoList, page);
const nextPage = () => {
  isNextPageLoading.value = true;
  if (mainParams.page && mainParams.page < page.value) {
    mainParams.page++;
  } else {
    isNextPageLoading.value = false;
    return;
  }
  getBroswer(mainParams).then(() => {
    isNextPageLoading.value = false;
  });
};
const changeParams = (params: Bangumi.BroswerParams) => {
  for (let key in params) {
    mainParams[key] = params[key];
  }
  getBroswer(params);
};
getBroswer(mainParams);
</script>

<style lang="less" scoped>
@import url(../styles/AnimeBrowser.less);
</style>
