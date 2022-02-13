<template>
  <div class="container">
    <div class="backimg"></div>
    <div class="backbutton" @click="$router.back()">
      <i class="iconfont icon-jiantou"></i>
      <h2 class="back">Back</h2>
    </div>
    <div class="project">
      <div class="nomean">
        <div class="box1">
          <div class="mask"></div>
          <div class="desc">
            <h2 class="title">视频作品</h2>
            <p class="descdetail">
              作为一名视频制作爱好者，本人有着一些关于动画的视频制作作品，该类作品均在
              bilibili进行投稿。
            </p>
            <div class="down">
              <p class="beizhu">制作软件:AE PR PS C4D等</p>
            </div>
          </div>
        </div>
      </div>
      <div class="nomean2">
        <div class="box2">
          <div class="mask"></div>
          <div class="desc">
            <div class="up">
              <h2 class="title">项目作品</h2>
              <p class="descdetail">
                前端制作的一些项目作品展示，使用到的主要技术栈有vue3+vue2，以及uniapp
              </p>
            </div>
            <div class="down">
              <p class="beizhu">主要使用技术:vue3 vue2 js typescript</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
@keyframes backgroundmove {
  0% {
    background-position: 350px -350px;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes back {
  0% {
    opacity: 1;
    transform: scale(1);
    left: -50px;
  }
  100% {
    opacity: 0.4;
    transform: scale(0.8);
    left: -80px;
  }
}
@keyframes downtoup {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
:deep(body) {
  height: 0;
}
.container {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  overflow: hidden;
  z-index: -10;
  background-color: rgb(243, 243, 243);
  .backimg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -10;
    background: url(./img/作品展示2background.png);
    transform: scale(1.6);
    animation: backgroundmove 50s infinite linear both;
  }

  .backbutton {
    position: absolute;
    top: 50px;
    left: 100px;
    display: flex;
    cursor: pointer;
    align-items: center;
    font-size: 36px;
    z-index: 99;
    h2 {
      margin: 0;
    }
    .iconfont {
      position: absolute;
      top: 15px;
      font-size: 36px;
      color: #fc5493;
      animation: back 1s ease infinite;
    }
    .back {
      color: #025bff;
    }
  }
  .project {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    width: 85%;
    height: 70%;
    .nomean {
      animation: downtoup 1s ease both;
      width: 40%;
      .box1 {
        display: flex;
        flex-direction: column;

        height: 100%;
        cursor: pointer;
        border-radius: 30px;
        background-color: #54b3fc;
        transition: all ease 0.5s;

        &:hover {
          transform: scale(1.1);
          box-shadow: 1px 1px 10px rgba(5, 119, 196, 0.6);
          .mask {
            filter: brightness(1);
            background-size: 145%;
          }
        }
        .mask {
          width: 100%;
          height: 70%;
          border-radius: 30px 30px 0 0;
          background: url(./img/封面.png);
          background-size: 140%;
          background-position: -150px;
          transition: all 0.5s ease;
          filter: brightness(0.6);
        }
        .desc {
          font-style: italic;
          color: #fff;
          padding: 14px;
          position: relative;
          h2 {
            margin: 0;
          }
          .title {
            font-size: 47px;
          }
          .descdetail {
            margin-top: 10px;
            font-size: 19px;
          }
          .down {
            margin-top: 30px;
          }
        }
      }
    }
    .nomean2{
        width: 40%;
        animation: downtoup 1s ease 0.2s both;
        .box2 {
      display: flex;
      flex-direction: column;
      
      height: 100%;
      border-radius: 30px;
      cursor: pointer;
      background-color: #fc5493;
      transition: all ease 0.5s;
      
      &:hover {
        transform: scale(1.1);
        box-shadow: 1px 1px 15px rgba(255, 10, 10, 0.6);
        .mask {
          filter: brightness(1);
          background-size: 145%;
        }
      }
      .mask {
        width: 100%;
        height: 70%;
        border-radius: 30px 30px 0 0;
        background: url(./img/xtx.jpg);
        background-size: 140%;
        background-position: -150px;
        transition: all 0.5s ease;
        filter: brightness(0.6);
      }
      .desc {
        font-style: italic;
        color: #fff;
        padding: 14px;
        display: flex;
        position: relative;
        flex-direction: column;
        h2 {
          margin: 0;
        }
        .title {
          font-size: 47px;
        }
        .descdetail {
          margin-top: 10px;
          font-size: 19px;
        }
        .down {
          margin-top: 30px;
        }
      }
    }
    }
    
  }
}
</style>