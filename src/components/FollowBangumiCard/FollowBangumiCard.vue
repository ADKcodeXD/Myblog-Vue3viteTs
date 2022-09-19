<template>
  <div class="card-body">
    <p class="card-body-title">我的追番（在看）</p>
    <el-scrollbar height="400px" class="bgm-list" v-if="currentBangumi.results">
      <div
        class="bgm-list-item"
        v-for="bgmItem in currentBangumi.results"
        :key="bgmItem.id"
        @click="$router.push(`/index/animedetail/${bgmItem.animeId}`)"
      >
        <div class="bgm-list-item--img">
          <MyElimage :img="bgmItem.animePic" />
        </div>
        <div class="bgm-list-item-info">
          <div>
            <p class="bgm-list-item-info--title" :title="bgmItem.animeNameCn">
              {{ bgmItem.animeNameCn ? bgmItem.animeNameCn : bgmItem.animeName }}
              <span class="bgm-list-item-info--title__tag" v-if="day === bgmItem.airDay"
                >今日更新</span
              >
            </p>
            <div class="bgm-list-item-info--lastview">
              <p>您上次看到{{ bgmItem.progress }}集</p>
              <p
                class="bgm-list-item-info--lastview__link"
                v-if="bgmItem.lastViewEpUrl"
                @click.stop="$router.push(bgmItem.lastViewEpUrl)"
              >
                继续观看
              </p>
            </div>
          </div>

          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :color="customColors"
            :percentage="
              (bgmItem.progress / bgmItem.totalEps) * 100 > 100
                ? 100
                : (bgmItem.progress / bgmItem.totalEps) * 100
            "
          >
            <span>进度({{ bgmItem.progress }}/{{ bgmItem.totalEps }})</span>
          </el-progress>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { useGetMyFollow } from '@/hooks/useFollowBangumi';
const customColors = [
  { color: '#0069EB', percentage: 25 },
  { color: '#FD1170', percentage: 50 },
  { color: '#739C70', percentage: 75 },
  { color: '#00CB7C', percentage: 100 }
];
const pageparams: PageParams = {
  page: 1,
  pagesize: 10
};
const currentBangumi = ref<ListInfoResult<FollowBangumiVo>>({
  length: 0,
  results: [],
  pages: null
});
const day = new Date().getDay();
const getMyFollow = async () => {
  const todayBangumi = await useGetMyFollow(1, pageparams);
  todayBangumi.results.sort(item1 => {
    if (item1.airDay === day) return -1;
    return 0;
  });
  currentBangumi.value = todayBangumi;
};
onMounted(async () => {
  await getMyFollow();
});
</script>
<style lang="less" scoped>
.card-body {
  position: absolute;
  .border-normal();
  .font-normal();
  top: 8rem;
  right: 1.8rem;
  z-index: 10;
  background-color: @bgColor;
  padding: @padding-general;
  &-title {
    font-size: @big-text;
    margin-bottom: @margin-general;
  }
  .bgm-list {
    &-item {
      width: 20rem;
      height: 10rem;
      display: flex;
      .border-normal();
      .cusor-pointer();
      overflow: hidden;
      margin: @margin-general 0;
      &--img {
        width: 8rem;
        height: 100%;
      }
      &-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 5px;
        justify-content: space-between;
        &--title {
          font-size: @mid-text;
          .text-line-show(2);
          &__tag {
            display: inline-block;
            font-size: 0.6rem;
            padding: 0 5px;
            border-radius: 8px;
            line-height: 1.6rem;
            color: #fff;
            background-color: rgb(11, 88, 230);
          }
        }
        &--lastview {
          font-size: @small-text;
          &__link {
            color: @linkColor;
          }
        }
      }
      &:hover {
        background-color: @themeColor;
        color: #fff;
        transition: 0.2s all ease;
      }
    }
  }
}
:deep(.el-progress-bar__outer) {
  background-color: #a1a1a1;
}
</style>
