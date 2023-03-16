<template>
  <div class="all">
    <p class="info">总共{{ total }}条数据</p>
    <ElPagination
      background
      layout="prev, pager, next"
      :page-count="Math.ceil(total / pageParams.pagesize)"
      @current-change="changePage"
      :current-page="pageParams.page"
    >
    </ElPagination>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  pageParams: PageParams
  total: number
}>()
const emit = defineEmits(['changePage'])
const changePage = (val: number) => {
  props.pageParams.page = val
  emit('changePage')
}
</script>

<style lang="less" scoped>
.all {
  .font-normal();
}
</style>
