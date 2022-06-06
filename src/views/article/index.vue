<template>
  <div class="article">
    <div class="top">
      <TopNavBar :back-color="'rgba(0, 0, 0, 0.7)'" />

    </div>

    <div class="main-body" v-if="article">
      <!-- banner -->
      <div class="banner" ref="banner">
        <img :src="article.banner" />
      </div>
      <transition name="onlyopacity">
        <ToolBars v-if="isToolsShow" :article="article" @like-article="likedArticle" @collect-article="collectArticle"
          @toComment="toComment" />
      </transition>
      <!-- 标题和摘要 -->
      <div class="article-container" ref="articleContainer">
        <ArticleSummary :article="article" />
        <!-- 主体部分 -->
        <ArticleBody :html="article.body.html" />
        <!-- 结束部分 显示查看数 点赞数 以及评论数 -->
        <ElDivider />
      </div>
      <Bottom :article="article" @like-article="likedArticle" @collect-article="collectArticle" />
      <!-- 评论区 -->
      <div class="comments" ref="comment">
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
              <ElButton @click="publishComment" class="buttonself" :disabled="user?.id === ''" type="success">
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
      <!-- 评论分页 -->
      <MyPagination :pageparams="pageparams" :total="totalComment" @changePage="changePage" class="page" />
    </div>
  </div>
</template>

<script lang="ts">
// 定义组件名字 不然include 和keepalive 无法生效
import { useArticle } from "@/hooks/Article";
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
import Bottom from "./components/Bottom.vue";
import ToolBars from './components/ToolBars.vue';
// 封装好的hook
const {
  publishSecond,
  goTop,
  publishComment,
  time,
  article,
  commentList,
  user,
  likedArticle,
  collectArticle,
  totalComment,
  changeComment,
  emoji,
  pageparams,
  changePage
} = useArticle();
// banner消失 导航栏出现
const banner = ref();
const comment = ref<HTMLElement>();
const articleContainer = ref<HTMLElement>();
const isToolsShow = ref(false);
const toComment = () => {
  let height = comment.value.offsetTop;
  document.documentElement.scrollTo({ top: height, behavior: "smooth" });
}

// 刷新的时候工具栏出现的bug
onMounted(() => {
  document.addEventListener('scroll', () => {
    if (articleContainer.value) {
      if (window.scrollY > articleContainer.value.offsetTop) {
        isToolsShow.value = true;
      } else {
        isToolsShow.value = false;
      }
    }

  })
})
</script>

<style scoped lang="less" >
@import url(./styles/Article.less);
@import url("@/assets/styles/MyAnimate.less");

.active {
  background-color: rgb(@primaryActiveColor) !important;
  color: white !important;
}

.page {
  margin: 30px 0;
}
</style>
