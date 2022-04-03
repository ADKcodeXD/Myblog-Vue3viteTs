<template>
  <div class="tw-p-4 md:tw-mt-5 tw-mt-28">
    <el-page-header
      :icon="ArrowLeft"
      :content="info?.title"
      @back="$router.push('/index/anime')"
    />
  </div>
  <div class="player">
    <div class="tw-text-xl tw-font-bold tw-p-5">正在播放:{{ info?.title }}</div>
    <!-- todo 使用iframe解决跨域问题 并且播放所有视频 -->
    <Player :videoUrl="playerUrl" />
    <div class="tw-bg-slate-50 tw-p-3 tw-mt-5">
      <div class="tw-p-3">分集列表</div>
      <div class="tw-flex tw-overflow-auto myscrollbar" ref="chapter">
        <div
          v-for="(item, index) in info?.epInfo"
          :key="index"
          class="
            tw-flex-shrink-0
            tw-w-40
            tw-h-24
            tw-flex
            tw-items-center
            tw-justify-center
            tw-bg-white
            tw-border-2
            tw-m-2
            tw-rounded-lg
            tw-cursor-pointer
          "
          :class="{ active: urlFliter(item.epUrl) === params }"
          @click="$router.push(`/index/animeplay/${urlFliter(item.epUrl)}`)"
        >
          <p>{{ item.epTitle }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="tw-my-5">
    <div class="tw-font-bold tw-text-2xl tw-p-2">看看更多新番？</div>
    <Bangumimini />
  </div>
</template>

<script lang="ts">
import "mui-player/dist/mui-player.min.css";
// 使用字节跳动的西瓜播放器
import { defineComponent } from "vue";
import { getYhdmAnimeVideoInfo } from "@/api/YhdmApi";
import { YhdmVideoInfo } from "@/interface/yhdm.type";
import { ArrowLeft } from "@element-plus/icons-vue";0
import Player from "./components/player.vue";

export default defineComponent({
    setup() {
        const route = useRoute();
        let params = ref(route.params.id);
        
        let loading = ref(true);
        let chapter = ref<HTMLElement>();
        let playerUrl=ref('');
        const getVideoInfo = async (params: string) => {
            const { data } = await getYhdmAnimeVideoInfo(params);
            return data;
        };
        let info = ref<YhdmVideoInfo>();

        onMounted(() => {
            getData();
        });

        const getData = () => {
            getVideoInfo(params.value && params.value.toString())
                .then((data) => {
                info.value = data.data;
                // 排序一下分集数据
                info.value?.epInfo.sort((a, b) => {
                    let num1 = a.epTitle.match(/\d+/g)?.toString();
                    let num2 = b.epTitle.match(/\d+/g)?.toString();
                    if (num1 && num2) {
                        let first = parseInt(num1);
                        let second = parseInt(num2);
                        return first - second;
                    }
                    else
                        return -1;
                });
                let src = data.data.videoUrl;
                let strarr = src.split("$");
                // 因为前端存在跨域问题 这里把字符串改一改 nginx 配置一下相应的请求转发
                // 摆烂了 别人网站也是跨域 我也不管了
                strarr[0]=strarr[0].replaceAll(/\\/g,'');
                console.log(strarr[0]);
                
                if (strarr[0].indexOf("https://tup.yinghuacd.com/") != -1) {
                    strarr[0] = strarr[0].replaceAll("https://tup.yinghuacd.com/", "/yhdm/");
                }
                playerUrl.value = strarr[0];
            })
                .catch((reason) => {
                console.log(reason);
                loading.value = false;
            });
        };
        watch(route, (newval) => {
            params.value = route.params.id;
            getData();
        }, { deep: true });

        const urlFliter = (url: string) => {
            let temp = url.split("/")[2];
            return temp.split(".")[0];
        };

        return {
            loading,
            info,
            ArrowLeft,
            params,
            urlFliter,
            chapter,
            playerUrl
        };
    },
    components: { Player }
});
</script>


<style lang="less" scoped>
@media screen and (min-width: 320px) {
  :deep(.el-page-header__left) {
    flex-shrink: 0;
    align-items: center;
  }

  .active {
    background-color: rgb(245, 46, 11);
    color: white;
  }
}
</style>