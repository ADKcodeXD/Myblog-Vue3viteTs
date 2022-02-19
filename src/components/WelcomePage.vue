<template>
  <div class="container">
    <!-- 头部条 -->
    <div class="navbar">
      <div class="logo">
        <img src="@/assets/img/WebBlog.png" alt="logo" />
      </div>
      <ul class="detail">
        <li><a>文章</a></li>
        <li><a>关于我</a></li>
        <li><a>项目地址</a></li>
      </ul>
    </div>
    <div class="anime"></div>
    <div class="sanjiao">
      <div class="box1"></div>
      <div class="box2"></div>
      <div class="box3"></div>
    </div>
    <div class="title">
      <p class="main-title">
        <span style="color: rgb(65, 154, 255)">WEB</span> BLOG
      </p>
      <p class="sub-title">欢迎来到我的博客</p>
      <el-button
        @click="$router.push('/')"
        round
        type="success"
        size="large"
        plain
        >点击进入</el-button
      >
    </div>
    <div class="iconlist">
      <ul>
        <li>
          <a href="https://github.com/ADKcodeXD" target="_blank"
            ><i class="iconfont icon-github"></i
          ></a>
        </li>
        <li>
          <a href=""><i class="iconfont icon-qq"></i></a>
        </li>
        <li>
          <a href=""><i class="iconfont icon-weixin"></i></a>
        </li>
        <li>
          <a href="https://space.bilibili.com/2988768" target="_blank"
            ><i class="iconfont icon-bilibili-line"></i
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>


<style lang="less" scoped>
@keyframes background {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -2000px 0;
  }
}
@keyframes in-right {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes in-left {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.container {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  overflow-x: hidden;
  background-image: url(@/assets/img/background.png);
  background-size: contain;
  animation: background 120s linear infinite;

  .navbar {
    width: 100%;
    height: 93px;
    background-color: #ff9f9f;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 260px;
    }
    .detail {
      display: flex;
      font-size: 20px;
      li {
        color: white;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
  .anime {
    top: 0;
    left: 0;
    width: 776px;
    height: 100%;
    z-index: 2;
    position: absolute;
    background: url(@/assets/img/women.png) no-repeat;
    background-size: cover;
    transform-origin: 0 100%;
    transition: all ease 1s;
    animation: in-right 2s ease;
    &:hover {
      transform: scale(105%, 105%);
    }
  }
  .sanjiao {
    width: 805px;
    height: 836px;
    position: absolute;
    overflow: hidden;
    bottom: 0;
    right: 0;
    .box1 {
      width: 1100px;
      height: 776px;
      position: absolute;
      transform: translateX(494px) translateY(225px) rotateZ(131deg);
      bottom: 0;
      right: 0;
      z-index: -1;
      background-color: #54b3fc;
    }
    .box2 {
      width: 1100px;
      height: 776px;
      position: absolute;
      transform: translateX(572px) translateY(225px) rotateZ(131deg);
      bottom: 0;
      right: 0;
      z-index: -1;
      background-color: #989898;
    }
    .box3 {
      width: 1100px;
      height: 776px;
      position: absolute;
      transform: translateX(668px) translateY(225px) rotateZ(131deg);
      bottom: 0;
      right: 0;
      z-index: -1;
      background-color: #ff2960;
    }
  }
  .title {
    position: absolute;
    right: 15px;
    top: 53%;
    transform: translateY(-50%);
    text-align: right;
    color: white;
    font-size: 76px;
    .main-title {
      animation: in-left 1s 0.5s;
      animation-fill-mode: both;
    }
    .sub-title {
      animation: in-left 1s 1s;
      animation-fill-mode: both;
      font-size: 30px;
    }
  }
  .iconlist {
    position: absolute;
    bottom: 0;
    right: 10px;
    ul {
      display: flex;
      .iconfont {
        font-size: 40px;
        color: white;
      }
      li {
        margin-right: 10px;
      }
    }
  }
}
</style>