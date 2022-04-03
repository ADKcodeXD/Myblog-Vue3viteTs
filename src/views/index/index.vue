<template>
  <div class="main">
    <Carousel :items="bannerList" />
    <div class="view-content">
      <div class="article">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>近期更新文章</span>
              <el-button
                @click="$router.push('/index/articlelist')"
                class="button"
                type="text"
                >查看更多</el-button
              >
            </div>
          </template>
          <ArticleItem
            v-for="articleItem in articles"
            :key="articleItem.id"
            :articleItem="articleItem"
          />
          <el-empty
            v-if="articles.length === 0"
            description="暂时没有文章发表哦~"
          ></el-empty>
        </el-card>
      </div>
      <div class="rightbox">
        <MyInfo />
        <ArticleTimeLine/>
        <TagsAll/> 
        <TimeLine />
      </div>
    </div>
    <div class="bangumi">
      <Bangumimini/>
    </div>

  </div>
</template>


<script lang="ts">
export default { name: 'Index' }
</script>

<script setup lang="ts">
import { getIndexArticleApi, getIndexBanner, listArticle } from "@/api/article";
import { ArticleItemInfo, Banner } from "@/interface/article";
import { PageParams } from "@/interface/params";
import ArticleItem from "./components/article-item.vue";
import MyInfo from "./components/my-info.vue";
import TimeLine from "./components/time-line.vue";
import TagsAll from './components/tags-all.vue'
import ArticleTimeLine from "./components/article-time-line.vue";

// 获取首页文章 按照时间顺序 5篇
let articles = ref<ArticleItemInfo[]>([]);
let bannerList = ref<Banner[]>([]);
let pageparams: PageParams = {
  page: 1,
  pagesize: 5,
};
let isChatRoomshow=ref(false);
// 获取文章列表
const getIndexfive = async () => {
  const { data } = await getIndexArticleApi(pageparams);
  articles.value = data.data;
};


// 获取文章头图
const getBannerList = async () => {
  const { data } = await getIndexBanner();
  bannerList.value = data.data;
};

onMounted(() => {
  getIndexfive();
  getBannerList();
});
</script>

<style lang="less" scoped>
@import url(./styles/pc/index-pc.less);
</style>