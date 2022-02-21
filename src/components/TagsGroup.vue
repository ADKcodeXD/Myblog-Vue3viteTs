<template>
  <div class="tags">
    <div class="tag" v-for="tag in tags" @click="publishId(tag.id)" :key="tag.id">
      <span>{{ tag.tagName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Tag } from "@/interface/tag";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    tags: {
      type: Object as PropType<Tag[]>,
      default: () => [],
    },
  },
  setup(props,{emit}) {
      const publishId=(id:number)=>{
          emit('tagId',id);
      }
      return {publishId}
  },
});
</script>

<style lang="less" scoped>
@import url(./styles/pc/TagsGroup-pc.less);
</style>