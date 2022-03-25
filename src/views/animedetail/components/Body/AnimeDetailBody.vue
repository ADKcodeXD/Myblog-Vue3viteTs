<template>
  <div class="main tw-bg-slate-500 tw-w-full tw-mt-5 tw-p-3" v-if="animeDetail">
    <div class="desc">
      <p class="tw-text-white tw-font-bold tw-text-3xl">简介</p>
      <p class="tw-text-xs tw-leading-6 tw-text-white tw-mt-10 md:tw-text-2xl">
        {{ animeDetail.summary }}
      </p>
    </div>
    <AnimeEp :eps="animeDetail.eps" v-if="animeDetail.eps"/>
    <HumanBoxCard :AnimeItemList="animeDetail.crt" />
    <HumanBoxCard :StaffItemList="animeDetail.staff" />
    <AnimeDetailInfoBox />
  </div>
</template>

<script lang="ts">
import { AnimeDeatilItem } from "@/interface/bangumiApi.type";
import { defineComponent, PropType } from "vue";
import HumanBoxCard from './HumanBoxCard.vue';
import AnimeEp from "./AnimeEp.vue";
import AnimeDetailInfoBox from "./AnimeDetailInfoBox.vue";
export default defineComponent({
  props: {
    animeDetail: {
      type: Object as PropType<AnimeDeatilItem>,
      require: true,
    },
  },
  setup(props) {
      // 找出谁是导演
    const eps = computed(() => {
      return props.animeDetail?.eps.sort((a, b) => {
        if (a.type - b.type === 0) {
          return a.sort - b.sort;
        } else {
          return a.type - b.type;
        }
      });
    });
    return{eps}
  },
  components:{ HumanBoxCard, AnimeEp, AnimeDetailInfoBox }
});
</script>


<style lang="less" scoped>

</style>