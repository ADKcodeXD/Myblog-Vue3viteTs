<template>
  <iframe id="dplayerContainer" :src="`/player.html?videoUrl=${tempUrl}`" ref="dp"></iframe>
</template>
<script lang="ts" setup>
import { transformM3u8Utils } from '@/utils/m3u8Change'

defineExpose(['getVideoTime'])
let dp = ref<HTMLIFrameElement>()
const props = withDefaults(
  defineProps<{
    videoUrl?: string
  }>(),
  {
    videoUrl: ''
  }
)
const tempUrl = ref<string>(props.videoUrl)
const transformM3u8 = async (videoUrl: string) => {
  if (videoUrl) {
    const arr = videoUrl.split('.')
    if (arr[arr.length - 1] === 'm3u8') {
      // 做处理 请求地址 获取文件 改写m3u8文件 将其赋值给videoUrl
      const newUrl = await transformM3u8Utils(videoUrl)
      tempUrl.value = newUrl
    } else {
      tempUrl.value = videoUrl
    }
  }
}
onMounted(async () => {
  await transformM3u8(props.videoUrl)
  if (dp.value) {
    dp.value.contentWindow.postMessage({ videoUrl: props.videoUrl }, '*')
  }
})
watch(props, async props => {
  await transformM3u8(props.videoUrl)
  if (dp.value) {
    dp.value.contentWindow.postMessage({ videoUrl: props.videoUrl }, '*')
  }
})
</script>

<style lang="less" scoped>
@media screen and (min-width: @mobile-device) {
  #dplayerContainer {
    overflow: hidden;
    border-radius: 2rem;
    .shadow();
  }
}

@media screen and (min-width: @smallpc-device) {
  #dplayerContainer {
    height: 54rem;
    width: 100%;
  }
}
</style>
