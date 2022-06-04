
<template>
  <div class="desc tw-mt-10 tw-flex tw-flex-col" v-if="AnimeItemList && AnimeItemList.length > 0">
    <p class="tw-text-white tw-font-bold tw-text-2xl">角色介绍</p>
    <div class="boxinner tw-flex tw-justify-between tw-overflow-auto md:tw-justify-start md:tw-flex-wrap">
      <PopOverAnimeHuman v-for="role in AnimeItemList" :key="role.id" :role="role" />
    </div>
  </div>

  <!-- staff 名单 -->
  <div class="desc tw-mt-10 tw-flex tw-flex-col" v-if="StaffItemList && StaffItemList.length > 0">
    <p class="tw-text-white tw-font-bold tw-text-2xl">staff介绍</p>
    <div class="boxinner tw-flex tw-justify-between tw-overflow-auto md:tw-justify-start md:tw-flex-wrap">
      <PopOverStaffHuman v-for="role in StaffItemList" :key="role.id" :role="role" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import PopOverStaffHuman from "./PopOverStaffHuman.vue";
import PopOverAnimeHuman from "./PopOverAnimeHuman.vue";

defineProps({
  AnimeItemList: {
    type: Object as PropType<Array<Bangumi.AnimeHuman>>,
    default: [],
  },
  StaffItemList: {
    type: Object as PropType<Array<Bangumi.StaffHuman>>,
    default: [],
  },
});
</script>


<style lang="less" scoped>
.poprole {
  p {
    margin-top: 2px;
  }
}
</style>