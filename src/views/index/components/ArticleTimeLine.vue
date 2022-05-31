
<template>
  <div class="box">
    <div class="tw-w-32 tw-my-2">
      <MyElimage :img="Achive" />
    </div>
    <el-divider class="tw-my-5"></el-divider>
    <!-- 两栏 文章归档 -->
    <div class="item" @click="searchBytime(tag.date)" v-for="tag, index in tags" :key="index">
      <div class="date">{{ tag.date }}</div>
      <div class="num">{{ tag.num }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleGroupByTimeApi } from "@/api/article";
import { ArticleTime } from "@/interface/article";
import Achive from '@/assets/img/article-achive.png';
let tags = ref<ArticleTime[]>();
const router = useRouter();
const getAllTimeTag = async () => {
  const { data } = await getArticleGroupByTimeApi();
  tags.value = data.data;
};
const searchBytime = (val: string) => {
  let year = val.substring(0, 4);
  let monthtemp = val.substring(5, 7);
  let month = parseInt(monthtemp);
  router.push(`/index/articlelist?year=${year}&month=${month}`);
}
onMounted(() => {
  getAllTimeTag();
})
</script>


<style lang="less" scoped>
.box {
  .title {
    padding: 1rem 0;
    margin: 0;
    font-weight: 100;
  }  
  transition: background-color 1s ease;
  background-color: rgb(@primaryBackGroundColor);
  padding: 0.7143rem;
  overflow: hidden;
  border-radius: 0.3571rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);

  .item {
    display: flex;
    color: rgb(@primaryBackGroundColor);
    justify-content: space-between;
    background-color: rgb(@primarySubColor);
    padding: 5px;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
      background-color: rgb(@primaryActiveColor);
    }
  }
}
</style>