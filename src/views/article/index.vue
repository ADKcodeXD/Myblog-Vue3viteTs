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
export default { name: 'Article' }
</script>
<script setup lang="ts">
import { getArticleItem } from "@/api/article";
import { addComment, getComments } from "@/api/comment";
import { ArticleItemInfo } from "@/interface/article";
import { CommentItemInfo } from "@/interface/comment";
import {
  CommentParams,
  LikeOrCollectParams,
  PageParams,
} from "@/interface/params";
import { UserEasy } from "@/interface/user";
import { useUserStore } from "@/store/user";
import { getRealativeTime } from "@/utils/dayjs";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import _ from "lodash";
import { userCollect, userLike } from "@/api/user";
const route = useRoute();
const userStore = useUserStore();

// 定义所有使用到的变量
let comment = ref("");
const user = userStore.userinfo;
let currentUser = reactive<UserEasy>({
  id: user.id,
  role: user.role,
  avatar: user.avatar,
  username: user.username,
  nickname: user.nickname,
  introduce: user.introduce,
  banner: user.banner,
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
  if (article.value) {
    return getRealativeTime(article.value.createDate);
  }
});

// 方法区-----------------------
// 发送一级评论
const publishComment = async () => {
  if (commentParams.content != "") {
    const { data } = await addComment(commentParams);
    if (data.code === 200) {
      ElMessage.success("发布成功");
      comment.value = "";
      getAllComment();
    } else {
      ElMessage.error(data.msg);
    }
  } else {
    ElMessage.error("内容不能为空");
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
// 评论分页参数
let pageparams: PageParams = reactive({
  page: 1,
  pagesize: 10,
});
// 获取评论
const getAllComment = async () => {
  console.log(pageparams);
  const { data } = await getComments(route.params.id as string, pageparams);
  commentList.value = data.data;
};
// 滚动
const body = ref<HTMLElement | null>();
const goTop = () => {
  console.log(body.value?.scrollTop);
};
// 接受发送二级评论
const publishSecond = () => {
  ElMessage.success("发送成功");
  getAllComment();
};

// loading
let isLikedLoading = ref(false);
let isCollectLoading = ref(false);
// 喜欢文章
const likedArticle = async () => {
  isLikedLoading.value = true;
  // 如果是登录状态下
  if (user.id) {
    let likedValue = !article.value?.isLiked;
    if (article.value) {
      let reqParams: LikeOrCollectParams = {
        articleId: article.value.id,
        flag: likedValue,
      };
      await userLike(reqParams);
      article.value.isLiked = likedValue;
    }
  } else {
    ElMessage.error("请先登录后点赞");
  }
  isLikedLoading.value = false;
};

// 收藏文章
const collectArticle = async () => {
  isCollectLoading.value = true;
  if (user.id) {
    let collectValue = !article.value?.isCollected;
    if (article.value) {
      let reqParams: LikeOrCollectParams = {
        articleId: article.value.id,
        flag: collectValue,
      };
      await userCollect(reqParams);
      article.value.isCollected = collectValue;
    }
  } else {
    ElMessage.error("请先登录后收藏");
  }
  isCollectLoading.value = false;
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
@import url(./styles/article-pc.less);
@import url("@/assets/styles/MyAnimate.less");
.active {
  background-color: rgb(@primaryActiveColor) !important;
  color: white !important;
}
</style>
