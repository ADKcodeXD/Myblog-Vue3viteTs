<template>
  <div class="tags">
    <div class="tags-title">
      <p>所有标签</p>
    </div>
    <div class="tags-tag">
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
<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
  tags: {
    type: Object as PropType<Array<Bangumi.AnimeTag>>,
    require: true
  }
})

let type: Array<'success' | 'info' | 'danger' | 'warning' | ''> = [
  'success',
  'info',
  'danger',
  'warning',
  ''
]
</script>

<style lang="less" scoped>
@import url(./styles/AnimeTags.less);
</style>
