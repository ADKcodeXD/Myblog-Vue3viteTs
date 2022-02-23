<template>
  <div class="cotainer" ref="body">
    <!-- 头部 -->
    <TopNavBar />
    <!-- banner -->
    <div class="main" >
      <!-- 导航 -->
      <!-- routerview -->
      <Skin  />
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <div class="boxgroup">
      <!-- <div class="box"></div> -->
      <!-- <div class="box2"></div> -->
      <!-- <div class="box4"></div> -->
      <div class="box3"></div>
      <div class="box5"></div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import TopNavBar from "@/components/TopNavBar.vue";
import { useThemeStore } from "@/store/theme";
import { setTheme } from "@/theme/theme";

onMounted(() => {
  setTheme();
});
</script>

<style scoped  lang="less">
@import url('@/assets/styles/pc/layout-pc.less');
</style>