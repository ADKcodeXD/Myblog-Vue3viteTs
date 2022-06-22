<template >
    <aside class="icon">
        <router-link to="/welcome">
            <img src="@/assets/img/new-logo.png" />
        </router-link>
        <i @click="openPollup" class="iconfont icon-classification"></i>
    </aside>
</template>
<script setup lang="ts">
const emit=defineEmits(['openPollup']);
const openPollup=()=>{
    emit('openPollup')
};
</script>


<style lang="less" scoped>
@import url(../styles/Logo.less);
</style>