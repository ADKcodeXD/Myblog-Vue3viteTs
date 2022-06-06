<template>
  <el-image :src="img" fit="cover" style="width: 100%; height: 100%; " lazy>
    <template #placeholder>
      <div class="gray">
        <LoadingAnime />
      </div>
    </template>
    <template #error>
      <div class="tw-w-fill">
        <img v-if="notFoundType === 'fang'" class="tw-w-fill tw-h-fill" src="@/assets/img/404img.jpg" />
        <img v-if="notFoundType === '3:4'" class="tw-w-fill tw-h-fill" src="@/assets/img/404img600.jpg" />
        <img v-if="notFoundType === '3:1'" class="tw-w-fill tw-h-fill" src="@/assets/img/404img1200.jpg" />
      </div>
    </template>
  </el-image>
</template>

<script lang="ts" setup>
defineProps({
  /**
   * 传入图片链接url
   */
  img: {
    type: String,
    require: true
  },
  /**
   * 加载失败要显示图片 默认是1:1的方形图 可选3:4 3:1 fang 
   */
  notFoundType: {
    type: String,
    default: 'fang'
  }
});
</script>


<style scoped lang="less">
.gray {
  background-color: rgb(255, 255, 255);
  height: 100%;
  width: 100%;
  .flexbox(column);
  overflow: hidden;
}
</style>