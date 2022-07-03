<template>
  <div class="tasall">
    <div>
      <div class="title">
        <p>所有标签</p>
        <span>All tags</span>
      </div>
    </div>
    <el-divider class="tw-my-4"></el-divider>
    <TagItem v-for="tag in tags" :key="tag.id" :tagId="tag.id" :tagName="tag.tagName" />
  </div>
</template>

<script lang="ts" setup>
import { getTagList } from '@/api/article';
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
@import url(../styles/TagsAll.less);
</style>
