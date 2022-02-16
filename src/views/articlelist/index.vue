

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
          <TagsGroup :tags="options" @tagId="getTagId" ></TagsGroup>
        </div>
        <div class="order">
          <div class="paixu">
            <span>排序：</span>
          </div>
          <div class="alltag"  @click="orderByViewCounts" >最热</div>
          <div class="alltag"  @click="orderByDate" >最新</div>
        </div>
      </div>
    </div>
    <div class="main" v-if="articles">
      <ArticleItem
        :article-item="item"
        :key="item.id"
        v-for="item in articles.articleVoList"
      />
    </div>
    <div class="page"  v-if="articles">
        <p>总共{{articles.length}}条数据</p>
      <el-pagination @current-change="changePage" :current-page="pageparams.page" :page-size="pageparams.pagesize" hide-on-single-page background layout="prev, pager, next" :total="articles.length">
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTagList, listArticleWithCount } from "@/api/article";
import {  ArticleListItem } from "@/interface/article";
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

let pageparams: PageParams = reactive({
  page: 1,
  pagesize: 3,
});
// 获取文章列表
let articles = ref<ArticleListItem>();
const getArticle = async () => {
  const { data } = await listArticleWithCount(pageparams);
  articles.value = data.data;
};
// 页数改变
const changePage= (val:number)=>{
    pageparams.page=val;
    getArticle();
}
// 获取最多观看次数的
const orderByViewCounts=()=>{
    pageparams.orderRole='view_counts';
    pageparams.page=1;
    getArticle();
}
// 获取根据日期排序的
const orderByDate=()=>{
    pageparams.orderRole=undefined;
    pageparams.page=1;
    getArticle();
}
// 获取点击tagid
const getTagId=(id:number)=>{
    pageparams.tagId=id;
    getArticle();
}
onMounted(() => {
  getTag();
  getArticle();

});
</script>

<style lang="less" scoped>
.active{
    background-color: rgb(245, 73, 30);
    color: white;
}
.artilce-list {
  width: 80%;
  min-height: 900px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .top {
    width: 100%;

    padding: 16px;
    background-color: white;
    border-radius: 5px;
    margin-top: 10px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
    .title {
      font-size: 36px;
      margin: 10px 0;
    }
    .bottom {
      .alltag {
        display: block;
        text-align: center;
        line-height: 20px;
        margin-right: 10px;
        padding: 0 8px;
        cursor: pointer;
        color: rgb(65, 65, 65);
        height: 20px;
        border-radius: 10px;
        background-color: rgb(197, 224, 248);
      }
      display: flex;
      flex-direction: column;
      font-size: 16px;
      .orderBytime {
        display: flex;
        margin: 5px;
      }
      .orderByTag {
        display: flex;
        margin: 5px;
        justify-content: space-between;
        width: 320px;
      }
      .order {
        display: flex;
        margin: 5px;
        align-items: center;
      }
    }
  }
  .main {
    min-height: 500px;
    width: 100%;

    padding: 16px;
    background-color: white;
    border-radius: 5px;
    margin-top: 10px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
  }
  .page{
      width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    background-color: white;
    border-radius: 5px;
    margin-top: 10px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
  }
}
</style>