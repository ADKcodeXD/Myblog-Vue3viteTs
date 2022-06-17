<template>
  <div class="
      recommend
    ">
    <div class="tw-font-bold tw-text-3xl md:tw-text-xl tw-flex tw-justify-between">
      <p>为您推荐同类作品</p>

      <p class="tw-cursor-pointer" @click="getRecommend">
        <i class="iconfont icon-xuanzhuan-1"></i>换一批？
      </p>
    </div>
    <el-skeleton :loading="Loading" animated style="--el-skeleton-circle-size: 10rem">
      <template #template>
        <div class="tw-flex tw-w-full tw-h-48 tw-p-3 tw-mt-3">
          <div class="tw-w-2/5 tw-h-full tw-flex-shrink-0 tw-mr-4">
            <el-skeleton-item variant="image" style="width:100%;height:100%" class="tw-flex-1" />
          </div>
          <div class="tw-flex tw-flex-1 tw-flex-col tw-justify-between">
            <div>
              <el-skeleton-item variant="h1" class="tw-w-3/5" />
              <el-skeleton-item variant="h3" class="tw-w-4/5" />
            </div>
            <el-skeleton-item variant="text" />
          </div>
        </div>
      </template>
      <template #default>
        <div v-for="item in topTen" :key="item.id" @click="changeId(item.id)">
          <SmallAnimeItem :broswerItem="item" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { useBroswer } from "@/hooks/Bangumi";
import { PropType } from "vue";
import {SortRole} from '@/interface/EnumExport';
const props = defineProps({
  tags: {
    type: Object as PropType<Array<Bangumi.AnimeTag>>,
    require: true,
  },
});
const emit = defineEmits(['changeId'])

// 随机在count数最高的tag 6个里面取出一个取请求 也要考虑 如果tag数量少于6
const animeInfoList = ref<Array<Bangumi.BroswerResult>>([]);
const page = ref(0);
const Loading = ref(false);
const mainParams = reactive<Bangumi.BroswerParams>({
  page: 1,
  sort: SortRole.rank,
});
const getTagInt = (length: number) => {
  if (length > 6) {
    return Math.random() * 6;
  } else {
    return Math.random() * length;
  }
};
const { getBroswer } = useBroswer(Loading, animeInfoList, page);
// get tag 新
const getRecommend = () => {
  if (Loading.value) {
    return;
  }
  if (props.tags) {
    let index = Math.floor(getTagInt(props.tags.length));
    mainParams.tag = props.tags[index].name;
    mainParams.sort=SortRole.rank;
  }
  getBroswer(mainParams);
};
getRecommend();
const topTen = computed(() => {
  let arr = [];
  if (animeInfoList.value.length > 10) {
    for (let i = 0; i < 10; i++) {
      arr[i] = animeInfoList.value[i];
    }
  } else {
    arr = animeInfoList.value;
  }
  return arr;
});
const changeId = (val: number) => {
  emit('changeId', val)
}
</script>


<style lang="less" scoped>
@import url(./styles/AnimeRecommend.less);
</style>