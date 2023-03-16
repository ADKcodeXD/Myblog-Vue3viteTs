<template>
  <div class="tags">
    <div class="tag" v-for="tag in tags" @click="publishId(tag.id)" :key="tag.id">
      <el-tag type="success">{{ tag.tagName }}</el-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
const emit = defineEmits(['tagId'])
defineProps({
  tags: {
    type: Object as PropType<Tag[]>,
    default: () => {
      return []
    }
  }
})

const publishId = (id: number) => {
  emit('tagId', id)
}
</script>

<style lang="less" scoped>
@import url(./styles/TagsGroup-pc.less);
</style>
