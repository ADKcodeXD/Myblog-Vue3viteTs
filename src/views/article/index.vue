<template>
  <div class="article">
    <div class="top">
      <TopNavBar :back-color="'rgba(0, 0, 0, 0.7)'" />
    </div>
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
          <div class="body">
            <div v-html="article.body?.html"></div>
          </div>
          <!-- 结束部分 显示查看数 点赞数 以及评论数 -->
          <!-- 分割线 -->
          <div class="detail">
            <el-divider>
              <i class="iconfont icon-edit">文章就到这里结束啦</i>
            </el-divider>
            <div class="good"></div>
            <div class="bottom-text">
              <div class="left">
                <p style="font-size: 18px; color: red">未经作者允许 禁止转载</p>
                <p
                  style="
                    font-size: 14px;
                    color: rgb(82, 82, 82);
                    margin-top: 10px;
                  "
                >
                  发布时间{{ time }}
                </p>
                
              </div>
              <div class="icon">
                <div class="icongroup">
                  <i class="iconfont icon-yanjing">{{ article.viewCounts }}</i>
                <i class="iconfont icon-pinglun">{{ article.commentCounts }}</i>
                </div>
                
                <p>发布于{{ article.createDate }}</p>
              </div>

            </div>
            <div class="tags">
              <TagsGroup :tags="article.tags"/>
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
            <h3>{{commentList.length}}条评论</h3>
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
          <transition-group name="comment">
            <CommentItem
              class="comment-item"
              :commentInfo="commentitem"
              :floor="i + 1"
              v-for="(commentitem, i) in commentList"
              :key="commentitem.id"
              :authorId="article.authorVo.id"
            />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleItem } from "@/api/article";
import { addComment, getComments } from "@/api/comment";
import { ArticleItemInfo } from "@/interface/article";
import { CommentItemInfo } from "@/interface/comment";
import { CommentParams } from "@/interface/params";
import { UserEasy } from "@/interface/user";
import { useUserStore } from "@/store/user";
import { getRealativeTime } from "@/utils/dayjs";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
const route = useRoute();
const userStore = useUserStore();

// 定义所有使用到的变量
let comment = ref("");
const user = userStore.userinfo;
let currentUser = reactive<UserEasy>({
  id:user.id,
  role:user.role,
  avatar:user.avatar,
  username:user.username,
  nickname:user.nickname,
  introduce:user.introduce,
  banner:user.banner
});
let commentParams: CommentParams = reactive({
  articleId: route.params.id as string,
  authorId: currentUser.id,
  content: comment,
});
let article = ref<ArticleItemInfo>();
let commentList = ref<CommentItemInfo[]>([]);



// 计算属性 计算相对时间
let time = computed(() => {
  article.value as ArticleItemInfo;
  if(article.value){
    return getRealativeTime(article.value.createDate);
  }
});


// 方法区-----------------------
const publishComment = async () => {
  const { data } = await addComment(commentParams);
  if (data.code === 200) {
    ElMessage.success("发布成功");
    comment.value="";
    getAllComment();
  } else {
    ElMessage.error(data.msg);
  }
};
// 获取文章
const getArticle = async (id: any) => {
  const { data } = await getArticleItem(id);
  if (data.code === 200) {
    article.value = data.data;
  } else {
    ElMessage.error(data.msg);
  }
};
// 获取评论
const getAllComment = async () => {
  const { data } = await getComments(route.params.id as string);
  commentList.value = data.data;
};

// 函数加载 挂载组件
onMounted(() => {
  if (user) {
    currentUser = user;
  }
  getArticle(route.params.id);
  getAllComment();
});
</script>


<style scoped lang="less" >
.comment-enter-to,
.comment-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.comment-leave-active {
  position: absolute;
  transition: all 0.8s ease-in-out;
}
.comment-move {
  transition: all 0.8s ease;
}
.comment-enter-from,
.comment-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.comment-item {
  transition: all 0.8s ease;
}
.article {
  overflow-x: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .top {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 10;
  }
  .main-body {
    left: 0;
    right: 0;
    width: 60%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 10px;
    background-color: #fff;
    height: 100%;
    .banner {
      top: 0;
      left: 0;
      width: 100%;
      min-height: 393px;

      max-height: 393px;

      z-index: -2;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 393px;
        width: 100%;
        max-height: 393px;
        object-fit: cover;
      }
      &::before {
        content: "";
      }
    }
    .title {
      .content {
        display: flex;
        flex-direction: column;
        .article-title {
          font-size: 32px;
          h2 {
            margin: 20px 0;
          }
        }
        .author {
          display: flex;
          height: 60px;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: rgb(255, 223, 223);
            object-fit: cover;
          }
          .author-info {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 12px;
            .author-name {
              font-size: 18px;
              font-weight: 600;
            }
            .introduce{
              font-size: 16px;
              color: gray;
            }
          }
        }
        .summary {
          padding: 10px;
          border-left: rgb(87, 231, 30) 3px solid;
          margin-top: 20px;
          font-size: 20px;
          .summary-subtitle {
            font-size: 22px;
            color: rgb(48, 47, 47);
          }
          .summary-content {
            margin-top: 10px;
            font-size: 18px;
            color: rgb(179, 179, 179);
          }
        }
      }
    }
    .body {
      padding: 20px;
      min-height: 200px;
      line-height: 36px;
      font-size: 20px;
    }
    .detail {
      .bottom-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          i {
            margin-left: 10px;
            font-size: 20px;
          }
        }
      }
      .tags{
        margin: 20px 0;
      }
    }
    .comments {
      margin-top: 20px;
      .title {
        font-size: 30px;
      }
      .edit-part {
        margin-top: 20px;
        width: 100%;
        height: 300px;
        .up {
          justify-content: space-between;
          display: flex;
        }
        .main-content {
          display: flex;
          width: 100%;
          .avatar {
            width: 60px;
            height: 60px;
            flex-shrink: 0;
            background-color: antiquewhite;
            border-radius: 50%;
            overflow: hidden;
            
          }
          .edit-area {
            width: 100%;
            margin-left: 30px;
          }
        }
        .button {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>