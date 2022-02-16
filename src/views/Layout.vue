<template>
  <div class="cotainer">
    <!-- 头部 -->
    <TopNavBar />
    <!-- banner -->
    <div class="main">
      <!-- 导航 -->
      <!-- routerview -->
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <div class="boxgroup">
      <div class="box"></div>
      <div class="box2"></div>
      <div class="box4"></div>
      <div class="box3"></div>
      <div class="box5"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopNavBar from "@/components/TopNavBar.vue";
</script>

<style scoped  lang="less">
@keyframes leftboxin {
  0% {
    top: 1009px;
    left: -248px;
  }
  100% {
    top: 735px;
    left: 46px;
  }
}
@keyframes rightboxin {
  0% {
    top: 407px;
    left: 2184px;
  }
  100% {
    top: 560px;
    left: 1985px;
  }
}
#app{
  height: 100%;
}
.cotainer {
  width: 100%;
  position: relative;
  overflow: hidden;
  min-height: 768px;
  height: 100%;
  .boxgroup {
    .box {
      position: absolute;
      top: -360px;
      left: -682px;
      z-index: -10;
      width: 800px;
      height: 800px;
      transform: rotateZ(45deg) scale(1.8);
      background-color: #989898;
    }
    .box2 {
      position: absolute;
      top: 735px;
      left: 46px;
      z-index: -10;
      width: 100px;
      height: 100px;
      transform: rotateZ(45deg);
      background-color: #54b3fc;
      animation: leftboxin 1s cubic-bezier(0, 0.83, 0.34, 1) both;
    }
    .box3 {
      position: absolute;
      bottom: -450px;
      right: -682px;
      z-index: -10;
      width: 800px;
      height: 800px;
      transform: rotateZ(45deg) scale(1.8);
      background-color: #ff2960;
    }
    .box4 {
      position: absolute;
      top: 560px;
      left: 1985px;
      z-index: -10;
      width: 100px;
      height: 100px;
      transform: rotateZ(45deg) scale(1.2);
      background-color: #54b3fc;
      animation: rightboxin 1s cubic-bezier(0, 0.83, 0.34, 1) 0.3s both;
    }
    
  }
}
.main {
  margin: 0 auto;
  width: 80%;
}
</style>