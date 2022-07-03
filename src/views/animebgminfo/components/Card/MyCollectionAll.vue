<template>
  <el-tabs
    v-model="activeName"
    type="card"
    v-if="status"
    v-loading="loading"
    class="tw-p-3 tw-bg-white"
  >
    <el-tab-pane :label="'想看' + status.collects[2].count" name="1">
      <ListCollections :list="itemList" />
    </el-tab-pane>
    <el-tab-pane :label="'在看' + status.collects[0].count" name="3">
      <ListCollections :list="itemList" />
    </el-tab-pane>
    <el-tab-pane :label="'看过' + status.collects[1].count" name="2">
      <ListCollections :list="itemList" />
    </el-tab-pane>
    <el-tab-pane :label="'搁置' + status.collects[3].count" name="4">
      <ListCollections :list="itemList" />
    </el-tab-pane>
    <el-tab-pane :label="'抛弃' + status.collects[4].count" name="5">
      <ListCollections :list="itemList" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { getCollectionStatus, getSubjectCollection, getUserCollectionByType } from '@/api/bangumi';
import { useSubjectInfo } from '@/hooks/Bangumi';
import { useBangumiUser } from '@/store/bangumiUser';
import { ElMessage } from 'element-plus';
import ListCollections from './ListCollections.vue';
const activeName = ref('2');
const bgmUser = useBangumiUser();
const status = ref(null);
let loading = ref(true);
let itemList = ref<Bangumi.AnimeItemInfoCollection[]>([]);
getCollectionStatus(bgmUser.bgm_user_info.id).then(({ data }) => {
  status.value = data.find(item => item.type === 2);
});
let typeParams = reactive({
  type: '2',
  offset: 0,
  limit: 10
});
const getTypeList = (typeParams, itemlist) => {
  return new Promise((resolve, reject) => {
    getUserCollectionByType(
      bgmUser.bgm_user_info.id,
      parseInt(typeParams.type),
      typeParams.limit,
      typeParams.offset
    ).then(({ data }) => {
      let ids = data.data.map(item => {
        return item.subject_id;
      });
      // 获取了条目的详细信息 再获取一下自己的评价
      useSubjectInfo(ids)
        .then((item: any) => {
          item.forEach(async element => {
            if (element.status === 'fulfilled') {
              const { data } = await getSubjectCollection(element.value.id, new Date().getTime());
              element.value.CollectionInfo = data;
              itemlist.value.push(element.value);
              loading.value = false;
            }
          });
        })
        .catch(() => reject());
    });
  });
};

watch(
  activeName,
  async newVal => {
    loading.value = true;
    typeParams.type = newVal;
    itemList.value = [];
    try {
      await getTypeList(typeParams, itemList);
    } catch (error) {
      ElMessage.error('加载失败');
      loading.value = false;
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="less" scoped>
:deep(.el-tabs__content) {
  overflow: unset;
}
</style>
