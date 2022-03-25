<template>
  <el-card class="bangumi">
    <template #header>
      <div class="card-header">
        <p class="tw-text-2xl">每日更新Anime~</p>
        <p>今天是{{ today }}</p>
      </div>
    </template>
    <el-tabs
      v-model="day"
      class="myscrollbar"
      tab-position="left"
      v-if="weekDayList"
    >
      <el-tab-pane
        :label="week.weekday.cn"
        v-for="(week, index) in weekDayList"
        :key="index"
      >
        <div class="tab-inner myscrollbar">
          <anime-card
            :anime-info="item"
            v-for="(item, index) in week.items"
            :key="index"
          >
          </anime-card>
          <el-empty
            v-if="week.items.length == 0"
            description="网络错误 获取不到数据~"
          ></el-empty>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- <BangumiItem /> -->
  </el-card>
  <el-card class="bangumi-mobile">
    <template #header>
      <div class="card-header">
        <p class="tw-text-2xl">每日更新Anime~</p>
        <p>今天是{{ today }}</p>
      </div>
    </template>
    <el-tabs
      v-model="day"
      tab-position="top"
      v-if="weekDayList"
    >
      <el-tab-pane
        :label="week.weekday.cn"
        v-for="(week, index) in weekDayList"
        :key="index"
      >
        <div class="tab-inner myscrollbar">
          <anime-card
            :anime-info="item"
            v-for="(item, index) in week.items"
            :key="index"
          >
          </anime-card>
          <el-empty
            v-if="week.items.length == 0"
            description="网络错误 获取不到数据~"
          ></el-empty>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- <BangumiItem /> -->
  </el-card>
</template>

<script lang="ts">
import { useAnimeData } from "@/hooks/Bangumi";
import { defineComponent } from "vue";
import AnimeCard from "./components/AnimeCard.vue";
export default defineComponent({
  components: { AnimeCard },
  setup() {
    const { today, weekDayList, day } =useAnimeData();
    return {
      today,
      weekDayList,
      day,
    };
  },
});
</script>


<style lang="less" scoped>
@media screen and (min-width: 320px) {
  .bangumi-mobile {
    margin-top: 10px;
    display: block;
    :deep(.el-tabs__nav-scroll){
      display: flex;
      
    }
    :deep(.el-tabs__item) {
      justify-content: space-around;
      color: rgb(@primaryTextColor) !important;
    }
  }
  .bangumi {
    display: none;
  }
  .tab-inner {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow: auto;
    height: 50rem;
    flex: 1;
  }
}
@media screen and (min-width: 1440px) {
  .bangumi-mobile{
    display: none;
  }
  .bangumi {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    :deep(.el-tabs__nav-scroll){
      height: 100%;
      justify-content: space-around;
    }
    :deep(.el-tabs__item) {
      height: 50px;
      color: rgb(@primaryTextColor) !important;
    }
  }
  .tab-inner {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow: auto;
    height: auto;
    flex: unset;
  }
}
</style>