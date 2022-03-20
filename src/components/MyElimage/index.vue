<template>
  <el-image :src="img" fit="cover" style="width: 100%; height: 100%">
    <template #placeholder>
      <div class="gray">
        <el-image :src="Loading">
          <template #placeholder>
            <p>正在努力加载</p>
          </template>
        </el-image>
        <span>图片努力加载中~</span>
      </div>
    </template>
    <template #error>
      <div class="tw-w-fill">
        <img class="tw-w-fill tw-h-fill" :src="notFoundType=='fang'?'/src/assets/img/404img.jpg':'/src/assets/img/404img1200.jpg'" />
      </div>
    </template>
  </el-image>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Loading from '@/assets/img/loading.gif'
export default defineComponent({
    props:{
        img:{
            type:String,
            require:true
        },
        notFoundType:{
            type:String,
            default:'fang'
        }
    },
    setup() {
        return{
            Loading
        }
    },
})
</script>


<style scoped lang="less">
.gray {
    width: 100%;
    height: 100%;
    background-color: rgb(73, 72, 71);
    display: flex;
    flex-direction: column;
    color: rgb(@primaryActiveTextColor);
    justify-content: center;
    align-items: center;
}
</style>