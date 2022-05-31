<template>
    <div class="divider">
    </div>
</template>
<script setup lang="ts">
const props=defineProps({
    height:{
        type:Number,
        deault:20
    }
})
</script>
<style lang="less" scoped>
.divider{
    background: url(@/assets/img/divirer.png);
    width: 100%;
    height: 20px;
    margin: 3px;
    background-size: contain;
}
</style>