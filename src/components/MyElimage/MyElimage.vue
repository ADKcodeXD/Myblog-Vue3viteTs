<template>
  <el-image :src="img + (isAdd ? quatily : '')" fit="cover" :lazy="isLazy" @load="$emit('load')">
    <template #placeholder>
      <div class="gray">
        <LoadingAnime />
      </div>
    </template>
    <template #error>
      <div class="gray">
        <img
          v-if="notFoundType === 'fang'"
          class="tw-w-fill tw-h-fill"
          src="@/assets/img/404img.jpg"
        />
        <img
          v-if="notFoundType === '3:4'"
          class="tw-w-fill tw-h-fill"
          src="@/assets/img/404img600.jpg"
        />
        <img
          v-if="notFoundType === '3:1'"
          class="tw-w-fill tw-h-fill"
          src="@/assets/img/404img1200.jpg"
        />
      </div>
    </template>
  </el-image>
</template>

<script lang="ts" setup>
const props = defineProps({
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
  },
  /**
   * 是否开启懒加载 默认开启懒加载
   */
  isLazy: {
    type: Boolean,
    require: true
  },
  /**
   * 可以节省图片加载资源
   * 指定最大宽度和图片质量
   * 默认几档 如果不传 则默认原图质量
   */
  zip: {
    type: Number,
    default: 0
  }
});
defineEmits(['load']);
const quatily = computed(() => {
  let quality = '';
  switch (props.zip) {
    case 0:
      break;
    case 1:
      quality = '?x-oss-process=image/resize,w_100/quality,q_30';
      break;
    case 2:
      quality = '?x-oss-process=image/resize,w_300/quality,q_30';
      break;
    case 3:
      quality = '?x-oss-process=image/resize,w_640/quality,q_60';
      break;
    case 4:
      quality = '?x-oss-process=image/resize,w_1080/quality,q_80';
      break;
  }
  return quality;
});
/**
 * 判断是否是oss图片 如果是才加上压缩参数
 */
const isAdd = computed(() => {
  let Reg = new RegExp(/^http:\/\/adkdream.top\/ossimage+/);
  if (Reg.test(props.img)) {
    return true;
  } else return false;
});
</script>

<style lang="less">
.gray {
  background-color: rgb(255, 255, 255);
  height: 100%;
  width: 100%;
  min-height: inherit;
  .flexbox(column);
}
.el-image {
  width: 100%;
  height: 100%;
  min-height: inherit;
}
</style>
