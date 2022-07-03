<template>
  <el-popover placement="top-start" :show-after="100" :width="300" :trigger="popType">
    <template #reference>
      <div class="chra-avatar">
        <p v-if="role.role_name" class="role-name">
          {{ role.role_name }}
        </p>
        <div class="imgcontainer">
          <MyElimage :img="role.images.grid || ''" />
        </div>
        <p class="chra-name">
          {{ role.name_cn ? role.name_cn : role.name }}
        </p>
      </div>
    </template>
    <template #default>
      <div class="popinfo">
        <div class="popinfo-img">
          <MyElimage :img="role.images.large ? role.images.large : role.images.medium" />
        </div>
        <div class="popinfo-text">
          <div class="popinfo-text-title">
            <p class="bigtitle">
              {{ role.name_cn ? role.name_cn : role.name }}
            </p>
            <p class="more">更多</p>
          </div>
          <p v-if="role.name_cn" class="">
            {{ role.name }}
          </p>
          <p v-if="role.info && role.info.alias" class="">
            别名:<small v-for="i in role.info.alias" :key="i">{{ i }}/</small>
          </p>
          <p class="" v-if="role.actors">CV:{{ role.actors ? role.actors[0].name : '暂无数据' }}</p>
          <p v-if="role.info && role.info.gender">性别:{{ role.info.gender }}</p>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { isMobile } from '@/utils/mobile';
import { PropType } from 'vue';

defineProps({
  role: {
    type: Object as PropType<Bangumi.AnimeHuman>,
    default: () => {
      return {};
    }
  }
});

const popType = ref<'click' | 'focus' | 'hover' | 'contextmenu'>();
// 判断设备
if (isMobile()) {
  popType.value = 'click';
} else {
  popType.value = 'hover';
}
</script>

<style lang="less" scoped>
@import url(./styles/PopOver.less);
</style>
