<template>
  <!-- 展示动漫详情页 -->
  <section class="big-container">
    <div class="header">
      <div class="back-btn">
        <i class="iconfont icon-left"></i>
        Back
      </div>
    </div>
    <div class="content">
      <!-- pc端上三栏布局 手机端左边一栏 右边详细信息 右边的往下放 -->
      <div class="left-content" v-if="!loading">
        <AnimeDetailHeader :animeDetail="animeDetail" v-if="animeDetail" />
        <AnimeDetailBody :animeDetail="animeDetail" v-if="animeDetail" />
      </div>
      <div class="right-content" v-if="!loading">
        <RataingBox :animeDetail="animeDetail" v-if="animeDetail" />
        <!-- 在看人数 -->
        <AnimeCollections :collectionData="animeDetail.collection" v-if="animeDetail" />
        <AnimeTags v-if="tags && tags.length > 0" :tags="tags" />
        <AnimeRecommend v-if="tags && tags.length > 0" :tags="tags" @changeId="changeData" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useAnimeDeatil } from "@/hooks/BangumiDetail";
import { ElMessage } from "element-plus";
import { isArray } from "lodash";
import AnimeDetailHeader from "./components/Header/AnimeDetailHeader.vue";
import AnimeDetailBody from "./components/Body/AnimeDetailBody.vue";
import RataingBox from "./components/Card/RataingBox.vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import AnimeCollections from "./components/Card/AnimeCollections.vue";
import { getSubjectInfoApi } from "@/api/bangumi";
import AnimeRecommend from "./components/Card/AnimeRecommend.vue";
import AnimeTags from "./components/Card/AnimeTags.vue";

const route = useRoute();
document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
let animeDetail = ref<Bangumi.AnimeDeatilItem | null>();
let loading = ref(false);
let tags = ref<Array<Bangumi.AnimeTag>>([]);
let infoBox = ref<Array<Bangumi.InfoBoxItem>>([]);
let id = ref(0);
provide("infoboxVal", infoBox);
const getData = (id: number) => {
  loading.value = true;
  useAnimeDeatil(id)
    .then((result) => {
      animeDetail.value = result;
      //绘制图表
      loading.value = false;
    })
    .catch((err) => {
      ElMessage.error("请求失败");
      loading.value = false;
    });

  getSubjectInfoApi(id)
    .then((result: any) => {
      const { data } = result;
      tags.value = data.tags;
      infoBox.value = data.infobox;
    })
    .catch((err: any) => {
      ElMessage.error("请求失败");
      loading.value = false;
    });
};
if (route.params && route.params.id) {
  if (isArray(route.params.id)) {
    id.value = parseInt(route.params.id[0]);
  } else {
    id.value = parseInt(route.params.id);
  }
  getData(id.value);
}
const changeData = (id: number) => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  animeDetail.value = null;
  getData(id);
}
</script>

<style lang="less" scoped>
@import url(./styles/Animedetail.less);
</style>