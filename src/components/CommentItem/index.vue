<template>
  <div class="comment-item">
    <div class="content">
      <div class="username">
        <div class="tw-flex">
          <!-- 头像 -->
          <div class="user-avatar">
            <img :src="commentInfo.user.avatar || commentInfo.avatar" />
          </div>
          <!-- 名字以及等级和简介等 -->
          <div class="username-time">
            <h3>
              {{ commentInfo.user.nickname || commentInfo.nickname }}
              <div class="tag" v-if="commentInfo.user && commentInfo.user.id === authorId">
                博主
              </div>
              <!-- 占位 以后接入等级系统可用 -->
              <div class="tag tag2">
                Lv1
              </div>
            </h3>
            <p v-if="commentInfo.user">{{ commentInfo.user.introduce }}</p>
          </div>
        </div>
        <!-- 右边的消息栏 -->
        <div class="tw-flex tw-flex-col tw-items-end tw-justify-between" style="height: 60px;">
          <div class="floor tw-flex-1">{{ floor }}楼</div>
          <div v-if="commentInfo.contact">联系方式{{commentInfo.contact}}</div>
          <span>{{ commentInfo.createDate }}</span>
        </div>
      </div>
      <ElDivider />
      <div class="comment-content">
        <p>{{ commentInfo.content }}</p>
      </div>
      <div class="secondcomment">
        <!-- 回复区 -->
        <Reply :commentInfo="commentInfo" :articleId="articleId" @published="published"/>
        <!-- 二级评论列表区域 -->
        <ElDivider v-if="commentInfo.childrens && commentInfo.childrens.length > 0" />
        <div v-if="commentInfo.childrens">
          <SecondComment v-for="item in commentInfo.childrens" 
            :key="item.id" 
            :authorId="authorId" :childrenItem="item"
            :parentUserId="commentInfo.user.id" :parentId="commentInfo.id"
            :articleId="articleId" @published="published" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { PropType } from "vue";

const props = defineProps({
  commentInfo: {
    type: Object as PropType<CommentItemInfo>,
    default: () => { },
  },
  floor: {
    type: Number,
    default: 1,
  },
  authorId: {
    type: String,
    default: "",
  },
  articleId: {
    type: String,
    default: "1",
  },
});
const emit=defineEmits(['published'])
const published=()=>{
  emit('published')
}
</script>

<style lang="less" scoped>
@import url(./styles/CommentPublic.less);

.comment-item {
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  font-family: 'Thinfont', '幼圆';
  font-weight: 600;
  .border-pinkline(8px, 6px);

  .content {
    margin-left: 15px;
    width: 100%;
    word-break: break-all;

    .comment-content {
      min-height: 150px;
      font-size: 20px;
    }

    .secondcomment {
      display: flex;
      flex-direction: column;
    }

  }
}
</style>