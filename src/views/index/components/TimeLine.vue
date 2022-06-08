<template>
  <div class="timeline">
    <div>
      <div class="title">
        <p>最新留言</p>
        <span>New Message</span>
      </div>
    </div>
    <el-divider class="tw-my-4"></el-divider>
    <el-timeline>
      <el-timeline-item v-for="item in result" :key="item.id" :timestamp="item.createDate" placement="top">
        <el-card>
          <h4>{{ item.authorName }}</h4>
          <p class="content">{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts" setup>
import { getMessageApi } from "@/api/message";
import Newmsg from '@/assets/img/new-msg.png';
let result = ref<MessageVo[]>([]);
const getMsg = async () => {
  const { data } = await getMessageApi({ page: 1, pagesize: 2 });
  result.value = data.data.results;
};
onMounted(() => {
  getMsg();
});
</script>

<style lang="less" scoped>
@import url(../styles/TimeLine.less);
</style>