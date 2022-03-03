<template>
  <div
    class="my-info"
    @mouseenter="isInfoshow = true"
    @mouseleave="isInfoshow = false"
  >
    <h2 style="font-size: 20px; font-weight: 100; text-align: center">
      关于我
    </h2>
    <el-divider></el-divider>
    <div class="main">
      <div class="content">
        <div class="avatar">
          <img src="./img/touxiang.jpg" alt="" />
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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    let isInfoshow = ref(false);
    return { isInfoshow };
  },
});
</script>


<style lang="less" scoped>
@import url("../styles/pc/my-info-pc.less");
</style>