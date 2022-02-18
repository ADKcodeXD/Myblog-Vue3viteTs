<template>
  <div class="message" ref="body">
    <div class="up-info">
      <p class="title">留言板</p>
      <p class="desc">输入你的昵称 联系方式 可以给我的网站留言哦~</p>
    </div>
    <div class="edit-part">
      <div class="liuyan-info">
        <div class="name">
          <span>您的昵称：</span>
          <el-input
            size="large"
            v-model="messageParams.authorName"
            icon="EditPen"
            show-word-limit
            maxlength="16"
          >
          </el-input>
        </div>
        <div class="name">
          <span>您的联系方式：</span>
          <el-input
            class="contact"
            size="large"
            v-model="messageParams.contact"
            icon="EditPen"
            maxlength="64"
          >
          </el-input>
        </div>
      </div>

      <el-divider></el-divider>
      <div class="main-content">
        <UploadAvatar
          :avatar="messageParams.avatar"
          @changeAvatar="($event) => (messageParams.avatar = $event)"
        />
        <div class="edit-area">
          <el-input
            v-model="messageParams.content"
            :rows="6"
            maxlength="256"
            show-word-limit
            resize="none"
            type="textarea"
            style="font-size: 20px; line-height: 30px"
            placeholder="在这里发布留言哦~"
          />
        </div>
      </div>
      <div class="button">
        <el-button @click="publishMessage" class="buttonself" type="success"
          >发布留言</el-button
        >
      </div>
    </div>

    <!-- 留言列表 -->
    <div class="paixu">
      <h2>留言列表</h2>
      <p :class="{ active: orderRole === 2 }" @click="order(2)">默认</p>
      <p :class="{ active: orderRole === 1 }" @click="order(1)">最新</p>
    </div>
    <div class="message-part" v-if="messageList">
      <MessageItem :message="item" v-for="item in messageList" :key="item.id" />
    </div>
    <el-empty v-else description="暂时没有留言哦~"></el-empty>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="Math.ceil(total / pageparams.pagesize)"
      @current-change="changePage"
      :current-page="pageparams.page"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { MessageParamsForADK, PageParams } from "@/interface/params";
import { defineComponent } from "vue";
import avatar from "@/assets/img/women.png";
import { addMessageApi, getMessageApi } from "@/api/message";
import MessageItem from "./components/message-item.vue";
import { MessageVo } from "@/interface/message";
import { ElMessage } from "element-plus";
import { useScroll } from "@vueuse/core";
export default defineComponent({
  components: { MessageItem },
  setup() {
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
    const body = ref<HTMLElement | null>(null);
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
      if(body.value){
        //   使用这个控制动画效果  
        body.value.scrollTo({ top: 0, behavior: 'smooth' })
      }
    };
    onMounted(() => {
      getMessage(pageparams);
    });

    return {
      total,
      body,
      changePage,
      pageparams,
      messageParams,
      publishMessage,
      messageList,
      order,
      orderRole,
    };
  },
});
</script>



<style lang="less" scoped>
.message {
  margin-top: 20px;
  padding: 30px;
  width: 100%;
  min-height: 900px;
  max-height: 900px;
  overflow-y: auto;
  transition: all 1s ease;
  background-color: aliceblue;
  .up-info {
    .title {
      font-size: 36px;
    }
    .desc {
      font-size: 20px;
    }
  }
  .edit-part {
    margin-top: 20px;
    width: 100%;
    height: 300px;
    .liuyan-info {
      display: flex;
      .name {
        display: flex;
        align-items: center;
        margin-right: 20px;
        span {
          display: flex;
          flex-shrink: 0;
          font-size: 16px;
        }
        .contact {
          width: 300px;
        }
      }
    }
    .up {
      justify-content: space-between;
      display: flex;
    }
    .main-content {
      display: flex;
      width: 100%;
      .avatar {
        width: 60px;
        height: 60px;
        flex-shrink: 0;
        background-color: antiquewhite;
        border-radius: 50%;
        overflow: hidden;
        img {
          object-fit: cover;
        }
      }
      .edit-area {
        width: 100%;
        margin-left: 30px;
      }
    }

    .button {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
  .paixu {
    display: flex;
    align-items: center;
    h2 {
      margin: 0;
    }
    p {
      align-self: flex-end;
      margin-left: 10px;
      cursor: pointer;
      font-weight: 600;
    }
    .active {
      color: orange;
    }
  }
  .message-part {
  }
}
</style>