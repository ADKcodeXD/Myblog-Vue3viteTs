<template>
  <nav class="navbar">
    <!-- 导航组件 -->
    <!-- pc端的导航组件 -->
    <el-header>
      <el-row :gutter="20">
        <!-- logo -->
        <el-col :span="4">
          <Logo @openPollup="isShow = true" />
        </el-col>
        <!-- list -->
        <el-col :span="16">
          <PcMenu />
        </el-col>
        <!-- myinfo -->
        <el-col :span="4">
          <RightInfoBox :userinfo="userStore.userinfo" @logout="logout" />
        </el-col>
      </el-row>
    </el-header>
    <!-- 这是移动端的 -->
    <transition name="righttoleft">
      <Pollup
        v-show="isShow"
        :userinfo="userStore.userinfo"
        @close="closePollup"
        @logout="logout"
      />
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { useStore } from '@/store/main'
import { removeItem } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { currentUserApi } from '@/api/user'
import { useUserStore } from '@/store/user'
import router from '@/router'
import { userLogout } from '@/api/login'
defineProps({
  backColor: {
    type: String,
    default: () => 'rgb(248, 248, 248)'
  },
  fontColor: {
    type: String,
    default: () => '#fff'
  }
})

let isShow = ref(false)
const store = useStore()
const userStore = useUserStore()
const user = store.user

// 获取用户的信息
const getUserInfo = () => {
  if (user && user.token) {
    // 获取信息
    currentUserApi()
      .then((result: any) => {
        const { data } = result
        if (data.code === 10003) {
          ElMessage.error(data.msg)
          removeItem('user')
        } else {
          userStore.setUser(data.data)
        }
      })
      .catch(() => {
        ElMessage.error('请求失败')
      })
  }
}
// 关闭移动端弹出层
const closePollup = () => {
  isShow.value = false
}
// 退出登录
const logout = async () => {
  await userLogout()
  store.user.token = ''
  removeItem('user')
  userStore.setUser({
    id: '',
    username: '',
    avatar: '',
    role: '',
    introduce: '',
    banner: '',
    nickname: ''
  })
  ElMessage.success('退出登录成功！')
  isShow.value = false
  router.push('/login')
}
getUserInfo()
</script>

<style lang="less" scoped>
@import url(./styles/Index.less);
</style>
