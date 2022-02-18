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
.tags {
        display: flex;
        .tag {
          height: 20px;
          padding: 12px;
          display: flex;
          cursor: pointer;
          align-items: center;
          text-align: center;
          color: rgb(247, 240, 240);
          border-radius: 10px;
          font-size: 12px;
          margin-right: 10px;
          background-color: rgb(14, 138, 14);
        }
      }
</style>