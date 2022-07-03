<template>
  <section class="section">
    <div class="header">
      <div class="back-btn" @click="back">
        <i class="iconfont icon-left"></i>
        Back
      </div>
      <div class="title">正在播放:{{ info?.title }}</div>
    </div>
    <p class="tip">如遇到加载不行的情况下 请刷新重试</p>
    <div class="player">
      <PlayerItem :videoUrl="playerUrl" v-if="playerUrl" />
    </div>
    <div class="eps">
      <div class="eps-title">分集列表</div>
      <div class="eps-container myscrollbar" ref="chapter">
        <div
          v-for="(item, index) in info?.epInfo"
          :key="index"
          class="ep"
          :class="{ active: urlFliter(item.epUrl) === route.params.id }"
          @click="$event => switchVideo($event, item.epUrl, index)"
        >
          <p>{{ item.epTitle }}</p>
        </div>
      </div>
    </div>
    <div class="newanime">
      <div class="newanime-title">看看更多新番？</div>
      <Bangumimini />
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: 'AnimePlay',
  beforeRouteEnter(to, from, next) {
    const mainstroe = useStore();
    if (to.query.isCache !== 'no') {
      mainstroe.sourcePage.push(from.path);
    }
    to.query = {};
    next();
  }
};
</script>
<script lang="ts" setup>
import { getYhdmAnimeVideoInfo } from '@/api/YhdmApi';
import { useBackToSource } from '@/hooks/useSourcepage';
import { useStore } from '@/store/main';
import PlayerItem from './components/PlayerItem.vue';
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const chapter = ref<HTMLElement>();
const playerUrl = ref('');
const info = ref<YhdmVideoInfo>();
const { back } = useBackToSource(router);
const getVideoInfo = async (params: string) => {
  const { data } = await getYhdmAnimeVideoInfo(params);
  return data;
};
const urlFliter = (url: string) => {
  let temp = url.split('/')[2];
  return temp.split('.')[0];
};
const getData = async () => {
  const id = route.params.id;
  await getVideoInfo(id as string)
    .then(data => {
      info.value = data.data;
      // 排序一下分集数据
      info.value?.epInfo.sort((a, b) => {
        let num1 = a.epTitle.match(/\d+/g)?.toString();
        let num2 = b.epTitle.match(/\d+/g)?.toString();
        if (num1 && num2) {
          let first = parseInt(num1);
          let second = parseInt(num2);
          return first - second;
        } else return -1;
      });
      const src = data.data.videoUrl;
      let strarr = src.split('$');
      strarr[0] = strarr[0].replaceAll(/\\/g, '');
      //解决跨域问题
      if (strarr[0].indexOf('https://tup.yinghuacd.com/') != -1) {
        strarr[0] = strarr[0].replaceAll('https://tup.yinghuacd.com/', '/yhdm/');
      }
      playerUrl.value = strarr[0];
      let index = info.value.epInfo.findIndex(item => {
        return urlFliter(item.epUrl) === route.params.id;
      });
      chapter.value.scrollTo({ left: index * 120, behavior: 'smooth' });
    })
    .catch(reason => {
      loading.value = false;
    });
};
const switchVideo = (e, epUrl, index) => {
  router.push(`/index/animeplay/${urlFliter(epUrl)}`);
};
onMounted(() => {
  getData();
});
watchEffect(() => {
  getData();
});
</script>

<style lang="less" scoped>
@import url(./styles/AnimePlay.less);
</style>
