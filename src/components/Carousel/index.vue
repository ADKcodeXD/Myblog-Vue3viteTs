<template>
    <div class="carousel-container">
        <el-carousel ref="carousel" pause-on-hover v-loading="items.length === 0" :arrow="isM ? 'always' : 'hover'">
            <el-carousel-item v-for="item in items" style="display: block" :key="item.id">
                <div class="content" @click="$router.push(`/article/${item.id}`)">
                    <h2 class="title">{{ item.articleName }}</h2>
                    <MyElimage :src="item.banner" notFoundType="3:1" />
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>

</template>
<script lang="ts" setup>
import { isMobile } from "@/utils/mobile";
import { PropType } from "@vue/runtime-core";
import ElCarousel from "element-plus/es/components/carousel";

const props = defineProps({
    items: {
        type: Array as PropType<Banner[]>,
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
@media screen and(min-width:320px) {
    .carousel-container {
        margin: 0.5rem 0;
        background-color: #fff;
        .border-pinkline(1rem, 0px);
    }

    :deep(.el-carousel__container) {
        height: 200px;
    }
}

@media screen and(min-width:992px) {

    :deep(.el-carousel__container) {
        margin-top: 0;
        height: 340px;
    }
}

.content {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    .el-image {
        width: 100%;
        height: 100%;
        filter: brightness(0.7);
    }

    .title {
        position: absolute;
        top: 70%;
        left: 1.4286rem;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
        font-size: 2.8571rem;
        color: #fff;
        z-index: 1;
    }
}
</style>