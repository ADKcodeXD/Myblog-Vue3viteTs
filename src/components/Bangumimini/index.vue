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
          <div class="switch-ball" :style="{ left: ballXpos }">
          </div>
        </ul>
      </div>
    </template>
    <!-- 自制的tabs -->
    <div v-for="(week, index) in weekDayList" :key="index">
      <div class="tab-inner myscrollbar" v-if="week.weekday.id === nowDay">
        <anime-card :anime-info="item" v-for="(item, index) in week.items" :key="index">
        </anime-card>
        <el-empty v-if="week.items.length == 0" description="网络错误 获取不到数据~"></el-empty>
      </div>
    </div>
    <!-- 底部提示消息 -->
    <p class="tip">数据源自https://bgm.tv</p>
  </el-card>
</template>

<script lang="ts" setup>
import { useAnimeData } from "@/hooks/Bangumi";
import AnimeCard from "./components/AnimeCard.vue";

const { weekDayList, day } = useAnimeData();
let nowDay = ref(0);
nowDay.value = Number(day.value) + 1;
const changeDay = (day: number | string) => {
  nowDay.value = Number(day);
}
const ballXpos = computed(() => {
  let num = Number(nowDay.value - 1) * 5.64 + 2.35;
  console.log(num);
  return num + 'rem'
})

</script>


<style lang="less" scoped>
@import url(./styles/Bangumimini.less);
</style>