<template>
  <div class="article">
    <div class="top">
      <TopNavBar :back-color="'rgba(0, 0, 0, 0.7)'" />
    </div>
    <Skin @top="goTop" />
    <div class="main-body" v-if="article">
      <!-- banner -->
      <div class="banner">
        <img :src="article.banner" alt="" />
      </div>
      <!-- 标题和摘要 -->
      <div class="article-container">
        <ArticleSummary :article="article"/>
        <!-- 主体部分 -->
        <ArticleBody :html="article.body.html" />
        <!-- 结束部分 显示查看数 点赞数 以及评论数 -->
        <div class="detail">
          <div class="good">
            <!-- 点赞部分 -->
            <i class="iconfont icon-good" :class="{ active: article.isLiked }" @click="likedArticle"><span
                v-if="!article.isLiked">点赞</span><span v-else>已点赞</span></i>
            <i class="iconfont icon-changyonggongneng" :class="{ active: article.isCollected }"
              @click="collectArticle"><span v-if="!article.isCollected">收藏</span><span v-else>已收藏</span></i>
          </div>
          <el-divider>
            <i class="iconfont icon-edit">文章就到这里结束啦</i>
          </el-divider>

          <div class="bottom-text">
            <div class="left">
              <p class="red">未经作者允许 禁止转载</p>
            </div>
          </div>
          <div class="tags">
            <TagItem v-for="tag in article.tags" :key="tag.id" :tagId="tag.id" :tagName="tag.tagName" />
          </div>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comments">
        <div class="edit-part">
          <div class="title">
            <p>{{ totalComment }}条评论</p>
          </div>
          <ElDivider />
          <div class="main-content">
            <div class="avatar">
              <MyElimage :img="user?.avatar" />
            </div>
            <div class="edit-area">
              <MyEmoji @changeText="changeComment" ref="emoji" />
            </div>
          </div>
          <div class="button">
            <ElButtonGroup>
              <ElButton @click="publishComment" 
              class="buttonself" 
              :disabled="user?.id === ''" type="success">
                发布评论
              </ElButton>
            </ElButtonGroup>
          </div>
        </div>
        <AdkEmpty v-if="commentList.length === 0" desc="还没有评论哦~快来发送第一条吧"></AdkEmpty>
        <div class="comment-list">
          <transition-group name="list">
            <CommentItem class="list-item" v-for="(commentitem, i) in commentList" :commentInfo="commentitem"
              :floor="i + 1" :key="commentitem.id" :authorId="article.authorVo.id" :articleId="article.id"
              @published="publishSecond" />
          </transition-group>
        </div>
      </div>
      <MyPagination :pageparams="pageparams" :total="totalComment" @changePage="changePage" class="page" />
    </div>
  </div>
</template>

<script lang="ts">
// 定义组件名字 不然include 和keepalive 无法生效
import { useArticle } from "@/hooks/Article";
import "../../../node_modules/vue3-emoji-picker/dist/style.css";
import '@/assets/styles/github-light.css';
import 'highlight.js/styles/github.css';
// import css
export default {
  name: "Article",
};
</script>
<script setup lang="ts">
import ArticleSummary from "./components/ArticleSummary.vue";
import ArticleBody from "./components/ArticleBody.vue";
const {
  collectArticle,
  likedArticle,
  publishSecond,
  goTop,
  publishComment,
  time,
  article,
  commentList,
  user,
  totalComment,
  changeComment,
  emoji,
  pageparams,
  changePage
} = useArticle();
</script>

<style scoped lang="less" >
@import url(./styles/article-pc.less);
@import url("@/assets/styles/MyAnimate.less");

.active {
  background-color: rgb(@primaryActiveColor) !important;
  color: white !important;
}

.page {
  margin: 30px 0;
}
</style>
