
<template>
  <div class="box">
    <h2 class="title tw-text-2xl">文章归档</h2>
    <!-- 两栏 文章归档 -->
    <div class="item" @click="searchBytime(tag.date)" v-for="tag,index in tags" :key="index">
      <div class="date">{{tag.date}}</div>
      <div class="num">{{tag.num}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleGroupByTimeApi } from "@/api/article";
import { ArticleTime } from "@/interface/article";
let tags = ref<ArticleTime[]>();
const router=useRouter();
const getAllTimeTag = async () => {
  const { data } = await getArticleGroupByTimeApi();
  tags.value=data.data;
};
const searchBytime=(val:string)=>{
  let year=val.substring(0,4);
  let monthtemp=val.substring(5,7);
  let month=parseInt(monthtemp);
  router.push(`/index/articlelist?year=${year}&month=${month}`);
}
onMounted(()=>{
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
  margin-top: 1.4286rem;
  transition: background-color 1s ease;
  background-color: rgb(@primaryBackGroundColor);
  padding: 0.7143rem;
  overflow: hidden;
  margin-left: 0.7143rem;
  border-radius: 0.3571rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  .item {
      display: flex;
      color:rgb(@primaryBackGroundColor) ;
      justify-content: space-between;
      background-color: rgb(@primarySubColor);
      padding: 5px;
    margin-top: 10px;
    cursor: pointer;
    &:hover{
        background-color: rgb(@primaryActiveColor);
    }
  }
}
</style>