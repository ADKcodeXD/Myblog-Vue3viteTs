<template>
  <div class="tasall">
    <h2 class="title tw-text-2xl">所有标签</h2>
    <TagItem
      v-for="tag in tags"
      :key="tag.id"
      :tagId="tag.id"
      :tagName="tag.tagName"
      />
  </div>
</template>

<script lang="ts">
import { getTagList } from "@/api/article";
import { Tag } from "@/interface/tag";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    let tags = ref<Tag[]>();
    const getTags = async () => {
      const { data } = await getTagList();
      tags.value = data.data;
    };
    onMounted(() => {
      getTags();
    });
    return { tags };
  },
});
</script>


<style lang="less" scoped>
.tasall {
  .title {
    padding: 1rem 0;
    margin: 0;
    font-weight: 100;
  }
  margin-top: 1.4286rem;
  transition: background-color 1s ease;
  background-color: rgb(@primaryBackGroundColor);
  padding: 0.7143rem;
  overflow: hidden;
  margin-left: 0.7143rem;
  border-radius: 0.3571rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  .tag {
    margin-right: 10px;
    margin-top: 5px;
    cursor: pointer;
  }
}
</style>