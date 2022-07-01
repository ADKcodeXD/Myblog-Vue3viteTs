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
      <ConditionalFilter :pageParams="pageparams" />
      <div class="tip">
        <p>共为您查询到以下 {{ total }} 条数据</p>
        <p v-if="pageparams.keyword">关键词: {{ pageparams.keyword }}</p>
        <p v-if="pageparams.year">时间条件: {{ pageparams.year }}年{{ pageparams.month }}月</p>
      </div>
      <AdkDivider />
      <div class="main" v-loading="articlesLoading" v-if="articles">
        <transition-group name="article">
          <ArticleItem class="article-item-sub" :article-item="item" :key="item.id" v-for="item in articles" />
        </transition-group>
        <el-empty v-if="articles.length == 0">
        </el-empty>
      </div>
    </div>
    <!-- 分页 待会封装一个样式特殊的分页 -->
    <div class="page" v-if="articles">
      <MyPagination :pageParams="pageparams" :total="total" />
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
import { debounce } from "@/utils/tools";

const total = ref(0); //文章的总数

const searchLoading = ref(false);

const articles = ref<ArticleItemInfo[]>(); // 获取文章列表

const articlesLoading = ref(false); // 文章列表加载

const route = useRoute(); // 重构 tagids 发送一个数组

const pageparams: PageParams = reactive({
  page: 1,
  pagesize: 10,
  pannel:0,
}); // 文章 的pageparams

const searchArticle = () => {
  getArticle();
}

const getArticle = async () => {
  searchLoading.value = true;
  articlesLoading.value = true;
  const { data } = await listArticleWithCount(pageparams);
  articles.value = data.data.results;
  total.value = data.data.length;
  articlesLoading.value = false;
  searchLoading.value = false;
};
let debounceFn=debounce(100,getArticle);
watch(pageparams,() => {
  debounceFn();
})
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