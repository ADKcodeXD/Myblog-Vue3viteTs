<template>
  <!-- 展示动漫详情页 -->
  <div class="tw-p-4 md:tw-mt-5 tw-mt-28">
    <el-page-header
      :icon="ArrowLeft"
      :content="'ID' + $route.params.id"
      @back="$router.back()"
    />
  </div>
  <div
    class="
      container
      tw-flex tw-flex-col tw-mt-5
      md:tw-flex-row md:tw-justify-between
    "
  >
    <!-- pc端上三栏布局 手机端左边一栏 右边详细信息 右边的往下放 -->
    <div class="md:tw-w-9/12">
      <!-- 头部 组件 -->
      <!-- 全部使用骨架屏做loading -->
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div
            class="
              left
              tw-bg-slate-600 tw-flex tw-w-full tw-p-5 tw-items-center
            "
          >
            <div>
              <el-skeleton-item variant="image" class="tw-w-60 tw-h-80" />
            </div>
            <div
              class="
                tw-flex-1 tw-ml-5 tw-h-72 tw-flex tw-flex-col tw-justify-between
              "
            >
              <el-skeleton-item variant="h1" class="tw-w-3/5" />
              <el-skeleton-item variant="h3" class="tw-w-2/5" />
              <el-skeleton-item variant="h3" class="tw-w-2/5" />
              <el-skeleton-item variant="text" class="tw-w-1/5" />
              <el-skeleton-item variant="rect" class="tw-h-24 tw-w-1/5" />
            </div>
          </div>
        </template>
        <template #default>
          <AnimeDetailHeader :animeDetail="animeDetail" v-if="animeDetail" />
        </template>
      </el-skeleton>
      <!-- 详情组件 -->
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div
            class="
              tw-flex-1
              tw-mt-5
              tw-h-96
              tw-flex
              tw-flex-col
              tw-justify-between
              tw-bg-slate-600
              tw-w-full
              tw-p-5
            "
          >
            <el-skeleton-item variant="h1" class="tw-w-1/5" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="rect" class="tw-h-24 tw-w-1/5" />
          </div>
        </template>
        <template #default>
          <AnimeDetailBody :animeDetail="animeDetail" v-if="animeDetail" />
        </template>
      </el-skeleton>
    </div>

    <div class="md:tw-flex-1">
      <!-- 评分卡片 -->
      <el-skeleton
        :loading="loading"
        animated
        style="--el-skeleton-circle-size: 10rem"
      >
        <template #template>
          <div
            class="
              rating
              tw-p-3 tw-mt-3 tw-bg-slate-600 tw-relative
              md:tw-mt-0 md:tw-ml-4 md:tw-rounded-lg md:tw-drop-shadow-md
            "
          >
            <el-skeleton-item variant="h1" class="tw-w-2/5" />
            <el-skeleton-item variant="h3" />
            <el-skeleton-item variant="rect" class="tw-h-36 tw-mt-5" />
          </div>
          <div
            class="
              rating
              tw-p-3 tw-mt-3 tw-bg-slate-600 tw-relative
              md:tw-mt-4 md:tw-ml-4 md:tw-rounded-lg md:tw-drop-shadow-md
            "
          >
            <el-skeleton-item variant="h1" class="tw-w-2/5" />
            <el-skeleton-item variant="h3" class="tw-w-4/5" />
            <el-skeleton-item variant="circle" class="tw-mx-auto tw-mt-10" />
          </div>
        </template>
        <template #default>
          <RataingBox :animeDetail="animeDetail" v-if="animeDetail" />
          <!-- 在看人数 -->
          <AnimeCollections
            
            :collectionData="animeDetail.collection"
            v-if="animeDetail"
          />
          <AnimeTags v-if="tags && tags.length > 0" :tags="tags" />
          <AnimeRecommend v-if="tags && tags.length > 0" :tags="tags" @changeId="changeData"/>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
import { useAnimeDeatil } from "@/hooks/BangumiDetail";
import {
  AnimeDeatilItem,
  AnimeTag,
  InfoBoxItem,
} from "@/interface/bangumiApi.type";
import { ElMessage } from "element-plus";
import { isArray } from "lodash";
import { defineComponent } from "vue";
import AnimeDetailHeader from "./components/Header/AnimeDetailHeader.vue";
import AnimeDetailBody from "./components/Body/AnimeDetailBody.vue";
import RataingBox from "./components/Card/RataingBox.vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import AnimeCollections from "./components/Card/AnimeCollections.vue";
import { getSubjectInfoApi } from "@/api/bangumi";
import AnimeRecommend from "./components/Card/AnimeRecommend.vue";
import AnimeTags from "./components/Card/AnimeTags.vue";

export default defineComponent({
  setup() {
    const route = useRoute();
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    let animeDetail = ref<AnimeDeatilItem|null>();
    let loading = ref(false);
    let tags = ref<Array<AnimeTag>>([]);
    let infoBox = ref<Array<InfoBoxItem>>([]);
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
    const changeData=(id:number)=>{
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      animeDetail.value=null;
      getData(id);
    }
    return {
      animeDetail,
      loading,
      ArrowLeft,
      tags,
      changeData
    };
  },
  components: {
    AnimeDetailHeader,
    AnimeDetailBody,
    RataingBox,
    AnimeCollections,
    AnimeRecommend,
    AnimeTags,
  },
});
</script>


<style lang="less" scoped>
</style>