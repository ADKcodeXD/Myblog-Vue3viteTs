<template>
  <div class="tw-my-3">
    <!-- 选择的菜单 可以删除 -->
    <div class="tw-flex">
      <p class="label-width tw-flex-shrink-0">已选标签</p>
      <div
        class="tw-border-2 tw-rounded-lg tw-flex-1 tw-flex tw-items-center tw-p-2 tw-justify-between"
      >
        <div class="tw-flex tw-flex-wrap">
          <ElTag
            closable
            v-for="tag in choosedTag"
            :key="tag"
            @close="removeTag(tag)"
            class="tw-m-1"
            >{{ typeof tag === 'object' ? tag.tagName : tag }}</ElTag
          >
        </div>
        <p class="tw-flex-shrink-0 limit">{{ choosedTag.length }}/{{ limit }}</p>
      </div>
    </div>
    <!-- 待选 -->
    <div class="tw-flex tw-my-4">
      <p class="label-width tw-flex-shrink-0">可选标签</p>
      <div class="tw-flex tw-flex-wrap" :key="'div'">
        <transition-group
          mode="out-in"
          name="anime-class"
          tag="ul"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <ElTag
            effect="dark"
            class="tw-cursor-pointer tw-m-1 tag-item-class"
            v-for="(tag, index) in chooseOptionsFilter"
            :data-index="index"
            :key="tag.name || tag.tagName"
            @click="setTag(tag)"
          >
            {{ tag.name || tag.tagName }}<span v-if="tag.count">({{ tag.count }})</span>
          </ElTag>
          <div v-if="canAdd" class="tw-my-3">
            <el-input
              v-if="inputVisible"
              v-model="inputValue"
              ref="inputref"
              style="width: 5em"
              size="small"
              placeholder="标签名"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
              + 新增标签
            </el-button>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { gsap } from 'gsap'
import { ElInput, ElMessage } from 'element-plus'
import { useAddtag } from '@/hooks/useEdit'
const props = defineProps({
  /**
   * 接受一个数组 待选择标签的数组
   * 如果是一个对象数组 只选择里面的name
   */
  chooseOptions: {
    type: Object as PropType<Array<any>>,
    default: () => {
      return []
    }
  },
  /**
   * 传进来的数据 已经选好的tag 应该是一个字符串数组
   */
  choosedTag: {
    type: Object as PropType<Array<any>>,
    default: () => {
      return []
    }
  },
  /**
   * 限制最大能够选择的标签数
   */
  limit: {
    type: Number,
    default: 3
  },
  /**
   * 默认不分页 分页的话绑定一个分页按钮 而且发送一个事件 @page
   */
  isPage: {
    type: Boolean,
    default: false
  },
  /**
   * 如果可以新增标签 则传入true 发送一个事件 @newTag
   */
  canAdd: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['changeTag', 'addTag'])
let chooseOptionsFilter = computed(() => {
  return props.chooseOptions.filter(item => {
    return props.choosedTag.indexOf(typeof item === 'object' ? item.name : item) === -1
  })
})
const { inputVisible, inputValue, inputref, showInput, handleInputConfirm } = useAddtag(emit)
const setTag = (tag: any) => {
  if (props.choosedTag.length >= props.limit) {
    ElMessage.error('选择标签达到上限')
    return
  }
  props.choosedTag.push(tag.name ? tag.name : tag)
}
const removeTag = (tag: any) => {
  let index = props.choosedTag.indexOf(tag)
  if (index !== -1) {
    props.choosedTag.splice(index, 1)
  }
}
// 延迟动画 TODO:封装起来 统一调用
const beforeEnter = el => {
  el.style.opacity = 0
  el.style.transform = 'translateY(-10px)'
}
const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: '0',
    // delay: el.dataset.index * 0.05,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: '-20px',
    ease: 'power4.out',
    // delay: el.dataset.index * 0.05,
    onComplete: done
  })
}
</script>

<style lang="less" scoped>
.anime-class-leave-active {
  position: absolute;
}

.tag-item-class {
  transition: all 0.6s ease;
}
.limit {
  .font-normal();
}
.label-width {
  width: 100px;
  font-weight: 600;
}
</style>
