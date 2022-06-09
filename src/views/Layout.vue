<template>
  <div class="cotainer" ref="body">
    <div class="filter">

    </div>
    <!-- 头部 -->
    <TopNavBar />
    <!-- banner -->
    <ThemeConfig />
    <div class="main">
      <!-- 导航 -->
      <!-- routerview -->
      <!-- vue3.0配置 -->
      <RouterView v-slot="{ Component }">
        <keep-alive :include="pages">
          <component :is="Component"></component>
        </keep-alive>
      </RouterView>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useCacheStore } from "@/store/cache";
import { setConfig } from "@/theme/theme";
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
  setConfig();
});
</script>

<style scoped  lang="less">
@import url("@/assets/styles/Layout/Layout.less");
</style>