<template>
  <div class="container tw-mt-5">
    <div class="tw-flex tw-text-center tw-items-center tw-mt-4">
      <p class="title tw-text-xl tw-font-bold">类型</p>
      <p class="type" @click="changeType(6)" :class="{active:params.type==undefined}">全部</p>
      <p class="type" @click="changeType(1)" :class="{active:params.type==BroswerType.TV}">TV</p>
      <p class="type" @click="changeType(2)" :class="{active:params.type==BroswerType.WEB}">WEB</p>
      <p class="type" @click="changeType(3)" :class="{active:params.type==BroswerType.OVA}">OVA</p>
      <p class="type" @click="changeType(4)" :class="{active:params.type==BroswerType.MOVIE}">剧场版</p>
      <p class="type" @click="changeType(5)" :class="{active:params.type==BroswerType.MISC}">其他</p>
    </div>
    <div class="tw-flex tw-text-center tw-items-center tw-mt-4">
      <p class="title tw-text-xl tw-font-bold">排序规则</p>
      <p class="type" @click="changeSort(1)" :class="{active:params.sort===SortRole.rank}">排名排序</p>
      <p class="type" @click="changeSort(2)" :class="{active:params.sort===SortRole.date}">时间排序</p>
      <p class="type" @click="changeSort(3)" :class="{active:params.sort===SortRole.title}">名称排序</p>
    </div>
    <div class="tw-flex tw-text-center tw-items-center tw-mt-4">
      <p class="title tw-text-xl tw-font-bold tw-shrink-0">按时间筛选</p>
      <el-date-picker class="tw-mr-1" v-model="year" type="year" placeholder="选择年份" />
      <el-date-picker
        class="tw-mr-1"
        v-model="month"
        type="month"
        placeholder="选择月份"
        format="MM"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { BroswerParams } from "@/interface/bangumiApi.type";
import { BroswerType, SortRole } from "@/interface/BangumiEnum";
import { title } from "process";
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    let month = ref<Date>();
    let year = ref<Date>();
    let params = reactive<BroswerParams>({
      order: undefined,
      sort: SortRole.rank,
      type: undefined,
      page: 1,
      airtime: undefined,
    });
    const changeSort=(val:number)=>{
        if(val){
            switch(val){
                case 1:params.sort=SortRole.rank;break;
                case 2:params.sort=SortRole.date;break;
                case 3:params.sort=SortRole.title;break;
                default:params.sort=SortRole.title;break;
            }
        }
    }
    const changeType=(val:number)=>{
        if(val){
            switch(val){
                case 1:params.type=BroswerType.TV;break;
                case 2:params.type=BroswerType.WEB;break;
                case 3:params.type=BroswerType.OVA;break;
                case 4:params.type=BroswerType.MOVIE;break;
                case 5:params.type=BroswerType.MISC;break;
                default:params.type=undefined;break;
            }
        }
    }
    watch(
      params,
      (newval) => {
        emit("changeParams", newval);
        console.log(newval);
      },
      { deep: true,immediate:true }
    );
    watch(month, (newval) => {
      let y;
      let m;
      if(newval){
          m=newval.getMonth()+1
      }
      if(year.value){
          y=year.value.getFullYear();
      }
      if (m&&y) {
        params.airtime = y + "-" + m;
      }
      else if(m){
          params.airtime = new Date().getFullYear() + "-" + m;
      }
      else if(y){
          params.airtime = y.toString();
      }else{
          params.airtime=undefined;
      }
    });
    watch(year, (newval) => {
      let val;
      let m;
      if (newval) {
        val = newval.getFullYear();
      }
      if (month.value) {
        m = month.value.getMonth() + 1;
      }
      if (m&&val) {
        params.airtime = val + "-" + m;
      }
      else if(m){
          params.airtime = new Date().getFullYear() + "-" + m;
      }
      else if(val){
          params.airtime = val.toString();
      }else{
          params.airtime=undefined;
      }

    });
    return {
      month,
      year,
      changeSort,
      params,
      SortRole,
      changeType,
      BroswerType
    };
  },
});
</script>


<style lang="less" scoped>
.title {
  margin-right: 0.5rem;
}
.type {
  margin-right: 5px;
  color: rgb(6, 67, 158);
  cursor: pointer;
  &:hover {
    text-decoration-line: underline;
  }
}
.active {
  font-weight: 600;
  color: orange;
}

</style>