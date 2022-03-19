<template>
  <div class="container tw-container tw-mt-10">
    <div class="title tw-text-3xl tw-flex tw-justify-between tw-items-end">
      <p>今日速递</p>
      <p class="tw-text-xl">今天是 {{ day }}</p>
    </div>
    <div class="carousel tw-mt-5">
      <el-carousel  ref="carousel" :interval="5000" pause-on-hover arrow="always" height="28rem" v-loading="bannerLoading">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <carousel-item :anime-info="item" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>


<script lang="ts">
import { getSubjectInfoApi } from "@/api/bangumi";
import { useAnimeCalendar } from "@/hooks/Bangumi";
import { CalendarItem, SubjectInfoSmall } from "@/interface/bangumiApi.type";
import { ElCarousel } from "element-plus";
import { resolve } from "path";
import { defineComponent } from "vue";
import CarouselItem from "./CarouselItem.vue";

export default defineComponent({
  setup() {
    let weekdayMap = [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    let weekDayList = ref<Array<CalendarItem>>();
    let bannerList = ref<Array<SubjectInfoSmall>>([]);
    const carousel = ref<typeof ElCarousel>();
    
    let bannerLoading = ref(true);
    const getData = async () => {
      bannerLoading.value = true;
      let subjectIds = null;
      weekDayList = await useAnimeCalendar();
      if (weekDayList.value) {
        const today = weekDayList.value.find((item) => {
          return date.getDay() + 1 === item.weekday.id;
        });
        if (today) {
          subjectIds = today.items.map((item) => {
            return item.id;
          });
        }
      }
      if (subjectIds) {
        let getItemPromise = (id: number):Promise<SubjectInfoSmall> => {
          return new Promise((resolve, rejected) => {
            getSubjectInfoApi(id).then((data:any)=>{
              let realdata:SubjectInfoSmall=data.data;
              resolve(realdata)
            }).catch((err: any)=>{
              rejected(err)
            })
          });
        };
        let promises: Array<Promise<SubjectInfoSmall>>= [];
        subjectIds.forEach((item) => {
          promises.push(getItemPromise(item));
        });
        // 通过allSettled 来判断每个请求是否成功和失败 并将结果push入bannerList
        Promise.allSettled(promises).then(item=>{
          item.forEach(obj=>{
            if( obj.status === 'fulfilled' && obj.value){
              bannerList.value.push(obj.value)
            }
          })
          bannerLoading.value=false;
          carousel.value?.setActiveItem(5);
        }).catch(info=>{
          console.log(info);
        })
      }
    };
    const date = new Date();
    let day = ref("");
    day.value = weekdayMap[date.getDay()];
    getData();
    return {
      day,
      bannerList,
      bannerLoading,
      carousel
    };
  },
  components: { CarouselItem },
});
</script>

<style lang="less" scoped>
:deep(.el-carousel__item) {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>