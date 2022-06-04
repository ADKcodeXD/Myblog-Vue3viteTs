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
@keyframes jello {
    0% {
        transform: skew(0deg 0deg);
    }

    30% {
        transform: skew(-25deg -25deg);
    }

    40% {
        transform: skew(15deg, 15deg);
    }

    50% {
        transform: skew(-15deg, -15deg);
    }

    65% {
        transform: skew(5deg, 5deg);
    }

    75% {
        transform: skew(-5deg, -5deg);
    }

    100% {
        transform: skew(0deg 0deg);
    }
}

.search {
    display: flex;
    padding: 1rem;
    align-items: center;
    width: 60%;

    .search-btn {
        width: 68px;
        height: 55px;
        background: url(@/assets/img/search.png) no-repeat;
        background-size: contain;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        &:hover {
            background: url(@/assets/img/search-hover.png) no-repeat;
            background-size: contain;
            animation: jello 0.5s both;
        }
    }

    .input-search {
        margin-right: 1rem;
    }
}
</style>