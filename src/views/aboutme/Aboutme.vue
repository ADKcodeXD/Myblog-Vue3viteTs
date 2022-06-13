<template >
    <div class="container">
        <div class="out" id="out">
            <div class="avatar" id="avatar">
                <MyElimage :img="Touxiang" />
            </div>
            <h1 class="welcome" id="welcome">你好 访客</h1>
            <h2 class="adk" id="adk">我叫ADK</h2>
            <div class="profile" id="profile">
                <p class="label-1" :data-index="0">我来自 广东东莞 今年22岁 是一个兴趣比较广泛的人</p>
                <p class="label-1" :data-index="1">虽说兴趣广泛，但是可能也就是~~局限于网络吧 我有接触过制作视频，平面设计，有接触过编程。接触过编曲(弃坑了)，也接触过各种不同技能
                </p>
                <p class="label-1" :data-index="2">总而言之 我目前还是会比较喜欢 ~~~ 前端开发？</p>
                <p class="label-1" :data-index="3">目前我还是比较喜欢去研究编程相关的，这是我的<a href="" target="_blank">github</a></p>
                <p class="label-1" :data-index="4">说说博客 这个博客在2022年年初有了设计念头 当时只是想着练习相关的技术</p>
                <p class="label-1" :data-index="4">后面再2022.3月 我将博客的大体搭建好，当时的设计风格是比较丑的</p>
                <p class="label-1" :data-index="4">经过五月份到六月份近半个月的重构 终于成型，并且制定了相关的风格</p>
                <p class="label-1" :data-index="5">在前端方面，我认为我目前会倾向注重设计相关的方面。当然，我对于代码以及逻辑的设计上也是很重视的。</p>
                <p class="label-1" :data-index="6">总而言之，如果你喜欢我的项目，可以给我去github项目给我点颗星星~</p>
                <p class="label-1" :data-index="7">也可以去<RouterLink to="/messageboard">留言板</RouterLink>给我留言</p>
                <p class="label-1" :data-index="8">当然，更加可以在本网站注册账号并发送文章（大欢迎~）</p>
                <p class="label-1" :data-index="9">写于2022.6.13 in Foshan </p>
            </div>
            <div class="logo">
                <div class="logo-img">
                    <MyElimage :img="Logo" />
                </div>
                <p class="logo2" :data-index="1">ADK-blog 一款基于vue3和Vite设计的个人博客~</p>
                <p class="logo2" :data-index="2">开源地址:<a href="https://github.com/ADKcodeXD/Myblog-Vue3viteTs"
                        target="_blank">https://github.com/ADKcodeXD/Myblog-Vue3viteTs</a></p>
            </div>
            <div class="sns" id="sns">
                <p class="sns-tip">以下是我的所有社交媒体账号</p>
                <ul>
                    <li class="sns-label" :data-index="0">
                        <SvgIcon name="wenzi" class="svg" />
                        <p>ADKinsoMaD</p>
                    </li>
                    <li class="sns-label" :data-index="1">
                        <SvgIcon name="wenzi" class="svg" />
                        <p>ADKinsoMaD</p>
                    </li>
                    <li class="sns-label" :data-index="2">
                        <SvgIcon name="wenzi" class="svg" />
                        <p>ADKinsoMaD</p>
                    </li>
                    <li class="sns-label" :data-index="3">
                        <SvgIcon name="wenzi" class="svg" />
                        <p>ADKinsoMaD</p>
                    </li>
                    <li class="sns-label" :data-index="4">
                        <SvgIcon name="wenzi" class="svg" />
                        <p>ADKinsoMaD</p>
                    </li>
                    <li class="sns-label" :data-index="5">
                        <SvgIcon name="wenzi" class="svg" />
                        <p>ADKinsoMaD</p>
                    </li>
                </ul>
            </div>
            <div class="money" id="money">
                <p class="money-tip">如果可以的话(乞讨) 
                    你可以通过以下途径赞赏我~</p>
                <div class="pay">
                    <div class="zhifubao">
                        <MyElimage :img="Zhifubao" />
                    </div>
                    <div class="weixin">
                        <MyElimage :img="Wechat" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Touxiang from './touxiang.jpg';
import Logo from '@/assets/img/new-logo.png';
import Wechat from './wechat.png';
import Zhifubao from './zhifubao.jpg';
import gsap from 'gsap';
onMounted(() => {
    let timeline = gsap.timeline({ defaults: { duration: 1 } });
    gsap.set("#avatar", { y: '50%', scale: 0 })
    gsap.set(".logo-img", { scale: 0 })
    gsap.set("#welcome", { y: '50%' })
    gsap.set("#adk", { y: '50%' })
    gsap.set(".label-1", { y: 10, opacity: 0 });
    gsap.set(".sns-label", { scale: 0, rotateZ: -90 })
    timeline.to("#avatar", { opacity: 1, scale: 1, ease: "elastic.out(1, 0.4)", duration: 1.5 })
        .to("#avatar", { y: 0, ease: "power4.out", opacity: 1 })
        .to("#welcome", { y: 0, ease: "power4.out", opacity: 1 }, "-=0.4")
        .to("#adk", { y: 0, ease: "power4.out", opacity: 1 }, "-=0.6")
        .to(".label-1", { y: 0, ease: "power1.out", opacity: 1, duration: 1, delay: (index) => 0.2 * index }, "-=0.0")
        .to(".logo-img", { opacity: 1, ease: "elastic.out(1, 0.4)", scale: 1, y: 0 })
        .to(".logo2", { y: 0, ease: "power1.out", opacity: 1, duration: 1, delay: (index) => 0.2 * index })
        .to(".sns-tip", { y: 0, ease: "power1.out", opacity: 1, duration: 1 })
        .to(".sns-label", { y: 0, ease: "elastic.out(1, 0.4)", opacity: 1, duration: 1, rotateZ: 0, scale: 1, delay: (index) => 0.2 * index })
        .to(".money-tip",{ y: 0, ease: "power1.out", opacity: 1, duration: 1 })
        .to(".zhifubao",{ y: 0, ease: "power1.out", opacity: 1, duration: 1 })
        .to(".weixin",{ y: 0, ease: "power1.out", opacity: 1, duration: 1 })
})

</script>
<style lang="less" scoped>
@import url(./Aboutme.less);
</style>