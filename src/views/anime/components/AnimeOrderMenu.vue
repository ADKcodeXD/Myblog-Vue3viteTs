<template>
  <div class="container tw-mt-5">
    <div class="tw-flex tw-text-center tw-items-center tw-mt-4">
      <p class="title tw-text-xl tw-font-bold">类型</p>
      <p class="type" @click="changeType(6)" :class="{ active: params.type == undefined }">
        全部
      </p>
      <p class="type" @click="changeType(1)" :class="{ active: params.type == BroswerType.TV }">
        TV
      </p>
      <p class="type" @click="changeType(2)" :class="{ active: params.type == BroswerType.WEB }">
        WEB
      </p>
      <p class="type" @click="changeType(3)" :class="{ active: params.type == BroswerType.OVA }">
        OVA
      </p>
      <p class="type" @click="changeType(4)" :class="{ active: params.type == BroswerType.MOVIE }">
        剧场版
      </p>
      <p class="type" @click="changeType(5)" :class="{ active: params.type == BroswerType.MISC }">
        其他
      </p>
    </div>
    <div class="tw-flex tw-text-center tw-items-center tw-mt-4">
      <p class="title tw-text-xl tw-font-bold">排序规则</p>
      <p class="type" @click="changeSort(1)" :class="{ active: params.sort === SortRole.rank }">
        排名排序
      </p>
      <p class="type" @click="changeSort(2)" :class="{ active: params.sort === SortRole.date }">
        时间排序
      </p>
      <p class="type" @click="changeSort(3)" :class="{ active: params.sort === SortRole.title }">
        名称排序
      </p>
    </div>
    <div class="tw-flex tw-text-center tw-items-center tw-mt-4 tw-flex-wrap">
      <p class="title tw-text-xl tw-font-bold tw-shrink-0">年份</p>
      <span class="type" :class="{ active: yearChoice === 0 }" @click="changeYear(0)">默认</span>
      <span v-for="i in 22" :key="i" class="type" @click="changeYear(new Date().getFullYear() + 1 - i)"
        :class="{ active: yearChoice === new Date().getFullYear() + 1 - i }">{{ new Date().getFullYear() + 1 - i
        }}</span>
      <span @click="isMoreShow = true" v-show="!isMoreShow" class="type">更多</span>
      <div v-show="isMoreShow">
        <el-date-picker class="tw-mr-1" v-model="year" type="year" placeholder="选择更多其他年份" />
      </div>
    </div>
    <div class="tw-flex tw-text-center tw-items-center tw-mt-4 tw-flex-wrap">
      <p class="title tw-text-xl tw-font-bold tw-shrink-0">月份</p>
      <span class="type" @click="changeMonth(0)" :class="{ active: month === 0 }">默认</span>
      <span v-for="i in 12" :key="i" class="type" @click="changeMonth(i)" :class="{ active: month === i }">{{ i
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {SortRole,BroswerType} from '@/interface/EnumExport';

const emit = defineEmits(['changeParams'])
let month = ref(0);
let yearChoice = ref(0);
let year = ref<Date>();
let isMoreShow = ref(false);
let params = reactive<Bangumi.BroswerParams>({
  order: undefined,
  sort: SortRole.rank,
  type: undefined,
  page: 1,
  airtime: undefined,
});
const changeSort = (val: number) => {
  if (val) {
    switch (val) {
      case 1:
        params.sort = SortRole.rank;
        break;
      case 2:
        params.sort = SortRole.date;
        break;
      case 3:
        params.sort = SortRole.title;
        break;
      default:
        params.sort = SortRole.title;
        break;
    }
  }
};
const changeType = (val: number) => {
  if (val) {
    switch (val) {
      case 1:
        params.type = BroswerType.TV;
        break;
      case 2:
        params.type = BroswerType.WEB;
        break;
      case 3:
        params.type = BroswerType.OVA;
        break;
      case 4:
        params.type = BroswerType.MOVIE;
        break;
      case 5:
        params.type = BroswerType.MISC;
        break;
      default:
        params.type = undefined;
        break;
    }
  }
};
const changeMonth = (val: number) => {
  month.value = val;
  if (params.airtime) {
    if (params.airtime.indexOf("-") !== -1) {
      if (val === 0) {
        let newTime = params.airtime.split("-");
        params.airtime = newTime[0];
      } else {
        let newTime = params.airtime.split("-");
        newTime[1] = val.toString();
        params.airtime = newTime.join("-");
      }
    } else {
      if (val === 0) {
        return;
      } else {
        params.airtime += "-" + val;
      }
    }
  } else {
    let str = "";
    let year = new Date().getFullYear();
    str += year;
    if (val !== 0) {
      str += "-" + val;
    }
    params.airtime = str;
  }
};
const changeYear = (val: number) => {
  yearChoice.value = val;
  if (params.airtime) {
    if (params.airtime.indexOf("-") !== -1) {
      if (val === 0) {
        let newTime = params.airtime.split("-");
        newTime[0] = new Date().getFullYear().toString();
        params.airtime = newTime.join("-");
      } else {
        let newTime = params.airtime.split("-");
        newTime[0] = val.toString();
        params.airtime = newTime.join("-");
      }
    } else {
      if (val === 0) {
        params.airtime = undefined;
      } else {
        params.airtime = val.toString();
      }
    }
  } else {
    if (val !== 0) {
      params.airtime = val.toString();
    }
  }
};

watch(
  params,
  (newval) => {
    emit("changeParams", newval);
    console.log(newval);
  },
  { deep: true }
);
watch(year, (newval) => {
  // 用于选择更多年份
  let val;
  let m = month.value;
  if (newval) {
    val = newval.getFullYear();
  }
  if (m != 0) {
    if (val) {
      params.airtime = val + "-" + m;
    } else {
      params.airtime = new Date().getFullYear() + "-" + m;
    }
  } else if (val) {
    params.airtime = val.toString();
  } else {
    params.airtime = undefined;
  }
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