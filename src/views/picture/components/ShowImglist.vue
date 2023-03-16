<template>
  <div class="show-img">
    <div class="item" ref="item">
      <ElScrollbar class="image">
        <MyElimage :img="propsItem.url" @click="showPreview = true" :zip="4" />
      </ElScrollbar>
      <div class="info">
        <div class="up">
          <p class="title">{{ propsItem.title }}</p>
          <p class="summary">{{ propsItem.summary }}</p>
          <ElTag effect="dark" class="tag">
            {{ PicTag[propsItem.tag] }}
          </ElTag>
          <p>点击可查看大图</p>
        </div>
        <div class="down">
          <ul class="icon-group">
            <li><i class="iconfont icon-fenxiang"></i></li>
            <li><i class="iconfont icon-xiazai"></i></li>
            <li @click="likePicFn"><i class="iconfont icon-good"></i></li>
          </ul>
          <div class="author">
            <div class="inner">
              <div class="avatar">
                <MyElimage :img="propsItem.author.avatar" :zip="1" />
              </div>
              <div class="detail">
                <p class="authorname">{{ propsItem.author.nickname }}</p>
                <p class="time">发布于{{ propsItem.createTime }}</p>
              </div>
            </div>
            <div class="right">
              <div class="tag" v-if="propsItem.origin === 1">
                <ElTag type="success">原创</ElTag>
              </div>
            </div>
          </div>
          <div class="button-group">
            <div class="button" @click="switchPic(-1)">上一张</div>
            <div class="button" @click="switchPic(1)">下一张</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <template v-if="showPreview">
    <ElImageViewer
      v-if="showPreview"
      :infinite="false"
      :url-list="urlList"
      :hide-on-click-modal="true"
      :teleported="false"
      @close="showPreview = false"
      class="imgpreview"
      :z-index="10000"
    >
    </ElImageViewer>
  </template>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { PicTag } from '@/interface/EnumExport'
import { likePic } from '@/api/pic'
const props = defineProps({
  activeItem: {
    type: Object as PropType<PicVo>,
    default: () => {
      return {}
    }
  },
  picList: {
    type: Object as PropType<PicVo[]>,
    default: () => {
      return []
    }
  },
  index: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['close'])
const showPreview = ref(false)
const urlList = computed(() => {
  return [propsItem.value.url]
})
const item = ref(null)
const propsItem = ref(props.activeItem)
const propsIndex = ref(props.index)
const switchPic = (cnt: number) => {
  if (propsIndex.value + cnt > props.picList.length - 1) {
    ElMessage.error('已经没有啦')
    return
  }
  if (propsIndex.value + cnt < 0) {
    ElMessage.error('这已经是第一张啦~')
    return
  }
  propsItem.value = props.picList[propsIndex.value + cnt]
  propsIndex.value = propsIndex.value + cnt
}
const likePicFn = async () => {
  const { data } = await likePic(propsItem.value.id)
  if (data.code !== 48484) {
    ElMessage.success('点赞成功')
  } else ElMessage.error(data.msg)
}
onClickOutside(item, (e: any) => {
  let regex = new RegExp(/el-[\s\S]*/g)
  let className = e.target.className
  let parentNode = e.target.parentNode
  while (!className || typeof className != 'string') {
    if (className) className = parentNode.className
    parentNode = parentNode.parentNode
  }
  if (!regex.test(className)) {
    emit('close')
  }
})
onMounted(() => {
  document.body.style.overflowY = 'hidden'
})
onBeforeUnmount(() => {
  document.body.style.overflowY = 'unset'
})
</script>
<style lang="less" scoped>
@import url(../styles/ShowImglist.less);
</style>
