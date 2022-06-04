<template>
  <div class="comment-item">
    <div class="user-avatar">
      <img :src="message.avatar?message.avatar:'/src/assets/img/404img.jpg'" />
    </div>
    <!-- <el-avatar :size="60" :src="message.avatar"></el-avatar> -->
    <div class="content">
      <div class="username">
        <div class="username-time">
          <h3>{{ message.authorName }}</h3>
          <p>发布于{{ message.createDate }}</p>
        </div>
        <div class="floor">联系方式:{{ message.contact }}</div>
      </div>
      <el-divider></el-divider>
      <div class="comment-content">
        <p>{{ message.content }}</p>
      </div>
      <el-divider></el-divider>
      <div class="relpy">
        <!-- <el-button type="success">回复</el-button> -->
        <!-- TODO 二级评论列表 -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
    message: {
      type: Object as PropType<MessageVo>,
      default: () => {},
    },
  });
</script>


<style lang="less" scoped>
.comment-item {
  margin-top: 30px;
  width: 100%;
  display: flex;
  padding: 10px;
  color: rgb(@primaryTextColor);
  //   border: 1px solid rgb(223, 223, 223);
  //   border-left: none;
  //   border-right: none;
  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: rgb(@primaryBackGroundColor);
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .content {
    margin-left: 15px;
    width: 100%;
    color: rgb(@primaryTextColor);

    .username {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .username-time {
        h3 {
          font-size: 20px;
        }
        p {
          margin-top: 5px;
        }
      }
    }
    .comment-content {
      min-height: 150px;
      font-size: 20px;
    }
    .relpy {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>