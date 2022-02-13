<template>
  <div class="main">
    <Carousel />
    <div class="view-content">
      <div class="article">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>近期更新文章</span>
              <el-button class="button" type="text">查看更多</el-button>
            </div>
          </template>
          <ArticleItem v-for="i in 5" :key="i" />
        </el-card>
      </div>
      <div class="rightbox">
        <MyInfo />
        <TimeLine/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from "@/components/Carousel.vue";
import ArticleItem from "./components/article-item.vue";
import MyInfo from "./components/my-info.vue";
import TimeLine from "./components/time-line.vue";
</script>

<style lang="less" scoped>
.main {
  .view-content {
    display: flex;
    margin-top: 15px;
    .article {
      display: flex;
      
      .box-card {
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .rightbox{
      display: flex;
      flex-direction: column;

    }
  }
}
</style>