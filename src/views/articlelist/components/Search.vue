<template >
    <div class="search">
        <el-autocomplete v-model="pageParams.keyword" :size="'large'" placeholder="搜索" class="iconfont input-search"
            style="width: 100%; margin-right: 1rem" :fetch-suggestions="querySearchAsync" @select="handleSelect"
            @change="nullSearch">
            <template #default="{ item }">
                <span class="link">{{ item.articleName }}</span>
            </template>
        </el-autocomplete>
        <div class="search-btn" v-loading="searchLoading"  @click="searchByKeyword">

        </div>
    </div>
</template>
<script setup lang="ts">

import { useArticleListSearch } from '@/hooks/ArticleList';
import { PropType } from 'vue';
const props = defineProps({
    pageParams: {
        type: Object as PropType<PageParams>,
        default: {}
    },
    searchLoading: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['changeKeyword'])

const { handleSelect,
    querySearchAsync,
    nullSearch,
    searchByKeyword } = useArticleListSearch(props, emit)

</script>

<style lang="less" scoped>
@import url(../styles/Search.less);
</style>