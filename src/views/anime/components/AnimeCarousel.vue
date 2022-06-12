<template>
  <div class="carousel">
    <ElCarousel ref="carousel" :interval="5000" pause-on-hover arrow="always" v-loading="bannerLoading">
      <ElCarouselItem v-for="item in bannerList" :key="item.id">
        <CarouselItem :anime-info="item" />
      </ElCarouselItem>
    </ElCarousel>
  </div>
</template>

<script lang="ts" setup>
import { getSubjectInfoApi } from "@/api/bangumi";
import { useAnimeCalendar } from "@/hooks/Bangumi";
import { ElCarousel } from "element-plus";
import CarouselItem from "./CarouselItem.vue";

let weekdayMap = [
  "星期天",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
const weekDayList = ref<Array<Bangumi.CalendarItem>>();
const bannerList = ref<Array<Bangumi.SubjectInfoSmall>>([]);
const carousel = ref<typeof ElCarousel>();
const bannerLoading = ref(true);
const getData = async () => {
  bannerLoading.value = true;
  let subjectIds = null;
  weekDayList.value = await useAnimeCalendar();
  if (weekDayList.value) {
    const today = weekDayList.value.find((item) => {
      if (date.getDay() == 0) {
        return item.weekday.id === 7;
      }
      return date.getDay() + 1 === item.weekday.id;
    });
    if (today) {
      subjectIds = today.items.map((item) => {
        return item.id;
      });
    }
  }
  if (subjectIds) {
    let getItemPromise = (id: number): Promise<Bangumi.SubjectInfoSmall> => {
      return new Promise((resolve, rejected) => {
        getSubjectInfoApi(id)
          .then((data: any) => {
            let realdata: Bangumi.SubjectInfoSmall = data.data;
            resolve(realdata);
          })
          .catch((err: any) => {
            rejected(err);
          });
      });
    };
    let promises: Array<Promise<Bangumi.SubjectInfoSmall>> = [];
    subjectIds.forEach((item) => {
      promises.push(getItemPromise(item));
    });
    // 通过allSettled 来判断每个请求是否成功和失败 并将结果push入bannerList
    Promise.allSettled(promises)
      .then((item) => {
        item.forEach((obj) => {
          if (obj.status === "fulfilled" && obj.value) {
            bannerList.value.push(obj.value);
          }
        });
        bannerLoading.value = false;
        carousel.value?.setActiveItem(5);
      })
      .catch((info) => {
        console.log(info);
      });
  }
};
const date = new Date();
const day = ref("");
day.value = weekdayMap[date.getDay()];
getData();
</script>

<style lang="less" scoped>
@import url(../styles/AnimeCarousel.less);
</style>