<template>
  <ElScrollbar max-height="80vh" class="message" ref="body">
    <div class="up-info">
      <div class="logo">
        <div style="width:60px">
          <MyElimage :img="MessageLogo" />
        </div>
        <p class="title">留言板</p>
      </div>
      <p class="desc">输入你的昵称 联系方式 可以给我的网站留言哦~</p>
    </div>
    <div class="edit-part">
      <div class="liuyan-info">
        <div class="name">
          <span>您的昵称：</span>
          <ElInput size="large" v-model="messageParams.authorName" show-word-limit maxlength="16">
          </ElInput>
        </div>
        <div class="name">
          <span>您的联系方式：</span>
          <ElInput class="contact" size="large" v-model="messageParams.contact" show-word-limit maxlength="64"
          placeholder="example@adkdream.top">
          </ElInput>
        </div>
      </div>
      <ElDivider />
      <div class="main-content">
        <div class="msg-avatar">
          <UploadAvatar :avatar="messageParams.avatar" @changeAvatar="changeAvatarParams" />
        </div>
        <div class="edit-area">
          <MyEmoji @changeText="changeMsg" ref="emoji" placeholder="在这里输入留言哦~~~" />
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
      <CommentItem v-for="item in toCommentItem" :commentInfo="item" :key="item.id" :reply="false" :level="false" />
    </div>
    <AdkEmpty v-else desc="暂时没有留言哦~"></AdkEmpty>

    <MyPagination :pageparams="pageparams" @changePage="changePage" :total="total" class="pagination" />
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
import { ElMessage, ElScrollbar } from "element-plus";
import { decodeEmoji } from "@/utils/emoji";
import MessageLogo from '@/assets/img/liuyan-logo.png'
const comment = ref("");
const messageParams: MessageParamsForADK = reactive({
  authorName: "",
  contact: "",
  content: "",
  avatar: avatar,
});
const pageparams = reactive<PageParams>({
  page: 1,
  pagesize: 10,
});
const messageList = ref<MessageVo[]>();
const total = ref(0);
const body = ref<InstanceType<typeof ElScrollbar>>();
// 排序规则
const orderRole = ref(0);
const emoji = ref();
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
    emoji.value.clearInput();
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
const changePage = () => {
  getMessage(pageparams);
  body.value?.setScrollTop(0);
};
const changeAvatarParams = (val: string) => {
  messageParams.avatar = val;
};
const changeMsg = (val: string) => {
  messageParams.content = val;
}
const toCommentItem = computed(() => {
  let newCommentList = ref<CommentItemInfo[]>();
  newCommentList.value = messageList.value.map(item => {
    let obj = {
      content: decodeEmoji(item.content),
      contact: item.contact,
      nickname: item.authorName,
      createDate: item.createDate,
      id: item.id,
      avatar: item.avatar
    }
    return obj;
  })
  return newCommentList.value;
})
onMounted(() => {
  getMessage(pageparams);
});
</script>



<style lang="less" scoped>
@import url(./styles/MessageBoard.less);
@import url(@/assets/styles/MyAnimate.less);
</style>