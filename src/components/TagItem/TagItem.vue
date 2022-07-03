<template>
  <el-tag
    class="tag"
    type="success"
    :closable="closable"
    @close="closeTag"
    @click="isClick ? $router.push(`/index/articlelist?tagId=${tagId}&tagName=${tagName}`) : ''"
    >{{ tagName }}</el-tag
  >
</template>

<script lang="ts" setup>
const props = defineProps({
  tagId: {
    type: Number,
    require: true
  },
  tagName: {
    type: String,
    require: true
  },
  closable: {
    type: Boolean,
    default: false
  },
  isClick: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['closeTag']);
const closeTag = () => {
  emit('closeTag', props.tagId);
};
</script>

<style lang="less" scoped>
.tag {
  margin-left: 5px;
  margin-top: 5px;
  cursor: pointer;
}
</style>
