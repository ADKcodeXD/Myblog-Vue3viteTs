<template>
  <MyTab :articles="collectArticles" :fn="deleteCollectFn" @changeTab="getMyCollect()">
    <template #title> 我的收藏 </template>
    <template #total> 共{{ total }}条 </template>
    <template #caozuo> 删除收藏 </template>
  </MyTab>
  <MyPagination :pageParams="pageParams" :total="total" @changePage="getMyCollect" />
</template>
<script setup lang="ts">
import { deleteUserCollect, getUserCollect } from '@/api/user'
import { ElMessage } from 'element-plus'
import MyTab from './MyTab.vue'

let pageParams = reactive<PageParams>({
  page: 1,
  pagesize: 10
})
let collectArticles = ref<ArticleItemInfo[]>()
let total = ref(0)
const getMyCollect = async () => {
  const { data } = await getUserCollect(pageParams)
  collectArticles.value = data.data.results
  total.value = data.data.length
}

const deleteCollectFn = async (id: string) => {
  await deleteUserCollect(id)
  ElMessage.success('取消收藏成功')
}

onMounted(() => {
  getMyCollect()
})
</script>
