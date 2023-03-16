<template>
  <div class="desc" v-if="AnimeItemList && AnimeItemList.length > 0">
    <p class="desc-title">角色介绍</p>
    <div class="desc-boxinner">
      <PopOverAnimeHuman v-for="role in AnimeItemList" :key="role.id" :role="role" />
    </div>
  </div>

  <!-- staff 名单 -->
  <div class="desc" v-if="StaffItemList && StaffItemList.length > 0">
    <p class="desc-title">staff介绍</p>
    <div class="desc-boxinner">
      <PopOverStaffHuman v-for="role in StaffItemList" :key="role.id" :role="role" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import PopOverStaffHuman from './PopOverStaffHuman.vue'
import PopOverAnimeHuman from './PopOverAnimeHuman.vue'

defineProps({
  AnimeItemList: {
    type: Object as PropType<Array<Bangumi.AnimeHuman>>,
    default: () => {
      return []
    }
  },
  StaffItemList: {
    type: Object as PropType<Array<Bangumi.StaffHuman>>,
    default: () => {
      return []
    }
  }
})
</script>

<style lang="less" scoped>
@import url(./styles/HumanBoxCard.less);
</style>
