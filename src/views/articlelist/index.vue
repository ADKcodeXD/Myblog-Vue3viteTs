<template>
  <div class="artilce-list">
    <div class="top">
      <div class="top-bar">
        <p class="title">文章列表</p>
        <div class="search">
          <el-autocomplete
            v-model="pageparams.keyword"
            :size="'large'"
            placeholder="搜索"
            class="iconfont input-search"
            style="width: 100%; margin-right: 1rem"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            @change="nullSearch"
          >
            <template #default="{ item }">
              <span class="link">{{ item.articleName }}</span>
            </template>
          </el-autocomplete>
          <el-button
            v-loading="searchLoading"
            :icon="Search"
            size="large"
            type="success"
            @click="searchByKeyword"
          >
            搜索
          </el-button>
        </div>
      </div>

      <div class="bottom">
        <div class="orderBytime">
          <p class="label">根据时间进行筛选</p>
          <el-date-picker
            v-model="time"
            type="month"
            placeholder="选择日期"
            @panel-change="pickDate"
          />
        </div>
        <div class="orderByTag">
          <div class="left">
            <p class="label">根据标签进行筛选</p>
            <div class="tags" v-loading="tagloading">
              <div
                class="alltag"
                :class="{ active: currentTagIds.includes(tag.id) }"
                @click="getTagId(tag)"
                v-for="tag in options"
                :key="tag.id"
              >
                <span>{{ tag.tagName }}</span>
              </div>
              <div class="change-tag">
                <span
                  >{{ tagPageParams.page }}/{{
                    Math.ceil(tagTotal / tagPageParams.pagesize)
                  }}</span
                >
                <div class="ball" @click="changeTag">换</div>
              </div>
            </div>
          </div>
          <div class="right" v-if="chooseTag.length > 0">
            <p>已选择标签</p>
            <TagItem
              v-for="tag in chooseTag"
              :key="tag.id"
              :tagId="tag.id"
              :tagName="tag.tagName"
              :closable="true"
              :is-click="false"
              @closeTag="getTagId(tag)"
            />
          </div>
        </div>
        <div class="order">
          <p class="label">排序规则</p>
          <div
            class="alltag"
            @click="order('null', 0)"
            :class="{ active: currentOrder === 0 }"
          >
            默认
          </div>
          <div
            class="alltag"
            @click="order('view_counts', 1)"
            :class="{ active: currentOrder === 1 }"
          >
            最多阅读
          </div>

          <div
            class="alltag"
            @click="order('like_counts', 2)"
            :class="{ active: currentOrder === 2 }"
          >
            点赞数
          </div>
          <div
            class="alltag"
            @click="order('collect_counts', 3)"
            :class="{ active: currentOrder === 3 }"
          >
            收藏数
          </div>
          <div
            class="alltag"
            @click="order('comment_counts', 4)"
            :class="{ active: currentOrder === 4 }"
          >
            评论数
          </div>
          <div
            class="alltag"
            @click="order('a', 5)"
            :class="{ active: currentOrder === 5 }"
          >
            倒序
          </div>
        </div>
      </div>
      <div class="tip">
        <p>共为您查询到以下{{articles?.length}}数据</p>
        <p v-if="pageparams.keyword">关键词: {{pageparams.keyword}}</p>
        <p v-if="pageparams.year">时间条件: {{pageparams.year}}年{{pageparams.month}}月</p>
      </div>
    </div>
    <div class="main" v-loading="articlesLoading"  v-if="articles">
      <transition-group name="article" mode="out-in">
        <ArticleItem
          class="article-item-sub"
          :article-item="item"
          :key="item.id"
          v-for="item in articles.articleVoList"
        />
      </transition-group>
      <el-empty v-if="articles.length == 0"> </el-empty>
    </div>
    <div class="page" v-if="articles">
      <p>总共{{ articles.length }}条数据</p>
      <el-pagination
        @current-change="changePage"
        :current-page="pageparams.page"
        :page-size="pageparams.pagesize"
        hide-on-single-page
        background
        layout="prev, pager, next"
        :total="articles.length"
      >
      </el-pagination>
    </div>
  </div>
</template>


<script lang="ts">
export default { name: "ArticleList" };
</script>


<script setup lang="ts">
import {
  getTagListApi,
  listArticleWithCount,
  getSearchTipApi,
} from "@/api/article";
import { ArticleListItem } from "@/interface/article";
import { PageParams } from "@/interface/params";
import { Tag } from "@/interface/tag";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import ArticleItem from "../index/components/article-item.vue";

let options = ref<Tag[]>([]);
let tagTotal = ref<number>(0);
let currentOrder = ref(0);
let time = ref<Date>();
// 获取文章列表
let articles = ref<ArticleListItem>();
// 文章列表加载
let articlesLoading=ref(false);
// ids 存放列表
let currentTagIds = ref<Array<number>>([]);
// 重构 tagids 发送一个数组
const route = useRoute();
// 文章 的pageparams
let pageparams: PageParams = reactive({
  page: 1,
  pagesize: 10,
});
// tag的pageparams
let tagPageParams: PageParams = reactive({
  page: 1,
  pagesize: 5,
});
let tagloading = ref(false);
let chooseTag = ref<Tag[]>([]);
let searchLoading = ref(false);
// 获取tag api
const getTag = async () => {
  tagloading.value = true;
  const { data } = await getTagListApi(tagPageParams);
  if (data.code === 200) {
    options.value = data.data.results;
    tagTotal.value = data.data.length;
  } else {
    console.log("error");
  }
  tagloading.value = false;
};
// 获取tag 下一页
const changeTag = () => {
  if (
    tagPageParams.page ==
    Math.ceil(Math.ceil(tagTotal.value / tagPageParams.pagesize))
  ) {
    tagPageParams.page = 1;
  } else {
    tagPageParams.page++;
  }
  getTag();
};
const getArticle = async () => {
  articlesLoading.value=true;
  const { data } = await listArticleWithCount(pageparams);
  articles.value = data.data;
  articlesLoading.value=false
};
// 页数改变
const changePage = (val: number) => {
  pageparams.page = val;
  getArticle();
};
// 排序规则
const order = (val: string, num: number) => {
  currentOrder.value = num;
  if (val !== "null") {
    pageparams.orderRole = val;
    pageparams.page = 1;
  } else {
    pageparams.orderRole = undefined;
    pageparams.page = 1;
  }
  getArticle();
};
// 搜索 by关键词
const searchByKeyword = async () => {
  searchLoading.value = true;
  if (pageparams.keyword) {
    await getArticle();
    searchLoading.value = false;
  } else {
    searchLoading.value = false;
  }
};
// 为空时 直接获取原来的结果
const nullSearch = (val: string | number) => {
  if (!val) {
    pageparams.keyword=undefined;
    getArticle();
  }
};
// 搜索建议
const querySearchAsync = async (val: string, cb: Function) => {
  const { data } = await getSearchTipApi(val);
  const results = data.data;
  cb(results);
};
// 自动填充
const handleSelect = (val: { articleName: string }) => {
  pageparams.keyword = val.articleName;
};
const getTagId = (tag: Tag) => {
  if (currentTagIds.value.includes(tag.id)) {
    currentTagIds.value.splice(currentTagIds.value.indexOf(tag.id), 1);
    chooseTag.value = chooseTag.value.filter((item) => {
      return item.id !== tag.id;
    });
  } else {
    currentTagIds.value.push(tag.id);
    chooseTag.value?.push(tag);
  }
  // 如果没有tag  发送一个 undefined
  if (currentTagIds.value.length === 0) pageparams.tagIds = undefined;
  else pageparams.tagIds = currentTagIds.value;

  getArticle();
};
// 年月日
const pickDate = (date: Date) => {
  if (date) {
    pageparams.year = date.getFullYear().toString();
    pageparams.month = (date.getMonth() + 1).toString();
  } else {
    pageparams.year = undefined;
    pageparams.month = undefined;
  }
  getArticle();
};
// 监视时间的改变并发送请求
watch(time, (newValue: Date | undefined) => {
  if (newValue) {
    pageparams.year = newValue.getFullYear().toString();
    pageparams.month = (newValue.getMonth() + 1).toString();
  } else {
    pageparams.year = undefined;
    pageparams.month = undefined;
  }
  getArticle();
});
// 监视时间的改变并发送请求

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
    console.log(route);
    if (route.query.tagId && route.query.tagName) {
      try {
        currentTagIds.value.push(Number(route.query.tagId));
        chooseTag.value.push({
          id: Number(route.query.tagId),
          tagName: route.query.tagName.toString(),
        });
        pageparams.tagIds = currentTagIds.value;
      } catch (error) {
        ElMessage.error("查询出错");
      }
    }
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
  currentTagIds.value = [];
  chooseTag.value = [];
  pageparams.year = undefined;
  pageparams.keyword = undefined;
  pageparams.month = undefined;
  pageparams.tagIds = undefined;
});
onMounted(() => {
  getTag();
  getArticle();
});
</script>

<style lang="less" scoped>
@import url(./styles/articlelist-pc.less);
</style>