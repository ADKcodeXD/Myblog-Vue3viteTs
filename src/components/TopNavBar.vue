<template>
  <div class="navbar">
    <!-- 导航组件 -->
    <el-header :style="{ backgroundColor: backColor }">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="icon">
            <router-link to="/welcome">
              <img src="@/assets/img/Web Blog .png"
            /></router-link>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="menu">
            <ul class="menu-list" :style="{ color: fontColor }">
              <li><a @click="$router.push('/')">首页</a></li>
              <li><a @click="$router.push('/articlelist')">文章</a></li>
              <li><a @click="$router.push('/messageboard')">留言板</a></li>
              <li><a @click="$router.push('/project')">作品</a></li>
              <li @click="$router.push('/edit')">
                <el-button :icon="Edit" circle></el-button><a>我也要写</a>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="right">
            <p v-if="userStore.userinfo.id">{{ userStore.userinfo.nickname }} 你好</p>
            <p v-else>
              访客你好 去<RouterLink
                to="/login"
                style="color: rgb(255, 226, 226)"
                >登录</RouterLink
              >
            </p>
            <div
              class="container"
              @mouseenter="infoShow = true"
              @mouseleave="infoShow = false"
            >
              <div class="avatar">
                <img v-if="userStore.userinfo.id" :src="userStore.userinfo.avatar" alt="" />
                <img v-else src="@/assets/img/logo.png" alt="" />
              </div>
              <transition name="infobox" mode="out-in">
                <div
                  v-show="infoShow"
                  class="info-box"
                  
                >
                  <div class="imgcontainer" :style="{ backgroundImage: `url(${userStore.userinfo.banner})` }"></div>
                  <div class="loginbox" v-if="userStore.userinfo.id">
                    <div class="up">
                      <div class="avatar">
                        <img :src="userStore.userinfo.avatar" alt="" />
                      </div>
                      <div class="info">
                        <h2>{{ userStore.userinfo.nickname }}</h2>
                        <div>{{ userStore.userinfo.introduce }}</div>
                      </div>
                    </div>
                    <div class="button">
                      <el-button
                        type="primary"
                        @click="$router.push('/home')"
                        round
                        >编辑资料</el-button
                      >
                      <el-button type="danger" @click="logout" round
                        >退出登录</el-button
                      >
                    </div>
                  </div>
                  <div class="nologin" v-else>您还未登录哦 请先登录</div>
                </div>
              </transition>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/main";
import { removeItem } from "@/utils/storage";
import { Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { currentUserApi } from "@/api/user";
import { useUserStore } from "@/store/user";
import { isValidKey } from "@/utils/tools";
const props = defineProps({
  backColor: {
    type: String,
    default: () => "#ff9f9f",
  },
  fontColor: {
    type: String,
    default: () => "#fff",
  },
});
let infoShow = ref(false);
const store = useStore();
const userStore = useUserStore();
const user = store.user;
const getUserInfo = () => {
  if (user && user.token) {
    // 获取信息
    currentUserApi()
      .then((result: any) => {
        const { data } = result;
        if (data.code === 10003) {
          ElMessage.error(data.msg);
          removeItem("user");
        } else {
          userStore.setUser(data.data);
        }
      })
      .catch((error: any) => {
        ElMessage.error("请求失败");
      });
  } else {
    console.log("notoken");
  }
};
getUserInfo();



const logout = (): void => {
  store.user.token = "";
  removeItem("user");
  userStore.setUser({
    id: "",
    username: "",
    avatar: "",
    role: "",
    introduce: "",
    banner: "",
    nickname: "",
  });
  for (let key in userinfo) {
    if (isValidKey(key, userinfo)) {
      userinfo[key] = userStore.userinfo[key];
    }
  }
  ElMessage.success("退出登录成功！");
  infoShow.value = false;
};
</script>

<style lang="less" scoped>
.infobox-enter-from,
.infobox-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}
.infobox-enter-to,
.infobox-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.infobox-enter-active,
.infobox-leave-active {
  transition: all 0.4s ease;
}

.el-header {
  padding: 0;
  height: 93px;

  .el-row {
    height: 100%;
    padding: 10px;
    align-items: center;
    .icon {
      img {
        width: 70%;
        height: auto;
      }
    }
    .menu {
      display: flex;
      justify-content: center;
      font-size: 28px;
      .menu-list {
        display: flex;
        color: white;
        li {
          margin-right: 20px;
          cursor: pointer;

          .el-button {
            background-color: rgb(102, 167, 253);
            margin-right: 10px;
            border: none;
          }
          &:hover {
            color: rgb(140, 228, 255);
          }
        }
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      color: white;
      font-size: 20px;
      align-items: center;
      position: relative;
      .container {
        .info-box {
          position: absolute;
          width: 329px;
          top: 70px;
          left: 16px;
          display: flex;
          z-index: 999;
          background-color: rgb(253, 253, 253);
          box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.3);
          background-size: 100% auto;
          .imgcontainer{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -5;
            opacity: 0.8;
            filter: blur(1px) brightness(0.6);
            background-size: cover;
            
          }
          .loginbox {
            width: 100%;
            display: flex;
            color: rgb(250, 250, 250);
            padding: 10px 0;
            font-size: 14px;
            flex-direction: column;
            justify-content: space-between;
            .up {
              display: flex;
              justify-content: space-around;
              align-items: center;
              h2 {
                margin: 10px 0;
                font-size: 20px;
              }
            }
            .button {
              display: flex;
              justify-content: space-between;
              width: 100%;
              margin-top: 20px;
              padding: 0 30px;
            }
          }
          .nologin {
            width: 100%;
            align-self: center;
            text-align: center;
            justify-self: center;
            color: gray;
          }
        }
        .avatar {
          width: 73px;
          height: 73px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #fff;
          z-index: 2;
          transition: all ease 1s;
          &:hover {
          }

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>