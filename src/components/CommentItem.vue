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
          <p>{{ commentInfo.user.introduce }}</p>
        </div>
        <div class="floor">{{ floor }}楼</div>
      </div>
      <el-divider></el-divider>
      <div class="comment-content">
        <p>{{ commentInfo.content }}</p>
      </div>
      <el-divider></el-divider>
      <div class="secondcomment">
        <div class="relpy">
          <p>发布于{{ commentInfo.createDate }}</p>
          <el-button
            type="success"
            @click="relpycontentShow = !relpycontentShow"
            >回复</el-button
          >
          <!-- TODO 二级评论列表 -->
        </div>

        <div class="relpycontent" v-show="relpycontentShow">
          <el-input
            :rows="2"
            type="textarea"
            v-model="reqCommentParams.content"
            @blur="handleInputBlur"
          >
          </el-input>
          <el-button-group class="button">
            <el-button type="success" plain @click="showEmoji=true">
              <MyEmoji
                ref="emojiTarget"
                :comment="reqCommentParams.content"
                v-show="showEmoji"
                @changeEmoji="changeEmoji"
                :cursorIndex="cursorIndex"
              />
              表情</el-button
            >
            <el-button type="success" plain @click="publishSubComment"
              >发送</el-button
            >
          </el-button-group>
        </div>

        <div
          class="second-comment"
          v-for="item in commentInfo.childrens"
          :key="item.id"
        >
          <div class="user-avatar">
            <img :src="item.user.avatar" alt="" />
          </div>
          <div class="username">
            <div class="username-time">
              <h3>
                {{ item.user.nickname
                }}<span v-if="item.user.id === authorId">(博主)</span>
              </h3>
              <p class="content">{{ item.content }}</p>
            </div>
            <p>发布于{{ item.createDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addComment } from "@/api/comment";
import { useEmoji } from "@/hooks/Article";
import { CommentItemInfo } from "@/interface/comment";
import { CommentParams } from "@/interface/params";
import { useUserStore } from "@/store/user";
import { encodeEmoji } from "@/utils/emoji";
import { onClickOutside } from "@vueuse/core";
import { ElMessage } from "element-plus";
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
    articleId: {
      type: String,
      default: "1",
    },
  },
  setup(props, { emit }) {
    const userStrore = useUserStore();
    // 二级评论逻辑
    let secondCommentContent = ref("");
    let relpycontentShow = ref(false);
    // 参数
    const reqCommentParams = reactive<CommentParams>({
      articleId: props.articleId,
      toUid: props.commentInfo.user.id,
      parentId: props.commentInfo.id,
      authorId: userStrore.userinfo.id,
      content: "",
    });
    const publishSubComment = async () => {
      if (userStrore.userinfo.id) {
        if (reqCommentParams.content != "") {
          reqCommentParams.content=encodeEmoji(reqCommentParams.content)
          const { data } = await addComment(reqCommentParams);
          emit("publishSecond");
          reqCommentParams.content = "";
          relpycontentShow.value = false;
        } else {
          ElMessage.error("输入的内容不能为空");
        }
      } else {
        ElMessage.error("您当前未登录");
      }
    };
    // emoji 表情组件
    const { showEmoji, emojiTarget, handleInputBlur, cursorIndex } = useEmoji();
    onClickOutside(emojiTarget, (event) => (showEmoji.value = false));
    const changeEmoji = (content: string) => {
      reqCommentParams.content = content;
    };
    return {
      relpycontentShow,
      publishSubComment,
      secondCommentContent,
      reqCommentParams,
      changeEmoji,
      emojiTarget,
      handleInputBlur,
      cursorIndex,
      showEmoji
    };
  },
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
  .secondcomment {
    display: flex;
    flex-direction: column;
    .relpycontent {
      margin: 10px 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .button {
        margin-top: 5px;
      }
    }
    .second-comment {
      display: flex;
      margin-top: 0.7143rem;
      padding: 0.7143rem;
      overflow: hidden;
      border-radius: 20px;
      border: 1px rgb(@primaryTextColor) dashed;
      .user-avatar {
        margin-right: 10px;
      }
      .content {
        margin: 0;
        color: rgb(@primaryTextColor);
      }
    }
  }
}
</style>