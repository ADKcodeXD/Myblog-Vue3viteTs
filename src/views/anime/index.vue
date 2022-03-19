<template>
  <div class="tw-w-4/5 tw-mx-auto">
      <AnimeHeader/>
      <AnimeCarousel/>
      <AnimeBroswer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AnimeHeader from "./components/AnimeHeader.vue";
import AnimeCarousel from "./components/AnimeCarousel.vue";
import AnimeBroswer from "./components/AnimeBroswer.vue";

export default defineComponent({
    setup() {
        return {};
    },
    components: { AnimeHeader, AnimeCarousel,AnimeBroswer }
});
</script>


