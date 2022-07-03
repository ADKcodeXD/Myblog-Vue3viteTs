<template>
  <el-descriptions
    title="详细信息"
    direction="vertical"
    class="tw-mt-5 tw-w-full"
    :column="3"
    border
    v-if="infoboxVal"
  >
    <el-descriptions-item :label="item.key" v-for="(item, index) in infoboxVal" :key="index">
      <template v-if="Array.isArray(item.value)">
        <span v-for="(v, index) in item.value" :key="index">{{ v.v }}/</span>
      </template>
      <span v-else>{{ item.value }}</span>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
const infoboxVal: Array<Bangumi.InfoBoxItem> | undefined = inject('infoboxVal');
</script>

<style lang="less" scoped>
@import url(./styles/AnimeDetailInfo.less);
</style>
