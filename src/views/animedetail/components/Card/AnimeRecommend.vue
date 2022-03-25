<template>
  <div
    class="
      tw-bg-slate-500 tw-mt-3
      md:tw-ml-4
      tw-text-white tw-p-3
      md:tw-rounded-md
      tw-drop-shadow-lg
    "
  >
    <div
      class="tw-font-bold tw-text-3xl md:tw-text-xl tw-flex tw-justify-between"
    >
      <p>为您推荐同类作品</p>

      <p class="tw-cursor-pointer" @click="getRecommend">
        <i class="iconfont icon-xuanzhuan-1"></i>换一批？
      </p>
    </div>
    <el-skeleton
      :loading="Loading"
      animated
      style="--el-skeleton-circle-size: 10rem"
    >
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
          <div
            class="
              tw-flex tw-h-48 tw-p-3 tw-mt-3 tw-cursor-pointer
              hover:tw-bg-orange-500
            "
          >
            <div class="tw-w-2/5 tw-h-full tw-flex-shrink-0">
              <MyElimage :img="item.imageUrl" />
            </div>
            <div
              class="
                tw-ml-4 tw-font-bold tw-flex tw-flex-col tw-justify-between
              "
            >
              <div>
                <p class="tw-text-2xl md:tw-text-xl tw-break-all">
                  {{ item.nameCn ? item.nameCn : item.name }}
                </p>
                <p class="tw-text-xl md:tw-text-lg">评分:{{ item.score }}</p>
              </div>
              <p class="tw-text-xl md:tw-text-sm">{{ item.count }}条评分</p>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
import { useBroswer } from "@/hooks/Bangumi";
import {
  AnimeTag,
  BroswerParams,
  BroswerResult,
} from "@/interface/bangumiApi.type";
import { SortRole } from "@/interface/BangumiEnum";
import { emit } from "process";
import { defineComponent, PropType, Ref } from "vue";

export default defineComponent({
  props: {
    tags: {
      type: Object as PropType<Array<AnimeTag>>,
      require: true,
    },
  },
  setup(props,{emit}) {
    const getTagInt = (length: number) => {
      if (length > 8) {
        return Math.random() * 8;
      } else {
        return Math.random() * length;
      }
    };
    // 随机在count数最高的tag 8个里面取出一个取请求 也要考虑 如果tag数量少于8
    let animeInfoList = ref<Array<BroswerResult>>([]);
    let page = ref(0);
    let Loading = ref(false);
    let mainParams = reactive<BroswerParams>({
      page: 1,
      sort: SortRole.rank,
    });
    const { getBroswer } = useBroswer(Loading, animeInfoList, page);
    // get tag 新
    const getRecommend = () => {
      if(Loading.value){
        return;
      }
      if (props.tags) {
        let index = Math.floor(getTagInt(props.tags.length));
        mainParams.tag = props.tags[index].name;
        if (index % 3 == 0) {
          mainParams.sort = SortRole.rank;
        } else if (index % 3 == 1) {
          mainParams.sort = SortRole.title;
        } else {
          mainParams.sort = SortRole.date;
        }
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
    const changeId=(val:number)=>{
      emit('changeId',val)
    }
    return {
      animeInfoList,
      Loading,
      topTen,
      getRecommend,
      changeId
    };
  },
});
</script>


