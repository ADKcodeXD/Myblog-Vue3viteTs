<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
  
</template>

<script lang="ts" setup>
import { useCacheStore } from '@/store/cache'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
import resize from '@/utils/resize';
const cacheStore = useCacheStore();
const pages = cacheStore.cachePages;
onMounted(()=>{
  resize();
})
</script>

