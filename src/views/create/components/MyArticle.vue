<template>
    <div class="article-item" >
        <ArticleItem />
        
    </div>
</template>
<script setup lang="ts">
const {articleItem}=defineProps<{
    articleItem: ArticleItemInfo,

}>();

</script>
<style lang="less" scoped>
    
</style>