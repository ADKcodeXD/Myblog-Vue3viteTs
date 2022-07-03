<template>
  <div class="mina">
    <div class="mina-top">
      <p class="mina-top--big">大伙都在看</p>
      <small class="mina-top--small">{{ today }} 为您推荐{{ season }}月番</small>
    </div>
    <ElDivider />
    <div v-if="todayList">
      <div v-for="(item, index) in todayList" :key="index">
        <SmallAnimeItem :item="item" />
      </div>
    </div>
    <AdkEmpty v-else />
  </div>
</template>

<script lang="ts" setup>
import { useAnimeCalendar } from '@/hooks/Bangumi';
import { getFormatTime } from '@/utils/dayjs';

const todayList = ref<Array<Bangumi.AnimeItemInfo>>([]);
const today = getFormatTime(new Date().toString(), 'YYYY年MM月DD日');
const month = new Date().getMonth();
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

useAnimeCalendar().then((list: Bangumi.CalendarItem[]) => {
  if (list) {
    let res: Array<Bangumi.AnimeItemInfo> = [];
    list.forEach(item => {
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

    for (let i = 0; todayList.value.length < 10; i++) {
      let year = new Date().getFullYear();
      // 看一下开播日期 如果不是今年（-1年）的直接扔掉
      if (Math.abs(parseInt(res[i].air_date.split('-')[0]) - year) > 1) {
        continue;
      }
      todayList.value.push(res[i]);
    }
  }
});
</script>
<style lang="less" scoped>
@import url(../styles/AnimeMina.less);
</style>
