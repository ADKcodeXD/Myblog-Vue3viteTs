<template>
    <div class="tw-my-2">
        <!-- 选择的菜单 可以删除 -->

        <div class="tw-flex ">
            <p class="label-width tw-flex-shrink-0">已选标签</p>
            <div class="tw-border-2  tw-w-3/5  tw-flex-1 tw-flex tw-items-center  tw-p-1 tw-justify-between">
                <div class="tw-flex tw-flex-wrap">
                    <ElTag closable v-for="tag in choosedTag" :key="tag" @close="removeTag(tag)" class="tw-m-1">{{
                        tag
                    }}</ElTag>
                </div>
                <p class="tw-flex-shrink-0">{{ choosedTag.length }}/{{ limit }}</p>
            </div>
        </div>
        <!-- 待选 -->
        <div class="tw-flex tw-my-4">
            <p class="label-width tw-flex-shrink-0">可选标签</p>
            <div class="tw-flex tw-flex-wrap" :key="'div'">
                <transition-group mode="in-out" name="anime-class" tag="ul" @before-enter="beforeEnter" @enter="enter"
                    @leave="leave">
                    <ElTag effect="dark" class="tw-cursor-pointer tw-m-1 tag-item-class"
                        v-for="tag, index in chooseOptionsFilter" :data-index="index" :key="tag.name"
                        @click="setTag(tag.name)">
                        {{ tag.name }}({{ tag.count }})
                    </ElTag>
                </transition-group>
            </div>
        </div>  </div>
</template>

<script setup lang="ts">import { PropType } from 'vue';
import { gsap } from "gsap";
import { ElMessage } from 'element-plus';
const props = defineProps({
    /**
     * 接受一个数组 待选择标签的数组
     * 如果是一个对象数组 只选择里面的name
     */
    chooseOptions: {
        type: Object as PropType<Array<any>>,
        default: []
    },
    /**
     * 传进来的数据 已经选好的tag 应该是一个字符串数组 
     */
    choosedTag: {
        type: Object as PropType<Array<any>>,
        default: []
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
})
const emit=defineEmits(['changeTag'])
let chooseOptionsFilter = computed(() => {
    return props.chooseOptions.filter(item => {
        return props.choosedTag.indexOf(typeof item === 'object' ? item.name : item) === -1
    })
})

const setTag = (name: string) => {
    if (props.choosedTag.length >= props.limit) {
        ElMessage.error('选择标签达到上限')
        return;
    }
    props.choosedTag.push(name)
    emit('changeTag',props.choosedTag)
}

const removeTag = (name: string) => {
    let index=props.choosedTag.indexOf(name)
    if(index!==-1){
        props.choosedTag.splice(index,1);
    }
    emit('changeTag',props.choosedTag)
}
// 延迟动画 TODO:封装起来 统一调用
const beforeEnter = (el) => {
    el.style.opacity = 0
    el.style.transform = 'translateY(-10px)'
}
const enter = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        translateY: '0',
        delay: el.dataset.index * 0.05,
        onComplete: done
    })
}
const leave = (el, done) => {
    gsap.to(el, {
        opacity: 0,
        translateY: '-10px',
        delay: el.dataset.index * 0.05,
        onComplete: done
    })
}
</script>

<style lang="less" scoped>
.anime-class-leave-active {
    position: absolute;
}

.tag-item-class {
    transition: all 0.8s ease;
}

.label-width {
    width: 100px;
}
</style>