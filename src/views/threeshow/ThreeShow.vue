<template>
  <div>
    <div class="loading" v-if="loading">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
      <div class="text">模型加载中~</div>
      <div class="enterblog" @click="$router.push('/index')">等不及了？直接进入~</div>
    </div>
    <div class="scene" id="scene"></div>
    <div class="info">
      <ul class="list">
        <li @click="$router.push('/index')"><span>首页</span></li>
        <li @click="pushgithub">github</li>
        <li @click="$router.push('/index/articlelist')">文章</li>
        <li @click="$router.push('/index/messageboard')">留言板</li>
      </ul>
    </div>
    <div class="big-title">
      <h1>欢迎来到ADK-blog</h1>
      <p class="pc">使用鼠标可以操纵此页面哦~</p>
      <div class="mobile">
        <p>直接进入（使用pc可以体验该场景）</p>
        <el-button @click="$router.push('/index')" type="success" round plain class="btn"
          >进入博客</el-button
        >
      </div>
    </div>
    <div class="detail">
      <p>页面构建by three.js with ts</p>
      <p>项目源码链接:此处跳转</p>
    </div>
    <div class="aboutme" ref="aboutmeref">
      <div class="title">
        <i class="iconfont icon-left" @click="hideaboutme"></i>
        <h2 class="my-info-title">自我介绍</h2>
      </div>
      <div class="content">
        <!-- 头像以及自我介绍 -->
        <div class="top">
          <div class="avatar">
            <img src="@/assets/img/logo.png" alt="" class="avatar" />
          </div>
          <div class="name">
            <p class="my-name">ADKCodeXD</p>
            <div class="infomation">
              <div class="dizhi">
                <i class="iconfont icon-dizhi"></i>
                <p>广东 东莞/佛山</p>
              </div>
              <div class="youxiang">
                <i class="iconfont icon-mail"></i>
                <p>790532173@qq.com</p>
              </div>
              <div class="job">
                <i class="iconfont icon-nansheng"></i>
                <p>前端工程师</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 主体信息 -->
        <div class="maininfo">
          <div class="ziwojieshao">
            <h1>简介</h1>
            <el-divider></el-divider>
            <p><span>无论</span>您是面试官 或是hr 还是访客，总之先说一句~非常欢迎您的到访</p>
            <p>我叫肖逍遥~是一名前端初学者，来自广东的佛山科学技术学院，就读计算机专业</p>
            <p>
              关于前端，我认为我的认识还比较浅显~不过我目前主要使用的是<span>Vue3</span>这个框架，另外我对于前端的<span>可视化技术</span>比较感兴趣，你现在看到的这个页面就是我使用<span>threejs</span>所构建的
            </p>
            <p>
              除了前端之外呢，我比较喜欢制作一些视频，主要类型是二次元的<a
                href="https://baike.baidu.com/item/mad/2306460?fr=aladdin"
                target="_blank"
                >静止系mad</a
              >
              对于剪辑也有所涉猎，如果你对此感兴趣，可以<a
                href="https://space.bilibili.com/2988768"
                target="_blank"
                >点击这里</a
              >，查看我的bilibili空间
            </p>
            <p>
              因此，除了前端之外，我也掌握了许多乱七八糟的技能，例如ae，ps，pr，也学习过三维软件：C4D，Blender，游戏引擎：UE4.同时我也掌握了一些后端相关的语言，例如python，java等~
            </p>
            <p>
              这个博客也是我的一个比较早期的想法，后面技术成熟了才得以实现~其实更像是一个个人网站吧~也在想着不断的往里面加上更多的东西。
            </p>
            <p>
              虽然接触过很多视频相关的软件和技能，不过相对于视频，我还是想成为一个技术人员，希望以后能在技术的道路上不断发展吧~
            </p>
            <p class="date">2022.3.2 22:04 于佛山</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Base3D from '@/utils/Base3d';
let loading = ref(true);
let aboutmeref = ref<HTMLElement>();

const hideaboutme = () => {
  if (aboutmeref.value) {
    aboutmeref.value.style.opacity = '0';
    aboutmeref.value.style.transform = 'translateX(-100%)';
  }
};
const pushgithub = () => {
  window.location.href = 'https://github.com/ADKcodeXD';
};
let base3d: Base3D | null = null;
onMounted(async () => {
  base3d = new Base3D('.scene');
  await base3d.addMesh('box');
  await base3d.setEnvMap('je_gray_park_1k');
  loading.value = false;
  base3d.setChildRotationAnimation('圆环面');
  base3d.setChildRotationAnimation('圆环面1');
  base3d.setLabel('aboutme', '关于我', { x: 20, y: 16, z: 13 });
  base3d.setLabel('gotoblog', '进入博客', { x: -15, y: 16, z: -20 });
  base3d.setLabel('gotofirst', '欢迎(初版)', { x: 20, y: -18, z: 0 });
  base3d.setLabel('gotologin', '去登录', { x: -20, y: -20, z: 15 });
});
onBeforeUnmount(() => {
  base3d?.clear();
  base3d = null;
});
</script>

<style lang="less" scoped>
@import url(./threeshow.less);

.loading {
  position: absolute;
  background-color: rgb(1, 95, 150);
  z-index: 20;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    color: white;
    margin-top: 10px;
  }

  .enterblog {
    color: white;
    cursor: pointer;
  }
}

.spinner {
  width: 70px;
  height: 60px;
  text-align: center;
  font-size: 10px;
  background-color: rgb(1, 95, 150);
}

.spinner > div {
  background-color: #67cf22;
  height: 100%;
  width: 6px;
  display: inline-block;
  margin-right: 5px;
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }

  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>
