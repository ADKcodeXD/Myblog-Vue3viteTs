<template>
  <div class="article" >
    <div class="top">
      <TopNavBar :back-color="'rgba(0, 0, 0, 0.7)'" />
    </div>
    <Skin @top="goTop" />
    <div class="main-body"  v-if="article">
      <!-- banner -->
      <div class="banner" >
        <img :src="article.banner" alt="" />
      </div>
      <!-- 标题和摘要 -->
      <div class="title">
        <div class="content" >
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
          <div class="body" >
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
              <TagsGroup :tags="article.tags" />
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
import { setTheme } from "@/theme/theme";
import { getRealativeTime } from "@/utils/dayjs";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
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
const publishComment = async () => {
  const { data } = await addComment(commentParams);
  if (data.code === 200) {
    ElMessage.success("发布成功");
    comment.value = "";
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
// 滚动
const body=ref<HTMLElement|null>();
const goTop=()=>{
  console.log(body.value?.scrollTop);
}
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

</style>