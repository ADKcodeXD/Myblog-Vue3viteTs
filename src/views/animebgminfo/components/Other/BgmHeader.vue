<template>
  <div>
    <div class="back tw-flex tw-bg-slate-50 tw-items-center tw-my-5 tw-p-5 tw-justify-between">
      <div>
        <el-image :src="BgmLogo" class="tw-h-12"></el-image>
        <el-image :src="ADKLogo" class="tw-h-12"></el-image>
      </div>
      <div class="tw-flex tw-flex-col tw-items-end">
        <h1 class="tw-text-white">Bangumi 个人信息</h1>
        <p class="tw-text-slate-400">bangumi数据源 管理你的追番信息</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BgmLogo from '@/assets/img/logo (1).png'
import ADKLogo from '@/assets/img/WebBlog.png'
</script>

<style lang="less" scoped>
.back {
  background-image: linear-gradient(to right, #f3d5ea93 0%, #1b61db3d 100%);
}
</style>
