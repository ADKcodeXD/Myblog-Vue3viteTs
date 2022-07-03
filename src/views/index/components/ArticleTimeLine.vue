<template>
  <div class="box">
    <div>
      <div class="title">
        <p>文章归档</p>
        <span>New Message</span>
      </div>
    </div>
    <el-divider class="tw-my-5"></el-divider>
    <!-- 两栏 文章归档 -->
    <div class="item" @click="searchBytime(tag.date)" v-for="(tag, index) in tags" :key="index">
      <div class="date">{{ tag.date }}</div>
      <div class="num">{{ tag.num }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleGroupByTimeApi } from '@/api/article';
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
};
onMounted(() => {
  getAllTimeTag();
});
</script>

<style lang="less" scoped>
@import url(../styles/ArticleTimeLine.less);
</style>
