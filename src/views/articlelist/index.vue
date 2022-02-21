

<template>
  <div class="artilce-list">
    <div class="top">
      <p class="title">文章列表</p>
      <div class="bottom">
        <div class="orderBytime">
          <p style="margin-right: 10px">根据时间进行筛选:</p>
          <div class="alltag">最热</div>
          <div class="alltag">最新</div>
        </div>
        <div class="orderByTag">
          <p style="margin-right: 10px">根据标签进行筛选</p>
          <div class="tags">
            <div
              class="tag"
              :class="{active:currentTagId===tag.id}"
              @click="getTagId(tag.id)"
              v-for="tag in options"
              :key="tag.id"
            >
              <span>{{ tag.tagName }}</span>
            </div>
          </div>
        </div>
        <div class="order">
          <div class="paixu">
            <span>排序：</span>
          </div>
          <div
            class="alltag"
            @click="orderByViewCounts"
            :class="{ active: isNew === 0 }"
          >
            最热
          </div>
          <div
            class="alltag"
            @click="orderByDate"
            :class="{ active: isNew === 1 }"
          >
            最新
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-if="articles">
      <transition-group name="article" mode="out-in">
        <ArticleItem
        class="article-item-sub"
        :article-item="item"
        :key="item.id"
        v-for="item in articles.articleVoList"
      />
      </transition-group>
      
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

<script setup lang="ts">
import { getTagList, listArticleWithCount } from "@/api/article";
import { ArticleListItem } from "@/interface/article";
import { PageParams } from "@/interface/params";
import { Tag } from "@/interface/tag";
import ArticleItem from "../index/components/article-item.vue";

let options = ref<Tag[]>([]);
const getTag = async () => {
  const { data } = await getTagList();
  if (data.code === 200) {
    options.value = data.data;
  } else {
    console.log("error");
  }
};
let isNew = ref(2);
let pageparams: PageParams = reactive({
  page: 1,
  pagesize: 10,
});
// 获取文章列表
let articles = ref<ArticleListItem>();
const getArticle = async () => {
  const { data } = await listArticleWithCount(pageparams);
  articles.value = data.data;
};
// 页数改变
const changePage = (val: number) => {
  pageparams.page = val;
  getArticle();
};
// 获取最多观看次数的
const orderByViewCounts = () => {
  isNew.value = 0;
  pageparams.orderRole = "view_counts";
  pageparams.page = 1;
  getArticle();
};
// 获取根据日期排序的
const orderByDate = () => {
  isNew.value = 1;
  pageparams.orderRole = undefined;
  pageparams.page = 1;
  getArticle();
};
// 获取点击tagid
let currentTagId = ref<number>(0);
const getTagId = (id: number) => {
  if (currentTagId.value === id) {
    currentTagId.value = 0;
    pageparams.tagId = undefined;
    getArticle();
  } else {
    currentTagId.value=id;
    pageparams.tagId = id;
    getArticle();
  }
};
onMounted(() => {
  getTag();
  getArticle();
});
</script>

<style lang="less" scoped>
@import url(./styles/articlelist-pc.less);

</style>