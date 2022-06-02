<template >
    <div class="icon">
        <router-link to="/welcome">
            <img src="@/assets/img/new-logo.png" />
        </router-link>
        <i @click="openPollup" class="iconfont icon-classification"></i>
    </div>
</template>
<script setup lang="ts">
const emit=defineEmits(['openPollup']);
const openPollup=()=>{
    emit('openPollup')
};
</script>


<style lang="less" scoped>
@media screen and (min-width: 320px) {

    // logo样式
    .icon {
        cursor: pointer;
        width: 17rem;

        i {
            transition: all 1s ease;
            color: rgb(255, 255, 255);
            display: block;
            font-size: 20px;
            padding: 0 20px;
        }

        img {
            display: none;
            transition: 1s all ease;
            width: 100%;
            height: auto;
        }
    }
}
@media screen and (min-width:992px) {
    .icon {
        img {
          display: block;
          transition: all 1s ease;
        }
        i{
          transition: all 1s ease;
          display: none;
        }
      }
}
</style>