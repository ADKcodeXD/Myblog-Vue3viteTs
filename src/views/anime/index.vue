<template>
  <div class="container">
    <AnimeHeader />
    <div class="container-second">
      <div class="container-second-carousel">
        <AnimeCarousel />
      </div>
      <div class="container-second-tab">
        <ElScrollbar>
          <AnimeMina />
        </ElScrollbar>
      </div>
    </div>
    <AnimeBroswerMain />
  </div>
</template>
<script lang="ts">
export default {
  name: 'Anime',
};
</script>
<script lang="ts" setup>
import AnimeHeader from "./components/AnimeHeader.vue";
import AnimeCarousel from "./components/AnimeCarousel.vue";
import AnimeBroswerMain from "./components/AnimeBroswerMain.vue";
import AnimeMina from "@/anime/components/AnimeMina.vue";
</script>
<style lang="less" scoped>
@import url(./styles/AnimePage.less);
</style>