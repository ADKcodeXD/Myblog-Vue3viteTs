<template>
  <div
    class="
      tw-h-48
      tw-mx-auto
      tw-bg-slate-50
      tw-flex
      tw-flex-col
      tw-justify-between
      tw-mt-5
      md:tw-flex-row md:tw-h-28
    "
  >
    <div class="tw-flex">
      <div
        class="
          tw-flex
          tw-flex-col
          tw-justify-start
          tw-self-center
          tw-items-start
          tw-p-5
          tw-bg-purple-400
          tw-mr-10
        "
      >
        <p class="tw-text-2xl tw-text-white">
          <span class="tw-text-3xl">Ban</span>gumi
        </p>
        <p class="tw-text-sm tw-text-white">AdkBlog 定制</p>
      </div>
      <ul
        class="
          ul-item
          tw-flex
          tw-flex-1
          tw-text-center
          tw-justify-evenly
          tw-items-center
          tw-mr-24
        "
      >
        <li>新番速看</li>
        <li>排行榜</li>
        <li>我的进度</li>
      </ul>
    </div>

    <div class="tw-flex tw-items-center tw-w-fill md:tw-flex-1 tw-p-4">
      <div class="right tw-flex tw-flex-1">
        <el-input
          v-model="searchKw"
          placeholder="请输入内容搜索番剧"
          class="tw-text-xl iconfont input-search"
        >
        </el-input>
        <el-button
          type="success"
          size="large"
          :icon="Search"
          plain
          @click="$router.push(`/index/animesearch?keywords=${searchKw}`)"
        >
          搜索
        </el-button>
      </div>
      <div
        class="
          avatar
          tw-rounded-full
          tw-flex
          tw-justify-center
          tw-items-center
          tw-bg-black
          tw-ml-12
          tw-w-16
          tw-h-16
          tw-object-cover
        "
      >
        <el-image fit="cover" src="@/assets/logo.png"> </el-image>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Search } from "@element-plus/icons-vue";
export default defineComponent({
  setup() {
    let searchKw = ref("");
    return {
      Search,
      searchKw,
    };
  },
});
</script>

<style lang="less" scoped>
@media screen and (min-width: 320px) {
  .ul-item {
    li {
      font-size: 14px;
      margin-right: 30px;
      font-weight: 600;
      transition: all ease 0.4s;

      cursor: pointer;
      &::after {
        content: "";
        display: block;
        width: 0px;
        height: 3px;
        transition: all ease 0.4s;
        margin-top: 5px;
        background-color: rgb(252, 54, 19);
      }
      &:hover {
        color: orange;
        &::after {
          width: 100%;
        }
      }
    }
  }
  :deep(.el-input__inner) {
    height: 40px;
  }
}
@media screen and (min-width: 768px) {
}
</style>