<template>
  <div>
    <el-empty :image="Img" :image-size="350" :description="desc" />
  </div>
</template>

<script setup lang="ts">
import Img from '@/assets/img/Empty.png';
defineProps({
  desc: {
    type: String,
    default: '现在还找不到数据哦~'
  }
});
</script>
<style lang="less" scoped>
:deep(.el-empty__description) {
  font-family: '幼圆';
  font-weight: 600;
}
</style>
