<template>
  <div
    class="
      tw-bg-slate-500 tw-mt-3
      md:tw-ml-4
      tw-text-white tw-p-3
      md:tw-rounded-md
      tw-drop-shadow-lg
    "
  >
    <div
      class="tw-font-bold tw-text-3xl md:tw-text-xl tw-flex tw-justify-between"
    >
      <p>所有标签</p>
    </div>
    <div class="tw-mt-2 tw-flex tw-flex-wrap tw-cursor-pointer">
      <el-tag
        v-for="(tag, index) in tags"
        :key="index"
        class="tw-m-1"
        :type="type[Math.floor(Math.random() * 5)]"
        effect="dark"
        >{{ tag.name }}({{ tag.count }})</el-tag
      >
    </div>
  </div>
</template>
<script lang="ts">
import { AnimeTag } from "@/interface/bangumiApi.type";
import { BuildPropType } from "element-plus/es/utils/props";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    tags: {
      type: Object as PropType<Array<AnimeTag>>,
      require: true,
    },
  },
  setup() {
    let type: Array<
      BuildPropType<
        StringConstructor,
        "" | "success" | "warning" | "info" | "danger",
        unknown
      >
    > = ["success", "info", "danger", "warning", ""];
    return {
      type,
    };
  },
});
</script>


<style>
</style>