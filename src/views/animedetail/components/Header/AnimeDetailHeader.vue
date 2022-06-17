<template>
  <div class="container">
    <div class="imgcontainer" v-if="animeDetail.images">
      <MyElimage :img="animeDetail.images.large" :notFoundType="'3:4'" />
    </div>
    <div class="title-info" v-if="animeDetail">
      <div class="title-info-first">
        <p class="title--big">
          {{ animeDetail.name_cn ? animeDetail.name_cn : animeDetail.name }}
          <p class="tag">
            {{ratingTag}}
          </p>
        </p>
        <small v-if="animeDetail.name_cn" class="title--small">原名:{{ animeDetail.name }}</small>
      </div>
      <div class="title-info-second">
        <p>
          开播日期:{{ animeDetail.air_date }}
        </p>
        <p>
          放送日:{{ day }}
        </p>
        <p>类型:{{ type }}</p>
        <p>导演:{{ director }}</p>
        <p v-if="animeDetail.eps_count">
          总集数:{{
              animeDetail.eps_count ? animeDetail.eps_count : animeDetail.eps.length
          }}
        </p>
      </div>

      <div class="title-info-third">
        <div class="rating" v-if="animeDetail.rating">
          <small class="desc">评分</small>
          <p class="score">
            {{
                animeDetail.rating.score ? animeDetail.rating.score : "暂无数据"
            }}/10.0
          </p>
        </div>
        <div class="rating rank">
          <small class="desc">排名</small>
          <p class="score">
            {{ animeDetail.rank ? animeDetail.rank : "暂无数据" }}
          </p>
        </div>
        <div class="rating miru">
          <small class="desc">{{mostPeople.type}}</small>
          <p class="score">
            {{mostPeople.nums }}
          </p>
        </div>
      </div>
    </div>
    <ElEmpty v-else />
    <div class="title-info-third--mobile">
        <div class="rating" v-if="animeDetail.rating">
          <small class="desc">评分</small>
          <p class="score">
            {{
                animeDetail.rating.score ? animeDetail.rating.score : "暂无数据"
            }}/10.0
          </p>
        </div>
        <div class="rating rank">
          <small class="desc">排名</small>
          <p class="score">
            {{ animeDetail.rank ? animeDetail.rank : "暂无数据" }}
          </p>
        </div>
        <div class="rating miru">
          <small class="desc">{{mostPeople.type}}</small>
          <p class="score">
            {{mostPeople.nums }}
          </p>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { WeekDayType, BangumiType, CollectionType } from '@/interface/EnumExport';
import { useRatingTag } from "@/hooks/Bangumi";
import { useHead } from "@vueuse/head";

const props = defineProps({
  animeDetail: {
    type: Object as PropType<Bangumi.AnimeDeatilItem>,
    default: {},
  },
});
const director = computed(() => {
  if (props.animeDetail.staff) {
    let a = props.animeDetail.staff.find((item) => {
      return item.jobs.find((item) => {
        return item == "导演" || item == "监督";
      });
    });
    if (a) {
      return a.name_cn ? a.name_cn : a.name;
    }
  } else {
    return "未知"
  }
});
const type = computed(() => {
  for (let i in BangumiType) {
    if (props.animeDetail.type === parseInt(BangumiType[i])) {
      return i;
    }
  }
})
const day = computed(() => {
  if (props.animeDetail.air_weekday) {
    for (let i in WeekDayType) {
      if (props.animeDetail.air_weekday === parseInt(WeekDayType[i])) {
        return i;
      }
    }
  }
})
const mostPeople=computed(()=>{
  let obj={type:"",nums:0}
  if (props.animeDetail.collection){
    for(let i in props.animeDetail.collection){
      if(props.animeDetail.collection[i]>obj.nums){
        obj.type=CollectionType[i];
        obj.nums=props.animeDetail.collection[i];
      }
    }
  }
  return obj;
})
const {ratingTag}=useRatingTag(props.animeDetail?.rating?.score||0);
</script>

<style lang="less" scoped>
@import url(../../styles/AnimeDetailHeader.less);
</style>