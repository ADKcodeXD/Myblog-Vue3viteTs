<template>
  <div class="my-info">
    <h2 style="font-size:20px">关于我</h2>
    <hr />
    <div class="main">
      <div class="content">
        <div class="avatar">
          <img src="./img/touxiang.jpg" alt="" />
        </div>
        <div class="info">
          <p class="name">ADKcodeXD</p>
          <p class="email">
            <i class="iconfont icon-xiaoxizhongxin"></i>790532173@qq.com
          </p>
          <p class="birthday">
            <i class="iconfont icon-shengrix"></i>2000.04.30
          </p>
          <p>一个爱好做视频的程序猿，design your life</p>
        </div>
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
            <a>github链接：<a href="https://github.com/ADKcodeXD" target="_blank">ADKcodeXD</a></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>


<style lang="less" scoped>
.my-info {
  background-color: rgb(255, 255, 255);
  height: 320px;
  padding: 10px;
  margin-left: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  .main {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .content {
      display: flex;
      .avatar {
        width: 150px;
        height: 150px;
        flex-shrink: 0;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 150px;
          height: 200px;
          object-fit: cover;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 8px;
        .name {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
    .lianxiwo{
        margin-top: 10px;
        font-size: 20px;
        color: gray;
        .jishuzhan{
            display: flex;
            ul{
                display: flex;
                li{
                    margin-right: 5px;
                }
            }
        }
    }
  }
}
</style>