<template>
  <div class="comment-item">
    <div class="content">
      <div class="username">
        <div class="tw-flex">
          <div class="user-avatar">
            <img :src="commentInfo.user.avatar" />
          </div>
          <div class="username-time">
            <h3>
              {{ commentInfo.user.nickname }}
              <div class="tag" v-if="commentInfo.user.id === authorId">
                博主
              </div>
              <!-- 占位 以后接入等级系统可用 -->
              <div class="tag tag2">
                Lv1
              </div>
            </h3>
            <p>{{ commentInfo.user.introduce }}</p>
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-items-end tw-justify-between" style="height: 60px;">
          <div class="floor tw-flex-1">{{ floor }}楼</div>
          <span>{{ commentInfo.createDate }}</span>
        </div>
      </div>
      <ElDivider />
      <div class="comment-content">
        <p>{{ commentInfo.content }}</p>
      </div>
      <div class="secondcomment">
        <div class="relpy">
          <el-button type="success" @click="relpycontentShow = !relpycontentShow">回复</el-button>
          <!-- TODO 二级评论列表 -->
        </div>
        <div class="relpycontent" v-show="relpycontentShow">
          <div class="tw-w-full">
            <MyEmoji placeholder="回复一下呗=w=" @changeText="changeComment" ref="emoji" />
          </div>
          <el-button-group class="button">
            <el-button type="success" plain @click="publishSubComment">发送</el-button>
          </el-button-group>
        </div>
        <ElDivider v-if="commentInfo.childrens.length > 0" />
        <div class="second-comment" v-for="item in commentInfo.childrens" :key="item.id">
          <div class="user-avatar">
            <img :src="item.user.avatar" alt="" />
          </div>
          <div class="tw-w-full tw-flex tw-flex-col">
            <div class="username">
              <div class="username-time">
                <h3>
                  {{ commentInfo.user.nickname }}
                  <div class="tag" v-if="commentInfo.user.id === authorId">
                    博主
                  </div>
                  <!-- 占位 以后接入等级系统可用 -->
                  <div class="tag tag2">
                    Lv1
                  </div>
                </h3>
              </div>
              <p>{{ item.createDate }}</p>
            </div>
            <p class="content tw-flex-1">{{ item.content }}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addComment } from "@/api/comment";
import { useUserStore } from "@/store/user";
import { encodeEmoji } from "@/utils/emoji";
import { ElMessage } from "element-plus";
import { PropType } from "vue";

const props = defineProps({
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
    default: "",
  },
  articleId: {
    type: String,
    default: "1",
  },
  avatar:{
    type: String,
    default: "",
  },
  children:{
    
  }
});
const emit = defineEmits(['publishSecond'])
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
let emoji = ref();
const publishSubComment = async () => {
  if (userStrore.userinfo.id) {
    if (reqCommentParams.content != "") {
      reqCommentParams.content = encodeEmoji(reqCommentParams.content)
      const { data } = await addComment(reqCommentParams);
      emit("publishSecond");
      emoji.value.clearInput();
      reqCommentParams.content = "";
      relpycontentShow.value = false;
    } else {
      ElMessage.error("输入的内容不能为空");
    }
  } else {
    ElMessage.error("您当前未登录");
  }
};
const changeComment = (val: string) => {
  reqCommentParams.content = val;
}
</script>

<style lang="less" scoped>
.comment-item {
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  font-family: 'Thinfont', '幼圆';
  font-weight: 600;
  .border-pinkline(8px,8px);

  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: antiquewhite;
    overflow: hidden;
    margin-right: 10px;
  }

  .username {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;


    .username-time {
      h3 {
        font-size: 20px;
        position: relative;
        display: flex;
        align-items: center;

        .tag {
          height: 100%;
          font-size: 12px;
          color: white;
          padding: 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2px;
          border-radius: 20px;
          background-color: rgb(255, 43, 43);

          &2 {
            background-color: rgb(0, 104, 165);
          }
        }
      }

      p {
        margin-top: 5px;
      }
    }

  }

  .content {
    margin-left: 15px;
    width: 100%;
    word-break: break-all;

    .comment-content {
      min-height: 150px;
      font-size: 20px;
    }

    .relpy {
      display: flex;
      justify-content: flex-end;
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
      margin-top:1rem;
      padding: 1rem;
      overflow: hidden;
      border-radius: 20px;
      .user-avatar {
        margin-right: 10px;
      }

      .content {
        margin: 0;
        font-size: 14px;
        color: rgb(0, 0, 0);
      }
    }
  }
}
</style>