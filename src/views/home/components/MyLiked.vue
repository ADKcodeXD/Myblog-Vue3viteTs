<template>
  <div>
    <MyTab :articles="likedArticles" :fn="deleteCollectFn" @changeTab="getMyLiked()">
      <template #title> 我的点赞 </template>
      <template #total> 共{{ total }}条 </template>
      <template #caozuo> 取消点赞 </template>
    </MyTab>
  </div>
</template>
<script setup lang="ts">
import { deleteUserLiked, getUserLiked } from '@/api/user'
import MyTab from './MyTab.vue'
import { ElMessage } from 'element-plus'
let pageParams = reactive<PageParams>({
  page: 1,
  pagesize: 10
})
let likedArticles = ref<ArticleItemInfo[]>()
let total = ref(0)
const getMyLiked = async () => {
  const { data } = await getUserLiked(pageParams)
  likedArticles.value = data.data.results
  total.value = data.data.length
}
const deleteCollectFn = async (id: string) => {
  await deleteUserLiked(id)
  ElMessage.success('取消点赞成功')
}
onMounted(() => {
  getMyLiked()
})
</script>
