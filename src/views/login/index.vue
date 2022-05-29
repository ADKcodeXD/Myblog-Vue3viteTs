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
    <transition name="rightout" mode="out-in" @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
      <div v-if="isLogin" :key="1" class="temp">
        <div class="login-box">
          <div class="loginform">
            <div class="tw-w-48 tw-my-5">
              <MyElimage :img="Login" />
            </div>
            <el-form label-position="left" ref="ruleFormRef" :rules="rules" :model="form">
              <el-form-item prop="username">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="Username" />
                </div>
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="Password" />
                </div>
                <el-input type="password" v-model="form.password" prop="password"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn">
              <div class="register-btn" @click="isLogin = false">
              </div>
              <div class="login-btn" @click="submitForm(ruleFormRef)">
              </div>
            </div>
          </div>
          <!-- logo -->
          <div class="tw-w-72 tw-absolute tw-bottom-4 tw-left-4">
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
            <div class="tw-w-96 tw-my-5">
              <MyElimage :img="Register" />
            </div>
            <el-form label-position="left" ref="registerFormRef" :rules="registerRules" :model="registerForm">
              <el-form-item prop="username">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="Username" />
                </div>
                <el-input v-model="registerForm.username" prop="username"></el-input>
              </el-form-item>
              <el-form-item prop="nickname">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="Nickname" />
                </div>
                <el-input v-model="registerForm.nickname" prop="nickname"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="Password" />
                </div>
                <el-input type="password" v-model="registerForm.password" prop="password"></el-input>
              </el-form-item>
              <el-form-item prop="repassword">
                <div class="tw-w-32 tw-h-10 tw-mr-5">
                  <MyElimage :img="RePassword" />
                </div>
                <el-input type="password" v-model="registerForm.repassword" prop="repassword"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn">
              <div class="login-btn" @click="isLogin = true">
              </div>
              <div class="register-btn" @click="submitRegister(registerFormRef)">
              </div>
            </div>
          </div>
          <div class="tw-w-72 tw-absolute tw-bottom-4 tw-left-4">
            <MyElimage :img="Logo" />
          </div>
          <!-- 直接看看 -->
          <div class="goin" @click="$router.push('/index')">
          </div>
        </div>
      </div>
    </transition>

    <!-- 这是移动端的 -->
    <transition name="onlyopacity">
      <div class="login-box-mobile" v-if="isMobileLoginShow">
        <!-- 登录 -->
        <transition-group name="list" mode="in-out">
          <div v-if="isLogin" :key="1" class="loginform list-item">
            <h2>登录blog</h2>
            <p class="sub-title">登录即可使用评论留言等功能</p>
            <el-form label-position="left" label-width="80px" ref="ruleFormRef" :rules="rules" :model="form">
              <el-form-item prop="username" label="用户名">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="form.password" prop="password"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn">
              <el-button round @click="isLogin = false">注册</el-button>
              <el-button @click="submitForm(ruleFormRef)" round>登录</el-button>
            </div>
          </div>
          <!-- 注册 共用一套样式 -->
          <div v-else :key="2" class="loginform list-item">
            <h2>注册一个账户</h2>
            <p class="sub-title">注册后即可使用本博客的一些功能</p>
            <el-form label-position="left" label-width="80px" ref="registerFormRef" :rules="registerRules"
              :model="registerForm">
              <el-form-item prop="username" label="用户名">
                <el-input v-model="registerForm.username" prop="username"></el-input>
              </el-form-item>
              <el-form-item prop="nickname" label="昵称">
                <el-input v-model="registerForm.nickname" prop="nickname"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="registerForm.password" prop="password"></el-input>
              </el-form-item>
              <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" v-model="registerForm.repassword" prop="repassword"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn">
              <el-button round @click="isLogin = true">登录</el-button>
              <el-button @click="submitRegister(registerFormRef)" round>注册</el-button>
            </div>
          </div>
        </transition-group>
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
gsap.registerPlugin(CustomEase);
const {
  registerFormRef,
  registerForm,
  ruleFormRef,
  form,
  isLogin,
  isMobileLoginShow,
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
const enter = (el, done) => {
  gsap.to(el, {
    duration: 1,
    rotationY: 0,
    ease: 'elastic.out(1, 0.5)',
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.6,
    rotationY: -90,
    ease: CustomEase.create("custom", "M0,0 C0.5,0 0.607,-0.062 0.78,0.054 0.904,0.137 0.972,0.088 1,1 "),
    onComplete: done
  })
}
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