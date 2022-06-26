<template>
  <div class="banner">
    <el-upload class="upload" action="" :before-upload="beforeBannerUpload" :show-file-list="true" :limit="1"
      accept=".png, .jpg, .jpeg" :on-exceed="handleExceed">
      <el-button type="primary" plain>点击上传封面</el-button>
    </el-upload>
    <div class="tw-h-full tw-w-full">
      <MyElimage :src="banner" not-found-type="3:1" :zip="4" />
    </div>
  </div>
</template>
<script setup lang="ts" >
import { ElMessage } from "element-plus";
import type { UploadProps } from 'element-plus';
import { useUpload } from "@/hooks/useUpload";
const props = defineProps({
  banner: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(['changeBanner']);
// 上传banner
const beforeBannerUpload: UploadProps['beforeUpload'] = async (file) => {
  const url = await useUpload(file)
  if (url == "") {
    return false;
  }
  emit('changeBanner', url);
};

const handleExceed:UploadProps['onExceed']= (files, fileList) => {
  ElMessage.warning("只能上传一张头图");
};

</script>

<style lang="less" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: @activeColor;

  .upload {
    position: absolute;
    right: 20px;
    bottom: 30px;
    z-index: 1;
  }
}
</style>