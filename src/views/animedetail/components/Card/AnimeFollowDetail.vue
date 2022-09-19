<template>
  <div class="follow-card">
    <div class="follow-head">
      <p class="title">追番信息</p>
      <el-dropdown placement="top" trigger="click">
        <ElTag effect="dark" :type="currentlyStatus.type">{{ currentlyStatus.label }}</ElTag>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in statusOptions"
              :key="item.value"
              :disabled="currentlyStatus.value === item.value"
              @click="changeFollowStatus(item.value)"
              ><ElTag effect="dark" :type="item.type">{{ item.label }}</ElTag></el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="info-detail">
      <div class="process">
        <div class="text-display">
          <p>目前进度</p>
          <div class="tw-flex tw-items-center">
            <div v-if="isEditProgress">
              <input
                type="number"
                class="input-num"
                ref="inputRef"
                v-model="process"
                :min="1"
                :max="followInfo.totalEps"
              />
              /{{ followInfo.totalEps }}
            </div>
            <p v-else>{{ followInfo.progress }}/{{ followInfo.totalEps }}</p>
            <ElButton
              size="small"
              class="tw-ml-2"
              @click="editInput"
              :type="isEditProgress ? 'success' : 'default'"
              >{{ isEditProgress ? '完成' : '修改' }}</ElButton
            >
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-inner" :style="{ width: processBar }"></div>
        </div>
      </div>
      <div class="detail-item">
        <p>上次看到</p>
        <div>
          {{ lastView }}
          <router-link :to="followInfo.lastViewEpUrl" v-if="followInfo.lastViewEpUrl"
            >直达</router-link
          >
        </div>
      </div>
      <div class="detail-item">
        <p>开始追番时间</p>
        <p>{{ getFormatTime(Number(followInfo.createDate)) }}</p>
      </div>
      <div class="detail-item">
        <p>上次操作</p>
        <p>{{ getFormatTime(Number(followInfo.lastOperate)) }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useChangeFollowStatus, useChangeProcess } from '@/hooks/useFollowBangumi';
import { getFormatTime } from '@/utils/dayjs';
interface StatusOptions {
  type: '' | 'success' | 'warning' | 'danger' | 'info';
  label: string;
  value: number;
}
const statusOptions: StatusOptions[] = [
  {
    value: 1,
    label: '在看',
    type: 'success'
  },
  {
    value: 2,
    label: '看过',
    type: ''
  },
  {
    value: 3,
    label: '搁置',
    type: 'danger'
  }
];
const props = defineProps<{
  followInfo: FollowBangumiVo;
}>();
const isEditProgress = ref(false);
const inputRef = ref();
const process = ref(props.followInfo.progress);
const processBar = computed(() => {
  const process = props.followInfo.progress / props.followInfo.totalEps;
  return process * 100 + '%';
});
const lastView = computed(() => {
  if (props.followInfo.lastViewEpTime) {
    return `你上次看到了第${props.followInfo.progress}集`;
  } else {
    return `你没有在本站中看过本番剧哦~`;
  }
});
const currentlyStatus = computed(() => {
  return statusOptions.find(item => {
    return item.value === props.followInfo.status;
  });
});
const { changeFollowStatus } = useChangeFollowStatus(props.followInfo.id, props.followInfo);
const editInput = async () => {
  if (isEditProgress.value) {
    isEditProgress.value = false;
    const processParams: FollowProgressParams = {
      id: props.followInfo.id,
      progress: process.value
    };
    const info = await useChangeProcess(processParams, true);
    if (info) {
      props.followInfo.progress = info.followInfo.progress;
    }
  } else {
    isEditProgress.value = true;
    inputRef.value?.focus();
  }
};
</script>
<style lang="less" scoped>
@import url(./styles/AnimeFollowDeatil.less);
</style>
