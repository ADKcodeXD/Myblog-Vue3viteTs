<template>
  <div class="tw-w-fill tw-px-1 tw-mt-28 lg:tw-w-4/5 lg:tw-mx-auto lg:tw-mt-0">
    <AnimeHeader />
    <AnimeCarousel />
    <div class="tw-flex tw-mt-10 tw-flex-col md:tw-flex-row">
      <div class="left md:tw-w-9/12">
        <AnimeBroswer />
      </div>
      <div class="right md:tw-flex-1 md:tw-ml-4">
          <AnimeMinagamiteiru />
      </div>
    </div>
  </div>
</template>



<script lang="ts">
export default {
name:'Anime',
};
</script>

<script lang="ts" setup>
import AnimeHeader from "./components/AnimeHeader.vue";
import AnimeCarousel from "./components/AnimeCarousel.vue";
import AnimeBroswer from "./components/AnimeBroswer.vue";
import AnimeMinagamiteiru from "./components/AnimeMinagamiteiru.vue";
</script>


