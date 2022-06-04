<template>
  <div class="chatroom tw-fixed tw-flex tw-flex-col tw-justify-between" ref="chatbody">
    <div class="tran"></div>
    <div class="tw-flex tw-justify-between" ref="topbar">
      <i class="iconfont icon-yanjing tw-text-xl" @click="hideChat"></i>
      <i class="iconfont icon-move tw-text-xl tw-ml-3 tw-cursor-move" ref="modalButton"></i>
      <p class="tw-text-center tw-flex-1">
        来聊一聊天吧(当前{{ userlist.length }}人在线)
      </p>
      <i class="iconfont icon-close_circle tw-text-xl" @click="closeChat"></i>
    </div>
    <el-divider style="margin: 12px 5px"></el-divider>
    <div class="tw-h-3/5 tw-flex-1 tw-overflow-auto" ref="container">
      <div v-for="(item, index) in msgList" :key="index">
        <!-- 系统信息 -->
        <div class="tw-flex tw-flex-col tw-items-center" v-if="item.type === 1">
          <p class="tw-text-slate-500 tw-text-base">{{ item.msg }}</p>
          <p class="tw-text-slate-400 tw-text-sm">
            {{ getRealativeTime(item.time) }}
          </p>
        </div>
        <div class="tw-flex tw-flex-col tw-items-center" v-if="item.type === 4">
          <p class="tw-text-slate-500 tw-text-base">{{ item.msg }}</p>
          <p class="tw-text-slate-400 tw-text-sm">
            {{ getRealativeTime(item.time) }}
          </p>
        </div>
        <!-- 对面的信息格式 -->
        <div class="tw-flex tw-my-2" v-if="item.type === 2">
          <div class="
              tw-h-12
              tw-w-12
              tw-bg-yellow-200
              tw-rounded-full
              tw-overflow-hidden
              tw-flex-shrink-0
              tw-flex
              tw-items-center
            ">
            <MyElimage :img="item.userinfo?.avatar" />
          </div>
          <div class="tw-text-white tw-flex tw-flex-col">
            <div class="
                tw-p-2 tw-bg-blue-500 tw-rounded-xl tw-ml-2 tw-mb-2 tw-break-all
              ">
              {{ item.msg }}
            </div>
            <p style="color: gray" class="tw-ml-2">
              {{ getRealativeTime(item.time) }}
            </p>
          </div>
        </div>
        <!-- 自己的信息格式 反过来就行 -->
        <div class="tw-flex tw-my-2 tw-justify-end" v-if="item.type === 3">
          <div class="tw-text-white tw-flex tw-flex-col tw-items-end">
            <div class="
                tw-p-2
                tw-bg-green-500
                tw-rounded-xl
                tw-mr-2
                tw-mb-2
                tw-break-all
              ">
              {{ item.msg }}
            </div>
            <p style="color: gray" class="tw-mr-2">
              {{ getRealativeTime(item.time) }}
            </p>
          </div>
          <div class="
              tw-h-12
              tw-w-12
              tw-bg-yellow-200
              tw-rounded-full
              tw-overflow-hidden
              tw-flex-shrink-0
              tw-flex
              tw-items-center
            ">
            <MyElimage :img="item.userinfo?.avatar" />
          </div>
        </div>
      </div>
    </div>

    <div class="tw-flex">
      <el-input v-model="sendMsgBox"></el-input>
      <el-button type="success" @click="sendMsg">发送</el-button>
    </div>
  </div>
</template>

<script lang="ts">
let wsUrl = process.env.VITE_APP_WEB_SOCKET_API;
interface Msg {
  type: number;
  msg: string;
  time: number;
  userinfo: UserEasy | null;
}
</script>

<script lang="ts" setup>
import { useUserStore } from "@/store/user";
import { getRealativeTime } from "@/utils/dayjs";
import { useMouseInElement } from "@vueuse/core";
import { isMobile } from "@/utils/mobile";
const emit=defineEmits(['close'])
const { userinfo } = useUserStore();
// 暂时未接入
let history = ref([]);
let sendMsgBox = ref("");
let userlist = ref<UserEasy[]>([]);
let msgList = ref<Msg[]>([]);
let websocket: WebSocket;
let modalButton = ref<HTMLElement | null>(null);
let topbar = ref<HTMLElement | null>();
let chatbody = ref<HTMLElement | null>();
let container = ref<HTMLElement | null>();
let isHide = ref(false);
let historyXY = ref<{ x: string; y: string }>({ x: "0", y: "0" });
onMounted(() => {
  // 嗯。。 需要等userinfo出来之后才去请求
  let username = userinfo.username;

  let url = wsUrl + username;

  websocket = new WebSocket(url);

  websocket.onopen = () => {
    console.log("open websocket");
  };

  websocket.onmessage = (msg) => {
    let msgObj = JSON.parse(msg.data);
    console.log(msgObj);

    if (msgObj.type === 1) {
      userlist.value = msgObj.msg;
      let sysMsg = {
        type: 1,
        userinfo: null,
        msg: "欢迎 " + msgObj.userVo.nickname + " 进入聊天室",
        time: msgObj.createTime,
      };
      msgList.value.push(sysMsg);
    } else if (msgObj.type === 2) {
      // 发送的信息在这里发
      if (msgObj.userVo.id !== userinfo.id) {
        let otherUserMsg = {
          type: 2,
          userinfo: msgObj.userVo,
          msg: msgObj.msg,
          time: msgObj.createTime,
        };
        msgList.value.push(otherUserMsg);
      } else {
        let myMsg = {
          type: 3,
          userinfo: msgObj.userVo,
          msg: msgObj.msg,
          time: msgObj.createTime,
        };
        msgList.value.push(myMsg);
      }
    } else {
      let sysLogoutMsg = {
        type: 4,
        userinfo: msgObj.userVo,
        msg: msgObj.msg,
        time: msgObj.createTime,
      };
      let index = userlist.value.findIndex((item) => {
        item.id === msgObj.userVo.id;
      });
      userlist.value.splice(index, 1);
      msgList.value.push(sysLogoutMsg);
    }
    nextTick(() => {
      if (container.value) {
        container.value.scrollTop = container.value.scrollHeight;
      }
    });
  };

  websocket.onclose = (msg) => {
    console.log("关闭");
    let sysLogoutMsg = {
      type: 4,
      userinfo: null,
      msg: '连接异常 请重新尝试',
      time: new Date().getTime(),
    };
  };

  // 监听事件
  modalButton.value?.addEventListener("mousedown", (e) => {
    down.value = true;
  });
  topbar.value?.addEventListener("mousemove", (e) => {
    if (down.value && chatbody.value && !isHide.value) {
      chatbody.value.style.top = e.clientY - elementY.value + "px";
      chatbody.value.style.left = e.clientX - elementX.value + "px";
    }
  });
  topbar.value?.addEventListener("mouseleave", (e) => {
    down.value = false;
  });
  modalButton.value?.addEventListener("mouseup", (e) => {
    down.value = false;
  });
  modalButton.value?.addEventListener("touchstart", () => {
    down.value = true;
  });
  topbar.value?.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      if (down.value && chatbody.value && !isHide.value) {
        chatbody.value.style.top =
          e.targetTouches[0].clientY - elementY.value + "px";
        chatbody.value.style.left =
          e.targetTouches[0].clientX - elementX.value + "px";
      }
    },
    { passive: false }
  );
  topbar.value?.addEventListener("touchend", () => {
    down.value = false;
  });
});

const sendMsg = () => {
  if (sendMsgBox.value === "") {
    return;
  }
  websocket.send(sendMsgBox.value);
  sendMsgBox.value = "";
};
onBeforeUnmount(() => {
  websocket.close();
});
// 模态框实现
const { elementX, elementY } = useMouseInElement(chatbody);
let down = ref(false);

const hideChat = () => {
  if (chatbody.value && !isHide.value) {
    historyXY.value.x = chatbody.value.style.left;
    historyXY.value.y = chatbody.value.style.top;
    chatbody.value.style.top = "50%";
    chatbody.value.style.left = isMobile() ? "94%" : "98%";
    chatbody.value.style.transform = "translateY(-50%)";
    chatbody.value.style.transition = "0.5s ease all";
    isHide.value = true;
  } else if (chatbody.value && isHide.value) {
    chatbody.value.style.top = historyXY.value.y;
    chatbody.value.style.left = historyXY.value.x;
    chatbody.value.style.transform = "translateY(0)";
    chatbody.value.style.transition = "unset";
    isHide.value = false;
  }
};
const closeChat = () => {
  emit("close");
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 320px) {
  .chatroom {
    top: 20%;
    left: 12%;
    width: 75%;
    height: 50%;
    padding: 5px;
    border-radius: 10px;
    z-index: 50;
    background-color: rgb(247, 242, 242);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);

    .tran {
      display: none;
    }
  }
}

@media screen and (min-width: 768px) {
  .chatroom {
    top: 44%;
    left: 52%;
    width: 40%;
    height: 40%;

    .tran {
      display: block;
      position: absolute;
      bottom: 4px;
      right: -16px;
      border-left: solid rgb(247, 242, 242) 20px;
      border-bottom: transparent 20px solid;
      border-top: transparent 20px solid;
      border-right: none;
      border-radius: 5px;
      z-index: 100;
    }
  }
}

@media screen and (min-width: 1440px) {
  .chatroom {
    top: 36%;
    left: 67%;
    width: 25%;
    height: 40%;
  }
}
</style>