<template>
  <div class="tw-mt-28 md:tw-mt-5 md:tw-w-4/5 tw-mx-auto tw-bg-slate-50 tw-p-3">
    <div class="tw-p-4 ">
    <el-page-header
      :icon="ArrowLeft"
      :content="$route.query.keywords?$route.query.keywords?.toString():''"
      @back="$router.push('/index/anime')"
    />
  </div>
    <div>
      <h1 class="tw-text-3xl">搜索页</h1>
    </div>
    <div>
      <div class="tw-flex tw-my-2 tw-items-center">
        <el-input
          v-model="mykeyword"
          placeholder="请输入内容搜索番剧"
          class="tw-text-xl iconfont input-search tw-border-2"
          size="large"
        >
        </el-input>
        <el-button
          type="success"
          size="large"
          :icon="Search"
          plain
          @click="searchKw"
          v-loading="loading"
        >
          搜索
        </el-button>
      </div>
      <p v-if="mykeyword">为您搜索 "{{ mykeyword }}" 相关信息</p>
      <div class="tw-flex tw-items-center">
        <p class="tw-text-xl tw-font-bold ">类型</p>
        <p
          class="type"
          @click="changeType(0)"
          :class="{ active: queryParams.type == undefined }"
        >
          全部
        </p>
        <p
          class="type"
          @click="changeType(1)"
          :class="{ active: queryParams.type == BangumiType.小说Book }"
        >
          小说
        </p>
        <p
          class="type"
          @click="changeType(2)"
          :class="{ active: queryParams.type == BangumiType.动漫Anime }"
        >
          动漫
        </p>
        <p
          class="type"
          @click="changeType(3)"
          :class="{ active: queryParams.type == BangumiType.音乐Musci }"
        >
          音乐
        </p>
        <p
          class="type"
          @click="changeType(4)"
          :class="{ active: queryParams.type == BangumiType.游戏Game }"
        >
          游戏
        </p>
        <p
          class="type"
          @click="changeType(6)"
          :class="{ active: queryParams.type == BangumiType.三次元Real }"
        >
          三次元
        </p>
      </div>
    </div>
    <div class="iteminfo tw-mt-3 tw-bg-slate-50 tw-p-3" v-loading="loading">
      <SearchItem v-for="item in animeinfoList" :key="item.id" :item="item" />
      <el-empty v-if="animeinfoList.length === 0"></el-empty>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total - 10"
      :current-page="page"
      @current-change="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
import { getSubjectSeachApi } from "@/api/bangumi";
import { BangumiType } from "Myenum";
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import SearchItem from "./components/SearchItem.vue";
import { ArrowLeft } from "@element-plus/icons-vue";

const route = useRoute();
let query = route.query;
let mykeyword = ref("");
let loading = ref(false);
if (query.keywords) {
  mykeyword.value = query.keywords.toString();
}

let urlencode = computed(() => {
  return encodeURIComponent(mykeyword.value);
});

let queryParams = reactive<Bangumi.SearchParamsBgm>({
  keywords: urlencode.value,
  responseGroup: ResponseGroup.Large,
  start: 1,
  max_results: 13,
});
let animeinfoList = ref<Array<Bangumi.AnimeItemInfo>>([]);
let total = ref(0);
let page = computed({
  get: () => {
    if (queryParams.start === 1) return 1;
    else {
      if (queryParams.start) {
        return (queryParams.start - 4) / 10 + 1;
      } else {
        return 1;
      }
    }
  },
  set: (val) => {},
});
const changePage = (val: number) => {
  queryParams.start = (val - 1) * 10 + 4;
  search();
};
const search = async () => {
  loading.value = true;
  const data = await getSubjectSeachApi(queryParams);
  if (data.status !== 200) {
    ElMessage.error("搜索失败，请稍后重试");
    loading.value = false;
    return;
  } else if (data.data.code === 404) {
    ElMessage.error("没有搜索到相关结果哦~");
    animeinfoList.value = [];
    total.value = 0;
    loading.value = false;
    return;
  } else {
    animeinfoList.value = data.data.list;
    total.value = data.data.results;
    loading.value = false;
  }
  loading.value = false;
};

// 搜索
const searchKw = () => {
  queryParams.keywords = mykeyword.value;
  queryParams.start = 1;
  search();
};
const changeType = (val: number) => {
  if (val !== 0) {
    queryParams.type = val;
  } else {
    queryParams.type = undefined;
  }
  search();
};
search();
</script>

<style lang="less" scoped>
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

