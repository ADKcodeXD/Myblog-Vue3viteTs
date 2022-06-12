<template>
  <el-popover placement="top-start" :width="300" :trigger="popType">
    <template #reference>
      <div class="tw-w-28 tw-mt-3 tw-flex-shrink-0 tw-mr-3 md:tw-grow-0">
        <p
          v-if="role.role_name"
          class="up-name tw-text-stone-50 tw-w-full tw-px-2"
        >
          {{ role.role_name }}
        </p>
        <div class="imgcontainer tw-mt-2 tw-w-28 tw-h-28">
          <MyElimage :img="role.images.small" v-if="role.images.small" />
          <MyElimage  v-else />
        </div>
        <p class="tw-text-stone-100 text-line-show-2 tw-font-thin">
          {{ role.name_cn ? role.name_cn : role.name }}
        </p>
      </div>
    </template>
    <template #default>
      <div class="top tw-flex ">
        <div class="tw-overflow-hidden tw-w-2/5">
          <MyElimage :img="role.images.large?role.images.large:role.images.medium" />
        </div>
        <div class="poprole tw-flex-1 tw-ml-5 ">
          <div class="tw-flex tw-justify-between tw-w-full">
            <p class="tw-text-xl">
              {{ role.name_cn ? role.name_cn : role.name }}
            </p>
            <p class="tw-text-xl tw-text-blue-500 tw-cursor-pointer tw-flex-shrink-0">更多</p>
          </div>
          <p
            v-if="role.name_cn"
            class="tw-text-xs tw-leading-5 text-line-show-2"
          >
            {{ role.name }}
          </p>
          <p
            v-if="role.info&&role.info.alias"
            class="tw-text-xs tw-leading-6 text-line-show-3"
          >
            别名:<small v-for="i in role.info.alias" :key="i">{{ i }}/</small>
          </p>
          <p
            class="tw-text-xs tw-leading-5 text-line-show-2"
            v-if="role.actors"
          >
            CV:{{ role.actors ? role.actors[0].name : "暂无数据" }}
          </p>
          <p v-if="role.info&&role.info.gender">性别:{{ role.info.gender }}</p>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { isMobile } from "@/utils/mobile";
import {  PropType } from "vue";

defineProps({
    role: {
      type: Object as PropType<Bangumi.AnimeHuman>,
      default: {},
    },
  });

let popType=ref<"click" | "focus" | "hover" | "contextmenu">()
    // 判断设备
    if(isMobile()){
      popType.value='click'
    }else{
      popType.value='hover'
    }
</script>

<style lang="less" scoped>
.up-name {
  padding: 2px;
  background-image: linear-gradient(to right, #044235 0%, #0c050100 100%);
}
</style>