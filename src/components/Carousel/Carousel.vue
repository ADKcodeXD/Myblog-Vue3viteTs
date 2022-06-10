<template>
    <div class="carousel-container">
        <el-carousel ref="carousel" pause-on-hover v-loading="items.length === 0" :arrow="isM ? 'always' : 'hover'">
            <el-carousel-item v-for="item in items" style="display: block" :key="item.id">
                <div class="content" @click="$router.push(`/article/${item.id}`)">
                    <!-- <h2 class="title">{{ item.articleName }}</h2> -->
                    <div class="desc">
                        <p class="title">{{ item.articleName }}</p>
                        <p class="summary">{{ item.summary }}</p>
                        <ElTag effect="dark" v-for="tag in item.tags" :key="tag.id" type="success" class="tag" >
                            {{tag.tagName}}
                        </ElTag>
                    </div>
                    <MyElimage :src="item.banner" notFoundType="3:1" />
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>

</template>
<script lang="ts" setup>
import { isMobile } from "@/utils/mobile";
import { PropType } from "@vue/runtime-core";
import { ElCarousel } from "element-plus";

const props = defineProps({
    items: {
        type: Array as PropType<ArticleItemInfo[]>,
        default: () => [],
    },
});

const carousel = ref<typeof ElCarousel>();
let isM = ref(false);
isM.value = isMobile();
onMounted(() => {
    setTimeout(() => {
        carousel.value?.setActiveItem(0);
    }, 500);
});
</script>

<style lang="less" scoped>
@import url(./styles/Carousel.less);
</style>