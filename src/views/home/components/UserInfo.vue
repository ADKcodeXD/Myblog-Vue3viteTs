<template>
  <!-- 左边 -->
  <div class="my-info-easy">
    <!-- icon 头像 -->
    <div class="avatar">
      <UploadAvatar
        @imglink="changeAvatar"
        :is-show="false"
        :avatar="currentUser.avatar"
        v-if="currentUser.avatar"
      />
    </div>
    <div class="infobox">
      <!-- 用户名 -->
      <div class="username">
        {{ currentUser.nickname }}
        <i class="iconfont icon-nansheng" v-if="currentUser.gender === '1'"></i>
        <i class="iconfont icon-nvsheng" v-else></i>
      </div>
      <!-- 介绍 -->
      <div class="introuce">{{ currentUser.introduce }}</div>
      <!-- emil 性别 等 -->
      <div class="more-info">
        <div class="email"><i class="iconfont icon-riqi"></i>创建日期:{{ currentUser.date }}</div>
        <div class="email">
          <i class="iconfont icon-youjian"></i>邮件:{{
            currentUser.email ? currentUser.email : '未设置'
          }}
        </div>
        <div class="email">
          <i class="iconfont icon-gerenzhongxin"></i>用户名:{{ currentUser.username }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
  currentUser: {
    type: Object as PropType<UserAll>,
    default: () => {
      return {};
    }
  }
});
const emit = defineEmits(['changeAvatar']);

const changeAvatar = (url: string) => {
  emit('changeAvatar', url);
};
</script>

<style lang="less" scoped>
@import url(../styles/UserInfo.less);
</style>
