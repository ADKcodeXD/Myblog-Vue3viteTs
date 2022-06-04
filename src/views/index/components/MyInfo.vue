<template>
  <div
    class="my-info"
    @mouseenter="isInfoshow = true"
    @mouseleave="isInfoshow = false"
  >
    <div class="tw-w-28 tw-my-2">
      <MyElimage :img="Aboutme" />
    </div>
    <el-divider class="tw-my-5"></el-divider>
    <div class="main">
      <div class="content">
        <div class="avatar">
          <img :src="Avatar" alt="" />
        </div>
        <p class="name">ADKcodeXD</p>
      </div>
      <div class="info-detail" v-if="isInfoshow">
        <div class="info">
          <p>联系方式</p>
          <p class="email">
            <i class="iconfont icon-xiaoxizhongxin"></i>790532173@qq.com
          </p>
          <p class="birthday">
            <i class="iconfont icon-shengrix"></i>2000.04.30
          </p>
          <p>一个爱好做视频的程序猿，design your life</p>
        </div>
        <div class="lianxiwo">
          <div class="jishuzhan">
            <p>目前使用技术栈：</p>
            <ul>
              <li><i class="iconfont icon-vue"></i></li>
              <li><i class="iconfont icon-java"></i></li>
              <li><i class="iconfont icon-springboot"></i></li>
              <li><i class="iconfont icon-javascript"></i></li>
              <li></li>
            </ul>
          </div>
          <div class="github">
            <a
              >github链接：<a
                href="https://github.com/ADKcodeXD"
                target="_blank"
                >ADKcodeXD</a
              ></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '@/assets/img/logo.png';
import Aboutme from '@/assets/img/about-me.png';

let isInfoshow = ref(false);
</script>


<style lang="less" scoped>
@import url("../styles/my-info-pc.less");
</style>