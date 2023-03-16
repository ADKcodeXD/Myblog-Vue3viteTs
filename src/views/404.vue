<template>
  <div class="container">
    <div>
      <MyElimage :img="notfound" />
    </div>
    <p class="title">404 NOT-found</p>
    <p class="tip">很抱歉 你所要访问的页面不存在</p>
    <p class="back">
      点击这里返回<span class="home" @click="$router.push('/index')">主页</span>~ 或者去<span
        class="login"
        @click="$router.push('/login')"
        >登录</span
      >
    </p>
  </div>
</template>
<script lang="ts">
export default { name: '404Page' }
</script>
<script setup lang="ts">
import notfound from '@/assets/img/404 page notfound.png'
</script>
<style lang="less" scoped>
.container {
  .flexbox(column);
  color: @textColor;
  .font-normal();
  .title {
    font-size: @very-big-text;
  }
  .tip {
    font-size: @big-text;
    color: @tipTextColor;
  }
  .back {
    font-size: @small-text;
    .home {
      cursor: pointer;
      color: @warnningTextColor;
    }
    .login {
      cursor: pointer;
      color: @linkColor;
    }
  }
}
</style>
