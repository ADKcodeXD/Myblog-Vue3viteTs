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
                        <el-switch v-model="isOrigin" inline-prompt active-text="是" inactive-text="否"
                            :active-value="1" :inactive-value="0" />
                    </div>
                    <div class="pick-inner">
                        <p>排序</p>
                        <i class="iconfont icon-good" :class="{active:orderRole==='like'}" @click="orderRole='like'"></i>
                        <i class="iconfont icon-riqi" :class="{active:!orderRole}" @click="orderRole=undefined"></i>
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
                    <MyElimage :img="item.url" @load="loaded" />
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
                                <MyElimage :img="item.author.avatar" />
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
import { getPics } from '@/api/pic';
import PostImg from './components/PostImg.vue';
import ShowImglist from './components/ShowImglist.vue';
import { PicTag } from '@/interface/EnumExport';
const imgcontainer = ref<HTMLElement>();
const isDialogShow = ref(false);
const isLoading = ref(false); //图片加载完成的标志
const isAjaxLoading = ref(false); //请求加载完成的标志
const imgShow = ref(false);
const imgShowIndex = ref(0);
const orderRole=ref<undefined|string>(undefined);
const tag=ref<undefined|number>(undefined);
const isOrigin=ref<number>(0);
const isChangeRule=ref(false);
const pageParams = {
    page: 1,
    pagesize: 10,
    orderRole: orderRole.value,
    tag: tag.value,
    isOrigin: isOrigin.value,
}
const picList = ref<PicVo[]>([]);
const total = ref(0);
const activeItem = ref<PicVo>();
// 上传后的增加图片的函数 
const flushImage = async () => {
    let historyPage = pageParams.page;
    pageParams.page = 1;
    pageParams.orderRole = undefined;
    pageParams.isOrigin=0;
    pageParams.tag=undefined;
    orderRole.value=undefined;
    isOrigin.value=0;
    tag.value=undefined;
    await getPicsFn();
    pageParams.page = historyPage;
    layout();
}
const getPicsFn = async () => {
    isAjaxLoading.value = true
    const { data } = await getPics(pageParams);
    total.value = data.data.length;
    if (pageParams.page > 1) {
        let res = [...picList.value, ...data.data.results];
        picList.value = [...new Set(res)];
    } else {
        //如果大于0 这时候估计就是上传后重新请求了 
        // 也要考虑 排序规则改变 如果排序规则改变了 则重新请求 并且排序规则改变 都需要将page重置为1
        if (picList.value.length > 0) {
            if (isChangeRule.value) {
                picList.value = data.data.results;
                console.log(data.data.results);
            } else {
                //此时第一个就更新好了
                let el = data.data.results.find(element => {
                    return picList.value.indexOf(element) === -1;
                });
                console.log("--------------上传线");
                console.log(data.data.results);
                picList.value.unshift(el);
            }
        } else {
            picList.value = data.data.results;
        }
    }
    isAjaxLoading.value = false
}
const imagePubu = (time: number) => {
    let timmer = null;
    return function () {
        if (timmer) {
            clearTimeout(timmer);
        }
        timmer = setTimeout(() => {
            let divList = imgcontainer.value.getElementsByClassName('grid-item');// 获取到需要布局显示的div容器
            const newDiv: HTMLElement[] = Array.from(divList) as HTMLElement[];
            const pageW = imgcontainer.value.clientWidth // 获取容器的宽度
            const divW = divList[0].clientWidth // 获取一个div容器的宽度
            const cols = Math.floor(pageW / divW) // 计算一行能够放几个div容器
            const arrH: number[] = [] // 用来存储每个div容器的高度;
            const gap = 8;
            // 循环div容器的数组
            newDiv.forEach((item, index) => {
                // 1. 对下标小于一行个数的div容器进行操作
                if (index < cols) {
                    arrH.push(item.clientHeight + gap * 2) // 将div容器的高度放入数组中
                    item.style.left = index * divW + index * gap * 2 + 'px';
                    item.style.top = 0 + 'px';
                    item.style.opacity = '1';
                } else {
                    let minH = Math.min(...arrH); // 获取到数组中最小的高度
                    let idx_min = arrH.indexOf(minH) // 查找到最小高度的下标
                    // newDiv[i].style.position = 'absolute';
                    item.style.left = newDiv[idx_min].style.left;
                    item.style.top = minH + gap + 'px';
                    // 最小列的高度 = 当前自己的高度 + 新容器的高度 + 间隙
                    arrH[idx_min] = minH + item.clientHeight + gap * 3;
                    item.style.opacity = '1';
                }
            })
            let MaxH = Math.max(...arrH);
            imgcontainer.value.style.height = MaxH + gap + 50 + 'px';//50预留给提示（图片没有了的提示）
            isLoading.value = false;
        }, time);
    }
}
const throttle = (time: number, fn: Function) => {
    let flag = false;
    return function () {
        if (flag) {
            return;
        }
        flag = true;
        let args = arguments;
        setTimeout(() => {
            flag = false;
            fn.call(this, args);
        }, time)
    }
}
const imgShowFn = (index: number) => {
    activeItem.value = picList.value[index];
    imgShow.value = true;
    imgShowIndex.value = index
}
const layout = imagePubu(200);
const getNext = () => {
    pageParams.page += 1;
    isLoading.value = true;
    getPicsFn();
    layout();
}
const loaded = () => {
    layout();
}
onMounted(() => {
    let netAjax = throttle(500, getNext);
    window.addEventListener('resize', layout);
    document.addEventListener('scroll', (e) => {
        if (imgcontainer.value) {
            let windowHeight; //窗口高度
            let scrollHeight = document.documentElement.scrollHeight; //总高度
            let scrollbar = document.body.scrollTop + document.documentElement.scrollTop; //已滚动的距离
            document.compatMode == "CSS1Compat" ?
                windowHeight = document.documentElement.clientHeight :
                windowHeight = document.body.clientHeight;
            let relative = 200 // 相对距离
            if (scrollbar + windowHeight >= scrollHeight - relative) {
                if (((pageParams.page + 1) * pageParams.pagesize) - pageParams.pagesize < total.value) {
                    netAjax();
                }
            }
        }
    })
    getPicsFn();
})

watch([isOrigin,tag,orderRole],async (newval)=>{
    pageParams.page=1;
    pageParams.isOrigin=isOrigin.value;
    pageParams.tag=tag.value;
    pageParams.orderRole=orderRole.value;
    isChangeRule.value=true;
    await getPicsFn();
    layout();
    isChangeRule.value=false;
})
</script>
<style lang="less" scoped>
@import url(./styles/picture.less);

:deep(.loading) {
    height: unset;
}
</style>
