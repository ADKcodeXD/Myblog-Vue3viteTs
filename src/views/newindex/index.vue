<template>
    <div class="container-out">
        <div class="top" ref="body" :style="{ perspectiveOrigin: `${581 + xPos}px ${476 + yPos}px` }">
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(-20px,350px,0px)' }">
                    <div class="mian1"></div>
                    <div class="mian2"></div>
                    <div class="mian3"></div>
                    <div class="mian4"></div>
                    <div class="mian5"></div>
                    <div class="mian6"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(230px,350px,0px)' }">
                    <div class="mian1"></div>
                    <div class="mian2"></div>
                    <div class="mian3"></div>
                    <div class="mian4"></div>
                    <div class="mian5"></div>
                    <div class="mian6"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(-20px,100px,-100px)', zIndex: -1 }">
                    <h2>我的微信是Adkweixin-</h2>
                    <div class="mian1"></div>
                    <div class="mian2"></div>
                    <div class="mian3"></div>
                    <div class="mian4"></div>
                    <div class="mian5"></div>
                    <div class="mian6"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(335px, 67px, 85px)', zIndex: 10 }">
                    <h2>你好~~~ 被你找到啦wwww</h2>
                    <div class="mian1"></div>
                    <div class="mian2"></div>
                    <div class="mian3"></div>
                    <div class="mian4"></div>
                    <div class="mian5"></div>
                    <div class="mian6"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(738px, 381px, -812px)', zIndex: -1 }">
                    <h2>可以给我留个言吗~</h2>
                    <div class="mian1"></div>
                    <div class="mian2"></div>
                    <div class="mian3"></div>
                    <div class="mian4"></div>
                    <div class="mian5"></div>
                    <div class="mian6"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(628px, 114px, -339px)', zIndex: -10 }">
                    <div class="mian1"></div>
                    <div class="mian2"></div>
                    <div class="mian3"></div>
                    <div class="mian4"></div>
                    <div class="mian5"></div>
                    <div class="mian6"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(1000px, 0px, -698px)', zIndex: -10 }">
                    <div class="mian1"></div>
                    <div class="mian2"></div>
                    <div class="mian3"></div>
                    <div class="mian4"></div>
                    <div class="mian5"></div>
                    <div class="mian6"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(142px, 628px, -252px)', zIndex: -1 }">
                    <div class="mian1"></div>
                    <div class="mian2"></div>
                    <div class="mian3"></div>
                    <div class="mian4"></div>
                    <div class="mian5"></div>
                    <div class="mian6"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(443px, 746px, -111px)', zIndex: -1 }">
                    <div class="mian1"></div>
                    <div class="mian2"></div>
                    <div class="mian3"></div>
                    <div class="mian4"></div>
                    <div class="mian5"></div>
                    <div class="mian6"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(487px, 602px, 500px)', zIndex: 1 }">

                    <div class="mian1"></div>
                    <div class="mian2"></div>
                    <div class="mian3"></div>
                    <div class="mian4"></div>
                    <div class="mian5"></div>
                    <div class="mian6"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(287px, 497px, 786px)', zIndex: 10 }">
                    <h2>关注b站NotFoundUsser</h2>
                    <div class="mian1" style="filter:brightness(0.9);blur:(2px);"></div>
                    <div class="mian2" style="filter:brightness(0.9);blur:(2px);"></div>
                    <div class="mian3" style="filter:brightness(0.9);blur:(2px);"></div>
                    <div class="mian4" style="filter:brightness(0.9);blur:(2px);"></div>
                    <div class="mian5" style="filter:brightness(0.9);blur:(2px);"></div>
                    <div class="mian6" style="filter:brightness(0.9);blur:(2px);"></div>
                </div>
            </div>
            <div class="container">
                <div class="box" :style="{ transform: 'translate3d(560px, 540px, 796px)', zIndex: 1 }">
                    <div class="mian1" style="filter:brightness(0.9)"></div>
                    <div class="mian2" style="filter:brightness(0.9)"></div>
                    <div class="mian3" style="filter:brightness(0.9)"></div>
                    <div class="mian4" style="filter:brightness(0.9)"></div>
                    <div class="mian5" style="filter:brightness(0.9)"></div>
                    <div class="mian6" style="filter:brightness(0.9)"></div>
                </div>
            </div>
            <div class="logo">
                <img src="@/assets/img/new-logo.png" alt="logo">
                <p style="font-size: 20px;margin-bottom: 10px;">基于Vite和Vue3的个人博客</p>
                <AdkButton :spacing="0.6" type="success" :main-textsize="1.2" @click="$router.push('/index')">
                    進入博客
                    <template #endesc>
                        enter blog
                    </template>
                </AdkButton>
            </div>
            <ul class="icon-group">
                <li>
                    <a href="https://github.com/ADKcodeXD" target="_blank"><i class="iconfont icon-github"></i></a>
                </li>
                <li>
                    <a href="https://space.bilibili.com/2988768" target="_blank"><i
                            class="iconfont icon-bilibili-line"></i></a>
                </li>
                <li>
                    <a href="https://twitter.com/ADKinsoMaD" target="_blank"><i class="iconfont icon-tuite"></i></a>
                </li>
            </ul>
        </div>
    </div>

</template>
<script setup lang="ts">
import { useMouse } from "@vueuse/core";
const { x, y } = useMouse();
const body = ref<HTMLElement | null>(null);
const xPos = computed(() => {
    let res = 0;
    let halfVal = window.innerWidth / 2;
    res = x.value - halfVal;
    return res / 5;
})
const yPos = computed(() => {
    let res = 0;
    let halfVal = window.innerHeight / 2;
    res = y.value - halfVal;
    return res / 5;
})
</script>
<style lang="less" scoped>
@size: 200px;
@color :rgb(252, 252, 252);

@media screen and(min-width:320px) {
    .logo {
        width: 100%;
        left: 0;
        padding: 20px 0;
        height: auto;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'urafont';
        font-weight: 600;
        background-color: rgb(231, 231, 231);
        // right: 20px;
        top: 50%;
        transform: translateY(-50%);

        img {
            width: 300px;
        }
    }
}

@media screen and(min-width:960px) {
    .logo {
        width: 300px;
        right: 20px;
        left: unset;
        align-items: flex-end;
        background-color: unset;
    }
}

.mian(@color, @size) {
    position: absolute;
    border-radius: 10px;
    background-color: @color;
    width: @size;
    height: @size;
    transition: all 0.6s ease-in-out;
    z-index: 1;
    border: 4px solid rgb(255, 63, 63);
}

.container {
    position: absolute;
    transform-style: preserve-3d;

    &:hover {
        animation: move 1s ease infinite;

        .box {
            .mian {

                &1,
                &2,
                &3,
                &4,
                &5,
                &6 {
                    background-color: rgba(255, 146, 164, 0.315);
                }
            }
        }

    }
}

.container-out {
    position: absolute;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 20px;
    // overflow: hidden;
    background-color: rgb(87, 87, 87);
}

.top {
    position: absolute;
    top: 1vh;
    left: 1vw;
    right: 0;
    bottom: 0;
    width: 98vw;
    height: 98vh;
    perspective: 1200px;
    perspective-origin: 581px 476px;
    // transition: 0.4s perspective-origin cubic-bezier(0,.71,.63,.65);
    overflow: hidden;
    border-radius: 20px;
    background-color: rgb(255, 255, 255);

    .box {
        position: absolute;
        transform-style: preserve-3d;
        width: @size;
        height: @size;
        transform-origin: calc(@size / 2) calc(@size / 2);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-family: '幼圆';
        padding: 10px;

        .mian1 {
            .mian(@color, @size);
            transform: rotateX(90deg) translateZ(calc(@size / 2));
        }

        .mian2 {
            .mian(@color, @size);
            transform: rotateX(90deg) translateZ(calc(@size / 2 * -1));
        }

        .mian3 {
            .mian(@color, @size);
            transform: translateZ(calc(@size / 2 * -1));
        }

        .mian4 {
            .mian(@color, @size);
            transform: translateZ(calc(@size / 2));
        }

        .mian5 {
            .mian(@color, @size);
            transform: rotateY(90deg) translateZ(calc(@size / 2));
        }

        .mian6 {
            .mian(@color, @size);
            transform: rotateY(90deg) translateZ(calc(@size / 2 * -1));
        }
    }


    .icon-group {
        position: absolute;
        bottom: 2px;
        right: 2px;
        display: flex;

        li {
            margin: 1rem;
        }

        .iconfont {
            font-weight: 600;
            font-size: 20px;
            color: rgb(0, 0, 0);
        }

    }
}

@keyframes rotatebox {
    0% {
        transform: rotateX(0deg);
    }

    100% {
        transform: rotateX(360deg);
    }
}

@keyframes move {

    0%,
    100% {
        top: 0px;
    }

    25% {
        top: 20px;
    }

    75% {
        top: -20px;
    }
}
</style>