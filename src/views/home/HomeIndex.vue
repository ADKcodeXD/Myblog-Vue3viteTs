<template>
  <div class="my-info">
    <!-- 封面图 头图 -->
    <BannerItem :banner="currentUser.banner" @changeBanner="changeBanner" />
    <!-- 个人信息 -->
    <div class="info-deatil">
      <UserInfo :currentUser="currentUser" @changeAvatar="changeAvatar" />
      <div class="all-info">
        <FormGroup @changeInfo="changeInfo" :formAllinfo="formAllinfo" :currentUser="currentUser" />
      </div>
    </div>
    <!-- 我的文章 -->
    <el-tabs type="card">
      <el-tab-pane label="我的收藏">
        <MyCollect />
      </el-tab-pane>
      <el-tab-pane label="我的点赞">
        <MyLiked />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
export default { name: 'HomeIndex' }
</script>
<script setup lang="ts">
import BannerItem from './components/BannerItem.vue'
import UserInfo from './components/UserInfo.vue'
import FormGroup from './components/FormGroup.vue'
import { useHomeIndex } from '@/hooks/Home'
import MyCollect from './components/MyCollect.vue'
import MyLiked from './components/MyLiked.vue'
const { changeInfo, changeBanner, changeAvatar, currentUser, formAllinfo } = useHomeIndex()
</script>

<style lang="less" scoped>
@import url(./styles/Home.less);
</style>
