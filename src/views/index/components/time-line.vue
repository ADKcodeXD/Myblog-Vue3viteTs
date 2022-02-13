<template>
  <div class="timeline">
      <h2>时间归档</h2>
    <el-timeline>
      <el-timeline-item v-for="i in 5" :key="i" timestamp="2022.2.13" placement="top">
          <el-card>
            <h4>测试文章测试</h4>
            <p>Tom committed 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="less" scoped>
.timeline{
    margin-top: 20px;
    background-color: rgb(255, 255, 255);
  padding: 10px;
  max-height: 1000px;
  overflow: hidden;
  margin-left: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}
</style>