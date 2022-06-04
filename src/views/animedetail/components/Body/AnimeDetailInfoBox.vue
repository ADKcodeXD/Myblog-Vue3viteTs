<template>
  <el-descriptions
    title="详细信息"
    direction="vertical"
    class="tw-mt-5 tw-w-full"
    :column="3"
    border
    v-if="infoboxVal"
  >
    <el-descriptions-item
      :label="item.key"
      v-for="(item, index) in infoboxVal"
      :key="index"
    >
      <template v-if="Array.isArray(item.value)">
        <span v-for="(v, index) in item.value" :key="index">{{ v.v }}/</span>
      </template>
      <span v-else>{{ item.value }}</span>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
const infoboxVal: Array<Bangumi.InfoBoxItem> | undefined = inject("infoboxVal");
</script>


<style lang="less" scoped>
:deep(.el-descriptions__title) {
  font-size: 1.6rem;
  color: #fff;
}
:deep(.el-descriptions__table) {
  tbody {
    tr {
      display: flex;
      justify-content: space-between;
      width: 100%;
      td {
        flex: 1;
        word-break: break-all;
        text-overflow: ellipsis;
      }
      th {
        flex: 1;
      }
    }
  }
}
:deep(.el-descriptions__body) {
  flex: 1;
}
</style>