<template>
  <div class="
      container
      tw-bg-white
      tw-flex
      tw-flex-col
      tw-drop-shadow-xl
      tw-p-5
      tw-rounded-md
      tw-border-2
    ">
    <div class="title tw-text-3xl tw-flex tw-items-end">
      <p v-if="mainParams.sort == 'rank'">排行榜</p>
      <p v-if="mainParams.sort == 'date'">按时间排序</p>
      <p v-if="mainParams.sort == 'title'">按字母顺序</p>
      <p>
        <span v-if="mainParams.type">/{{ mainParams.type }}</span>
        <span v-if="mainParams.airtime">/{{ mainParams.airtime }}</span>
      </p>
      <small class="tw-text-xs tw-ml-3 tw-text-gray-400">看看哪一部动画你最喜欢</small>
    </div>
    <AnimeOrderMenu @changeParams="changeParams" />
    <div class="box tw-flex tw-flex-wrap tw-justify-between" v-loading="cardLoading">
      <AnimeBroswerCard v-for="item in animeInfoList" :key="item.id" :item="item" />

      <el-empty v-if="!animeInfoList || animeInfoList.length == 0" style="width: 100%; height: 100%">
      </el-empty>
    </div>
    <p v-if="page > 1 && !isNextPageLoading" class="
        tw-text-xl tw-self-center tw-mt-5 tw-cursor-pointer tw-text-blue-500
      " @click="nextPage">
      加载更多
    </p>
    <div v-if="isNextPageLoading" class="tw-bg-gray-400 tw-w-1/6 tw-rounded-full tw-mt-5 tw-self-center">
      <el-image :src="Loading" style="width: 100%; height: 100%">
      </el-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref } from "vue";
import Loading from "@/assets/img/loading.gif";
import AnimeBroswerCard from "./AnimeBroswerCard.vue";
import AnimeOrderMenu from "./AnimeOrderMenu.vue";
import { useBroswer } from "@/hooks/Bangumi";
import { SortRole } from "@/interface/EnumExport";

let animeInfoList = ref<Array<Bangumi.BroswerResult>>([]);
let page = ref(0);
let cardLoading = ref(false);
let mainParams = reactive<Bangumi.BroswerParams>({
  page: 1,
  sort: SortRole.rank,
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
  getBroswer(mainParams).then((item) => {
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