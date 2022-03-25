<template>
  <div class="left tw-bg-slate-600 tw-flex tw-w-full tw-p-5 tw-items-center">
    <div
      class="
        imgcontainer
        md:tw-w-75 md:tw-h-100
        tw-w-60 tw-h-100 tw-border-2 tw-border-double tw-border-orange-500
      "
      v-if="animeDetail.images"
    >
      <MyElimage :img="animeDetail.images.large" :notFoundType="'3:4'" />
    </div>
    <div class="title-info tw-flex-1 tw-ml-5" v-if="animeDetail">
      <p class="tw-font-bold tw-text-white tw-text-2xl md:tw-text-4xl">
        {{ animeDetail.name_cn ? animeDetail.name_cn : animeDetail.name }}
      </p>
      <small v-if="animeDetail.name_cn" class="tw-text-stone-300 tw-leading-5"
        >原名:{{ animeDetail.name }}</small
      >
      <p class="tw-text-stone-50 tw-mt-1">
        开播日期:{{ animeDetail.air_date }}
      </p>
      <p class="tw-text-stone-50 tw-mt-1">
        放送日:{{ day}}
      </p>
      <p class="tw-text-stone-50 tw-mt-1">类型:{{ type }}</p>
      <p class="tw-text-stone-50 tw-mt-1">导演:{{ director }}</p>
      <p class="tw-text-stone-50 tw-mt-1" v-if="animeDetail.eps_count">
        总集数:{{
          animeDetail.eps_count ? animeDetail.eps_count : animeDetail.eps.length
        }}
      </p>
      <div class="rating tw-flex tw-mt-5 tw-justify-between tw-items-center">
        <div
          class="
            score
            tw-bg-red-600
            tw-text-white
            tw-flex
            tw-flex-col
            tw-items-center
            tw-p-3
          "
          v-if="animeDetail.rating"
        >
          <small>评分</small>
          <p class="tw-font-bold tw-text-3xl">
            {{
              animeDetail.rating.score ? animeDetail.rating.score : "暂无数据"
            }}/10.0
          </p>
          <small>{{ animeDetail.rating.total }}条评分</small>
        </div>
        <div
          class="score tw-text-white tw-flex tw-flex-col tw-items-center tw-p-3"
        >
          <small>排名</small>
          <p class="tw-font-bold tw-text-3xl">
            {{ animeDetail.rank ? animeDetail.rank : "暂无数据" }}
          </p>
        </div>
      </div>
    </div>
    <el-empty v-else> </el-empty>
  </div>
</template>

<script lang="ts">
import { AnimeDeatilItem } from "@/interface/bangumiApi.type";
import { BangumiType, WeekDayType } from "@/interface/BangumiEnum";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    animeDetail: {
      type: Object as PropType<AnimeDeatilItem>,
      default: {},
    },
  },
  setup(props) {
    let director = computed(() => {
      if (props.animeDetail.staff) {
        let a = props.animeDetail.staff.find((item) => {
          return item.jobs.find((item) => {
            return item == "导演" || item == "监督";
          });
        });
        if (a) {
          return a.name_cn ? a.name_cn : a.name;
        }
      }else{
        return "未知"
      }
    });
    
    let type=computed(()=>{
      for(let i in BangumiType){
        if(props.animeDetail.type===parseInt(BangumiType[i])){
          return i;
        }
      }
    })
    let day=computed(()=>{
      if(props.animeDetail.air_weekday){
        for(let i in WeekDayType){
          if(props.animeDetail.air_weekday===parseInt(WeekDayType[i])){
            return i;
          }
        }
      }
    })
    return {
      director,
      type,
      day
    };
  },
});
</script>


<style>
</style>