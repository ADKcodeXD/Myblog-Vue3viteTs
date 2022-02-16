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
              <p class="author-name">{{ article.authorVo.username }}</p>
              <p>发布于{{ article.createDate }}</p>
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
                <i class="iconfont icon-yanjing">{{ article.viewCounts }}</i>
                <i class="iconfont icon-pinglun">{{ article.commentCounts }}</i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comments">
        <div class="title">
          <p>评论区</p>
          <el-empty
            v-if="article.commentCounts === 0"
            description="暂时没有评论哦"
          ></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleItem } from "@/api/article";
import { ArticleItemInfo } from "@/interface/article";
import { getRealativeTime } from "@/utils/dayjs";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
const route = useRoute();
let article = ref<ArticleItemInfo>();
const getArticle = async (id: any) => {
  const { data } = await getArticleItem(id);
  if (data.code === 200) {
    article.value = data.data;
  } else {
    ElMessage.error(data.msg);
  }
};
let time = computed(() => {
  return getRealativeTime(article.value.createDate);
});
onMounted(() => {
  getArticle(route.params.id);
});
</script>


<style scoped lang="less" >
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
      &::first-letter {
        font-size: 30px;
      }
    }
    .detail {
      .bottom-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          i {
            margin-left: 10px;
            font-size: 20px;
          }
        }
      }
    }
    .comments {
      margin-top: 20px;
      .title {
        font-size: 30px;
      }
    }
  }
}
</style>