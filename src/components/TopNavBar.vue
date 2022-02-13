<template>
  <div class="navbar">
    <!-- 导航组件 -->
    <el-header>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="icon">
            <router-link to="/welcome">
              <img src="@/assets/img/Web Blog .png"
            /></router-link>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="menu">
            <ul class="menu-list">
              <li><a>文章</a></li>
              <li><a>留言板</a></li>
              <li><a @click="$router.push('/project')">作品</a></li>
              <li>
                <el-button :icon="Edit" circle></el-button><a>我也要写</a>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="right">
            <p>欢迎,尊敬的访客 去<RouterLink to="/login">登录</RouterLink></p>
            <div class="container" @mouseenter="infoShow=true" @mouseleave="infoShow=false">
              <div class="avatar" >
                <img src="@/assets/img/94551956_p0.png" alt="" />
              </div>
              <transition name="infobox" mode="out-in">
                <div v-show="infoShow" class="info-box"></div>
              </transition>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script setup lang="ts">
import { Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
let infoShow = ref(false);
</script>

<style lang="less" scoped>
.infobox-enter-from,
.infobox-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}
.infobox-enter-to,
.infobox-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.infobox-enter-active,
.infobox-leave-active {
  transition: all 0.4s ease;
}

.el-header {
  padding: 0;
  height: 93px;
  background-color: #ff9f9f;
  .el-row {
    height: 100%;
    padding: 10px;
    align-items: center;
    .icon {
      img {
        width: 70%;
        height: auto;
      }
    }
    .menu {
      display: flex;
      justify-content: center;
      font-size: 28px;
      .menu-list {
        display: flex;
        color: white;
        li {
          margin-right: 20px;
          cursor: pointer;
          
          .el-button {
            background-color: rgb(102, 167, 253);
            margin-right: 10px;
            border: none;
          }
          &:hover {
            color: rgb(140, 228, 255);
          }
        }
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      color: white;
      font-size: 20px;
      align-items: center;
      position: relative;
      .container{
        .info-box {
          position: absolute;
          width: 329px;
          height: 408px;
          top: 80px;
          left: 16px;
          background-color: rgb(253, 253, 253);
          box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.3);
        }
        .avatar {
        width: 73px;
        height: 73px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #fff;
        z-index: 2;
        transition: all ease 1s;
        &:hover {
         
        }
        
        img {
          width: 100%;
          object-fit: cover;
        }
      }
      
      }
    }
  }
}
</style>