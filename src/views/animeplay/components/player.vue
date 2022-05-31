<template>
  <div>
    <div id="xgplayer" v-loading="loading"></div>  
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Player from "xgplayer";
import HlsJsPlayer from "xgplayer-hls.js";

export default defineComponent({
  props: {
    videoUrl: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    //接受路由传参 把视频地址获取 ，然后这个页面可以跨域
    // const route = useRoute();
    let url = ref("");
    if (props.videoUrl !== "") {
      url.value = props.videoUrl;
    }
    let mp: HlsJsPlayer | Player | null;
    let loading = ref(true);
    const getVideo = () => {
      let config = {
        id: "xgplayer",
        // rotateFullscreen: isMobile() ? true : false,
        fluid: true,
        url: url.value,
        autoplay: true,
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        defaultPlaybackRate: 1,
        useHls: true,
        lang: "zh-cn",
        closeVideoClick: true,
        videoInit: true,
        volume: 1,
      };
      // 判断是否m3u8

      let houzhui = url.value?.split(".");
      if (houzhui && houzhui[houzhui.length - 1] === "m3u8") {
        mp = new HlsJsPlayer(config);
      } else {
        mp = new Player(config);
      }
      loading.value = false;
      mp.on("requestFullscreen", function () {
        window.screen.orientation.lock("landscape-primary");
      });
      mp.on("exitFullscreen", function () {
        window.screen.orientation.unlock();
      });
    };

    watch(
      props,
      (newval) => {
        url.value = props.videoUrl;
        if (mp) {
          // 为什么重新加载 因为我不能保证视频源是否是m3u8或是其他 如果是m3u8需要新建hls播放器
          mp.destroy(false);
          mp = null;
        }
        getVideo();
      },
      { deep: true }
    );
    onMounted(() => {
      getVideo();
    });
    return {
      loading,
    };
  },
});
</script>


<style lang="less" scoped>
#xgplayer {
  background-color: rgb(0, 0, 0);
}
</style>