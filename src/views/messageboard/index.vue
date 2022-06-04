<template>
  <ElScrollbar max-height="80vh" class="message" ref="body">
    <div class="up-info">
      <p class="title">留言板</p>
      <p class="desc">输入你的昵称 联系方式 可以给我的网站留言哦~</p>
    </div>
    <div class="edit-part">
      <div class="liuyan-info">
        <div class="name">
          <span>您的昵称：</span>
          <ElInput size="large" v-model="messageParams.authorName"  show-word-limit maxlength="16">
          </ElInput>
        </div>
        <div class="name">
          <span>您的联系方式：</span>
          <ElInput class="contact" size="large" v-model="messageParams.contact"  maxlength="64">
          </ElInput>
        </div>
      </div>
      <ElDivider />
      <div class="main-content">
        <div class="msg-avatar">
          <UploadAvatar :avatar="messageParams.avatar" @changeAvatar="changeAvatarParams" />
        </div>

        <div class="edit-area">
          <ElInput v-model="messageParams.content" :rows="5" maxlength="256" show-word-limit resize="none"
            type="textarea" style="font-size: 20px; line-height: 30px" placeholder="在这里发布留言哦~" />
        </div>
      </div>
      <div class="button">
        <ElButton @click="publishMessage" class="buttonself" type="success">发布留言</ElButton>
      </div>
    </div>

    <!-- 留言列表 -->
    <div class="paixu">
      <h2>留言列表</h2>
      <p :class="{ active: orderRole === 2 }" @click="order(2)">默认</p>
      <p :class="{ active: orderRole === 1 }" @click="order(1)">倒序</p>
    </div>

    <div class="message-part" v-if="messageList">
      <MessageItem :message="item" v-for="item in messageList" :key="item.id" />
    </div>
    <ElEmpty v-else description="暂时没有留言哦~"></ElEmpty>
    <ElPagination background layout="prev, pager, next" :page-count="Math.ceil(total / pageparams.pagesize)"
      @current-change="changePage" :current-page="pageparams.page">
    </ElPagination>
  </ElScrollbar>
</template>

<script lang="ts">
export default {
  name: "MessageBoard",
};
</script>

<script lang="ts" setup>
import avatar from "@/assets/img/logo.png";
import { addMessageApi, getMessageApi } from "@/api/message";
import MessageItem from "./components/message-item.vue";
import { ElMessage, ElScrollbar } from "element-plus";

let comment = ref("");
let messageParams: MessageParamsForADK = reactive({
  authorName: "",
  contact: "",
  content: "",
  avatar: avatar,
});
let pageparams = reactive<PageParams>({
  page: 1,
  pagesize: 10,
});
let messageList = ref<MessageVo[]>();
let total = ref(0);
const body = ref<InstanceType<typeof ElScrollbar>>();
// 排序规则
let orderRole = ref(0);
// 方法和逻辑区
const getMessage = async (pageparams: PageParams) => {
  const { data } = await getMessageApi(pageparams);
  total.value = data.data.length;
  messageList.value = data.data.results;
};
// 留言的逻辑
const publishMessage = async () => {
  if (!messageParams.content) {
    ElMessage.error("内容不能为空");
    return false;
  } else if (!messageParams.authorName) {
    ElMessage.error("请输入昵称");
    return false;
  }
  const { data } = await addMessageApi(messageParams);
  if (data.code == 200) {
    ElMessage.success("发表成功");
  } else {
    ElMessage.error(data.msg);
  }
  messageParams.content = "";
  messageParams.authorName = "";
  messageParams.avatar = avatar;
  messageParams.contact = "";
  pageparams.page = 1;
  getMessage(pageparams);
};
// 排序方法
const order = (val: number) => {
  if (orderRole.value === val) {
    return;
  } else if (val === 1) {
    pageparams.orderRole = "a";
    orderRole.value = 1;
  } else if (val === 2) {
    pageparams.orderRole = undefined;
    orderRole.value = 2;
  }
  getMessage(pageparams);
};
// 控制滚动条

const changePage = (val: number) => {
  pageparams.page = val;
  getMessage(pageparams);
  body.value?.setScrollTop(0);
};
const changeAvatarParams = (val: string) => {
  messageParams.avatar = val;
};
onMounted(() => {
  getMessage(pageparams);
});
</script>



<style lang="less" scoped>
@import url(./styles/messageboard-pc.less);
@import url(@/assets/styles/MyAnimate.less);
</style>