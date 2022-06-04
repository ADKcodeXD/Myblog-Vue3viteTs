<template>
  <el-popover placement="top-start" :width="300" :trigger="popType">
    <template #reference>
      <div class="tw-w-28 tw-mt-3 tw-flex-shrink-0 tw-mr-3">
        <p v-if="role.jobs" class="up-name tw-text-stone-50 tw-flex tw-overflow-hidden">
          <span class="tw-flex-shrink-0" v-for="(job, index) in role.jobs" :key="index">·{{ job }}</span>
        </p>
        <div class="imgcontainer tw-mt-2 tw-h-28 tw-w-28">
          <MyElimage v-if="role.images" :img="role.images.small ? role.images.small : role.images.medium" />
          <MyElimage v-else />
        </div>
        <p class="tw-text-stone-100 text-line-show-2 tw-font-thin">
          {{ role.name_cn ? role.name_cn : role.name }}
        </p>
      </div>
    </template>
    <template #default>
      <div class="top tw-flex">
        <div class="tw-overflow-hidden  tw-w-2/5">
          <MyElimage v-if="role.images" :img="role.images.medium ? role.images.medium : role.images.small" />
          <MyElimage v-else />
        </div>
        <div class="poprole tw-flex-1 tw-ml-5">
          <div class="tw-flex tw-justify-between tw-w-full">
            <p class="tw-text-xl">
              {{ role.name_cn ? role.name_cn : role.name }}
            </p>
            <p class="tw-text-xl tw-text-blue-500 tw-cursor-pointer tw-flex-shrink-0">
              更多
            </p>
          </div>

          <p v-if="role.name_cn" class="tw-text-xs tw-leading-5 text-line-show-2">
            {{ role.name }}
          </p>
          <p v-if="role.info && role.info.alias" class="tw-text-xs tw-leading-6 text-line-show-3">
            别名:<small v-for="i in role.info.alias" :key="i">{{ i }}/</small>
          </p>
          <p v-if="role.info && role.info.gender">性别:{{ role.info.gender }}</p>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { isMobile } from "@/utils/mobile";
import { defineComponent, PropType } from "vue";

defineProps({
  role: {
    type: Object as PropType<Bangumi.StaffHuman>,
    default: {},
  },
});

let popType = ref('')
// 判断设备
if (isMobile()) {
  popType.value = 'click'
} else {
  popType.value = 'hover'
}
</script>


<style lang="less" scoped>
.poprole {
  p {
    margin-top: 2px;
  }
}

.up-name {
  padding: 2px;
  background-image: linear-gradient(to right, #044235 0%, #0c050100 100%);
}
</style>