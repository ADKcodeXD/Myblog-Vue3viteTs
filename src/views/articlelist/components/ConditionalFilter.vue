<template>
    <div class="bottom">
        <div class="orderBytime">
            <div class="label">
                <p class="label-rotate-6">時間</p>
                <span class="label-rotate-m4">&nbsp;Time</span>
            </div>
            <!-- 时间选择器 -->
            <el-date-picker v-model="time" type="month" placeholder="选择日期" @panel-change="pickDate">
            </el-date-picker>
        </div>
        <div class="orderByTag">
            <div class="left">
                <div class="label">
                    <p class="label-rotate-m4">標簽</p>
                    <span class="label-rotate-6">&nbsp;Tags</span>
                </div>
                <div class="tags" v-loading="tagloading">
                    <div class="alltag" :class="{ active: currentTagIds.includes(tag.id) }" @click="getTagId(tag)"
                        v-for="tag in options" :key="tag.id">
                        <span>{{ tag.tagName }}</span>
                    </div>
                    <div class="change-tag">
                        <span>{{ tagPageParams.page }}/{{
                                Math.ceil(tagTotal / tagPageParams.pagesize)
                        }}</span>
                        <AdkButton @click="changeTag" type="danger" :spacing="0.5" :mainTextsize="1.2" :subTextsize="1"
                            :x="9" :y="3.3">
                            換一批
                            <template #endesc>
                                Change Tag
                            </template>
                        </AdkButton>
                    </div>
                </div>
            </div>
            <transition @before-enter="beforeEnter" @enter="translateXenter">
                <div class="right" v-if="chooseTag.length > 0">
                    <div class="label">
                        <p class="label-rotate-6">已選</p>
                        <span class=" label-rotate-m4">&nbsp;choose</span>
                    </div>
                    <TagItem v-for="tag in chooseTag" :key="tag.id" :tagId="tag.id" :tagName="tag.tagName"
                        :closable="true" :is-click="false" @closeTag="getTagId(tag)" />
                </div>
            </transition>
        </div>
        <div class="order">
            <div class="label">
                <p class="label-rotate-4">排序</p>
                <span class="label-rotate-m6">&nbsp;Sort</span>
            </div>
            <div class="tags">
                <div class="alltag" @click="order('null', 0)" :class="{ active: currentOrder === 0 }">
                    默认
                </div>
                <div class="alltag" @click="order('view_counts', 1)" :class="{ active: currentOrder === 1 }">
                    最多阅读
                </div>
                <div class="alltag" @click="order('like_counts', 2)" :class="{ active: currentOrder === 2 }">
                    点赞数
                </div>
                <div class="alltag" @click="order('collect_counts', 3)" :class="{ active: currentOrder === 3 }">
                    收藏数
                </div>
                <div class="alltag" @click="order('comment_counts', 4)" :class="{ active: currentOrder === 4 }">
                    评论数
                </div>
                <div class="alltag" @click="order('a', 5)" :class="{ active: currentOrder === 5 }">
                    倒序
                </div>
            </div>
        </div>
        <div class="order">
            <div class="label">
                <p class="label-rotate-m4">板块</p>
                <span class="label-rotate-6">&nbsp;Sort</span>
            </div>
            <el-select v-model="pageParams.pannel" placeholder="选择板块">
                <el-option v-for="item, index in 8" :key="item" :label="ArticlePannel[index]" :value="index" />
            </el-select>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useArticleListConditional } from '@/hooks/ArticleList';
import { PropType } from 'vue';
import gsap from 'gsap';
import { useAnime } from '@/hooks/Anime';
import { ArticlePannel } from '@/interface/EnumExport';
const props = defineProps({
    pageParams: {
        type: Object as PropType<PageParams>,
        default: {}
    }
})
const emit = defineEmits(['changeConditional'])

const { changeTag,
    pickDate,
    getTagId,
    order,
    chooseTag,
    tagPageParams,
    time,
    tagTotal,
    currentTagIds,
    options,
    tagloading,
    currentOrder } = useArticleListConditional(props, emit);

const beforeEnter = (el) => {
    gsap.set(el, {
        x: -200,
    })
}
const {
    translateXenter,
} = useAnime();
</script>


<style lang="less" scoped>
@import url(../styles/ConditionalFilter.less);
</style>