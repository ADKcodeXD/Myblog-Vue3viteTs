<template>
  <div class="main">
    <Carousel :items="banenrList" />
    <div class="view-content">
      <div class="article">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>近期更新文章</span>
              <el-button
                @click="$router.push('/articlelist')"
                class="button"
                type="text"
                >查看更多</el-button
              >
            </div>
          </template>
          <ArticleItem
            v-for="articleItem in articles"
            :key="articleItem.id"
            :articleItem="articleItem"
          />
          <el-empty
            v-if="articles.length === 0"
            description="暂时没有文章发表哦~"
          ></el-empty>
        </el-card>
      </div>
      <div class="rightbox">
        <MyInfo />
        <TimeLine />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getIndexBanner, listArticle } from "@/api/article";
import { ArticleItemInfo, Banner } from "@/interface/article";
import { PageParams } from "@/interface/params";
import ArticleItem from "./components/article-item.vue";
import MyInfo from "./components/my-info.vue";
import TimeLine from "./components/time-line.vue";

// 获取首页文章 按照时间顺序 5篇
let articles = ref<ArticleItemInfo[]>([]);
let pageparams: PageParams = {
  page: 1,
  pagesize: 5,
};
// 获取文章列表
const getIndexfive = async () => {
  const { data } = await listArticle(pageparams);

  articles.value = data.data;
};

let banenrList = ref<Banner[]>([]);
// 获取文章头图
const getBannerList = async () => {
  const { data } = await getIndexBanner();
  banenrList.value = data.data;
};

onMounted(() => {
  getIndexfive();
  getBannerList();
});
</script>

<style lang="less" scoped>
@media screen and(max-width:768px) {
  
}
@media screen and(max-width:1240px) {
  .main {
    .el-card {
      background-color: rgb(@primaryBackGroundColor);
      color: rgb(@primaryTextColor);
    }
    .view-content {
      flex-direction: column;
      .article {
        width: 100%;
        .box-card {
          width: 100%;
          .card-header {
            justify-content: space-between;
            align-items: center;
          }
        }
      }
      .rightbox {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
.main {
  .el-card {
    background-color: rgb(@primaryBackGroundColor);
    color: rgb(@primaryTextColor);
  }
  .view-content {
    display: flex;
    margin-top: 15px;
    transition: all 0.6s ease;
    .article {
      display: flex;
      width: 100%;
      transition: all 0.6s ease;

      background-color: rgb(@primaryBackGroundColor);
      .box-card {
        width: 100%;
        transition: all 0.6s ease;
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .rightbox {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>