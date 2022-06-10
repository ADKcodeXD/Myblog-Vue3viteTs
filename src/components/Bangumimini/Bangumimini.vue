<template>
  <el-card class="bangumi">
    <template #header>
      <div class="card-header">
        <div class="anime-logo">
          <img src="@/assets/img/每日番剧-logo.png" />
        </div>
        <ul class="week">
          <li v-for="(week, index) in weekDayList" :key="index" @click="changeDay(week.weekday.id)"
            :class="{ active: week.weekday.id === nowDay }">
            {{ week.weekday.ja }}
            <span>{{ week.weekday.en }}</span>
          </li>
        </ul>
      </div>
    </template>
    <!-- 自制的tabs -->
    <div v-for="(week, index) in weekDayList" :key="index">
      <div class="tab-inner myscrollbar" v-if="week.weekday.id === nowDay" :ref="el => { myRefs[index] = el }">
        <anime-card :anime-info="item" v-for="(item, index) in week.items" :key="index"
          @scroll-left="$event => scrollToElement($event, index)">
        </anime-card>
      </div>
    </div>
    <AdkEmpty v-if="!weekDayList" desc="网络错误 获取不到数据~"></AdkEmpty>
    <!-- 底部提示消息 -->
    <p class="tip">数据源自https://bgm.tv</p>
  </el-card>
</template>

<script lang="ts" setup>
import { useAnimeData } from "@/hooks/Bangumi";
import AnimeCard from "./components/AnimeCard.vue";
const { weekDayList, day } = useAnimeData();
const nowDay = ref(0);
const myRefs = ref([]);
nowDay.value = Number(day.value) + 1;
const changeDay = (day: number | string) => {
  nowDay.value = Number(day);
}
const animeFlag = ref(false)
const scrollToElement = (val: number, index) => {
  if(val>500) return;
  if (animeFlag.value) {
    return
  } else {
    animeFlag.value=true;
    myRefs.value[nowDay.value - 1].scrollTo({ left: val * index, behavior: 'smooth' });
    setTimeout(() => {
      animeFlag.value=false;
    },500);
  }
}

</script>


<style lang="less" scoped>
@import url(./styles/Bangumimini.less);
</style>