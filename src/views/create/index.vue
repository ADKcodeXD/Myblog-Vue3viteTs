<template >
    <div class="create-center">
        <div class="upinfo">
            <p class="title">创作中心</p>
            <p class="tip">这里记录了所有你的投稿</p>
        </div>
        <div class="content">
            <!-- 我的文章 -->
            <el-tabs type="card">
                <el-tab-pane label="文章创作">
                    <MyArticle :user-id="userinfo.userinfo.id" v-if="userinfo.userinfo.id" />
                </el-tab-pane>
                <el-tab-pane label="画廊投稿">
                    <MyPicture  />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/user';
import MyArticle from './components/MyArticle.vue';
import MyPicture from './components/MyPicture.vue';
const userinfo=useUserStore();

</script>
<style lang="less" scoped>
@import url(./create.less);
</style>