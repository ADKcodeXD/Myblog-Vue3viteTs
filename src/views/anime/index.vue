<template>
  <div class="tw-w-fill tw-px-5 tw-mt-28 lg:tw-w-4/5 lg:tw-mx-auto lg:tw-mt-0">
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
import { defineComponent } from "vue";
import AnimeHeader from "./components/AnimeHeader.vue";
import AnimeCarousel from "./components/AnimeCarousel.vue";
import AnimeBroswer from "./components/AnimeBroswer.vue";
import AnimeMinagamiteiru from "./components/AnimeMinagamiteiru.vue";

export default defineComponent({
  setup() {
    return {};
  },
  components: { AnimeHeader, AnimeCarousel, AnimeBroswer, AnimeMinagamiteiru },
});
</script>


