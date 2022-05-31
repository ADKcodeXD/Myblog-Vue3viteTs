<template>
  <div class="tasall">
    <div class="tw-w-32 tw-my-2">
      <MyElimage :img="Alltag" />
    </div>
    <el-divider class="tw-my-4"></el-divider>
    <TagItem
      v-for="tag in tags"
      :key="tag.id"
      :tagId="tag.id"
      :tagName="tag.tagName"
      />
  </div>
</template>

<script lang="ts" setup>
import { getTagList } from "@/api/article";
import { Tag } from "@/interface/tag";
import Alltag from '@/assets/img/all-tag.png';

let tags = ref<Tag[]>();
    const getTags = async () => {
      const { data } = await getTagList();
      tags.value = data.data;
    };
    onMounted(() => {
      getTags();
    });
</script>


<style lang="less" scoped>
.tasall {
  .title {
    padding: 1rem 0;
    margin: 0;
    font-weight: 100;
  }
  transition: background-color 1s ease;
  background-color: rgb(@primaryBackGroundColor);
  padding: 0.7143rem;
  overflow: hidden;
  border-radius: 0.3571rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  .tag {
    margin-right: 10px;
    margin-top: 5px;
    cursor: pointer;
  }
}
</style>