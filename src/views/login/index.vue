<template>
  <div class="login">
    <!-- github 联系方式  -->
    <ul class="tw-absolute tw-top-2 tw-left-2 tw-flex">
      <li>
        <a href="https://github.com/ADKcodeXD" target="_blank"><i class="iconfont icon-github"></i></a>
      </li>
      <li>
        <a href="https://space.bilibili.com/2988768" target="_blank"><i class="iconfont icon-bilibili-line"></i></a>
      </li>
      <li>
        <a href="https://twitter.com/ADKinsoMaD" target="_blank"><i class="iconfont icon-tuite"></i></a>
      </li>
    </ul>

    <!-- 背景放的那张图 -->
    <div class="imgbox" ref="target" :style="{ transform: `rotateX(${-xrotate}deg) rotateY(${yrotate}deg)` }">
      <!-- 介绍 -->
      <div class="jieshao">
        <MyElimage :img="Jieshao" />
      </div>
    </div>

    <!-- 登录盒子 -->
    <transition name="rightout" mode="out-in" @before-enter="beforeEnter" @enter="rotateYenter" @leave="rotateYleave" :css="false">
      <div v-if="isLogin" :key="1" class="temp">
        <div class="login-box">
          <div class="loginform">
            <div class="tw-w-48 tw-my-5">
              <MyElimage :img="Login" />
            </div>
            <ElForm label-position="left" ref="ruleFormRef" :rules="rules" :model="form">
              <ElFormItem prop="username">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="Username" />
                </div>
                <ElInput v-model="form.username"></ElInput>
              </ElFormItem>
              <ElFormItem prop="password">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="Password" />
                </div>
                <ElInput type="password" v-model="form.password" ></ElInput>
              </ElFormItem>
            </ElForm>
            <div class="btn">
              <div class="register-btn" @click="isLogin = false">
              </div>
              <div class="login-btn" @click="submitForm(ruleFormRef)">
              </div>
            </div>
          </div>
          <!-- logo -->
          <div class="tw-w-40 md:tw-w-72 tw-absolute tw-bottom-4 tw-left-4">
            <MyElimage :img="Logo" />
          </div>
          <!-- 直接看看 -->
          <div class="goin" @click="$router.push('/index')">
          </div>
        </div>
      </div>
      <div v-else :key="2" class="temp">
        <div class="login-box">
          <div class="loginform">
            <div class="tw-w-72 md:tw-w-96 tw-my-5">
              <MyElimage :img="Register" />
            </div>
            <ElForm label-position="left" ref="registerFormRef" :rules="registerRules" :model="registerForm">
              <ElFormItem prop="username">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="Username" />
                </div>
                <ElInput v-model="registerForm.username" ></ElInput>
              </ElFormItem>
              <ElFormItem prop="nickname">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="Nickname" />
                </div>
                <ElInput v-model="registerForm.nickname"></ElInput>
              </ElFormItem>
              <ElFormItem prop="password">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="Password" />
                </div>
                <ElInput type="password" v-model="registerForm.password" ></ElInput>
              </ElFormItem>
              <ElFormItem prop="repassword">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="RePassword" />
                </div>
                <ElInput type="password" v-model="registerForm.repassword" ></ElInput>
              </ElFormItem>
            </ElForm>
            <div class="btn">
              <div class="login-btn" @click="isLogin = true">
              </div>
              <div class="register-btn" @click="submitRegister(registerFormRef)">
              </div>
            </div>
          </div>
          <div class="tw-w-40 md:tw-w-72 tw-absolute tw-bottom-4 tw-left-4">
            <MyElimage :img="Logo" />
          </div>
          <!-- 直接看看 -->
          <div class="goin" @click="$router.push('/index')">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  useLoginMethod,
  useLoginprop,
  useRegisterMethod,
  useRoles,
} from "@/hooks/login";
import Login from './imgs/login-logo.png'
import Username from './imgs/username.png'
import Password from './imgs/password.png'
import RePassword from './imgs/repassword.png'
import Nickname from './imgs/nickname.png'
import Register from './imgs/register-logo.png';
import Logo from '@/assets/img/new-logo.png';
import Jieshao from './imgs/介绍.png';
import gsap from 'gsap';
import { CustomEase } from "gsap/CustomEase";
import { useAnime } from "@/hooks/Anime";
gsap.registerPlugin(CustomEase);
const {
  registerFormRef,
  registerForm,
  ruleFormRef,
  form,
  isLogin,
  target,
  x,
  y,
  router,
  userStore,
} = useLoginprop();

const { submitForm } = useLoginMethod(userStore, router, form);
const { rules, registerRules } = useRoles(registerForm);
const { submitRegister } = useRegisterMethod(userStore, router, registerForm);
const beforeEnter = (el) => {
    gsap.set(el, {
      rotationY: 90,
    })
}
const {rotateYenter,
        rotateYleave}=useAnime();
const yrotate = computed(() => {
  let res = 0;
  let halfVal = window.innerWidth / 2;
  res = x.value - halfVal;
  return res / 50;
})
const xrotate = computed(() => {
  let res = 0;
  let halfVal = window.innerHeight / 2;
  res = y.value - halfVal;
  return res / 50;
})
</script>

<style scoped lang="less">
@import url(./styles/login-pc.less);
</style>