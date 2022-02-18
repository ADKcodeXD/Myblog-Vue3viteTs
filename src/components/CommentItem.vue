<template>
  <div class="comment-item">
    <div class="user-avatar">
      <img :src="commentInfo.user.avatar" alt="" />
    </div>
    <div class="content">
      <div class="username">
        <div class="username-time">
          <h3>
            {{ commentInfo.user.nickname
            }}<span v-if="commentInfo.user.id === authorId">(博主)</span>
          </h3>
          <p>{{commentInfo.user.introduce}}</p>
        </div>
        <div class="floor">{{ floor }}楼</div>
      </div>
      <el-divider></el-divider>
      <div class="comment-content">
        <p>{{ commentInfo.content }}</p>
      </div>
      <el-divider></el-divider>
      

      <div class="relpy">
        <p>发布于{{ commentInfo.createDate }}</p>
        <el-button type="success">回复</el-button>
        <!-- TODO 二级评论列表 -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CommentItemInfo } from "@/interface/comment";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    commentInfo: {
      type: Object as PropType<CommentItemInfo>,
      default: () => {},
    },
    floor: {
      type: Number,
      default: 1,
    },
    authorId: {
      type: String,
      default: "123456789",
    },
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.comment-item {
  margin-top: 30px;
  width: 100%;
  display: flex;
  padding: 10px;
  //   border: 1px solid rgb(223, 223, 223);
  //   border-left: none;
  //   border-right: none;
  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: antiquewhite;
    overflow: hidden;
    img {
      object-fit: cover;
    }
  }
  .content {
    margin-left: 15px;
    width: 100%;

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
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>