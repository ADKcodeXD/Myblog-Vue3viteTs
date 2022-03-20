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
      <div class="title">
        <div class="content">
          <div class="article-title">
            <h2>{{ article.articleName }}</h2>
          </div>
          <div class="author">
            <img :src="article.authorVo.avatar" alt="" />
            <div class="author-info">
              <p class="author-name">{{ article.authorVo.nickname }}</p>
              <p class="introduce">{{ article.authorVo.introduce }}</p>
            </div>
          </div>
          <div class="summary">
            <h3 class="summary-subtitle">摘要</h3>
            <p class="summary-content">
              {{ article.summary }}
            </p>
          </div>
          <!-- 主体部分 -->
          <div>
            <div v-html="article.body?.html" class="markdown-body"></div>
          </div>
          <!-- 结束部分 显示查看数 点赞数 以及评论数 -->
          <!-- 分割线 -->
          <div class="detail">
            <div class="good">
              <!-- 点赞部分 -->
              <i
                class="iconfont icon-good"
                :class="{ active: article.isLiked }"
                @click="likedArticle"
                ><span v-if="!article.isLiked">点赞</span
                ><span v-else>已点赞</span></i
              >
              <i
                class="iconfont icon-changyonggongneng"
                :class="{ active: article.isCollected }"
                @click="collectArticle"
                ><span v-if="!article.isCollected">收藏</span
                ><span v-else>已收藏</span></i
              >
            </div>
            <el-divider>
              <i class="iconfont icon-edit">文章就到这里结束啦</i>
            </el-divider>

            <div class="bottom-text">
              <div class="left">
                <p class="red">未经作者允许 禁止转载</p>
                <p class="publishtime">发布时间{{ time }}</p>
              </div>
              <div class="icon">
                <div class="icongroup">
                  <i class="iconfont icon-yanjing">{{ article.viewCounts }}</i>
                  <i class="iconfont icon-pinglun">{{
                    article.commentCounts
                  }}</i>
                </div>

                <p>发布于{{ article.createDate }}</p>
              </div>
            </div>
            <div class="tags">
              <TagItem
                v-for="tag in article.tags"
                :key="tag.id"
                :tagId="tag.id"
                :tagName="tag.tagName"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comments">
        <div class="title">
          <p>评论区</p>
        </div>

        <div class="edit-part">
          <div class="up">
            <h3>{{ commentList.length }}条评论</h3>
            <h4>需要登录后才能评论哦~</h4>
          </div>
          <el-divider></el-divider>
          <div class="main-content">
            <div class="avatar">
              <img
                :src="
                  currentUser?.avatar === ''
                    ? '/static/img/logo.png'
                    : currentUser?.avatar
                "
                alt=""
              />
            </div>
            <div class="edit-area">
              <el-input
                v-model="comment"
                :rows="6"
                :limit="256"
                show-word-limit
                resize="none"
                type="textarea"
                style="font-size: 20px; line-height: 30px"
                placeholder="在这里可以发布评论哦~"
              />
            </div>
          </div>
          <div class="button">
            <el-button
              @click="publishComment"
              class="buttonself"
              :disabled="currentUser?.id === ''"
              type="success"
              >发布评论</el-button
            >
          </div>
        </div>
        <el-empty
          v-if="commentList.length === 0"
          description="暂时没有评论哦，快来发表第一条评论"
        ></el-empty>
        <div class="comment-list">
          <transition-group name="list">
            <CommentItem
              class="list-item"
              :commentInfo="commentitem"
              :floor="i + 1"
              v-for="(commentitem, i) in commentList"
              :key="commentitem.id"
              :authorId="article.authorVo.id"
              :articleId="article.id"
              @publishSecond="publishSecond"
            />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
// 定义组件名字 不然include 和keepalive 无法生效

import { useArticle } from "@/hooks/Article";
export default { name: "Article" };
</script>
<script setup lang="ts">
const {
  collectArticle,
  likedArticle,
  isLikedLoading,
  isCollectLoading,
  publishSecond,
  goTop,
  getAllComment,
  publishComment,
  time,
  article,
  commentList,
  currentUser,
  comment,
} = useArticle();

</script>

<style scoped lang="less" >
@import url(./styles/article-pc.less);
@import url("@/assets/styles/MyAnimate.less");
.active {
  background-color: rgb(@primaryActiveColor) !important;
  color: white !important;
}
</style>
