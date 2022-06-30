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
                    <MyArticle />
                </el-tab-pane>
                <el-tab-pane label="画廊投稿">

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script setup lang="ts">
import { listArticle } from '@/api/article';
import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';
const userinfo=useUserStore();
const pageParams=reactive<PageParams>({
    page:1,
    pagesize:10,
    authorId:userinfo.userinfo.id
})
const getMyArticle=async ()=>{
    if(!userinfo.userinfo.id){
        ElMessage.error('错误')
    }
    const {data}=await listArticle(pageParams);
}

</script>
<style lang="less" scoped>
@import url(./create.less);
</style>