<template>
  <div class="artilce-list">
    <div class="top">
      <div class="top-bar">
        <div class="title">
          <div>
            <i class="iconfont icon-wenzhang"></i>
          </div>
          <div class="tw-flex tw-justify-center tw-flex-col tw-font-bold">
            <p>文章列表</p>
            <span>Article list</span>
          </div>
        </div>
        <Search :pageParams="pageparams" :searchLoading="searchLoading" @changeKeyword="searchArticle" />
      </div>
      <!-- 条件过滤框 -->
      <ConditionalFilter :pageParams="pageparams" @changeConditional="getArticle()" />
      <div class="tip">
        <p>共为您查询到以下{{ articles?.length }}数据</p>
        <p v-if="pageparams.keyword">关键词: {{ pageparams.keyword }}</p>
        <p v-if="pageparams.year">时间条件: {{ pageparams.year }}年{{ pageparams.month }}月</p>
      </div>
      <AdkDivider />
      <div class="main" v-loading="articlesLoading" v-if="articles">
        <transition-group name="article" >
          <ArticleItem class="article-item-sub" :article-item="item" :key="item.id"
            v-for="item in articles.articleVoList" />
        </transition-group>
        <el-empty v-if="articles.length == 0">
        </el-empty>
      </div>
    </div>
    <!-- 分页 待会封装一个样式特殊的分页 -->
    <div class="page" v-if="articles">
      <p>总共{{ articles.length }}条数据</p>
      <el-pagination @current-change="changePage" :current-page="pageparams.page" :page-size="pageparams.pagesize"
        hide-on-single-page background layout="prev, pager, next" :total="articles.length">
      </el-pagination>
    </div>
  </div>
</template>


<script lang="ts">
export default { name: "ArticleList" };
</script>
<script setup lang="ts">
import { listArticleWithCount } from "@/api/article";
import Search from "./components/Search.vue";
import ConditionalFilter from "./components/ConditionalFilter.vue";

let searchLoading = ref(false);
// 获取文章列表
let articles = ref<ArticleListItem>();
// 文章列表加载
let articlesLoading = ref(false);
// 重构 tagids 发送一个数组
const route = useRoute();
// 文章 的pageparams
let pageparams: PageParams = reactive({
  page: 1,
  pagesize: 10,
});

const searchArticle = () => {
  getArticle();
}

const getArticle = async () => {
  searchLoading.value = true
  articlesLoading.value = true;
  const { data } = await listArticleWithCount(pageparams);
  articles.value = data.data;
  articlesLoading.value = false;
  searchLoading.value = false;
};
// 页数改变
const changePage = (val: number) => {
  pageparams.page = val;
  getArticle();
};

// todo
// 记录当前浏览位置 返回时可以记录当前的滚动条

// 查看路由有无携带参数
// bug:由于tag分页查询 这里如果查找了此时页面中没有的tag无法进行筛选 fixed
onActivated(() => {
  if (
    route &&
    route.query &&
    (route.query.year ||
      route.query.month ||
      route.query.keyword ||
      route.query.tagId)
  ) {
    if (route.query.year) {
      pageparams.year = route.query.year.toString();
    }
    if (route.query.month) {
      pageparams.month = route.query.month.toString();
    }
    if (route.query.keyword) {
      pageparams.keyword = route.query.keyword.toString();
    }
    getArticle();
  }
});
onDeactivated(() => {
  pageparams.year = undefined;
  pageparams.keyword = undefined;
  pageparams.month = undefined;
  pageparams.tagIds = undefined;
});
onMounted(() => {
  getArticle();
});
</script>

<style lang="less" scoped>
@import url(./styles/ArticleList.less);
</style>