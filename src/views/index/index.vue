<template>
  <div class="main">
    <div class="tw-h-24 ghost"></div>
    <SubTitle>
      最近更新
      <template #right>
        welcome to Adkblog
      </template>
    </SubTitle>
    <Carousel :items="bannerList" />
    <SubTitle>
      看看新番
    </SubTitle>
    <div class="bangumi">
      <Bangumimini />
    </div>
    <SubTitle>
      我的文章
    </SubTitle>
    <div class="view-content">
      <div class="article">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <div class="title">
                <div class="tw-flex tw-flex-col few">
                  <p>近期更新文章</p>
                  <span>Update in few days</span>
                </div>
              </div>
              <AdkButton :x="8" :y="3.3" :mainTextsize="1.3" :subTextsize="0.7"
                @click="$router.push('/index/articlelist')">
                更多
                <template #endesc>
                  more
                </template>
              </AdkButton>
            </div>
          </template>
          <ArticleItem v-for="articleItem in articles" :key="articleItem.id" :articleItem="articleItem" />
          <AdkEmpty v-if="articles.length === 0" desc="暂时没有文章发表哦~"></AdkEmpty>
        </el-card>
      </div>
      <ul class="rightbox" ref="rightUl">
        <li>
          <ArticleTimeLine />
        </li>
        <li>
          <TagsAll />
        </li>
        <li>
          <TimeLine />
        </li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
export default { name: 'Index' }
</script>

<script setup lang="ts">
import { getIndexArticleApi, getIndexBanner } from "@/api/article";
import TimeLine from "./components/TimeLine.vue";
import TagsAll from './components/TagsAll.vue';
import ArticleTimeLine from "./components/ArticleTimeLine.vue";
import Jinqi from '@/assets/img/近期更新.png';
// Default SortableJS
import Sortable from 'sortablejs';
import SubTitle from "./components/SubTitle.vue";
// 获取首页文章 按照时间顺序 5篇
let articles = ref<ArticleItemInfo[]>([]);
let bannerList = ref<Banner[]>([]);
let pageparams: PageParams = {
  page: 1,
  pagesize: 5,
};
let isHover = ref(true)
// 获取文章列表
const getIndexfive = async () => {
  const { data } = await getIndexArticleApi(pageparams);
  articles.value = data.data;
};
const rightUl = ref<HTMLElement>();

// 获取文章头图
const getBannerList = async () => {
  const { data } = await getIndexBanner();
  bannerList.value = data.data;
};

// 拖拽
onMounted(() => {
  getIndexfive();
  getBannerList();
  // new Sortable(rightUl.value,{
  //   animation: 150,
  // })
});
</script>

<style lang="less" scoped>
@import url(./styles/Index.less);
</style>