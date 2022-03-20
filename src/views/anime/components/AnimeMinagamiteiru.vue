<template>
  <div
    class="
      container
      tw-flex
      tw-flex-col
      tw-drop-shadow-md
      tw-bg-white
      tw-border-2
      tw-p-3
      tw-rounded-md
    "
  >
    <div class="title">
      <p class="tw-font-bold tw-text-xl">大家都在看</p>
      <small>{{ today }} 为您推荐{{ season }}月番</small>
    </div>
    <el-divider></el-divider>
    <div v-if="todayList" v-for="(item, index) in todayList" :key="index">
      <div class="card-little tw-flex tw-mb-2">
        <div class="img tw-w-2/5 tw-flex-shrink-0 tw-h-40 md:tw-h-24">
          <MyElimage :img="item.images.medium" />
        </div>
        <div class="info tw-ml-2 tw-flex tw-flex-col tw-justify-between">
          <p class="tw-font-extrabold tw-text-amber-900">
            {{ item.name_cn ? item.name_cn : item.name }}
          </p>
          <p class="tw-text-sm tw-text-gray-400">
            综合评分{{ item.rating.score }}
          </p>
          <p class="">{{ item.collection.doing }}人在看</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAnimeCalendar } from "@/hooks/Bangumi";
import { AnimeItemInfo, CalendarItem } from "@/interface/bangumiApi.type";
import { getFormatTime } from "@/utils/dayjs";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    let todayList = ref<Array<AnimeItemInfo>>([]);
    let today = getFormatTime(new Date().toString(), "YYYY年MM月DD日");
    let month = new Date().getMonth();
    let season = 0;
    if (month >= 0 && month < 3) {
      season = 1;
    } else if (month >= 3 && month < 6) {
      season = 4;
    } else if (month >= 6 && month < 9) {
      season = 7;
    } else {
      season = 10;
    }

    useAnimeCalendar().then((list: CalendarItem[]) => {
      if (list) {
        let res: Array<AnimeItemInfo> = [];
        list.forEach((item) => {
          res = res.concat([...item.items]);
        });

        res.sort((a, b) => {
          if (a.collection && b.collection) {
            if (a.collection.doing && b.collection.doing) {
              return b.collection.doing - a.collection.doing;
            }
          }
          if (a.collection) {
            return -1;
          } else if (b.collection) {
            return 1;
          } else {
            return 0;
          }
        });
        console.log(res);

        for (let i = 0; todayList.value.length<10; i++) {
          let year = new Date().getFullYear();
          // 看一下开播日期 如果不是今年（-1年）的直接扔掉
          if (Math.abs(parseInt(res[i].air_date.split("-")[0]) - year) > 1) {
            continue;
          }
          todayList.value.push(res[i]);
        }
      }
    });
    return {
      todayList,
      today,
      season,
    };
  },
});
</script>


<style>
</style>