<template>
  <div>
    <div class="tw-flex tw-items-center tw-my-20">
      <el-image :src="NotLogin"></el-image>
      <div class="tw-ml-5">
        <h2>Opps 您似乎没有登录Bangumi</h2>
        <p class="tw-text-xl">
          你可以选择回到<span
            class="tw-text-blue-500 tw-cursor-pointer"
            @click="$router.push('/index/anime')"
            >主页</span
          >
        </p>
        <p class="tw-text-xl">
          或者点击这里去<span
            class="tw-text-blue-500 tw-cursor-pointer"
            @click="
              openUrl(
                'https://bgm.tv/oauth/authorize?client_id=bgm21996223860e72a53&response_type=code'
              )
            "
            >登录Bangumi并授权</span
          >
        </p>
        <div class="tw-my-5">
          <p>
            如果您不太了解Bangumi 这里可以查看<span
              class="tw-text-blue-500 tw-cursor-pointer"
              @click="openUrl('https://bgm.tv/')"
              >Bangumi的首页</span
            >
          </p>

          <p class="tw-block tw-my-2 tw-text-sm">
            Bangumi 是由 Sai 于桂林发起的 ACG <br />
            分享与交流项目，致力于让阿宅们在欣赏ACG作品之余 <br />
            拥有一个轻松便捷独特的交流与沟通环境。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NotLogin from '@/assets/img/404bangumi.png'

const openUrl = (url: string) => {
  window.open(url, '_blank')
}
</script>
