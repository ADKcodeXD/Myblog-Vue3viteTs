<template>
  <div class="timeline">
    <div class="tw-w-32 tw-my-2">
      <MyElimage :img="Newmsg" />
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
import { MessageVo } from "@/interface/message";
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
.timeline {
  transition: background-color 1s ease;
  background-color: rgb(@primaryBackGroundColor);
  padding: 0.7143rem;
  overflow: hidden;
  border-radius: 0.3571rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  .title {
    font-weight: 100;
    margin: 0;
    padding: 1rem 0;
  }

  .content {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>