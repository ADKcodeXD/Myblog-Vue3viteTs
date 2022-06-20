<template>
  <div>
    <div id="dplayer"></div>
  </div>
</template>
<script lang="ts" setup>
import Hls from 'hls.js'
import DPlayer from 'dplayer';
import { useGlobalConfigStore } from "@/store/globalConfig";
import { isMobile } from "@/utils/mobile";
const config = useGlobalConfigStore();
let dp = ref();
const props = defineProps({
  videoUrl: {
    type: String,
    default: "",
  },
});
const isM3u8 = computed(() => {
  let arr = props.videoUrl.split(".");
  if (arr[arr.length - 1] === 'm3u8') return true;
  else return false;
});
onMounted(() => {
  dp.value = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
      url: props.videoUrl,
      type: isM3u8 ? 'customHls' : 'auto',
      customType: {
        customHls: function (video, player) {
          const hls = new Hls();
          hls.loadSource(video.src);
          hls.attachMedia(video);
        },
      },
    },
    lang: 'zh-cn',
    autoplay: true,
    mutex: true,
    playbackSpeed: [0.75, 1, 1.5],
    theme: config.config.themeColor
  });
  dp.value.on('fullscreen', () => {
    if (isMobile()) {
      window.screen.orientation.lock("landscape-primary")
    }
  })
  dp.value.on('fullscreen-cancel', () => {
    if (isMobile()) {
      window.screen.orientation.unlock();
    }
  })
});
onBeforeUnmount(() => {
  dp.value = null;
})
watch(props, (props) => {
  if (dp.value) {
    dp.value.switchVideo({
      url: props.videoUrl,
      type: isM3u8 ? 'customHls' : 'auto',
      customType: {
        customHls: function (video, player) {
          const hls = new Hls();
          hls.loadSource(video.src);
          hls.attachMedia(video);
        },
      },
    })
  }
})
</script>


<style lang="less" scoped>
@media screen and (min-width: @mobile-device) {
  #dplayer {
    overflow: hidden;
    border-radius: 2rem;
    height: 30rem;
    .shadow();
  }
}

@media screen and (min-width: @smallpc-device) {
  #dplayer {
    height: 54rem;
  }
}
</style>