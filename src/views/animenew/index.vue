<template>
  <div class="tw-p-2">
    <div class="tw-p-4 md:tw-my-5 tw-mt-28 tw-mb-5">
      <el-page-header content="返回动漫页" @back="$router.push('/index/anime')" />
    </div>
    <div class="tw-flex tw-items-center">
      <SvgIcon name="bofang" class="tw-w-10 tw-h-10" />
      <h1>新番速递</h1>
    </div>
    <p>{{ today }} 为你推荐{{ season }}月番剧</p>
    <div v-for="(weekDay, index) in weekDayList" :key="index" class="tw-my-5">
      <h1 :class="weekDay.weekday.en">
        {{ weekDay.weekday.ja
        }}<small class="tw-font-light tw-text-sm">{{
    weekDay.weekday.cn
}}</small>
      </h1>
      <div class="tw-flex tw-flex-wrap tw-bg-slate-50 tw-my-2 tw-p-2">
        <div v-for="item in weekDay.items" :key="item.id" class="tw-w-40 tw-h-52 tw-m-3 tw-flex tw-flex-col">
          <div class="
              square
              tw-w-40 tw-h-40 tw-relative tw-cursor-pointer tw-overflow-hidden
            " @click="$router.push(`/index/animedetail/${item.id}`)">
            <MyElimage :img="item.images && item.images.large" />
            <div class="pollup">
              <div class="tw-my-3">
                {{ item.name_cn ? item.name_cn : item.name }}
              </div>
              <div class="tw-text-sm tw-break-all">
                开播日期：{{ item.air_date }}
              </div>
              <div class="tw-text-sm" v-if="item.rating">
                评分：{{ item.rating && item.rating.score }}
              </div>
            </div>
          </div>
          <p class="text-line-show-2 tw-font-bold tw-text-blue-500">
            {{ item.name_cn ? item.name_cn : item.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAnimeData } from "@/hooks/Bangumi";
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
const { today, weekDayList, day } = useAnimeData();
</script>


<style lang="less" scoped>
.square {
  &:hover {
    .pollup {
      transform: translateY(0);
    }
  }
}

.pollup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 5px;
  transform: translateY(100%);
  transition: transform 0.5s ease;
  color: white;
  background-color: #00040a98;
}

.Mon {
  background-image: linear-gradient(75deg, #2dec14 0%, #10a7ffe0 6%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.Tue {
  background-image: linear-gradient(to right, #ff1010 0%, #5102ac 10%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.Wed {
  background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.Thu {
  background-image: linear-gradient(to right,
      #b8cbb8 0%,
      #b8cbb8 0%,
      #b465da 0%,
      #cf6cc9 33%,
      #ee609c 66%,
      #ee609c 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.Fri {
  background-image: linear-gradient(to right,
      #eea2a2 0%,
      #bbc1bf 19%,
      #57c6e1 42%,
      #b49fda 79%,
      #7ac5d8 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.Sat {
  background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.Sun {
  background-image: linear-gradient(to top, #f43b47 0%, #453a94 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>