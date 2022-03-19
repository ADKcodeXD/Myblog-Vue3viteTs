<template>
  <div
      class="title tw-text-3xl tw-flex tw-justify-between tw-items-end tw-mt-10"
    >
      <p>排行榜</p>
    </div>
    <div
      class="box tw-flex tw-flex-wrap tw-justify-between"
      v-loading="cardLoading"
    >
      <AnimeBroswerCard
        v-for="item in animeInfoList"
        :key="item.id"
        :item="item"
      />

      <el-empty
        v-if="!animeInfoList || animeInfoList.length == 0"
        style="width: 100%; height: 100%"
      >
      </el-empty>
    </div>
</template>

<script lang="ts">
import { getBroswerDataApi } from "@/api/bangumiMy";
import { BroswerParams, BroswerResult } from "@/interface/bangumiApi.type";
import { SortRole } from "@/interface/BangumiEnum";
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";
import Loading from "@/assets/img/loading.gif";
import AnimeBroswerCard from "./AnimeBroswerCard.vue";

export default defineComponent({
    setup() {
        let sortRole = SortRole;
        let broswerParams: BroswerParams = reactive({
            sort: sortRole.rank,
            page: 1,
        });
        let animeInfoList = ref<Array<BroswerResult>>([]);
        let page = ref(0);
        let cardLoading = ref(false);
        const getBroswer = async () => {
            cardLoading.value = true;
            const { data } = await getBroswerDataApi(broswerParams);
            if (data.code === 200) {
                animeInfoList.value = data.data.results;
                page.value = data.data.pages;
                cardLoading.value = false;
            }
            else {
                ElMessage.error("请求排行榜失败");
                cardLoading.value = false;
            }
        };
        onBeforeMount(() => {
            getBroswer();
        });
        return {
            animeInfoList,
            page,
            Loading,
            cardLoading,
        };
    },
    components: { AnimeBroswerCard }
});
</script>

<style>

</style>