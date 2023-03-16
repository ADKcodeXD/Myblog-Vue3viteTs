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
interface MyElimageProp {
  img?: string // 图片的链接
  notFoundType?: string // 定义找不到的图片的比例和大小
  isLazy?: boolean // 是否懒加载
  zip?: number // 压缩级别 默认为0（不压缩）
}
const props = withDefaults(defineProps<MyElimageProp>(), {
  img: '',
  notFoundType: 'fang',
  isLazy: false,
  zip: 0
})
defineEmits(['load'])
const quatily = computed(() => {
  let quality = ''
  switch (props.zip) {
    case 0:
      break
    case 1:
      quality = '?imageMogr2/thumbnail/100x/quality/30'
      break
    case 2:
      quality = '?imageMogr2/thumbnail/300x/quality/30'
      break
    case 3:
      quality = '?imageMogr2/thumbnail/640x/quality/60'
      break
    case 4:
      quality = '?imageMogr2/thumbnail/1080x/quality/80'
      break
  }
  return quality
})
/**
 * 判断是否是oss图片 如果是才加上压缩参数
 */
const isAdd = computed(() => {
  let Reg = new RegExp(/^http:\/\/adkdream.top\/ossimage+/)
  if (Reg.test(props.img)) {
    return true
  } else return false
})
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
