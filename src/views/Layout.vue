<template>
  <div class="cotainer" ref="body">
    <!-- 头部 -->
    <TopNavBar />
    <!-- banner -->
    <div class="main">
      <!-- 导航 -->
      <!-- routerview -->
      <Skin />
      <!-- vue3.0配置 -->
      <router-view v-slot="{ Component }">
        <keep-alive :include="pages">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
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
import { useCacheStore } from "@/store/cache";
import { setTheme } from "@/theme/theme";
const cachePages = useCacheStore();
const pages = cachePages.cachePages;
const route = useRoute();

// 监视页面 并动态设置页面缓存
watch(route, (to) => {
  if (to.meta.keepAlive) {
    if (to.name) {
      cachePages.setCachePage(to.name.toString());
    }
  }
});

onMounted(() => {
  setTheme();
});
</script>

<style scoped  lang="less">
@import url("@/assets/styles/pc/layout-pc.less");
</style>