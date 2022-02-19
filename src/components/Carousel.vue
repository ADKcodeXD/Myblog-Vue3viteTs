<template>
  <el-carousel ref="carousel" pause-on-hover v-loading="items.length === 0">
    <el-carousel-item
      v-for="item in items"
      style="display: block"
      :key="item.id"
    >
      <div class="content" @click="$router.push(`/article/${item.id}`)">
        <h2 class="title">{{ item.articleName }}</h2>
        <el-image :src="item.banner" fit="cover">
          <template #placeholder>
            <div class="image-slot">Loading<span class="dot">...</span></div>
          </template>
        </el-image>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script lang="ts">
import { Banner } from "@/interface/article";
import { PropType } from "@vue/runtime-core";
import ElCarousel from "element-plus/es/components/carousel";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Banner[]>,
      default: () => [],
    },
  },
  setup(props) {
    const carousel = ref<typeof ElCarousel>();
    onMounted(() => {
      setTimeout(() => {
        carousel.value?.setActiveItem(0);
      }, 500);
    });
    return { carousel };
  },
});
</script>

<style lang="less" scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.content {
  height: 300px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .el-image {
    width: 100%;
    height: auto;
    filter: brightness(0.7);
  }
  .title {
    position: absolute;
    bottom: 15px;
    left: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
    font-size: 40px;
    color: #fff;
    z-index: 1;
  }
}
</style>