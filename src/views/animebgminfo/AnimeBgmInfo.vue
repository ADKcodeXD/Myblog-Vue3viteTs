<template>
  <div>
    <BgmHeader />
    <div>
      <div class="isLogin" v-if="isLogin">
        <MyBangumiInfo />
        <MySeeing />
        <MyCollectionAll />
      </div>
      <div class="tw-flex tw-justify-center" v-else>
        <NoLogin />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBangumiToken } from '@/api/bangumi'
import { useBangumiUser } from '@/store/bangumiUser'
import BgmHeader from './components/Other/BgmHeader.vue'
import NoLogin from './components/Other/NoLogin.vue'
import MyBangumiInfo from './components/Card/MyBangumiInfo.vue'
import MySeeing from './components/Card/MySeeing.vue'
import MyCollectionAll from './components/Card/MyCollectionAll.vue'
const getBgmToken = async (code: string) => {
  if (bgmTokenStore.access_token == '') {
    const { data } = await getBangumiToken(code)
    bgmTokenStore.setBangumiToken(data.access_token, data.refresh_token)
    isLogin.value = true
  }
}
const bgmTokenStore = useBangumiUser()

let isLogin = ref(false)
if (bgmTokenStore.access_token !== '') {
  isLogin.value = true
} else {
  //如果本地没有token 则查看链接是否有跳转token
  const route = useRoute()
  if (route.query) {
    // 获取token
    let code: string = Array.isArray(route.query.code) ? route.query.code[0] : route.query.code
    getBgmToken(code)
  }
  isLogin.value = false
}
</script>

<style lang="less" scoped></style>
