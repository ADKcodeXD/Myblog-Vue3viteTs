<template>
    <div class="container myscrollbar">
        <div class="title">
            <div class="title-main">
                <div>
                    <h2>这里是画廊</h2>
                    <p>欢迎您上传你喜欢的图片哦~</p>
                    <small>目前画廊有{{ total }}张图片</small>
                </div>
                <div class="pick">
                    <div class="pick-inner">
                        <p>按板块筛选</p>
                        <el-select v-model="tag" class="m-2" placeholder="Select">
                            <el-option v-for="item, index in 6" :key="item" :label="PicTag[index]" :value="index" />
                        </el-select>
                    </div>
                    <div class="pick-inner">
                        <p>只看原创</p>
                        <el-switch v-model="isOrigin" inline-prompt active-text="是" inactive-text="否" :active-value="1"
                            :inactive-value="0" />
                    </div>
                    <div class="pick-inner">
                        <p>排序</p>
                        <i class="iconfont icon-good" :class="{ active: orderRole === 'like' }"
                            @click="orderRole = 'like'"></i>
                        <i class="iconfont icon-riqi" :class="{ active: !orderRole }"
                            @click="orderRole = undefined"></i>
                    </div>
                </div>
            </div>
            <div class="post" @click="() => isDialogShow = true">
                投稿
            </div>
        </div>
        <ElDivider />
        <div class="grid" ref="imgcontainer">
            <AdkEmpty v-if="!isLoading && picList.length <= 0 && !isAjaxLoading" />
            <div class="grid-item" v-for="item, index in picList" :key="item.id" @click="imgShowFn(index)">
                <div class="up">
                    <MyElimage :img="`${item.url}`" @load="loaded" :zip="2" />
                </div>
                <div class="info">
                    <div class="up-info">
                        <div>
                            <p class="title">{{ item.title }}</p>
                            <p class="desc">{{ item.summary }}</p>
                        </div>
                        <div class="likes">
                            <i class="iconfont icon-good"></i>
                            <p>{{ item.likes }}</p>
                        </div>
                    </div>
                    <div class="author">
                        <div class="inner">
                            <div class="avatar">
                                <MyElimage :img="item.author.avatar" :zip="1" />
                            </div>
                            <p class="authorname">{{ item.author.nickname }}</p>
                        </div>
                        <div class="right">
                            <div class="tag">
                                <ElTag type="success" v-if="item.origin === 1">原创</ElTag>
                                <ElTag type="" effect="dark">
                                    {{ PicTag[item.tag] }}
                                </ElTag>
                            </div>
                            <p class="time">发布于{{ item.createTime }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <LoadingAnime v-if="isLoading || isAjaxLoading" style="position:absolute;
            bottom: 10px;left: 50%;transform: translateX(-50%);" />
            <p class="bottom" v-if="total <= pageParams.page * pageParams.pagesize &&
            !isLoading && !isAjaxLoading" ref="bottomText">
                已经没有了哦~
            </p>
        </div>
    </div>
    <PostImg :isDialogShow="isDialogShow" @flushImage="flushImage" @close="isDialogShow = false" />
    <ShowImglist v-if="imgShow" :activeItem="activeItem" :picList="picList" @close="imgShow = false"
        :index="imgShowIndex" />
</template>
<script setup lang="ts" >
import PostImg from './components/PostImg.vue';
import ShowImglist from './components/ShowImglist.vue';
import { PicTag } from '@/interface/EnumExport';
import { useImageLayout, usePictureMethod, usePictureState } from '@/hooks/usePicture';
const { picList, total, activeItem, pageParams,
    imgShowIndex, imgShow, isAjaxLoading,
    isLoading, isDialogShow, orderRole,
    isOrigin, tag, imgcontainer } = usePictureState();
const { layoutImage } = useImageLayout();
const { loaded,
    imgShowFn,
    flushImage, } = usePictureMethod(layoutImage,
        imgcontainer, isLoading, pageParams, orderRole,
        isOrigin, tag, isAjaxLoading, total, picList, activeItem,
        imgShowIndex, imgShow);
</script>
<style lang="less" scoped>
@import url(./styles/picture.less);

:deep(.loading) {
    height: unset;
}
</style>
