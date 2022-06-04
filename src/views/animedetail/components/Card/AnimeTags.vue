<template>
  <div class="
      tw-bg-slate-500 tw-mt-3
      md:tw-ml-4
      tw-text-white tw-p-3
      md:tw-rounded-md
      tw-drop-shadow-lg
    ">
    <div class="tw-font-bold tw-text-3xl md:tw-text-xl tw-flex tw-justify-between">
      <p>所有标签</p>
    </div>
    <div class="tw-mt-2 tw-flex tw-flex-wrap tw-cursor-pointer">
      <el-tag v-for="(tag, index) in tags" :key="index" class="tw-m-1" :type="type[Math.floor(Math.random() * 5)]"
        effect="dark">{{ tag.name }}({{ tag.count }})</el-tag>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  tags: {
    type: Object as PropType<Array<Bangumi.AnimeTag>>,
    require: true,
  },
});

let type: Array<'success' | 'info' | 'danger' | 'warning' | ""> = ["success", "info", "danger", "warning", ""];
</script>


<style>
</style>