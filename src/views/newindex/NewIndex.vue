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
          <div class="mian1" style="filter: brightness(0.9); blur: (2px)"></div>
          <div class="mian2" style="filter: brightness(0.9); blur: (2px)"></div>
          <div class="mian3" style="filter: brightness(0.9); blur: (2px)"></div>
          <div class="mian4" style="filter: brightness(0.9); blur: (2px)"></div>
          <div class="mian5" style="filter: brightness(0.9); blur: (2px)"></div>
          <div class="mian6" style="filter: brightness(0.9); blur: (2px)"></div>
        </div>
      </div>
      <div class="container">
        <div class="box" :style="{ transform: 'translate3d(560px, 540px, 796px)', zIndex: 1 }">
          <div class="mian1" style="filter: brightness(0.9)"></div>
          <div class="mian2" style="filter: brightness(0.9)"></div>
          <div class="mian3" style="filter: brightness(0.9)"></div>
          <div class="mian4" style="filter: brightness(0.9)"></div>
          <div class="mian5" style="filter: brightness(0.9)"></div>
          <div class="mian6" style="filter: brightness(0.9)"></div>
        </div>
      </div>
      <div class="logo">
        <img src="@/assets/img/new-logo.png" alt="logo" />
        <p style="font-size: 20px; margin-bottom: 10px">基于Vite和Vue3的个人博客</p>
        <AdkButton
          :spacing="0.6"
          type="success"
          :main-textsize="1.2"
          @click="$router.push('/index')"
        >
          進入博客
          <template #endesc> enter blog </template>
        </AdkButton>
      </div>
      <ul class="icon-group">
        <li>
          <a href="https://github.com/ADKcodeXD" target="_blank"
            ><i class="iconfont icon-github"></i
          ></a>
        </li>
        <li>
          <a href="https://space.bilibili.com/2988768" target="_blank"
            ><i class="iconfont icon-bilibili-line"></i
          ></a>
        </li>
        <li>
          <a href="https://twitter.com/ADKinsoMaD" target="_blank"
            ><i class="iconfont icon-tuite"></i
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMousePointer } from '@/hooks/useMouseAdk';
import { useMouse } from '@vueuse/core';
const { x, y } = useMouse();
const body = ref<HTMLElement | null>(null);
const { xPos, yPos } = useMousePointer(x, y, 5);
</script>
<style lang="less" scoped>
@import url(./styles/NewIndex.less);
</style>
