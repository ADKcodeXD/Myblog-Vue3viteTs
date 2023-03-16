<template>
  <div>
    <div id="dplayer"></div>
  </div>
</template>
<script lang="ts" setup>
import Hls from 'hls.js'
import DPlayer from 'dplayer'
import { useGlobalConfigStore } from '@/store/globalConfig'
import { isMobile } from '@/utils/mobile'
const config = useGlobalConfigStore()
defineExpose(['getVideoTime'])
let dp = ref()
const props = defineProps({
  videoUrl: {
    type: String,
    default: ''
  }
})
const isM3u8 = computed(() => {
  let arr = props.videoUrl.split('.')
  if (arr[arr.length - 1] === 'm3u8') return true
  else return false
})
const getVideoTime = () => {
  return dp.value.video.currentTime
}
onMounted(() => {
  dp.value = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
      url: props.videoUrl,
      type: isM3u8 ? 'customHls' : 'auto',
      customType: {
        customHls: function (video) {
          const hls = new Hls()
          hls.loadSource(video.src)
          hls.attachMedia(video)
        }
      }
    },
    lang: 'zh-cn',
    autoplay: true,
    mutex: true,
    airplay: true,
    playbackSpeed: [0.75, 1, 1.5],
    theme: config.config.themeColor
  })
  dp.value.on('fullscreen', () => {
    if (isMobile()) {
      window.screen.orientation.lock('landscape-primary')
    }
  })
  dp.value.on('fullscreen_cancel', () => {
    if (isMobile()) {
      window.screen.orientation.unlock()
    }
  })
  dp.value.on('error', e => {
    // console.log(e);
    // dp.value.pause();
    // dp.value.notice('视频加载失败', 2000);
  })
  dp.value.container.addEventListener('mousemove', () => {
    dp.value.controller.setAutoHide()
  })
  dp.value.container.addEventListener('click', () => {
    dp.value.controller.setAutoHide()
  })
})
onBeforeUnmount(() => {
  dp.value.destroy()
  dp.value = null
})
watch(props, props => {
  if (dp.value) {
    dp.value.switchVideo({
      url: props.videoUrl,
      type: isM3u8 ? 'customHls' : 'auto',
      customType: {
        customHls: function (video) {
          const hls = new Hls()
          hls.loadSource(video.src)
          hls.attachMedia(video)
        }
      }
    })
  }
})
</script>

<style lang="less" scoped>
@media screen and (min-width: @mobile-device) {
  #dplayer {
    overflow: hidden;
    border-radius: 2rem;
    .shadow();
  }
}

@media screen and (min-width: @smallpc-device) {
  #dplayer {
    height: 54rem;
  }
}
</style>
