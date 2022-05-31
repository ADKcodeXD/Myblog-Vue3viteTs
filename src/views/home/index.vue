<template>
  <div class="my-info">
    <!-- 封面图 头图 -->
    <Banner :banner="currentUser.banner" @changeBanner="changeBanner" />
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
      <el-tab-pane label="我的创作">
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script lang="ts">
export default { name: 'Home' }
</script>
<script setup lang="ts">
import Banner from "./components/Banner.vue";
import UserInfo from "./components/UserInfo.vue";
import FormGroup from "./components/FormGroup.vue";
import { useHomeIndex } from "@/hooks/Home";
import MyCollect from "./components/MyCollect.vue";
import MyLiked from "./components/MyLiked.vue";
const { changeInfo,
  changeBanner,
  changeAvatar,
  currentUser,
  formAllinfo } = useHomeIndex();

</script>

<style lang="less" scoped>
@media screen and(min-width:320px) {
  .my-info {
    width: 100%;
    margin: 0 auto;
    min-height: 600px;
    transition: all 0.8s ease;
    background-color: rgb(@primaryBackGroundColor);

    .info-deatil {
      display: flex;
      flex-direction: column;

      .all-info {
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        color: rgb(@primaryTextColor);
      }
    }
  }
}

@media screen and (min-width:960px) {
  .my-info {
    width: 80%;
    .info-deatil {
      flex-direction: row;
    }
  }
}
</style>