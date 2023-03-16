<template>
  <el-popover placement="top-start" :width="300" :show-after="100" :trigger="popType">
    <template #reference>
      <div class="chra-avatar">
        <p v-if="role.jobs" class="role-name">
          <span class="tw-flex-shrink-0" v-for="(job, index) in role.jobs" :key="index"
            >·{{ job }}</span
          >
        </p>
        <div class="imgcontainer">
          <MyElimage
            v-if="role.images"
            :img="role.images.small ? role.images.small : role.images.medium"
          />
          <MyElimage v-else />
        </div>
        <p class="chra-name">
          {{ role.name_cn ? role.name_cn : role.name }}
        </p>
      </div>
    </template>
    <template #default>
      <div class="popinfo">
        <div class="popinfo-img">
          <MyElimage
            v-if="role.images"
            :img="role.images.grid ? role.images.grid : role.images.small || ''"
          />
        </div>
        <div class="popinfo-text">
          <div class="popinfo-text-title">
            <p class="bigtitle">
              {{ role.name_cn ? role.name_cn : role.name }}
            </p>
            <p class="more">更多</p>
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
import { isMobile } from '@/utils/mobile'
import { PropType } from 'vue'

defineProps({
  role: {
    type: Object as PropType<Bangumi.StaffHuman>,
    default: () => {
      return {}
    }
  }
})

let popType = ref<'click' | 'focus' | 'hover' | 'contextmenu'>()
// 判断设备
if (isMobile()) {
  popType.value = 'click'
} else {
  popType.value = 'hover'
}
</script>

<style lang="less" scoped>
@import url(./styles/PopOver.less);
</style>
