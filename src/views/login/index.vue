<template>
  <div class="login">
    <div
      class="imgbox"
      ref="target"
      :style="{
        backgroundPosition: `${x * -0.1}px ${y * -0.1}px`,
        filter: isBlur ? 'brightness(0.6) blur(2px)' : 'brightness(0.9)',
      }"
    ></div>
    <div class="jieshao">
      <h2>基于Vue3+Vite的轻型博客</h2>
      <p>具体技术栈为：Vue3+TypeScript+Vite+pinia 后端采用Springboot构建</p>
      <el-button type="success" plain round @click="$router.push('/')"
        >直接进入</el-button
      >
    </div>
    <div
      class="login-box"
      @mouseenter="isBlur = true"
      @mouseleave="isBlur = false"
    >
      <transition-group name="switch" mode="out-in">
        <!-- 登录 -->
        <div v-if="isLogin" :key="1" class="loginform">
          <h2>登录blog</h2>
          <p class="sub-title">登录即可使用评论留言等功能</p>
          <el-form
            label-position="left"
            label-width="80px"
            ref="ruleFormRef"
            :rules="rules"
            :model="form"
          >
            <el-form-item prop="username" label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input
                type="password"
                v-model="form.password"
                prop="password"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button round @click="isLogin=false">注册</el-button>
            <el-button @click="submitForm(ruleFormRef)" type="success" round
              >登录</el-button
            >
          </div>
        </div>
        <!-- 注册 共用一套样式 -->

        <div v-else :key="2" class="loginform">
          <h2>注册一个账户</h2>
          <p class="sub-title">注册后即可使用本博客的一些功能</p>
          <el-form
            label-position="left"
            label-width="80px"
            ref="registerFormRef"
            :rules="registerRules"
            :model="registerForm"
          >
            <el-form-item prop="username" label="用户名">
              <el-input
                v-model="registerForm.username"
                prop="username"
              ></el-input>
            </el-form-item>
            <el-form-item prop="nickname" label="昵称">
              <el-input
                v-model="registerForm.nickname"
                prop="nickname"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input
                type="password"
                v-model="registerForm.password"
                prop="password"
              ></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
              <el-input
                type="password"
                v-model="registerForm.repassword"
                prop="repassword"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button round @click="isLogin=true">登录</el-button>
            <el-button
              @click="submitRegister(registerFormRef)"
              type="success"
              round
              >注册</el-button
            >
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userLogin, userRegister } from "@/api/login";
import { RegisterParams } from "@/interface/params";
import { useStore } from "@/store/main";
import { setItem } from "@/utils/storage";
import { validateNickname, validatePassword, validateUsername } from "@/utils/validate";
import { reactive, ref } from "@vue/reactivity";
import { useMouse } from "@vueuse/core";
import { ElForm, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
// 公共部分
const userStore = useStore();
const router = useRouter();
const isBlur = ref(false);
const { x, y } = useMouse();
let target = ref(null);
// 做一个登录注册表单切换的按钮
let isLogin=ref(true);
// 登录部分的逻辑
const form = reactive({
  username: "",
  password: "",
});

type FormInstance = InstanceType<typeof ElForm>;
const ruleFormRef = ref<FormInstance>();

const rules = reactive({
  username: [{ validator: validateUsername, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const loginParams = { username: form.username, password: form.password };
      const result = await userLogin(loginParams);
      console.log(result);
      if (result.data.code === 200) {
        userStore.user.token = result.data.data;
        setItem("user", userStore.user.token);
        router.push("/");
      } else {
        //   登录失败 提示msg
        ElMessage.error(result.data.msg);
      }
    } else {
      ElMessage.error("请校验表单！");
      return false;
    }
  });
};

// 注册部分的逻辑
const registerForm = reactive({
  username: "",
  nickname:"",
  password: "",
  repassword: "",
});
const registerFormRef = ref<FormInstance>();
// 确认密码表单校验
const validateRePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请确认密码'))
    } else if (value!==registerForm.password) {
      callback(new Error("确认密码必须与密码一致"))
    } else {
      callback()
    }
}
// 注册表单校验规则
const registerRules = reactive({
  username: [{ validator: validateUsername, trigger: "blur" }],
  nickname:[{ validator: validateNickname, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
  repassword: [{ validator: validateRePassword, trigger: "blur" }],
});
const submitRegister = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const registerParams:RegisterParams = {
        username: registerForm.username,
        password: registerForm.password,
        nickname:registerForm.nickname
      };
      const result=await userRegister(registerParams);
      if(result.data.code===200){
          userStore.user.token=result.data.data;
          setItem('user',userStore.user.token);
          router.push('/');
      }else{
        //   注册失败 提示msg
        ElMessage.error(result.data.msg);
      }
    } else {
      ElMessage.error("请校验表单！");
      return false;
    }
  });
};
</script>

<style scoped lang="less">
.switch-enter-from,
.switch-leave-to{
   right: -600px;
   opacity: 0;
}
.switch-enter-active,
.switch-leave-active{
  transition: all 0.8s ease-in-out;
}
.switch-enter-to,
.switch-leave-from{
  opacity: 1;
  right: 0;
}
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .imgbox {
    position: absolute;
    width: 120%;
    height: 120%;
    background: url(./imgs/82104637_p0.jpg);
    background-size: cover;
    background-position: -100px -100px;
    transition: filter 1s ease;
  }
  .login-box {
    position: absolute;
    right: 0;
    width: 20%;
    height: 100%;
    background-color: white;
    .loginform {
      position: absolute;
      width: 100%;
      top: 45%;
      transform: translateY(-50%);
      padding: 10px;
      h2 {
        margin: 0;
        font-size: 40px;
      }
      .sub-title {
        margin: 10px 0;
        color: gray;
      }
      .btn {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .el-button {
          width: 40%;
        }
      }
    }
  }
  .jieshao {
    color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    h2 {
      font-size: 50px;
      margin: 5px 0;
      text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.644);
    }
    p {
      font-size: 16px;
      margin: 10px 0;
      text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.644);
    }
  }
}
</style>