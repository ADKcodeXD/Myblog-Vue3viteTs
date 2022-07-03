<template>
  <div class="carousel">
    <ElCarousel
      ref="carousel"
      :interval="5000"
      pause-on-hover
      arrow="always"
      v-loading="bannerLoading"
    >
      <ElCarouselItem v-for="item in bannerList" :key="item.id">
        <CarouselItem :anime-info="item" />
      </ElCarouselItem>
    </ElCarousel>
  </div>
</template>

<script lang="ts" setup>
import { useAnimeData, useSubjectInfo } from '@/hooks/Bangumi';
import { ElCarousel } from 'element-plus';
import CarouselItem from './CarouselItem.vue';
const bannerList = ref<Array<Bangumi.SubjectInfoSmall>>([]);
const carousel = ref<typeof ElCarousel>();
const bannerLoading = ref(true);
const date = new Date();
const { weekDayList } = useAnimeData();

const getData = async () => {
  bannerLoading.value = true;
  let subjectIds = null;
  if (weekDayList.value) {
    const today = weekDayList.value.find(item => {
      if (date.getDay() == 0) {
        return item.weekday.id === 7;
      }
      return date.getDay() === item.weekday.id;
    });
    if (today) {
      subjectIds = today.items.map(item => {
        return item.id;
      });
    }
  }
  if (subjectIds) {
    useSubjectInfo(subjectIds)
      .then(item => {
        item.forEach(obj => {
          if (obj.status === 'fulfilled' && obj.value !== null) {
            bannerList.value.push(obj.value);
          }
        });
        bannerLoading.value = false;
        carousel.value?.setActiveItem(5);
      })
      .catch(() => {
        bannerLoading.value = false;
      });
  }
};
watchEffect(() => {
  //当获取到了weekdaylist 就自动执行getData
  getData();
});
</script>

<style lang="less" scoped>
@import url(../styles/AnimeCarousel.less);
</style>
