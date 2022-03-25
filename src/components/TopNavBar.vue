<template>
  <div class="navbar">
    <!-- 导航组件 -->
    <el-header :style="{ backgroundColor: backColor }">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="icon">
            <router-link to="/welcome">
              <img src="@/assets/img/WebBlog.png"
            /></router-link>
            <i
              @click="isShow = !isShow"
              class="iconfont icon-classification"
            ></i>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="menu">
            <ul class="menu-list" :style="{ color: fontColor }">
              <li><a @click="$router.push('/index')">首页</a></li>
              <li><a @click="$router.push('/index/articlelist')">文章</a></li>
              <li><a @click="$router.push('/index/messageboard')">留言板</a></li>
              <li><a @click="$router.push('/index/anime')">动漫</a></li>
              <li @click="$router.push('/index/edit')">
                <a>我也要写</a>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="right">
            <p v-if="userStore.userinfo.id">
              {{ userStore.userinfo.nickname }} 你好
            </p>
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
                <img
                  v-if="userStore.userinfo.id"
                  :src="userStore.userinfo.avatar"
                  alt=""
                />
                <img v-else src="@/assets/img/logo.png" alt="" />
              </div>
              <transition name="toptodown" mode="out-in">
                <div v-show="infoShow" class="info-box">
                  <div
                    class="imgcontainer"
                    :style="{
                      backgroundImage: `url(${userStore.userinfo.banner})`,
                    }"
                  ></div>
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
                        @click="$router.push('/index/home')"
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
    <transition name="righttoleft">
      <div class="pollup" v-show="isShow" ref="pollup">
        <div class="right">
          <i class="iconfont icon-delete out" @click="isShow = false"></i>
          <div class="container">
            <div class="info-box">
              <div
                class="imgcontainer"
                :style="{
                  backgroundImage: `url(${userStore.userinfo.banner})`,
                }"
              ></div>
              <div class="loginbox">
                <div class="up">
                  <div class="avatar">
                    <img
                      v-if="userStore.userinfo.id"
                      :src="userStore.userinfo.avatar"
                      alt=""
                    />
                    <img v-else src="@/assets/img/logo.png" alt="" />
                  </div>
                  <div class="info">
                    <h2 v-if="userStore.userinfo.nickname">
                      {{ userStore.userinfo.nickname }}
                    </h2>
                    <h2 v-else class="tw-text-slate-800">欢迎您 尊敬的访客</h2>
                    <div v-if="userStore.userinfo.introduce">
                      {{ userStore.userinfo.introduce }}
                    </div>
                    <div v-else class="tw-text-slate-800">登录后可以使用更多功能哦</div>
                  </div>
                </div>
                <!-- <div class="button">
                <el-button type="primary" @click="$router.push('/home')" round
                  >编辑资料</el-button
                >
                <el-button type="danger" @click="logout" round
                  >退出登录</el-button
                >
              </div> -->
              </div>
            </div>
          </div>
          <ul class="menu-list">
            <li @click="$router.push('/index');isShow=false"><a >首页</a></li>
            <li @click="$router.push('/index/articlelist');isShow=false"><a>文章</a></li>
            <li @click="$router.push('/index/messageboard');isShow=false"><a >留言板</a></li>
            <li @click="$router.push('/index/anime');isShow=false"><a >动漫</a></li>
            <li @click="$router.push('/index/edit');isShow=false">
              <el-button :icon="Edit"  circle style="margin-right:10px;"></el-button><a>我也要写</a>
            </li>
          </ul>
          <div class="button-login" v-if="userStore.userinfo.id">
            <el-button type="primary" plain @click="$router.push('/index/home');isShow=false" round
              >编辑资料</el-button
            >
            <el-button type="danger" plain @click="logout" round>退出登录</el-button>
          </div>
          <div class="button-login" v-else>
            <el-button type="success" plain @click="$router.push('/login');isShow=false" round
              >去登录</el-button
            >
          </div>
        </div>
      </div>
    </transition>
    <transition>
      <div class="mask" v-if="isShow"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/main";
import { removeItem } from "@/utils/storage";
import { Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { currentUserApi } from "@/api/user";
import { useUserStore } from "@/store/user";
import {onClickOutside} from '@vueuse/core'
import router from "@/router";
let isShow = ref(false);
let pollup=ref<HTMLElement|null>(null);
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
onClickOutside(pollup, (event) => isShow.value=false)

getUserInfo();

// 退出登录
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
  ElMessage.success("退出登录成功！");
  infoShow.value = false;
  isShow.value=false;
  router.push('/login')
};
</script>

<style lang="less" scoped>
@import url("./styles/pc/TopNavBar-pc.less");
</style>