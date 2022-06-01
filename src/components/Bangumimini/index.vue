<template>
  <el-card class="bangumi">
    <template #header>
      <div class="card-header">
        <div class="anime-logo">
          <img src="@/assets/img/每日番剧-logo.png" />
        </div>
        <ul class="week">
          <li v-for="(week, index) in weekDayList" :key="index" @click="changeDay(week.weekday.id)">
            {{ week.weekday.ja }}
            <span>{{week.weekday.en}}</span>
          </li>
          <div class="switch-ball" :style="{left:ballXpos}">
          </div>
        </ul>
      </div>
    </template>
    <!-- 自制的tabs -->
    <div v-for="(week, index) in weekDayList" :key="index">
      <div class="tab-inner myscrollbar" v-if="week.weekday.id===nowDay" >
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

const { today, weekDayList, day } = useAnimeData();
let nowDay=ref(0);
nowDay.value=Number(day.value)+1;
const changeDay=(day:number|string)=>{
  nowDay.value=Number(day);
}
const ballXpos=computed(()=>{
  let num=Number(nowDay.value-1)*5.64+2.35;
  console.log(num);
  return num+'rem'
})

</script>


<style lang="less" scoped>
.tip{
  font-family: 'urafont';
  font-weight: 600;
  font-size: 20px;
}
@media screen and (min-width: 320px) {
  .card-header {
    font-family: 'urafont', '幼圆';
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    color: #135BFF;
    .anime-logo {
      width: 15rem;
      height: auto;
    }

    .week {
      display: flex;
      font-size: 1.5rem;
      position: relative;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 0.3rem;
        width: 5rem;
        cursor: pointer;
        span{
          font-size: 1rem;
        }
      }
      .switch-ball{
        .ball(0.85rem,#fc566c);
        top: -10px;
        z-index: 0;
        position: absolute;
        transition: 0.4s left ease-in-out;
      }
    }
  }

  .tab-inner {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow: auto;
    height: 50rem;
    padding: 10px;
    flex: 1;
  }
}

@media screen and (min-width: 1440px) {
  .bangumi-mobile {
    display: none;
  }

  .bangumi {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .card-header{
      flex-direction: row;
      align-items: flex-end;
    }
    :deep(.el-tabs__nav-scroll) {
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