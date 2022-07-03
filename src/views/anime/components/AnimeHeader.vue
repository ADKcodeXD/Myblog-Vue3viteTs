<template>
  <div class="anime-header">
    <div class="anime-header-logo">
      <div>
        <p class="anime-header-logo__uptext">
          <span class="anime-header-logo__uptext--big">ADK-</span>blog
        </p>
        <p class="anime-header-logo__undertext">Bangumi</p>
      </div>
      <div class="anime-header-newanime">
        <p @click="$router.push(`/index/animenew`)">新番速看</p>
      </div>
    </div>
    <div class="anime-header-search">
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
    </div>
    <div class="anime-header-newanime">
      <p @click="$router.push(`/index/animenew`)">新番速看</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
let searchKw = ref('');
</script>

<style lang="less" scoped>
@import url(../styles/AnimeHeader.less);
</style>
