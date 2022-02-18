

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

.article-enter-to,
.article-leave-from{
  transform: translateX(0);
  opacity: 1;
}

.article-leave-active{
  position: absolute;
   transition: all 0.8s ease-in-out;
}
.article-move{
  transition: all 0.8s ease;
}
.article-enter-from,
.article-leave-to{
  transform: translateX(-100%);
  opacity: 0;
}
.article-item-sub{
  transition: all 0.8s ease;
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
      .active {
        background-color: rgb(245, 73, 30);
        color: white;
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
        .tags {
          display: flex;
          .tag {
            height: 20px;
            padding: 12px;
            display: flex;
            cursor: pointer;
            align-items: center;
            text-align: center;
            color: rgb(247, 240, 240);
            border-radius: 10px;
            font-size: 12px;
            margin-right: 10px;
            background-color: rgb(14, 138, 14);
          }
          .active {
            color: rgb(90, 90, 90);

            background-color: rgb(82, 252, 243);
          }
        }
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
    transition: all 0.8s ease;
    padding: 16px;
    background-color: white;
    border-radius: 5px;
    margin-top: 10px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
  }
  .page {
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