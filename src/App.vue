<template>

  <router-view></router-view>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useCacheStore}  from '@/store/cache'
export default defineComponent({
  setup() {
    const cacheStore=useCacheStore();
    const pages=cacheStore.cachePages;
    return {
      pages
    }
  },
})
</script>

